// ============================================================================
// admin-actions — Supabase Edge Function (Deno runtime).
// Secure backend for admin-only authentication operations that require the
// SERVICE_ROLE key (which is NEVER exposed to the browser):
//   - create-user       : create a confirmed auth user (admin bootstrap)
//   - set-password      : set a user's password directly
//   - toggle-active     : ban / unban a user in Supabase Auth
//   - request-reset     : email a password-reset link to a user + audit log
//
// The caller's identity is verified from their Bearer JWT (publishable key is
// used only to validate the caller, never to perform privileged actions).
//
// Env vars required (set in Supabase project → Functions → Settings):
//   SUPABASE_URL
//   SUPABASE_PUBLISHABLE_KEY
//   SUPABASE_SERVICE_ROLE_KEY
// ============================================================================
import { serve } from "https://deno.land/x/sift@0.8.1/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabasePublishableKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? "";
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // -----------------------------------------------------------------
  // Verify the caller is an ACTIVE admin.
  // -----------------------------------------------------------------
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "");

  // Client that verifies the caller using their own JWT.
  const callerClient = createClient(supabaseUrl, supabasePublishableKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const {
    data: { user },
    error: userError,
  } = await callerClient.auth.getUser();

  if (userError || !user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data: profile, error: profileError } = await callerClient
    .from("profiles")
    .select("role,is_active")
    .eq("id", user.id)
    .single();

  if (profileError || !profile || profile.role !== "admin" || !profile.is_active) {
    return new Response(JSON.stringify({ error: "Forbidden: admin access required" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const actor = user.id as string;
  let body: any;
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const { action, ...rest } = body;

  try {
    switch (action) {
      // -----------------------------------------------------------------
      // create-user  { email, password, full_name, role, team_id? }
      // -----------------------------------------------------------------
      case "create-user": {
        const { email, password, full_name, role, team_id } = rest;
        if (!email || !password)
          throw new Error("email and password are required");
        const { data, error } = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true, // account is usable immediately
          user_metadata: { full_name },
        });
        if (error) throw error;

        // Ensure the profile has the requested role + team.
        await supabaseAdmin
          .from("profiles")
          .update({ role: role ?? "member" })
          .eq("id", data.user.id);

        if (team_id) {
          await supabaseAdmin.from("team_members").insert({
            team_id,
            user_id: data.user.id,
            role_in_team: "member",
          });
        }

        await supabaseAdmin.from("audit_logs").insert({
          actor_id: actor,
          action: "user_created",
          target_user_id: data.user.id,
        });

        return new Response(JSON.stringify({ user: data.user }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      // -----------------------------------------------------------------
      // set-password  { target_user_id, password }
      // -----------------------------------------------------------------
      case "set-password": {
        const { target_user_id, password } = rest;
        if (!target_user_id || !password)
          throw new Error("target_user_id and password are required");
        const { error } = await supabaseAdmin.auth.admin.updateUserById(
          target_user_id,
          { password }
        );
        if (error) throw error;

        await supabaseAdmin.from("audit_logs").insert({
          actor_id: actor,
          action: "password_reset_requested",
          target_user_id,
        });

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      // -----------------------------------------------------------------
      // toggle-active  { target_user_id, active }
      // -----------------------------------------------------------------
      case "toggle-active": {
        const { target_user_id, active } = rest;
        if (!target_user_id) throw new Error("target_user_id is required");
        const { error } = await supabaseAdmin.auth.admin.updateUserById(
          target_user_id,
          { ban: !active }
        );
        if (error) throw error;

        await supabaseAdmin
          .from("profiles")
          .update({ is_active: active })
          .eq("id", target_user_id);

        await supabaseAdmin.from("audit_logs").insert({
          actor_id: actor,
          action: active ? "user_reactivated" : "user_deactivated",
          target_user_id,
        });

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      // -----------------------------------------------------------------
      // request-reset  { email }  -> send a password-reset email
      // -----------------------------------------------------------------
      case "request-reset": {
        const { email } = rest;
        if (!email) throw new Error("email is required");
        const { error } = await supabaseAdmin.auth.resetPasswordForEmail(
          email,
          { redirectTo: "https://ironcrusaders.dev/team/portal/login" }
        );
        if (error) throw error;

        await supabaseAdmin.from("audit_logs").insert({
          actor_id: actor,
          action: "password_reset_requested",
          target_user_id: (await supabaseAdmin
            .from("profiles")
            .select("id")
            .eq("email", email)
            .single())?.data?.id ?? null,
        });

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message ?? "Server error" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
});
