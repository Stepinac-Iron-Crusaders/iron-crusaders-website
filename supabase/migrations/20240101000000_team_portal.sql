-- ============================================================================
-- Iron Crusaders Team Portal — Supabase schema + security + audit
-- ----------------------------------------------------------------------------
-- ADDITIVE & IDEMPOTENT migration. It extends the existing project tables
-- (profiles, teams, team_members, tasks, task_assignments, task_activity,
-- notifications, audit_logs, team_schedule) with the columns, indexes,
-- Row-Level Security (RLS) policies, column-level grants, and trigger
-- functions required by the role-based team-management dashboard.
--
-- Roles (global, in profiles.role):
--   admin      -> full access
--   team_lead -> manages teams they lead + their members' tasks
--   member    -> views & updates only their own task assignments
--
-- Run in the Supabase SQL editor (or `supabase db push`).
-- The SERVICE_ROLE key is NEVER exposed to the frontend.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 0. Helper functions
-- ----------------------------------------------------------------------------
-- is_admin(): is the requesting user an ACTIVE admin?
--   Safe vs. RLS recursion: it only inspects the requester's OWN profile row
--   (id = auth.uid()), which is always permitted by the "self" SELECT policy.
create or replace function public.is_admin()
returns boolean language sql stable as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin' and is_active = true
  );
$$;

-- touch_updated_fn(): stamp updated_at on INSERT/UPDATE (used by triggers).
create or replace function public.touch_updated_fn()
returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    if new.updated_at is null then new.updated_at := now(); end if;
    return new;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

-- audit_log(): write an audit entry as the SECURITY DEFINER trigger owner,
-- using an EXPLICIT actor (never trusts client-supplied actor).
create or replace function public.audit_log(p_actor uuid, p_action text, p_target uuid default null, p_details jsonb default null)
returns void language plpgsql security definer as $$
begin
  insert into public.audit_logs (actor_id, action, target_user_id, details, created_at)
  values (p_actor, p_action, p_target, p_details, now());
end;
$$;

-- ----------------------------------------------------------------------------
-- 1. EXTEND SCHEMA (additive; safe on already-populated tables)
-- ----------------------------------------------------------------------------
alter table public.profiles
  add column if not exists is_active boolean not null default true,
  add column if not exists updated_at timestamp with time zone;

alter table public.teams
  add column if not exists lead_id     uuid references public.profiles (id),
  add column if not exists is_active  boolean not null default true,
  add column if not exists updated_at timestamp with time zone,
  add column if not exists description text;

alter table public.team_members
  add column if not exists role_in_team text not null default 'member',
  add column if not exists joined_at    timestamp with time zone;

alter table public.tasks
  add column if not exists priority    text not null default 'medium',
  add column if not exists assigned_by  uuid references public.profiles (id),
  add column if not exists is_active   boolean not null default true,
  add column if not exists updated_at  timestamp with time zone;

alter table public.task_assignments
  add column if not exists completed_at timestamp with time zone;

alter table public.task_activity
  add column if not exists actor_id uuid references public.profiles (id);

alter table public.notifications
  add column if not exists read boolean not null default false,
  add column if not exists related_task_id bigint;

-- indexes
create index if not exists profiles_email_idx   on public.profiles (email);
create index if not exists profiles_role_idx    on public.profiles (role);
create index if not exists profiles_active_idx  on public.profiles (is_active);
create index if not exists teams_lead_idx       on public.teams (lead_id);
create index if not exists teams_active_idx     on public.teams (is_active);
create unique index if not exists team_members_team_user_uk on public.team_members (team_id, user_id);
create index if not exists team_members_user_idx on public.team_members (user_id);
create index if not exists tasks_team_idx       on public.tasks (team_id);
create index if not exists tasks_status_idx     on public.tasks (status);
create index if not exists tasks_due_idx        on public.tasks (due_date);
create index if not exists tasks_assigned_by_idx on public.tasks (assigned_by);
create index if not exists task_assignments_member_idx on public.task_assignments (member_id);
create index if not exists task_assignments_task_idx   on public.task_assignments (task_id);

-- -------------------------------------------------------------------------
-- COLUMN-LEVEL SECURITY: sensitive profile columns can ONLY be changed via
-- the admin edge function (service_role). Authenticated users (any role) may
-- update only full_name on rows their RLS policy permits.
-- -------------------------------------------------------------------------
revoke update on public.profiles from public;
grant update (full_name, updated_at) on public.profiles to authenticated;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
alter table public.profiles         enable row level security;
alter table public.teams            enable row level security;
alter table public.team_members     enable row level security;
alter table public.tasks            enable row level security;
alter table public.task_assignments enable row level security;
alter table public.task_activity    enable row level security;
alter table public.notifications    enable row level security;
alter table public.audit_logs       enable row level security;

