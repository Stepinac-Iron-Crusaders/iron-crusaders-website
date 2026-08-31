import { Link } from "react-router-dom";

export default function Newsletter() {
  return (
    <>
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-300">Newsletter</span>
          </div>
          <div className="mt-6 max-w-3xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-red-600" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-red-500">Monthly • 1,200+ subscribers</span>
            </div>
            <h1 className="text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[52px]">Newsletter</h1>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">Build logs, match film notes, and outreach recaps — straight from student leads. No spam, unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-10 lg:px-8 lg:py-14">
          <div className="mx-auto max-w-2xl">
            <div className="border border-zinc-800 bg-zinc-950 p-6 lg:p-8">
              <h2 className="text-sm font-black uppercase tracking-[0.08em] text-white">Subscribe</h2>
              <p className="mt-2 text-sm text-zinc-400">Get the next issue when we publish — usually the first Monday of each month.</p>
              <div className="mt-6">
                <Link
                  to="/newsletter/signup"
                  className="flex w-full items-center justify-center bg-red-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-red-700"
                >
                  Subscribe via Form →
                </Link>
              </div>
              <p className="mt-3 font-mono text-[11px] leading-relaxed text-zinc-500">Private signup — just email, subject “Newsletter signup”. No trackers.</p>
            </div>

            <div className="mt-10 border border-dashed border-zinc-700 bg-zinc-950 p-10 text-center">
              <div className="mx-auto max-w-[44ch]">
                <div className="mx-auto flex h-12 w-12 items-center justify-center border border-zinc-800 bg-zinc-900 text-zinc-500">
                  <span className="font-mono text-lg">—</span>
                </div>
                <h3 className="mt-4 text-sm font-black uppercase tracking-[0.08em] text-white">Nothing to see here yet</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">Rookie team — no past issues yet. Our first issue will drop after kickoff. Subscribe above and you’ll get it first.</p>
                <Link to="/newsletter/signup" className="mt-6 inline-flex border border-zinc-700 bg-zinc-900 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800">Get notified →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
