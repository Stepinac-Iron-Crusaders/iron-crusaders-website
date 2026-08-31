import { Link } from "react-router-dom";

export default function PastRobots() {
  return (
    <>
      <section className="relative border-b border-zinc-800 bg-zinc-950">
        <div aria-hidden="true" className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="text-zinc-700">/</span>
            <Link to="/robots/current" className="hover:text-white">Robots</Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-300">Past Robots</span>
          </div>
          <div className="mt-6 max-w-3xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-red-600" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-red-500">Rookie Season • 2026</span>
            </div>
            <h1 className="text-[36px] font-black uppercase leading-[0.9] tracking-[-0.03em] text-white sm:text-[48px]">Past Robots</h1>
            <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-zinc-400">
              Rookie team — no past robots yet. This is our first build season; everything from here is history in the making.
            </p>
          </div>
          <div className="mt-8 flex gap-3">
            <Link to="/robots/archive" className="border border-zinc-800 bg-zinc-900 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800">
              View Archive Table →
            </Link>
            <Link to="/robots/current" className="bg-red-600 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-red-700">
              Current Robot
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-14">
          <div className="border border-dashed border-zinc-700 bg-zinc-950 p-10 text-center">
            <div className="mx-auto max-w-[48ch]">
              <div className="mx-auto flex h-12 w-12 items-center justify-center border border-zinc-800 bg-zinc-900 text-zinc-500">
                <span className="font-mono text-lg">—</span>
              </div>
              <h3 className="mt-4 text-sm font-black uppercase tracking-[0.08em] text-white">Nothing to see here yet</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">Rookie season — no past robots to show. Our first machine (2026) will appear here after build season. Until then, see what we’re building now.</p>
              <Link to="/robots/current" className="mt-6 inline-flex bg-red-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-red-700">See Current Robot →</Link>
            </div>
          </div>

          <div className="mt-12 border border-zinc-800 bg-zinc-950 p-8 text-center">
            <h3 className="text-sm font-black uppercase tracking-[0.08em] text-white">What’s next</h3>
            <p className="mx-auto mt-3 max-w-[56ch] text-sm leading-relaxed text-zinc-400">
              This archive will grow with every season — CAD, code, and build logs for each robot, starting with our 2026 rookie bot.
            </p>
            <Link to="/resources" className="mt-4 inline-flex border border-zinc-700 bg-zinc-900 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800">
              Browse Build Resources
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