-- ----------------------------------------------------------------------------
-- PROFILES
-- ----------------------------------------------------------------------------
drop policy if exists "profiles select self"          on public.profiles;
drop policy if exists "profiles select admin"         on public.profiles;
drop policy if exists "profiles select teammates"     on public.profiles;
drop policy if exists "profiles update self name"    on public.profiles;
drop policy if exists "profiles update admin"         on public.profiles;
drop policy if exists "profiles delete admin"         on public.profiles;

create policy "profiles select self"
  on public.profiles for select using (id = auth.uid());

create policy "profiles select admin"
  on public.profiles for select using (is_admin());

create policy "profiles select teammates"
  on public.profiles for select using (
    exists (
      select 1 from public.team_members tm_self
      join public.team_members tm_other on tm_self.team_id = tm_other.team_id
      where tm_self.user_id = auth.uid()
        and tm_other.user_id = profiles.id
    )
  );

-- Members may update ONLY their own full_name (role/is_active are revoked columns).
create policy "profiles update self name"
  on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

create policy "profiles update admin"
  on public.profiles for update using (is_admin()) with check (is_admin());

create policy "profiles delete admin"
  on public.profiles for delete using (is_admin());

-- ----------------------------------------------------------------------------
-- TEAMS
-- ----------------------------------------------------------------------------
drop policy if exists "teams select member"  on public.teams;
drop policy if exists "teams modify admin"   on public.teams;

create policy "teams select member"
  on public.teams for select using (
    is_active = true
    and ( is_admin()
       or exists (select 1 from public.team_members tm where tm.user_id = auth.uid() and tm.team_id = teams.id)
    )
  );

create policy "teams modify admin"
  on public.teams for insert, update, delete using (is_admin()) with check (is_admin());

-- ----------------------------------------------------------------------------
-- TEAM_MEMBERS (many-to-many users <-> teams)
-- ----------------------------------------------------------------------------
drop policy if exists "team_members select member"  on public.team_members;
drop policy if exists "team_members modify admin"   on public.team_members;
drop policy if exists "team_members modify lead"    on public.team_members;

create policy "team_members select member"
  on public.team_members for select using (
    is_admin()
    or user_id = auth.uid()
    or exists (select 1 from public.team_members tm2 where tm2.user_id = auth.uid() and tm2.team_id = team_members.team_id)
    or exists (select 1 from public.teams t where t.lead_id = auth.uid() and t.id = team_members.team_id)
  );

create policy "team_members modify admin"
  on public.team_members for insert, update, delete using (is_admin()) with check (is_admin());

create policy "team_members modify lead"
  on public.team_members for insert, update, delete using (
    exists (select 1 from public.teams t where t.lead_id = auth.uid() and t.id = team_members.team_id)
  ) with check (
    exists (select 1 from public.teams t where t.lead_id = auth.uid() and t.id = team_members.team_id)
  );

-- ----------------------------------------------------------------------------
-- TASKS  (Admin + their-team leads; members act via task_assignments)
-- ----------------------------------------------------------------------------
drop policy if exists "tasks select admin"    on public.tasks;
drop policy if exists "tasks select lead"     on public.tasks;
drop policy if exists "tasks select assignee" on public.tasks;
drop policy if exists "tasks modify admin"    on public.tasks;
drop policy if exists "tasks modify lead"     on public.tasks;

create policy "tasks select admin"
  on public.tasks for select using (is_admin());

create policy "tasks select lead"
  on public.tasks for select using (
    exists (select 1 from public.teams t where t.id = tasks.team_id and t.lead_id = auth.uid())
  );

create policy "tasks select assignee"
  on public.tasks for select using (
    exists (select 1 from public.task_assignments ta where ta.task_id = tasks.id and ta.member_id = auth.uid())
  );

create policy "tasks modify admin"
  on public.tasks for insert, update, delete using (is_admin()) with check (is_admin());

create policy "tasks modify lead"
  on public.tasks for insert, update, delete using (
    exists (select 1 from public.teams t where t.id = tasks.team_id and t.lead_id = auth.uid())
  ) with check (
    exists (select 1 from public.teams t where t.id = tasks.team_id and t.lead_id = auth.uid())
  );

-- ----------------------------------------------------------------------------
-- TASK_ASSIGNMENTS
-- ----------------------------------------------------------------------------
drop policy if exists "task_assignments select admin"  on public.task_assignments;
drop policy if exists "task_assignments select lead"   on public.task_assignments;
drop policy if exists "task_assignments select member" on public.task_assignments;
drop policy if exists "task_assignments insert admin"  on public.task_assignments;
drop policy if exists "task_assignments insert lead"   on public.task_assignments;
drop policy if exists "task_assignments update own"    on public.task_assignments;
drop policy if exists "task_assignments update lead"   on public.task_assignments;
drop policy if exists "task_assignments delete admin"  on public.task_assignments;
drop policy if exists "task_assignments delete lead"   on public.task_assignments;

