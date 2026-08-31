import { Link } from "react-router-dom";

export default function RobotArchive() {
  return (
    <>
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="text-zinc-700">/</span>
            <Link to="/robots/current" className="hover:text-white">Robots</Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-300">Robot Archive</span>
          </div>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-zinc-700" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Rookie Season • 2026</span>
              </div>
              <h1 className="text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[48px]">Robot Archive</h1>
              <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-zinc-400">Rookie team — this table will grow with every season, starting now.</p>
            </div>
            <div className="flex gap-2">
              <Link to="/robots/past" className="border border-zinc-800 bg-zinc-900 px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-zinc-300 hover:bg-zinc-800">Gallery</Link>
              <Link to="/robots/current" className="bg-white px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wide text-zinc-900 hover:bg-zinc-100">Current Robot</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-10 lg:px-8 lg:py-12">
          <div className="border border-dashed border-zinc-700 bg-zinc-950 p-10 text-center">
            <div className="mx-auto max-w-[48ch]">
              <div className="mx-auto flex h-12 w-12 items-center justify-center border border-zinc-800 bg-zinc-900 text-zinc-500">
                <span className="font-mono text-lg">—</span>
              </div>
              <h3 className="mt-4 text-sm font-black uppercase tracking-[0.08em] text-white">Nothing to see here yet</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">Rookie team — no archive yet. Our first season (2026) will become row one of this table.</p>
              <Link to="/robots/current" className="mt-6 inline-flex bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-zinc-900 hover:bg-zinc-100">See Current Robot →</Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { k: "Total Robots", v: "0 — yet" },
              { k: "Awards Combined", v: "0 — yet" },
              { k: "Years Competing", v: "2026 — Rookie" },
            ].map((s) => (
              <div key={s.k} className="border border-zinc-800 bg-zinc-950 p-6 text-center">
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">{s.k}</div>
                <div className="mt-1 text-2xl font-black text-white">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
