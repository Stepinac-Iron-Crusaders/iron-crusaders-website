import { Link } from "react-router-dom";
import { PlaceholderImage } from "../components/PlaceholderImage";
import SponsorsGrid from "../components/SponsorsGrid";
import { SPONSORS } from "../data/sponsors";

export default function Home() {
  return (
    <>
      {/* ===================================== 1. HERO ===================================== */}
      <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-900/40 via-transparent to-zinc-950"
        />
        <div aria-hidden="true" className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />

        <div className="relative mx-auto max-w-[1280px] px-4 py-12 md:py-16 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div className="animate-fade-in">
              <div className="mb-6 inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900 px-3 py-1.5">
                <span className="h-1.5 w-1.5 bg-red-600" aria-hidden="true" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">FRC Team • Archbishop Stepinac</span>
                <span className="hidden h-3 w-px bg-zinc-700 sm:block" aria-hidden="true" />
                <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500 sm:inline">White Plains, NY</span>
              </div>

              <h1 className="font-sans text-[40px] font-black uppercase leading-[0.9] tracking-[-0.03em] text-white sm:text-[56px] lg:text-[72px]">
                Iron
                <br />
                <span className="text-white">Crusaders</span>
              </h1>

              <div className="mt-4 border-l-2 border-red-600 pl-4">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  Archbishop Stepinac High School
                  <span className="mx-2 text-zinc-600">|</span>
                  <span className="text-zinc-300">FIRST Robotics Competition</span>
                </p>
                <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-zinc-300">
                  Engineering. Competition. Community. We design, build, and compete with purposeful robots — and build the next generation of engineers along the way.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/team/about" className="inline-flex items-center justify-center bg-red-600 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700">Meet the Team</Link>
                <Link to="/robots/current" className="inline-flex items-center justify-center border border-blue-600 bg-transparent px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5">Our Robot</Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-zinc-800 pt-6">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">Season</span>
                  <span className="text-sm font-semibold text-white">2026 — Biocore</span>
                </div>
                <span className="hidden h-4 w-px bg-zinc-800 sm:block" aria-hidden="true" />
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-wide text-zinc-400">Build Season Active</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 hidden border border-zinc-800 lg:block" aria-hidden="true" />
              <PlaceholderImage label="HERO IMAGE PLACEHOLDER" className="aspect-[16/10] lg:aspect-[4/3]" />
              <div className="flex items-center justify-between border-x border-b border-zinc-800 bg-zinc-900 px-4 py-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">Pit • Competition Floor • 2025</span>
                <span className="font-mono text-[11px] text-zinc-600">IMG_001 — 3840×2160</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* other sections unchanged... */}

      {/* ===================================== 8. SPONSORS ===================================== */}
      <section id="sponsors" className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-zinc-700" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Partners</span>
              <span className="h-px w-8 bg-zinc-700" aria-hidden="true" />
            </div>
            <h2 className="text-[28px] font-black uppercase tracking-[-0.02em] text-white sm:text-[36px]">Our Sponsors</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">Industry and community partners who make our season possible — from materials and machining to travel and outreach.</p>
          </div>

          <SponsorsGrid sponsors={SPONSORS} />

          <div className="mt-10 flex flex-col items-center gap-4 border-t border-zinc-800 pt-10">
            <p className="max-w-[48ch] text-center text-sm leading-relaxed text-zinc-400">Want your logo here? Sponsor a competitive, student-led engineering program with proven community impact.</p>
            <Link to="/sponsors" className="inline-flex items-center justify-center bg-red-600 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-1">Become a Sponsor</Link>
            <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-600">501(c)(3) • Tax-deductible • Tier packages available</span>
          </div>
        </div>
      </section>

      {/* rest unchanged... */}
    </>
  );
}