create policy "task_assignments select admin"
  on public.task_assignments for select using (is_admin());

create policy "task_assignments select lead"
  on public.task_assignments for select using (
    exists (select 1 from public.tasks tk join public.teams t on t.id = tk.team_id
            where tk.id = task_assignments.task_id and t.lead_id = auth.uid())
  );

create policy "task_assignments select member"
  on public.task_assignments for select using (member_id = auth.uid());

create policy "task_assignments insert admin"
  on public.task_assignments for insert with check (is_admin());

create policy "task_assignments insert lead"
  on public.task_assignments for insert with check (
    exists (select 1 from public.tasks tk join public.teams t on t.id = tk.team_id
            where tk.id = task_assignments.task_id and t.lead_id = auth.uid())
  );

-- A member may mark their OWN assignment complete.
create policy "task_assignments update own"
  on public.task_assignments for update using (member_id = auth.uid())
  with check (member_id = auth.uid());

create policy "task_assignments update lead"
  on public.task_assignments for update using (
    exists (select 1 from public.tasks tk join public.teams t on t.id = tk.team_id
            where tk.id = task_assignments.task_id and t.lead_id = auth.uid())
  );

create policy "task_assignments delete admin"
  on public.task_assignments for delete using (is_admin());

create policy "task_assignments delete lead"
  on public.task_assignments for delete using (
    exists (select 1 from public.tasks tk join public.teams t on t.id = tk.team_id
            where tk.id = task_assignments.task_id and (t.lead_id = auth.uid()))
  );

-- ----------------------------------------------------------------------------
-- TASK_ACTIVITY — read only for participants; no client writes.
-- ----------------------------------------------------------------------------
drop policy if exists "task_activity select participant" on public.task_activity;
create policy "task_activity select participant"
  on public.task_activity for select using (
    is_admin()
    or exists (select 1 from public.tasks tk join public.teams t on t.id = tk.team_id
               where tk.id = task_activity.task_id and t.lead_id = auth.uid())
    or exists (select 1 from public.task_assignments ta
               where ta.task_id = task_activity.task_id and ta.member_id = auth.uid())
  );

-- ----------------------------------------------------------------------------
-- NOTIFICATIONS — recipients + admin only
-- ----------------------------------------------------------------------------
drop policy if exists "notifications select owner"   on public.notifications;
drop policy if exists "notifications select admin"   on public.notifications;
drop policy if exists "notifications update owner"   on public.notifications;

create policy "notifications select owner"
  on public.notifications for select using (user_id = auth.uid());

create policy "notifications select admin"
  on public.notifications for select using (is_admin());

create policy "notifications update owner"
  on public.notifications for update using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ----------------------------------------------------------------------------
-- AUDIT_LOGS — admin read only; nobody writes from the client.
-- ----------------------------------------------------------------------------
drop policy if exists "audit_logs admin only" on public.audit_logs;
create policy "audit_logs admin only"
  on public.audit_logs for select using (is_admin());

-- ----------------------------------------------------------------------------
-- TEAM_SCHEDULE — authenticated users can read (portal schedule)
-- ----------------------------------------------------------------------------
drop policy if exists "team_schedule select authed" on public.team_schedule;
create policy "team_schedule select authed"
  on public.team_schedule for select using (auth.uid() is not null);

-- ============================================================================
-- TRIGGER FUNCTIONS (SECURITY DEFINER => bypass RLS/grants, clients can't forge)
-- ============================================================================

-- 1) Auto-create a profile row when a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, full_name, role, is_active, updated_at)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    'member',
    true,
    now()
  ) on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users for each row execute function public.handle_new_user();

-- 2) Audit + activity on tasks.
create or replace function public.task_audit_trigger()
returns trigger language plpgsql security definer as $$
begin
  if tg_op = 'INSERT' then
    perform public.audit_log(auth.uid(), 'task_created', null,
      jsonb_build_object('task_id', new.id, 'team_id', new.team_id));
    insert into public.task_activity (task_id, actor_id, action, to_status, created_at)
    values (new.id, auth.uid(), 'created', new.status, now());
  elsif tg_op = 'UPDATE' then
    if old.status is distinct from new.status or old.priority is distinct from new.priority then
      perform public.audit_log(auth.uid(), 'task_status_changed', null,
        jsonb_build_object('task_id', new.id, 'from_status', old.status, 'to_status', new.status));
      insert into public.task_activity (task_id, actor_id, action, from_status, to_status, created_at)
      values (new.id, auth.uid(), 'status_changed', old.status, new.status, now());
      if new.status = 'done' then
        insert into public.notifications (user_id, title, message, related_task_id, created_at)
        select ta.member_id, 'Task Completed',
               'Task "' || new.title || '" is marked complete.', new.id, now()
        from public.task_assignments ta where ta.task_id = new.id and ta.member_id <> auth.uid();
      end if;
    end if;
  end if;
  return new;
