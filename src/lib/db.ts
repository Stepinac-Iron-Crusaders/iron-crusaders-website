import { supabase } from "./supabaseClient";
import type { Profile, Team, UserTeam, Task, TaskAssignment } from "./supabaseClient";

export type { Profile, Team, UserTeam, Task, TaskAssignment };

// ---------------------------------------------------------------------------
// Members (admin view of all users)
// ---------------------------------------------------------------------------
export async function listMembers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, is_active, created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Profile[];
}

export async function listMyTeams(): Promise<UserTeam[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: memberships, error: me } = await supabase
    .from("team_members")
    .select("team_id, role_in_team, joined_at")
    .eq("user_id", user.id);
  if (me) throw me;
  const teamIds = (memberships ?? []).map((m) => m.team_id);
  if (!teamIds.length) return [];
  const { data: teams, error: te } = await supabase
    .from("teams")
    .select("*")
    .in("id", teamIds);
  if (te) throw te;
  return (memberships ?? []).map((m) => {
    const t = (teams ?? []).find((x) => String(x.id) === String(m.team_id));
    return {
      ...(t ?? ({ id: m.team_id } as Team)),
      role_in_team: m.role_in_team,
      joined_at: m.joined_at,
    };
  });
}

export async function getMember(id: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as Profile | null;
}

export async function updateMemberName(id: string, full_name: string) {
  const { error } = await supabase
    .from("profiles")
    .update({ full_name })
    .eq("id", id);
  if (error) throw error;
}

export async function getMyTeams(): Promise<UserTeam[]> {
  const { data: memberships, error: me } = await supabase
    .from("team_members")
    .select("team_id, role_in_team, joined_at");
  if (me) throw me;
  const ids = (memberships ?? []).map((m) => m.team_id);
  if (!ids.length) return [];
  const { data: teams, error: te } = await supabase.from("teams").select("*").in("id", ids);
  if (te) throw te;
  return (memberships ?? []).map((m) => {
    const t = (teams ?? []).find((x) => String(x.id) === String(m.team_id));
    return { ...(t ?? ({ id: m.team_id } as Team)), role_in_team: m.role_in_team, joined_at: m.joined_at };
  });
}

// ---------------------------------------------------------------------------
// Admin auth operations (delegated to the secure admin-actions edge function
// which holds the SERVICE_ROLE key — NEVER exposed to the frontend).
// ---------------------------------------------------------------------------
export type AdminAction =
  | { action: "create-user"; email: string; password: string; full_name: string; role: string; team_id?: number }
  | { action: "set-password"; target_user_id: string; password: string }
  | { action: "toggle-active"; target_user_id: string; active: boolean }
  | { action: "set-role"; target_user_id: string; role: string }
  | { action: "request-reset"; email: string };

export async function adminAction(payload: AdminAction) {
  const { data, error } = await supabase.functions.invoke("admin-actions", {
    body: payload,
  });
  if (error) throw error;
  return data;
}

// Public password-reset link (anon key, sent directly by Supabase Auth).
export async function sendPasswordResetLink(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/#/team/portal/login`,
  });
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Teams
// ---------------------------------------------------------------------------
export async function listTeams() {
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Team[];
}

export async function listTeamsWithMembers() {
  const { data, error } = await supabase
    .from("teams")
    .select("*, team_members!inner(user_id, role_in_team, profiles!inner(id, email, full_name, role))", {
      count: "exact",
    });
  if (error) throw error;
  return data ?? [];
}

export async function createTeam(name: string, description: string, leadId?: string) {
  const payload: Record<string, unknown> = { name, description };
  if (leadId) payload.lead_id = leadId;
  const { data, error } = await supabase.from("teams").insert(payload).select().single();
  if (error) throw error;
  return data as Team;
}

export async function renameTeam(id: number, name: string, description = "") {
  const { error } = await supabase.from("teams").update({ name, description }).eq("id", id);
  if (error) throw error;
}

