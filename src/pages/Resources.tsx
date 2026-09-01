import { Link } from "react-router-dom";
import { AnimatedPage } from "../components/AnimatedPage";

export default function Resources() {
  return (
        <AnimatedPage>
<>
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-300">Resources</span>
          </div>
          <div className="mt-6 max-w-3xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-blue-600" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-blue-500">Docs • CAD • Code • Handbook</span>
            </div>
            <h1 className="text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[52px]">Resources</h1>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">Open by default. CAD, code, and build logs are public so future students — and other teams — can learn faster.</p>
          </div>
        </div>
      </section>

      <section className="bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-10 lg:px-8 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="border border-zinc-800 bg-zinc-950 p-6">
              <h2 className="text-xs font-black uppercase tracking-[0.12em] text-white">GitHub</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">Java • WPILib • AdvantageKit • PathPlanner. Every commit tagged by event.</p>
              <ul className="mt-4 space-y-2 font-mono text-xs">
                <li><a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center justify-between border border-zinc-800 bg-zinc-900 px-3 py-2 text-zinc-300 hover:text-white">2025 — Reefscape <span>→</span></a></li>
                <li><a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center justify-between border border-zinc-800 bg-zinc-900 px-3 py-2 text-zinc-300 hover:text-white">2024 — Crescendo <span>→</span></a></li>
                <li><a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center justify-between border border-zinc-800 bg-zinc-900 px-3 py-2 text-zinc-300 hover:text-white">Library — Swerve Base <span>→</span></a></li>
              </ul>
            </div>
            <div className="border border-zinc-800 bg-zinc-950 p-6">
              <h2 className="text-xs font-black uppercase tracking-[0.12em] text-white">Onshape CAD</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">Full assemblies, manufacturable drawings, and versioned branches per review.</p>
              <ul className="mt-4 space-y-2 font-mono text-xs">
                <li><a href="#" className="flex items-center justify-between border border-zinc-800 bg-zinc-900 px-3 py-2 text-zinc-300 hover:text-white">Mk. VII Full Assembly <span>→</span></a></li>
                <li><a href="#" className="flex items-center justify-between border border-zinc-800 bg-zinc-900 px-3 py-2 text-zinc-300 hover:text-white">Elevator — Detailed <span>→</span></a></li>
                <li><a href="#" className="flex items-center justify-between border border-zinc-800 bg-zinc-900 px-3 py-2 text-zinc-300 hover:text-white">BOM 2025 (CSV) <span>→</span></a></li>
              </ul>
            </div>
            <div className="border border-zinc-800 bg-zinc-950 p-6">
              <h2 className="text-xs font-black uppercase tracking-[0.12em] text-white">Learn FRC</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">Curated starting points we point every rookie to first.</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="https://docs.wpilib.org" target="_blank" rel="noreferrer" className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-white">WPILib Docs — docs.wpilib.org →</a></li>
                <li><a href="https://www.thebluealliance.com" target="_blank" rel="noreferrer" className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-white">The Blue Alliance →</a></li>
                <li><a href="https://firstfrc.blob.core.windows.net" target="_blank" rel="noreferrer" className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-white">FRC Game Manual 2025 (PDF) →</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">Team Handbook</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">Expectations, safety, travel, and letter criteria — one page, clear standards.</p>
              <div className="mt-4 grid gap-2 font-mono text-xs">
                <div className="flex justify-between border border-zinc-800 bg-zinc-900 px-3 py-2"><span className="text-zinc-400">Handbook 2025–26</span><a href="#" className="font-bold text-white hover:underline">PDF →</a></div>
                <div className="flex justify-between border border-zinc-800 bg-zinc-900 px-3 py-2"><span className="text-zinc-400">Safety Checklist</span><a href="#" className="font-bold text-white hover:underline">PDF →</a></div>
                <div className="flex justify-between border border-zinc-800 bg-zinc-900 px-3 py-2"><span className="text-zinc-400">Shop Map — Room 112</span><a href="#" className="font-bold text-white hover:underline">View →</a></div>
              </div>
            </div>
            <div className="border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">New? Start Here</h3>
              <ol className="mt-4 space-y-3 text-sm text-zinc-300">
                <li className="flex gap-3"><span className="font-mono text-xs font-bold text-red-500">01</span> Watch the Reefscape game animation (8 min).</li>
                <li className="flex gap-3"><span className="font-mono text-xs font-bold text-red-500">02</span> Clone the code and run the swerve sim — no hardware needed.</li>
                <li className="flex gap-3"><span className="font-mono text-xs font-bold text-red-500">03</span> Open the Mk. VII CAD and trace the load path from bumpers to elevator.</li>
              </ol>
              <Link to="/contact" className="mt-6 inline-flex border border-zinc-700 bg-zinc-900 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800">Ask a Lead →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
    </AnimatedPage>
  );
}
