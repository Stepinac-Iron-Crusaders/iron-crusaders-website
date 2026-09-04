import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedPage } from "../components/AnimatedPage";
import { supabase } from "../lib/supabase";

export default function TeamLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        navigate("/team", { replace: true });
      }
    };

    checkSession();
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    navigate("/team", { replace: true });
  };

  return (
    <AnimatedPage>
      <section className="min-h-[calc(100vh-80px)] bg-zinc-950 px-4 py-20">
        <div className="mx-auto max-w-md">

          <div className="mb-8 text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-red-600" />

              <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-red-500">
                Iron Crusaders
              </span>

              <span className="h-px w-8 bg-red-600" />
            </div>

            <h1 className="text-4xl font-black uppercase tracking-tight text-white">
              Team Login
            </h1>

            <p className="mt-3 text-sm text-zinc-500">
              Team members only
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="border border-zinc-800 bg-zinc-900 p-6"
          >
            <div className="space-y-5">

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-400"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-red-600"
                  placeholder="team member email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-400"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-red-600"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Sign In →"}
              </button>

            </div>
          </form>

        </div>
      </section>
    </AnimatedPage>
  );
}
