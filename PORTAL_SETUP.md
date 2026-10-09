# Iron Crusaders Team Portal — Setup Guide

## Prerequisites
- [Node.js](https://nodejs.org/) v18+
- A [Supabase](https://supabase.com/) project

## 0. Configure Environment Variables

The portal needs two env vars at **build time**. Copy the example file and fill
in real values:

```bash
cp .env.example .env.local
```

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

`.env.local` is gitignored and is **not** present in a fresh clone — commit
`fe9d892` deliberately stopped tracking it. If you skip this step the app still
boots, but `supabaseClient.ts` falls back to a placeholder client and the
login page renders a "Portal Not Configured" banner with the form disabled,
because every request would go to a nonexistent host.

`VITE_SUPABASE_PUBLISHABLE_KEY` is the publishable (anon) key and is safe in the
browser — RLS is what protects the data. Never put `service_role` in here.

For GitHub Pages, `.github/workflows/deploy.yml` injects both vars from repo
secrets (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`) at build time, so
production gets a real client without a local file.

## 1. Run the SQL Migrations

Open your Supabase Dashboard → **SQL Editor** and run these **in order**:

1. `supabase/migrations/20240101000000_team_portal.sql`
2. `supabase/migrations/20240101000001_fix_login_and_rls.sql`

The second file is required, not optional. It:

- Creates the `handle_new_user` trigger so every `auth.users` row gets a
  matching `profiles` row. Without it, accounts authenticate successfully and
  are then bounced straight back to the login screen (`ProtectedRoute` requires
  a profile).
- Backfills `profiles` for any account created while the trigger was missing.
- Recreates `is_admin()` and gates the `create_member` / `set_member_password` /
  `toggle_member_active` / `set_member_role` RPCs behind an admin check.
- Replaces the blanket `profiles` UPDATE policy from migration 000000 with
  self-only updates, and column-blocks `role` / `is_active`.
- Sets up RLS on all tables.

## 2. Bootstrap the First Admin

**There is no sign-up form on the portal.** Accounts are provisioned by an
administrator, and the very first one has to be created outside the portal.

Do **not** try to bootstrap via `create_member` — it gates on `is_admin()`,
which reads `auth.uid()` from the caller's JWT. That is `NULL` in the SQL Editor
just as it is for a logged-out browser, so the call fails with `admin privileges
required` either way. (`SECURITY DEFINER` affects privilege checking, not JWT
context.) Migration `000001` adds a dedicated `bootstrap_first_admin()` for this.

### Option A — the bootstrap function (recommended, one step)

Supabase Dashboard → **SQL Editor**:

```sql
select public.bootstrap_first_admin(
  'you@example.com',
  'choose-a-strong-password',
  'Your Name'
);
```

It creates the confirmed auth user *and* the admin profile. It refuses to run
once an active admin exists, and the frontend has no execute grant on it, so
after this one call it's inert — use the admin panel for everyone else.

### Option B — Dashboard UI, then promote

1. Supabase Dashboard → **Authentication** → **Users** → **Add user**.
   Set an email + password and confirm. The dashboard creates *confirmed*
   users, so they can sign in straight away.
2. If you have run migration `000001`, the `handle_new_user` trigger already
   created their profile with `role = 'member'`. Promote it:

   ```sql
   update public.profiles
   set role = 'admin'
   where email = 'you@example.com';
   ```

   If the trigger isn't there yet, insert the profile by hand:

   ```sql
   insert into public.profiles (id, email, full_name, role, is_active, created_at)
   select id, email, coalesce(raw_user_meta_data->>'full_name',''),
          'admin', true, now()
   from auth.users
   where email = 'you@example.com'
   on conflict (id) do update set role = 'admin';
   ```

Then sign in at `/#/team/portal/login` and you should land on the Admin
Dashboard.

## 3. (Optional) Deploy the Admin Edge Function

Admin actions (create user, set password, ban/unban, set role) work through the
`admin-action` RPCs in `src/lib/db.ts` without any edge function.

The `admin-actions` edge function (`supabase/functions/admin-actions/index.ts`)
does the same operations via the `service_role` key and additionally writes
audit log rows. Deploy it if you want the audit trail:

```bash
npx supabase login
npx supabase functions deploy admin-actions
```

It needs `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` and
`SUPABASE_SERVICE_ROLE_KEY` set in Supabase → Functions → Settings.

The **forgot password** link on the login page works on its own — it calls
`supabase.auth.resetPasswordForEmail` directly and needs no backend.

## 4. Development

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:5173/` (or the port Vite picks).
The portal lives at `/#/team/portal/login`.

## 5. Build

```bash
npm run build
```

Output goes to `dist/`.

## Role-Based Dashboard Routing

| Role | Dashboard Path | Description |
|------|---------------|-------------|
| `admin` | `/#/team/portal/admin` | Manage members, teams, activity logs |
| `team_lead` | `/#/team/portal/lead` | Manage tasks, view team members |
| `member` | `/#/team/portal/member` | View/complete assigned tasks, schedule, notifications |

- **Floating button** (bottom-right): Shows on every page. Clicking it routes to the appropriate dashboard based on the user's role, or to the login page if not authenticated.
- **ProtectedRoute**: Checks session, then reports each failure state
  distinctly instead of redirecting — signed out goes to the login page,
  deactivated and missing-profile render an explanatory screen with a Sign Out
  button. Wrong-role users are redirected to their correct dashboard.

## Troubleshooting

| Symptom | Cause |
|---|---|
| "Portal Not Configured" banner | Missing `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY`. See step 0. |
| "No Profile Found" screen after a successful sign-in | `handle_new_user` trigger is missing. Run migration `20240101000001`. |
| "Account Deactivated" screen | An admin set `is_active = false`, which also sets `auth.users.banned_until`. |
| Sign-in works then returns to the login page | Stale session/profile race — make sure you're on the current `TeamLogin.tsx`, which awaits the profile load before navigating. |
| Admin RPCs return `admin privileges required` | Expected for non-admins after migration `20240101000001`. For the *first* admin use `bootstrap_first_admin()` — see step 2. |
| `bootstrap_first_admin` says an active admin already exists | Working as intended. Create further accounts from the Admin Dashboard instead. |

## Architecture Notes

- **Supabase client**: `src/lib/supabaseClient.ts` (canonical, typed). Exports
  `isConfigured` so the UI can detect an unconfigured build.
- **Auth**: `src/contexts/AuthContext.tsx` — session + profile (role, is_active) loaded from DB on every auth state change. **No localStorage roles** — the DB is the source of truth.
- **Data helpers**: `src/lib/db.ts` — wraps all Supabase queries (members, teams, tasks, assignments, notifications, audit)
- **Edge function**: `supabase/functions/admin-actions/index.ts` — Deno function that uses service_role to perform admin auth operations
- **Portal components**: `src/components/portal/` — shared UI (Sidebar, TopBar, DashboardLayout, StatusBadge, PriorityBadge, Modal, ConfirmDialog, EmptyState, StatCard, TaskCard)

## Security

- RLS is **enabled on every table**
- `handle_new_user` trigger is `SECURITY DEFINER` — immune to RLS. It hardcodes
  `role = 'member'`, so a signup can never grant itself elevated access.
- Admin RPCs are `SECURITY DEFINER` but each verifies `is_admin()` first, and
  `anon` has no execute grant on them.
- `profiles.role` and `profiles.is_active` are column-blocked for
  `authenticated`: members may only update `full_name`, and only on their own
  row. Role changes go through the gated RPCs or the `service_role` edge
  function.
- **Known gap:** the remaining tables (`teams`, `tasks`, `team_members`,
  `audit_logs`, …) still use the permissive "open" policies from migration
  000000 — any authenticated user can read and write all of them. Fine for a
  small trusted team portal; tighten with role-scoped policies if that changes.