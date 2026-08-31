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
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  FRC Team • Archbishop Stepinac
                </span>
                <span className="hidden h-3 w-px bg-zinc-700 sm:block" aria-hidden="true" />
                <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500 sm:inline">
                  White Plains, NY
                </span>
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
                <Link
                  to="/team/about"
                  className="inline-flex items-center justify-center bg-red-600 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700"
                >
                  Meet the Team
                </Link>
                <Link
                  to="/robots/current"
                  className="inline-flex items-center justify-center border border-blue-600 bg-transparent px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5"
                >
                  Our Robot
                </Link>
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
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                  Pit • Competition Floor • 2025
                </span>
                <span className="font-mono text-[11px] text-zinc-600">IMG_001 — 3840×2160</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================== 2. WHO WE ARE ===================================== */}
      <section className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-red-600" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-red-500">Who We Are</span>
              </div>
              <h2 className="text-[28px] font-black uppercase leading-[0.95] tracking-[-0.02em] text-white sm:text-[36px]">
                A team built on
                <br />
                <span className="text-zinc-300">engineering</span> &amp; community.
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-zinc-300">
                <p>
                  The Iron Crusaders are the FIRST Robotics Competition team from Archbishop Stepinac High School in White Plains, New York. We unite students, mentors, and alumni around a single mission: build competitive robots while teaching STEM to the next generation.
                </p>
                <p className="text-zinc-400">
                  From CAD and fabrication to programming, strategy, and outreach — every student finds a role. We compete at the highest level of FRC while leading STEM initiatives across Westchester County.
                </p>
              </div>

              <ul className="mt-8 grid gap-3 border-t border-zinc-800 pt-6 sm:grid-cols-2">
                {[
                  "Student-led design & fabrication",
                  "Java/C++ & WPILib autonomy",
                  "Community STEM outreach",
                  "Professional mentorship",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-blue-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex gap-3">
                <Link
                  to="/team/about"
                  className="inline-flex items-center gap-2 border border-zinc-700 bg-zinc-950 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700"
                >
                  Our Story
                </Link>
                <a
                  href="https://stepinac.org"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400 transition-colors hover:text-white"
                >
                  School Website →
                </a>
              </div>
            </div>

            <div className="relative">
              <PlaceholderImage label="TEAM WORKSHOP IMAGE PLACEHOLDER" className="aspect-[4/3]" />
              <div className="absolute -bottom-4 -left-4 hidden border border-zinc-700 bg-zinc-950 p-4 shadow-xl lg:flex lg:items-center lg:gap-4">
                <div className="flex h-10 w-10 items-center justify-center bg-red-600 text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6M10 13H8M16 17H8M13 13h1.5a2 2 0 0 1 0 4H13" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-wide text-white">STEM Certified</div>
                  <div className="font-mono text-xs text-zinc-500">FRC • FTC • Outreach</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================== 3. OUR ROBOT ===================================== */}
      <section id="robot" className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-blue-600" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-blue-500">Current Machine</span>
              </div>
              <h2 className="text-[28px] font-black uppercase leading-none tracking-[-0.02em] text-white sm:text-[36px]">
                Our Robot
              </h2>
              <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-zinc-400">
                Engineered for precision, speed, and reliability on the Reefscape field.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-400">
                Season <span className="text-white">2025</span>
              </span>
              <span className="border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-400">
                Name <span className="text-white">Crusader Mk. VII</span>
              </span>
              <span className="border border-red-900/40 bg-red-950/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-red-400">
                120 lb • 2832
