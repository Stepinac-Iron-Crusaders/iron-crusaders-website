import { useState } from "react";
import { AnimatedPage } from "../components/AnimatedPage";
import { Link } from "react-router-dom";
import { useForm, ValidationError } from "@formspree/react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [state, handleSubmit] = useForm("xgaeojzy");

  return (
        <AnimatedPage>
<>
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="text-zinc-700">/</span>
            <Link to="/newsletter" className="hover:text-white">Newsletter</Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-300">Signup</span>
          </div>
          <div className="mt-6 max-w-xl">
            <h1 className="text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[48px]">Newsletter Signup</h1>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">All that is required is an email address and we’ll add you to the monthly list. No spam, unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <section className="bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8">
          <div className="mx-auto max-w-md border border-zinc-800 bg-zinc-950 p-6 lg:p-8">
            <h2 className="text-xs font-black uppercase tracking-[0.12em] text-white">Enter your email</h2>

            {state.succeeded ? (
              <div className="mt-6 border border-emerald-900 bg-emerald-950/30 p-6 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center bg-emerald-600 text-white">✓</div>
                <h3 className="mt-3 text-sm font-bold text-white">You’re on the list!</h3>
                <p className="mt-2 text-sm text-zinc-400">Thanks for signing up — you’ll get the next issue first Monday of the month.</p>
                <Link to="/newsletter" className="mt-4 inline-flex border border-zinc-700 bg-zinc-900 px-5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800">Back to Newsletter →</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">Email *</span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="mt-1 w-full border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-red-600"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-xs text-red-400" />
                </label>

                {/* Formspree magic: _subject sets email subject, message is the content — we mirror email */}
                <input type="hidden" name="_subject" value="Newsletter signup" />
                <input type="hidden" name="message" value={email} />

                <ValidationError errors={state.errors} className="text-xs text-red-400" />

                <button type="submit" disabled={state.submitting} className="w-full bg-red-600 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-red-700 disabled:opacity-60">
                  {state.submitting ? "Sending…" : "Subscribe →"}
                </button>
                <p className="text-center font-mono text-[11px] text-zinc-500">Powered by Formspree • <Link to="/newsletter" className="underline hover:text-white">Back</Link></p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
    </AnimatedPage>
  );
}