end;
$$;
drop trigger if exists task_audit on public.tasks;
create trigger task_audit
  after insert or update on public.tasks for each row execute function public.task_audit_trigger();

-- 3) New assignment -> activity + notify assignee.
create or replace function public.assignment_notify_trigger()
returns trigger language plpgsql security definer as $$
begin
  if tg_op = 'INSERT' then
    insert into public.task_activity (task_id, actor_id, action, created_at)
    values (new.task_id, auth.uid(), 'assigned', now());
    perform public.audit_log(auth.uid(), 'task_assigned', new.member_id,
      jsonb_build_object('task_id', new.task_id));
    insert into public.notifications (user_id, title, message, related_task_id, created_at)
    values (new.member_id, 'New Task Assigned', 'You were assigned a new task.', new.task_id, now());
  end if;
  return new;
end;
$$;
drop trigger if exists assignment_notify on public.task_assignments;
create trigger assignment_notify
  after insert on public.task_assignments for each row execute function public.assignment_notify_trigger();

-- 4) Member marks assignment complete -> activity + notify owner/lead.
create or replace function public.assignment_complete_trigger()
returns trigger language plpgsql security definer as $$
begin
  if tg_op = 'UPDATE' and old.completed is distinct from new.completed and new.completed then
    insert into public.task_activity (task_id, actor_id, action, created_at)
    values (new.task_id, auth.uid(), 'completed', now());
    perform public.audit_log(auth.uid(), 'task_completed', null, jsonb_build_object('task_id', new.task_id));
    insert into public.notifications (user_id, title, message, related_task_id, created_at)
    select tk.assigned_by, 'Task Completed',
           'Task "' || tk.title || '" was marked complete.', new.task_id, now()
    from public.tasks tk where tk.id = new.task_id and tk.assigned_by is not null and tk.assigned_by <> auth.uid();
  end if;
  return new;
end;
$$;
drop trigger if exists assignment_complete_audit on public.task_assignments;
create trigger assignment_complete_audit
  after update of completed on public.task_assignments for each row
  execute function public.assignment_complete_trigger();

-- 5) Profile role / active changes (client-side, via RLS) -> audit.
--    auth.uid() IS NULL for system/edge-function contexts; those are logged
--    explicitly by the admin-actions edge function instead.
create or replace function public.profile_audit_trigger()
returns trigger language plpgsql security definer as $$
begin
  if auth.uid() is not null then
    if old.is_active is distinct from new.is_active then
      perform public.audit_log(auth.uid(),
        case when new.is_active then 'user_reactivated' else 'user_deactivated' end,
        new.id, jsonb_build_object('is_active', new.is_active));
    end if;
    if old.role is distinct from new.role then
      perform public.audit_log(auth.uid(), 'role_changed', new.id,
        jsonb_build_object('from_role', old.role, 'to_role', new.role));
    end if;
  end if;
  return new;
end;
$$;
drop trigger if exists profile_audit on public.profiles;
create trigger profile_audit
  after update on public.profiles for each row execute function public.profile_audit_trigger();

-- 6) Team membership changes -> audit (team_members have no role col in trigger scope).
create or replace function public.team_members_audit_trigger()
returns trigger language plpgsql security definer as $$
begin
  if tg_op = 'INSERT' then
    perform public.audit_log(auth.uid(), 'team_membership_added', new.user_id,
      jsonb_build_object('team_id', new.team_id, 'role_in_team', new.role_in_team));
  elsif tg_op = 'DELETE' then
    perform public.audit_log(auth.uid(), 'team_membership_removed', old.user_id,
      jsonb_build_object('team_id', old.team_id, 'role_in_team', old.role_in_team));
  end if;
  return coalesce(new, old);
end;
$$;
drop trigger if exists team_members_audit on public.team_members;
create trigger team_members_audit
  after insert or delete on public.team_members for each row
  execute function public.team_members_audit_trigger();

-- ============================================================================
-- Bootstrap (run once, as admin, in the SQL editor):
--   update public.profiles set role = 'admin' where email = 'you@example.com';
-- ============================================================================
select 'team portal schema + rls loaded' as status;
