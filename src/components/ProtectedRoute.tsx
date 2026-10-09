import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type Props = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

// Shown when the user IS authenticated but cannot proceed. Previously this was
// lumped in with "not signed in" and redirected back to the login screen, so a
// valid account with a missing/disabled profile just bounced in a loop with no
// explanation.
function AccessBlocked({
  title,
  message,
  onSignOut,
  signingOut,
}: {
  title: string;
  message: string;
  onSignOut: () => void;
  signingOut: boolean;
}) {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-zinc-950 px-4 py-16">
      <div className="w-full max-w-md border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
        <h1 className="text-xl font-black uppercase tracking-[-0.02em] text-white">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{message}</p>
        <button
          type="button"
          onClick={onSignOut}
          disabled={signingOut}
          className="mt-6 w-full bg-red-600 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {signingOut ? "Signing Out..." : "Sign Out"}
        </button>
      </div>
    </div>
  );
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { user, profile, role, isActive, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-zinc-950">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin border-2 border-zinc-700 border-t-red-600" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-zinc-500">
            Verifying Access
          </p>
        </div>
      </div>
    );
  }

  // Not signed in at all -> back to the login form.
  if (!user) {
    return (
      <Navigate
        to="/team/portal/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Signed in, but the account is disabled.
  if (!isActive) {
    return (
      <AccessBlocked
        title="Account Deactivated"
        message="Your portal access has been turned off. If you think this is a mistake, ask a team administrator to reactivate your account."
        onSignOut={() => void signOut()}
        signingOut={false}
      />
    );
  }

  // Signed in, but no profile row. Two ways to get here:
  //  - the handle_new_user trigger is missing, so signups never got a profile;
  //  - an older account predates the trigger and was never backfilled.
  // Both are fixed by running migration 20240101000001, which creates the
  // trigger and backfills the missing rows.
  if (!profile) {
    return (
      <AccessBlocked
        title="No Profile Found"
        message="You're signed in, but your account has no team profile, so the portal can't load your role. This is usually a database setup issue rather than anything you did — run supabase/migrations/20240101000001_fix_login_and_rls.sql in the Supabase SQL Editor to create the missing trigger and backfill your profile."
        onSignOut={() => void signOut()}
        signingOut={false}
      />
    );
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to the correct dashboard for the user's role
    const redirect =
      role === "admin"
        ? "/team/portal/admin"
        : role === "team_lead"
          ? "/team/portal/lead"
          : "/team/portal/member";
    return <Navigate to={redirect} replace />;
  }

  return <>{children}</>;
}