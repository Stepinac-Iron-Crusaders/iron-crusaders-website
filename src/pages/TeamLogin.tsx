import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase, isConfigured } from "../lib/supabaseClient";
import { useAuth, useRoleDashboardPath } from "../contexts/AuthContext";
import { AnimatedPage } from "../components/AnimatedPage";

export default function TeamLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  // Use the context signIn() rather than calling supabase directly: it awaits
  // the profile/teams load before resolving, so ProtectedRoute won't render
  // once with a null user and bounce straight back to this page.
  const { signIn, user, loading: authLoading } = useAuth();
  const roleDashboardPath = useRoleDashboardPath();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Forgot password state
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMsg, setResetMsg] = useState("");

  // Honour an explicit redirect target when the user was bounced here from a
  // protected page. Otherwise land on the dashboard for their role, which is
  // what the floating portal button and the docs both do.
  const redirectTarget = () => {
    const from = (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname;
    if (from && from !== "/team/portal/login") return from;
    return roleDashboardPath;
  };

  // Already signed in (fresh session, or a bounce back from ProtectedRoute).
  useEffect(() => {
    if (!authLoading && user) {
      navigate(redirectTarget(), { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      console.error("Supabase login error:", signInError);
      setError(signInError.message);
      setLoading(false);
      return;
    }

    navigate(redirectTarget(), { replace: true });
  };

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setResetMsg("");
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      resetEmail.trim(),
      { redirectTo: `${window.location.origin}/#/team/portal/login` },
    );
    if (resetError) {
      setResetMsg(resetError.message ?? "Failed to send reset link.");
    } else {
      setResetMsg("Check your email for a password reset link.");
    }
    setResetLoading(false);
  };

  const disabled = !isConfigured || loading;

  return (
    <AnimatedPage>
      <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-zinc-950 px-4 py-16">
        {/* Top accent */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent"
        />

        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.04] blur-3xl"
        />

        <div className="relative w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-red-600" />

              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-red-500">
                Iron Crusaders
              </span>

              <span className="h-px w-8 bg-red-600" />
            </div>

            <h1 className="text-4xl font-black uppercase tracking-[-0.03em] text-white">
              Team Portal
            </h1>

            <p className="mt-3 text-sm text-zinc-500">
              Sign in to access team schedules and resources.
            </p>
          </div>

          {/* Login card */}
          <div className="border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
            {/* Missing Supabase config: say so plainly instead of letting the
                submit button fail against the placeholder client. */}
            {!isConfigured && (
              <div className="mb-6 border border-amber-700/60 bg-amber-950/20 px-4 py-3">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-amber-400">
                  Portal Not Configured
                </p>
                <p className="mt-2 text-xs leading-relaxed text-amber-200/80">
                  This build is missing its Supabase credentials, so sign-in is
                  disabled. Copy <code className="text-amber-300">.env.example</code>{" "}
                  to <code className="text-amber-300">.env.local</code> and fill in{" "}
                  <code className="text-amber-300">VITE_SUPABASE_URL</code> and{" "}
                  <code className="text-amber-300">VITE_SUPABASE_PUBLISHABLE_KEY</code>,
                  then restart the dev server.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-500"
                >
                  Team Email
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={!isConfigured}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-500"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  disabled={!isConfigured}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="border border-red-900/60 bg-red-950/30 px-4 py-3">
                  <p className="font-mono text-xs text-red-400">
                    {error}
                  </p>
                </div>
              )}

              {/* Forgot password */}
              <div className="text-right">
                <button
                  type="button"
                  disabled={!isConfigured}
                  onClick={() => {
                    setShowForgot(true);
                    setResetEmail(email);
                    setResetMsg("");
                  }}
                  className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-600 transition-colors hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={disabled}
                className="w-full bg-red-600 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing In..." : "Sign In →"}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 border-t border-zinc-800 pt-5 text-center">
              <p className="font-mono text-[10px] uppercase tracking-wide text-zinc-600">
                Authorized team members only
              </p>
            </div>
          </div>

          {/* Back */}
          <div className="mt-6 text-center">
            <Link
              to="/team"
              className="font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-600 transition-colors hover:text-white"
            >
              ← Back to Team
            </Link>
          </div>
        </div>
      </section>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowForgot(false)} />
          <div className="relative w-full max-w-md border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-white">Reset Password</h3>
              <button type="button" onClick={() => setShowForgot(false)} className="text-zinc-500 hover:text-white">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4l8 8M12 4l-8 8" /></svg>
              </button>
            </div>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label htmlFor="reset-email" className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-500">
                  Your Email
                </label>
                <input
                  id="reset-email"
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-red-600"
                  placeholder="you@example.com"
                />
              </div>

              {resetMsg && (
                <div className="border border-zinc-800 bg-zinc-950 px-4 py-3">
                  <p className="font-mono text-xs text-zinc-400">{resetMsg}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full bg-red-600 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {resetLoading ? "Sending..." : "Send Reset Link →"}
              </button>
            </form>
          </div>
        </div>
      )}
    </AnimatedPage>
  );
}