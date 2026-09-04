import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { AnimatedPage } from "../components/AnimatedPage";

export default function TeamLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkExistingSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        navigate("/team/portal/dashboard", { replace: true });
      }
    };

    checkExistingSession();
  }, [navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    const from =
      (location.state as { from?: { pathname?: string } } | null)?.from
        ?.pathname || "/team/portal/dashboard";

    navigate(from, { replace: true });
  };

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
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-red-600"
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
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-red-600"
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

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
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
    </AnimatedPage>
  );
}
