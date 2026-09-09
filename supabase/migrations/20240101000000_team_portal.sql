-- ============================================================================
-- NUCLEAR FIX: drop ALL policies on ALL tables, then rebuild cleanly
-- Run this in the Supabase SQL Editor
-- ============================================================================

-- 1. Drop EVERY policy on EVERY table (handles all dependencies)
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', r.policyname, r.schemaname, r.tablename);
  END LOOP;
END $$;

-- 2. NOW drop is_admin (no dependencies left)
drop function if exists public.is_admin() cascade;

-- 3. Restore permissions
grant update on public.profiles to public;

-- 4. ADD COLUMNS
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

-- 5. CREATE MISSING TABLES
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

-- 6. INDEXES
create index if not exists profiles_active_idx      on public.profiles (is_active);
create index if not exists teams_lead_idx           on public.teams (lead_id);
create index if not exists teams_active_idx         on public.teams (is_active);
create index if not exists team_members_user_idx    on public.team_members (user_id);
create index if not exists tasks_assigned_by_idx    on public.tasks (assigned_by);
create index if not exists tasks_priority_idx       on public.tasks (priority);
create index if not exists task_assignments_member_idx on public.task_assignments (member_id);
create index if not exists task_assignments_task_idx   on public.task_assignments (task_id);

-- 7. SIMPLE RLS (all tables open to authenticated users)
alter table public.profiles         enable row level security;
alter table public.teams            enable row level security;
alter table public.team_members     enable row level security;
alter table public.tasks            enable row level security;
alter table public.task_assignments enable row level security;
alter table public.notifications    enable row level security;
alter table public.task_activity    enable row level security;
alter table public.audit_logs       enable row level security;
alter table public.team_schedule    enable row level security;

-- All tables: authenticated users can read everything
create policy "open_read" on public.profiles         for select using (auth.uid() is not null);
create policy "open_read" on public.teams            for select using (auth.uid() is not null);
create policy "open_read" on public.team_members     for select using (auth.uid() is not null);
create policy "open_read" on public.tasks            for select using (auth.uid() is not null);
create policy "open_read" on public.task_assignments for select using (auth.uid() is not null);
create policy "open_read" on public.task_activity    for select using (auth.uid() is not null);
create policy "open_read" on public.audit_logs       for select using (auth.uid() is not null);
create policy "open_read" on public.team_schedule    for select using (auth.uid() is not null);

-- Notifications: owner only
create policy "notif_read"  on public.notifications for select using (user_id = auth.uid());
create policy "notif_write" on public.notifications for update using (user_id = auth.uid()) with check (user_id = auth.uid());

-- All tables: authenticated users can write (simple, permissive)
create policy "open_write" on public.profiles         for all using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "open_write" on public.teams            for all using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "open_write" on public.team_members     for all using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "open_write" on public.tasks            for all using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "open_write" on public.task_assignments for all using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "open_write" on public.task_activity    for all using (auth.uid() is not null) with check (auth.uid() is not null);

select 'nuclear fix complete' as status;
