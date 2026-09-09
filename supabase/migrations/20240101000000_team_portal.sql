-- ============================================================================
-- Minimal migration: add missing columns + create missing tables
-- ============================================================================

-- ADD COLUMNS to existing tables
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

-- CREATE MISSING TABLES
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

-- INDEXES
create index if not exists profiles_active_idx      on public.profiles (is_active);
create index if not exists teams_lead_idx           on public.teams (lead_id);
create index if not exists teams_active_idx         on public.teams (is_active);
create index if not exists team_members_user_idx    on public.team_members (user_id);
create index if not exists tasks_assigned_by_idx    on public.tasks (assigned_by);
create index if not exists tasks_priority_idx       on public.tasks (priority);
create index if not exists task_assignments_member_idx on public.task_assignments (member_id);
create index if not exists task_assignments_task_idx   on public.task_assignments (task_id);

-- COLUMN-LEVEL SECURITY
revoke update on public.profiles from public;
grant update (full_name, updated_at) on public.profiles to authenticated;

-- HELPER FUNCTION
create or replace function public.is_admin()
returns boolean language sql stable as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin' and is_active = true
  );
$$;

-- RLS
alter table public.profiles         enable row level security;
alter table public.teams            enable row level security;
alter table public.team_members     enable row level security;
alter table public.tasks            enable row level security;
alter table public.task_assignments enable row level security;
alter table public.task_activity    enable row level security;
alter table public.notifications    enable row level security;
alter table public.audit_logs       enable row level security;
alter table public.team_schedule    enable row level security;

-- PROFILES
drop policy if exists "profiles select self"      on public.profiles;
drop policy if exists "profiles select admin"     on public.profiles;
drop policy if exists "profiles select teammates" on public.profiles;
drop policy if exists "profiles update self name" on public.profiles;
drop policy if exists "profiles update admin"     on public.profiles;
drop policy if exists "profiles delete admin"     on public.profiles;

create policy "profiles select self"      on public.profiles for select using (id = auth.uid());
create policy "profiles select admin"     on public.profiles for select using (is_admin());
create policy "profiles select teammates" on public.profiles for select using (
  exists (select 1 from public.team_members tm_self
    join public.team_members tm_other on tm_self.team_id = tm_other.team_id
    where tm_self.user_id = auth.uid() and tm_other.user_id = profiles.id)
);
create policy "profiles update self name" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy "profiles update admin"     on public.profiles for update using (is_admin()) with check (is_admin());
create policy "profiles delete admin"     on public.profiles for delete using (is_admin());

-- TEAMS
drop policy if exists "teams select member" on public.teams;
create policy "teams select member" on public.teams for select using (
  is_active = true and (is_admin()
    or exists (select 1 from public.team_members tm where tm.user_id = auth.uid() and tm.team_id = teams.id))
);
create policy "teams insert admin" on public.teams for insert with check (is_admin());
create policy "teams update admin" on public.teams for update using (is_admin()) with check (is_admin());
create policy "teams delete admin" on public.teams for delete using (is_admin());

-- TEAM_MEMBERS
drop policy if exists "team_members select member" on public.team_members;
create policy "team_members select member" on public.team_members for select using (
  is_admin() or user_id = auth.uid()
  or exists (select 1 from public.team_members tm2 where tm2.user_id = auth.uid() and tm2.team_id = team_members.team_id)
  or exists (select 1 from public.teams t where t.lead_id = auth.uid() and t.id = team_members.team_id)
);
create policy "team_members insert admin" on public.team_members for insert with check (is_admin());
create policy "team_members update admin" on public.team_members for update using (is_admin()) with check (is_admin());
create policy "team_members delete admin" on public.team_members for delete using (is_admin());

-- TASKS
drop policy if exists "tasks select admin"    on public.tasks;
drop policy if exists "tasks select lead"     on public.tasks;
drop policy if exists "tasks select assignee" on public.tasks;
create policy "tasks select admin"    on public.tasks for select using (is_admin());
create policy "tasks select lead"     on public.tasks for select using (
  exists (select 1 from public.teams t where t.id = tasks.team_id and t.lead_id = auth.uid())
);
create policy "tasks select assignee" on public.tasks for select using (
  exists (select 1 from public.task_assignments ta where ta.task_id = tasks.id and ta.member_id = auth.uid())
);
create policy "tasks insert admin" on public.tasks for insert with check (is_admin());
create policy "tasks update admin" on public.tasks for update using (is_admin()) with check (is_admin());
create policy "tasks delete admin" on public.tasks for delete using (is_admin());

-- TASK_ASSIGNMENTS
drop policy if exists "task_assignments select admin"   on public.task_assignments;
drop policy if exists "task_assignments select member"  on public.task_assignments;
create policy "task_assignments select admin"   on public.task_assignments for select using (is_admin());
create policy "task_assignments select member"  on public.task_assignments for select using (member_id = auth.uid());
create policy "task_assignments insert admin"   on public.task_assignments for insert with check (is_admin());
create policy "task_assignments update own"     on public.task_assignments for update using (member_id = auth.uid()) with check (member_id = auth.uid());
create policy "task_assignments delete admin"   on public.task_assignments for delete using (is_admin());

-- NOTIFICATIONS
drop policy if exists "notifications select owner" on public.notifications;
drop policy if exists "notifications select admin" on public.notifications;
drop policy if exists "notifications update owner" on public.notifications;
create policy "notifications select owner" on public.notifications for select using (user_id = auth.uid());
create policy "notifications select admin" on public.notifications for select using (is_admin());
create policy "notifications update owner" on public.notifications for update using (user_id = auth.uid()) with check (user_id = auth.uid());

-- AUDIT_LOGS
drop policy if exists "audit_logs admin only" on public.audit_logs;
create policy "audit_logs admin only" on public.audit_logs for select using (is_admin());

-- TEAM_SCHEDULE
drop policy if exists "team_schedule select authed" on public.team_schedule;
create policy "team_schedule select authed" on public.team_schedule for select using (auth.uid() is not null);

-- TRIGGERS
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, full_name, role, is_active, updated_at)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email), 'member', true, now())
  on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users for each row execute function public.handle_new_user();

create or replace function public.assignment_notify_trigger()
returns trigger language plpgsql security definer as $$
begin
  if tg_op = 'INSERT' then
    insert into public.notifications (user_id, title, message, related_task_id, created_at)
    values (new.member_id, 'New Task Assigned', 'You were assigned a new task.', new.task_id, now());
  end if;
  return new;
end;
$$;
drop trigger if exists assignment_notify on public.task_assignments;
create trigger assignment_notify
  after insert on public.task_assignments for each row execute function public.assignment_notify_trigger();

select 'migration complete' as status;
