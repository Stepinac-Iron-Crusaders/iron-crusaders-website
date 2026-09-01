import { Link } from "react-router-dom";
import { AnimatedPage } from "../components/AnimatedPage";

export default function Awards() {
  return (
        <AnimatedPage>
<>
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-300">Awards</span>
          </div>
          <div className="mt-6 max-w-3xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-red-600" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-red-500">Rookie Season • 2026</span>
            </div>
            <h1 className="text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[52px]">Awards</h1>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">Rookie team — no banners yet, but we’re building for them. This page will fill in after our first regionals.</p>
          </div>
          <div className="mt-6 flex gap-2">
            <span className="border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs text-white">0 Awards — yet</span>
            <span className="border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-400">Goal: compete well, learn fast</span>
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
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">We’re a rookie team (2026). No past awards to show — check back after our first Hudson Valley / NYC regionals.</p>
              <Link to="/robots/current" className="mt-6 inline-flex border border-zinc-700 bg-zinc-900 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800">See Our First Robot →</Link>
            </div>
          </div>

          <div className="mt-8 border border-zinc-800 bg-zinc-950 p-6 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-500">Goal 2026</p>
            <p className="mx-auto mt-2 max-w-[52ch] text-sm leading-relaxed text-zinc-300">Blue banner. Engineering Excellence is the target — repeatable autos, clean pit, and Gracious Professionalism that judges remember.</p>
          </div>
        </div>
      </section>
    </>
    </AnimatedPage>
  );
}
