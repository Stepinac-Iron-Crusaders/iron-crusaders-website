import { Link } from "react-router-dom";

const ISSUES = [
  { issue: "#14 — Aug 2026", title: "Build Season Prep: Swerve, Inventory, Strategy", excerpt: "How we’re calibrating for Reefscape — new CANivore, spare modules, and binders ready." },
  { issue: "#13 — Jun 2026", title: "Offseason Winners & Lessons", excerpt: "Ra Cha Cha recap — 6–2–0 run, 4-piece auto hit rate, and what broke." },
  { issue: "#12 — Mar 2026", title: "NYC Regional Day 3 — Alliance Selection inside", excerpt: "Scouting choices, match 84 heartbreak, and pit story." },
  { issue: "#11 — Jan 2026", title: "Kickoff Debrief — Reefscape first impressions", excerpt: "Coral vs algae priority? Our first prototype cuts." },
];

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

            <div className="mt-10">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-white">Recent Issues</h3>
              <div className="mt-4 space-y-3">
                {ISSUES.map((it) => (
                  <div key={it.issue} className="border border-zinc-800 bg-zinc-950 p-5">
                    <div className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">{it.issue}</div>
                    <div className="mt-1 text-sm font-bold text-white">{it.title}</div>
                    <div className="text-sm leading-relaxed text-zinc-400">{it.excerpt}</div>
                    <a href="#" className="mt-3 inline-flex text-xs font-semibold uppercase tracking-[0.1em] text-zinc-400 hover:text-white">Read →</a>
                  </div>
                ))}
              </div>
              <a href="#" className="mt-6 inline-flex border border-zinc-700 bg-zinc-900 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800">View Archive (14 issues) →</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