export async function deleteTeam(id: number) {
  const { error } = await supabase.from("teams").update({ is_active: false }).eq("id", id);
  if (error) throw error;
}

export async function assignTeamLead(teamId: number, userId: string) {
  const { error } = await supabase.from("teams").update({ lead_id: userId }).eq("id", teamId);
  if (error) throw error;
}

export async function addTeamMember(teamId: number, userId: string, roleInTeam = "member") {
  const { error } = await supabase
    .from("team_members")
    .insert({ team_id: teamId, user_id: userId, role_in_team: roleInTeam });
  if (error) throw error;
}

export async function removeTeamMember(teamId: number, userId: string) {
  const { error } = await supabase
    .from("team_members")
    .delete()
    .eq("team_id", teamId)
    .eq("user_id", userId);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Tasks
// ---------------------------------------------------------------------------
export async function listTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select("*, task_assignments!inner(member_id, completed)")
    .eq("is_active", true)
    .order("due_date", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function listMyTasks() {
  const { data, error } = await supabase
    .from("task_assignments")
    .select("*, tasks!inner(*)")
    .eq("member_id", (await supabase.auth.getUser()).data.user?.id)
    .order("tasks.created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as (TaskAssignment & { tasks: Task })[];
}

export async function listTeamTasks(teamId: number) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*, task_assignments(*, member_id, completed, profiles!inner(full_name))")
    .eq("team_id", teamId)
    .eq("is_active", true)
    .order("due_date", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createTask(opts: {
  title: string;
  description: string;
  due_date?: string;
  team_id?: number;
  priority?: string;
}) {
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title: opts.title,
      description: opts.description,
      due_date: opts.due_date ?? null,
      team_id: opts.team_id ?? null,
      priority: opts.priority ?? "medium",
      status: "todo",
    })
    .select()
    .single();
  if (error) throw error;
  return data as Task;
}

export async function updateTask(id: number, patch: Partial<Pick<Task, "title" | "description" | "status" | "priority" | "due_date" | "team_id">>) {
  const { error } = await supabase.from("tasks").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteTask(id: number) {
  const { error } = await supabase.from("tasks").update({ is_active: false }).eq("id", id);
  if (error) throw error;
}

export async function assignTask(taskId: number, memberId: string) {
  const { error } = await supabase
    .from("task_assignments")
    .insert({ task_id: taskId, member_id: memberId })
    .single();
  if (error) {
    // already assigned -> ignore
    if (!String(error.message).includes("duplicate")) throw error;
  }
}

export async function unassignTask(taskId: number, memberId: string) {
  const { error } = await supabase
    .from("task_assignments")
    .delete()
    .eq("task_id", taskId)
    .eq("member_id", memberId);
  if (error) throw error;
}

export async function setAssignmentComplete(taskId: number, memberId: string, completed: boolean) {
  const { error } = await supabase
    .from("task_assignments")
    .update({ completed, completed_at: completed ? new Date().toISOString() : null })
    .eq("task_id", taskId)
    .eq("member_id", memberId);
  if (error) throw error;
}

export async function setTaskStatus(taskId: number, status: string) {
  const { error } = await supabase.from("tasks").update({ status }).eq("id", taskId);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Notifications + activity + audit
// ---------------------------------------------------------------------------
export async function listNotifications(limit = 30) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function markNotificationRead(id: number) {
  const { error } = await supabase.from("notifications").update({ read: true }).eq("id", id);
  if (error) throw error;
}

export async function listRecentActivity(limit = 25) {
  const { data, error } = await supabase
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function getPartners(taskId: number) {
  const { data, error } = await supabase
    .from("task_assignments")
    .select("*, profiles!inner(id, email, full_name, role)")
    .eq("task_id", taskId);
  if (error) throw error;
  return data ?? [];
}

export async function listUpcomingSchedule(limit = 20) {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("team_schedule")
    .select("id, title, description, location, start_time")
    .gte("start_time", now)
    .order("start_time", { ascending: true })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}
