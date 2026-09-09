-- ============================================================================
-- FIX: undo broken migration + apply clean schema
-- Run this in the Supabase SQL Editor
-- ============================================================================

-- 1. DROP broken policies and functions
drop policy if exists "profiles select self"      on public.profiles;
drop policy if exists "profiles select admin"     on public.profiles;
drop policy if exists "profiles select teammates" on public.profiles;
drop policy if exists "profiles update self name" on public.profiles;
drop policy if exists "profiles update admin"     on public.profiles;
drop policy if exists "profiles delete admin"     on public.profiles;

drop policy if exists "teams select member" on public.teams;
drop policy if exists "teams insert admin" on public.teams;
drop policy if exists "teams update admin" on public.teams;
drop policy if exists "teams delete admin" on public.teams;

drop policy if exists "team_members select member" on public.team_members;
drop policy if exists "team_members insert admin" on public.team_members;
drop policy if exists "team_members update admin" on public.team_members;
drop policy if exists "team_members delete admin" on public.team_members;

drop policy if exists "tasks select admin"    on public.tasks;
drop policy if exists "tasks select lead"     on public.tasks;
drop policy if exists "tasks select assignee" on public.tasks;
drop policy if exists "tasks insert admin" on public.tasks;
drop policy if exists "tasks update admin" on public.tasks;
drop policy if exists "tasks delete admin" on public.tasks;

drop policy if exists "audit_logs admin only" on public.audit_logs;
drop policy if exists "team_schedule select authed" on public.team_schedule;

drop function if exists public.is_admin();

-- 2. Revoke the revoke (restore default permissions)
grant update on public.profiles to public;

-- 3. ADD COLUMNS (idempotent)
alter table public.profiles
  add column if not exists is_active boolean not null default true,
  add column if not exists updated_at timestamptz;

alter table public.teams
  add column if not exists lead_id uuid references public.profiles(id),
  add column if not exists description text,
  add column if not exists is_active boolean not null default true,
  add column if not exists updated_at timestamptz;

alter table public.team_members
  add column if not exists role_in_team text not null default 'member',
  add column if not exists joined_at timestamptz default now();

alter table public.tasks
  add column if not exists priority text not null default 'medium',
  add column if not exists assigned_by uuid references public.profiles(id),
  add column if not exists is_active boolean not null default true,
  add column if not exists updated_at timestamptz;

-- 4. CREATE MISSING TABLES
create table if not exists public.task_assignments (
  id           bigint generated always as identity primary key,
  task_id      bigint not null references public.tasks(id) on delete cascade,
  member_id    uuid not null references public.profiles(id) on delete cascade,
  completed    boolean not null default false,
  completed_at timestamptz,
  assigned_at  timestamptz default now()
);

create table if not exists public.notifications (
  id              bigint generated always as identity primary key,
  user_id         uuid not null references public.profiles(id) on delete cascade,
  title           text not null,
  message         text,
  read            boolean not null default false,
  related_task_id bigint,
  created_at      timestamptz not null default now()
);

create table if not exists public.task_activity (
  id          bigint generated always as identity primary key,
  task_id     bigint references public.tasks(id),
  actor_id    uuid references public.profiles(id),
  action      text not null,
  from_status text,
  to_status   text,
  created_at  timestamptz not null default now()
);

-- 5. INDEXES
create index if not exists profiles_active_idx      on public.profiles (is_active);
create index if not exists teams_lead_idx           on public.teams (lead_id);
create index if not exists teams_active_idx         on public.teams (is_active);
create index if not exists team_members_user_idx    on public.team_members (user_id);
create index if not exists tasks_assigned_by_idx    on public.tasks (assigned_by);
create index if not exists tasks_priority_idx       on public.tasks (priority);
create index if not exists task_assignments_member_idx on public.task_assignments (member_id);
create index if not exists task_assignments_task_idx   on public.task_assignments (task_id);

-- 6. SIMPLE RLS (no helper functions, no column-level grants)
alter table public.task_assignments enable row level security;
alter table public.notifications    enable row level security;
alter table public.task_activity    enable row level security;

drop policy if exists "ta_select" on public.task_assignments;
create policy "ta_select" on public.task_assignments for select using (auth.uid() is not null);
drop policy if exists "ta_insert" on public.task_assignments;
create policy "ta_insert" on public.task_assignments for insert with check (auth.uid() is not null);
drop policy if exists "ta_update" on public.task_assignments;
create policy "ta_update" on public.task_assignments for update using (auth.uid() is not null) with check (auth.uid() is not null);
drop policy if exists "ta_delete" on public.task_assignments;
create policy "ta_delete" on public.task_assignments for delete using (auth.uid() is not null);

drop policy if exists "notif_select" on public.notifications;
create policy "notif_select" on public.notifications for select using (user_id = auth.uid());
drop policy if exists "notif_update" on public.notifications;
create policy "notif_update" on public.notifications for update using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "ta_activity_select" on public.task_activity;
create policy "ta_activity_select" on public.task_activity for select using (auth.uid() is not null);

select 'fix complete - site should work now' as status;
