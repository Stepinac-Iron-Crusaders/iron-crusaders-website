-- ============================================================================
-- FIX: create user via RPC function (no edge function needed)
-- Run this in the Supabase SQL Editor
-- ============================================================================

-- Enable pgcrypto for gen_salt/crypt
create extension if not exists "pgcrypto" with schema extensions;

-- 1. Drop ALL existing policies (clean slate)
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

-- Drop is_admin if it exists
drop function if exists public.is_admin() cascade;

-- Restore permissions
grant update on public.profiles to public;

-- 2. ADD COLUMNS
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

-- 3. CREATE MISSING TABLES
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

-- 4. INDEXES
create index if not exists profiles_active_idx      on public.profiles (is_active);
create index if not exists teams_lead_idx           on public.teams (lead_id);
create index if not exists teams_active_idx         on public.teams (is_active);
create index if not exists team_members_user_idx    on public.team_members (user_id);
create index if not exists tasks_assigned_by_idx    on public.tasks (assigned_by);
create index if not exists tasks_priority_idx       on public.tasks (priority);
create index if not exists task_assignments_member_idx on public.task_assignments (member_id);
create index if not exists task_assignments_task_idx   on public.task_assignments (task_id);

-- 5. RPC: Create member (runs as SECURITY DEFINER, bypasses RLS)
create or replace function public.create_member(
  p_email text,
  p_password text,
  p_full_name text default '',
  p_role text default 'member'
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  new_user_id uuid;
  result jsonb;
begin
  -- Create auth user
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
    crypt(p_password, extensions.gen_salt('bf')),
    now(),
    jsonb_build_object('full_name', p_full_name),
    now(),
    now(),
    '',
    ''
  );

  -- Create profile
  insert into public.profiles (id, email, full_name, role, is_active, created_at)
  values (new_user_id, p_email, p_full_name, p_role, true, now())
  on conflict (id) do update set
    email = excluded.email,
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

-- 6. RPC: Set member password
create or replace function public.set_member_password(
  p_user_id uuid,
  p_password text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update auth.users
  set encrypted_password = crypt(p_password, extensions.gen_salt('bf')),
      updated_at = now()
  where id = p_user_id;
end;
$$;

-- 7. RPC: Toggle member active
create or replace function public.toggle_member_active(
  p_user_id uuid,
  p_active boolean
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
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

-- 8. RPC: Set member role
create or replace function public.set_member_role(
  p_user_id uuid,
  p_role text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
  set role = p_role, updated_at = now()
  where id = p_user_id;
end;
$$;

-- 9. SIMPLE RLS
alter table public.profiles         enable row level security;
alter table public.teams            enable row level security;
alter table public.team_members     enable row level security;
alter table public.tasks            enable row level security;
alter table public.task_assignments enable row level security;
alter table public.notifications    enable row level security;
alter table public.task_activity    enable row level security;
alter table public.audit_logs       enable row level security;
alter table public.team_schedule    enable row level security;

create policy "open" on public.profiles         for all using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "open" on public.teams            for all using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "open" on public.team_members     for all using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "open" on public.tasks            for all using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "open" on public.task_assignments for all using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "open" on public.task_activity    for all using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "open" on public.audit_logs       for all using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "open" on public.team_schedule    for all using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "notif_read"  on public.notifications for select using (user_id = auth.uid());
create policy "notif_write" on public.notifications for all using (user_id = auth.uid()) with check (user_id = auth.uid());

select 'fix complete with RPC functions' as status;
