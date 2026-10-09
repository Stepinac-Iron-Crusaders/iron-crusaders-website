-- ============================================================================
-- Fix sign-in end-to-end + close privilege-escalation holes.
--
-- Run this in the Supabase SQL Editor AFTER 20240101000000_team_portal.sql.
-- It is additive/idempotent: every statement is guarded so it is safe to
-- re-run.
--
-- Why this file exists
-- --------------------
-- 1. The `handle_new_user` trigger was documented but never actually created.
--    Without it no auth.users row ever gets a matching public.profiles row.
--    ProtectedRoute requires a profile, so every new account authenticated
--    successfully and was then silently bounced back to the login screen.
-- 2. 20240101000000 created `create_member` as SECURITY DEFINER and left the
--    default PUBLIC EXECUTE grant in place, while ALSO dropping all policies
--    and replacing them with blanket "open" policies plus
--    `grant update on public.profiles to public`. Any signed-in member could
--    therefore call create_member(..., 'admin') or just UPDATE their own role
--    column and make themselves an admin. This file re-establishes the guard
--    rails the docs claimed existed.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. is_admin() — SECURITY DEFINER so it can read profiles without being
--    blocked by the RLS policies below. Returns false when there is no
--    caller (e.g. anonymous), which is what we want.
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
      and p.is_active
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- ---------------------------------------------------------------------------
-- 2. handle_new_user() — create the profile row on signup.
--    SECURITY DEFINER because auth.users INSERTs happen before any RLS
--    context exists for the new user.
--
--    The role is hardcoded to 'member' on purpose: it must be impossible for
--    a self-service signup to grant itself admin via user metadata.
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, pg_temp
as $$
begin
  insert into public.profiles (id, email, full_name, role, is_active, created_at)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    'member',
    true,
    now()
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

revoke all on function public.handle_new_user() from public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- 3. Backfill — repair accounts that were created while the trigger was
--    missing, so existing members are not locked out by ProtectedRoute.
--    Only inserts rows that do not exist, so existing roles are preserved.
-- ---------------------------------------------------------------------------
insert into public.profiles (id, email, full_name, role, is_active, created_at)
select
  u.id,
  u.email,
  coalesce(u.raw_user_meta_data ->> 'full_name', ''),
  'member',
  true,
  coalesce(u.created_at, now())
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- 4. Lock down the admin RPCs.
--    These stay callable by `authenticated` because the frontend invokes them
--    directly (see src/lib/db.ts adminAction), but each now verifies the
--    caller is an active admin first.
--
--    NOTE: bootstrapping the very first admin must NOT go through these
--    functions, and cannot: is_admin() reads auth.uid() from the caller's JWT,
--    which is NULL in the SQL Editor just as it is for a logged-out browser.
--    Use bootstrap_first_admin() at the bottom of this file instead.
-- ---------------------------------------------------------------------------
create or replace function public.create_member(
  p_email text,
  p_password text,
  p_full_name text default '',
  p_role text default 'member'
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions, pg_temp
as $$
declare
  new_user_id uuid;
  result jsonb;
begin
  if not public.is_admin() then
    raise exception 'admin privileges required';
  end if;

  -- Never let a non-member role be injected wholesale.
  if p_role not in ('admin', 'team_lead', 'member') then
    raise exception 'invalid role: %', p_role;
  end if;

  new_user_id := gen_random_uuid();

  insert into auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token
  ) values (
    '00000000-0000-0000-0000-000000000000',
    new_user_id,
    'authenticated',
    'authenticated',
    p_email,
    extensions.crypt(p_password, extensions.gen_salt('bf')),
    now(),
    jsonb_build_object('full_name', p_full_name),
    now(),
    now(),
    '',
    ''
  );

  -- Upsert rather than plain UPDATE: the on_auth_user_created trigger will
  -- normally have inserted a 'member' profile already, but this must still
  -- produce a profile if the trigger is ever missing. Without a profile row the
  -- account could authenticate but never pass ProtectedRoute.
  insert into public.profiles (id, email, full_name, role, is_active, created_at)
  values (new_user_id, p_email, p_full_name, p_role, true, now())
  on conflict (id) do update
    set email = excluded.email,
        full_name = excluded.full_name,
        role = excluded.role;

  result := jsonb_build_object(
    'id', new_user_id,
    'email', p_email,
    'full_name', p_full_name,
    'role', p_role
  );

  return result;
end;
$$;

create or replace function public.set_member_password(
  p_user_id uuid,
  p_password text
)
returns void
language plpgsql
security definer
set search_path = public, extensions, pg_temp
as $$
begin
  if not public.is_admin() then
    raise exception 'admin privileges required';
  end if;

  update auth.users
  set encrypted_password = extensions.crypt(p_password, extensions.gen_salt('bf')),
      updated_at = now()
  where id = p_user_id;
end;
$$;

create or replace function public.toggle_member_active(
  p_user_id uuid,
  p_active boolean
)
returns void
language plpgsql
security definer
set search_path = public, extensions, pg_temp
as $$
begin
  if not public.is_admin() then
    raise exception 'admin privileges required';
  end if;

  update public.profiles
  set is_active = p_active, updated_at = now()
  where id = p_user_id;

  if p_active then
    update auth.users set banned_until = null where id = p_user_id;
  else
    update auth.users set banned_until = '2099-01-01'::timestamptz where id = p_user_id;
  end if;
