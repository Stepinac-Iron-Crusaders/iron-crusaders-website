# Iron Crusaders Team Portal — Setup Guide

## Prerequisites
- [Node.js](https://nodejs.org/) v18+
- A [Supabase](https://supabase.com/) project (the existing project is already configured in `.env.local`)

## 1. Run the SQL Migration

Open your Supabase Dashboard → **SQL Editor** and paste the contents of:

```
supabase/migrations/20240101000000_team_portal.sql
```

Click **Run**. This will:
- Add missing columns to existing tables (`profiles`, `teams`, `tasks`, `task_assignments`, etc.)
- Create new tables (`audit_logs`, `notifications`)
- Set up Row Level Security policies for all tables
- Create `handle_new_user` trigger (auto-creates a profile on signup)
- Create audit + notification triggers (SECURITY DEFINER)

## 2. Bootstrap the First Admin

After running the migration, sign up for an account through the portal login page. Then run this SQL in the Supabase SQL Editor to make yourself an admin:

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

Refresh the portal — you should now see the Admin Dashboard.

## 3. (Optional) Deploy the Admin Edge Function

The admin actions (create user, set password, ban/unban, set role) require the `admin-actions` edge function to be deployed because they need `service_role` privileges. The frontend calls this via `supabase.functions.invoke("admin-actions", ...)`.

If you don't deploy this edge function, the following features will show errors:
- Creating users from the admin panel
- Toggling active/inactive
- Setting roles
- Sending password reset links via admin

The **forgot password** link on the login page works without the edge function (uses `supabase.auth.resetPasswordForEmail` directly).

To deploy the edge function:

```bash
npx supabase functions deploy admin-actions
```

You'll need to be logged into Supabase CLI first:

```bash
npx supabase login
```

## 4. Development

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:5173/` (or the port Vite picks).

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
- **ProtectedRoute**: Checks session + profile + `is_active` + role. Disabled users are blocked. Wrong-role users are redirected to their correct dashboard.

## Architecture Notes

- **Supabase client**: `src/lib/supabaseClient.ts` (canonical, typed)
- **Auth**: `src/contexts/AuthContext.tsx` — session + profile (role, is_active) loaded from DB on every auth state change. **No localStorage roles** — the DB is the source of truth.
- **Data helpers**: `src/lib/db.ts` — wraps all Supabase queries (members, teams, tasks, assignments, notifications, audit)
- **Edge function**: `supabase/functions/admin-actions/index.ts` — Deno function that uses service_role to perform admin auth operations
- **Portal components**: `src/components/portal/` — shared UI (Sidebar, TopBar, DashboardLayout, StatusBadge, PriorityBadge, Modal, ConfirmDialog, EmptyState, StatCard, TaskCard)

## Security

- RLS is **enabled on every table** — no data is exposed without proper policies
- Column-level `GRANT` prevents `profiles.role` and `profiles.is_active` from being updated by the `authenticated` role (only the edge function with `service_role` can change them)
- `handle_new_user` trigger is `SECURITY DEFINER` — runs with DB owner privileges, immune to RLS
- Audit log triggers fire on every INSERT/UPDATE/DELETE — non-destructive, tamper-proof