end;
$$;

create or replace function public.set_member_role(
  p_user_id uuid,
  p_role text
)
returns void
language plpgsql
security definer
set search_path = public, extensions, pg_temp
as $$
begin
  if not public.is_admin() then
    raise exception 'admin privileges required';
  end if;

  if p_role not in ('admin', 'team_lead', 'member') then
    raise exception 'invalid role: %', p_role;
  end if;

  update public.profiles
  set role = p_role, updated_at = now()
  where id = p_user_id;
end;
$$;

-- Only `authenticated` may call these. anon is explicitly denied so the
-- login page cannot be used to probe the portal.
revoke all on function public.create_member(text, text, text, text) from public;
revoke all on function public.set_member_password(uuid, text) from public;
revoke all on function public.toggle_member_active(uuid, boolean) from public;
revoke all on function public.set_member_role(uuid, text) from public;

grant execute on function public.create_member(text, text, text, text) to authenticated;
grant execute on function public.set_member_password(uuid, text) to authenticated;
grant execute on function public.toggle_member_active(uuid, boolean) to authenticated;
grant execute on function public.set_member_role(uuid, text) to authenticated;

-- ---------------------------------------------------------------------------
-- 5. profiles: undo the blanket UPDATE grant from 20240101000000.
--    Non-admins may read the roster (team portal needs it) but may only edit
--    their own display name. role / is_active are column-blocked and are only
--    ever changed by the SECURITY DEFINER RPCs above or the edge function.
-- ---------------------------------------------------------------------------
-- Supabase's default grants give `authenticated` (and `anon`) table-level
-- ALL on everything in `public`, and 20240101000000 added an explicit grant to
-- `public` on top. Revoking from `public` alone would leave the direct
-- `authenticated` grant intact and `role`/`is_active` would still be writable.
-- Revoke at table level from each role first, then re-grant a single column.
revoke update on public.profiles from public;
revoke update on public.profiles from anon;
revoke update on public.profiles from authenticated;
revoke insert on public.profiles from anon;
revoke insert on public.profiles from authenticated;
revoke delete on public.profiles from anon;
revoke delete on public.profiles from authenticated;

-- Members may only change their own display name, on their own row (enforced
-- by profiles_update_self below). Role changes go through the gated RPCs or the
-- service_role edge function.
grant update (full_name) on public.profiles to authenticated;

drop policy if exists "open" on public.profiles;

create policy "profiles_select" on public.profiles
  for select
  using (auth.uid() is not null);

create policy "profiles_update_self" on public.profiles
  for update
  using (id = auth.uid())
  with check (id = auth.uid());

select 'fix_login_and_rls complete' as status;

-- ---------------------------------------------------------------------------
-- 6. bootstrap_first_admin() — the one-time escape hatch.
--
--    Needed because every other admin function gates on is_admin(), and
--    is_admin() is derived from auth.uid() (the caller's JWT). That is NULL
--    for a logged-out browser -- correct, it blocks the frontend -- but it is
--    equally NULL when running from the SQL Editor, so there is no way at all
--    to create the first admin through the gated RPCs.
--
--    Safety: EXECUTE is revoked from PUBLIC, so the browser can never reach
--    this. Only the function owner (the SQL Editor's postgres role) and
--    service_role can run it. It also refuses to run once an active admin
--    exists, so it cannot be used to mint extra admins later.
--
--    Run from the SQL Editor:
--      select public.bootstrap_first_admin(
--        'you@example.com', 'choose-a-strong-password', 'Your Name');
-- ---------------------------------------------------------------------------
create or replace function public.bootstrap_first_admin(
  p_email text,
  p_password text,
  p_full_name text default ''
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions, pg_temp
as $$
declare
  new_user_id uuid;
  result jsonb;
begin
  if exists (
    select 1 from public.profiles
    where role = 'admin' and is_active
  ) then
    raise exception
      'an active admin already exists — create further members with create_member from the portal instead';
  end if;

  new_user_id := gen_random_uuid();

  insert into auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token
  ) values (
    '00000000-0000-0000-0000-000000000000',
    new_user_id,
    'authenticated',
    'authenticated',
    p_email,
    extensions.crypt(p_password, extensions.gen_salt('bf')),
    now(),
    jsonb_build_object('full_name', p_full_name),
    now(),
    now(),
    '',
    ''
  );

  insert into public.profiles (id, email, full_name, role, is_active, created_at)
  values (new_user_id, p_email, p_full_name, 'admin', true, now())
  on conflict (id) do update
    set email = excluded.email,
        full_name = excluded.full_name,
        role = 'admin';

  result := jsonb_build_object(
    'id', new_user_id,
    'email', p_email,
    'full_name', p_full_name,
    'role', 'admin'
  );

  return result;
end;
$$;

-- Deliberately NOT granted to authenticated or anon — this is a SQL-editor-only
-- escape hatch. The owner (postgres) always retains EXECUTE.
revoke all on function public.bootstrap_first_admin(text, text, text) from public;
grant execute on function public.bootstrap_first_admin(text, text, text) to service_role;

select 'bootstrap_first_admin ready' as status;