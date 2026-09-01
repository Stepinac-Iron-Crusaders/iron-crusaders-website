import { Link } from "react-router-dom";
import { AnimatedPage } from "../components/AnimatedPage";
import { PlaceholderImage } from "../components/PlaceholderImage";

export default function CurrentRobot() {
  return (
        <AnimatedPage>
<>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950">
        <div aria-hidden="true" className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-600/40 to-transparent" />
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="text-zinc-700">/</span>
            <Link to="/robots/current" className="hover:text-white">Robots</Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-300">Current Robot</span>
          </div>
          <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-blue-600" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-blue-500">2025 • Reefscape</span>
              </div>
              <h1 className="text-[36px] font-black uppercase leading-[0.9] tracking-[-0.03em] text-white sm:text-[48px] lg:text-[56px]">
                Crusader
                <br />
                <span className="text-zinc-400">Mk. VII</span>
              </h1>
              <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-zinc-400">
                Our most capable machine yet — swerve, elevator, and vision tuned for coral and algae control at tempo.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 self-end">
              <span className="border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs uppercase tracking-wide text-zinc-300">
                Weight <span className="text-white">119.8 lb</span>
              </span>
              <span className="border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs uppercase tracking-wide text-zinc-300">
                Frame <span className="text-white">28″ × 32″ × 48″</span>
              </span>
              <span className="bg-red-600 px-3 py-2 font-mono text-xs font-bold uppercase tracking-wide text-white">Ready for Competition</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero visual + key specs */}
      <section className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-10 lg:px-8 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
            <div>
              <PlaceholderImage label="CRUSADER MK VII — ISOMETRIC ROBOT RENDER PLACEHOLDER" className="aspect-[16/10] lg:aspect-[4/3]" />
              <div className="mt-3 grid grid-cols-3 gap-3">
                {["Front 3Q PlaceHolder", "Side Profile Placeholder", "Pit Action Placeholder"].map((l) => (
                  <PlaceholderImage key={l} label={l} className="aspect-[4/3]" />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="border border-zinc-800 bg-zinc-950">
                <div className="border-b border-zinc-800 bg-zinc-900 px-5 py-3">
                  <h2 className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-white">At a Glance</h2>
                </div>
                <div className="grid grid-cols-2 divide-x divide-y divide-zinc-800">
                  {[
                    { k: "Drivetrain", v: "SDS MK4i Swerve", sub: "Kraken X60 • 16 ft/s" },
                    { k: "Control", v: "roboRIO 2 + CANivore", sub: "20ms loop • 200Hz odom" },
                    { k: "Manipulator", v: "Dual-stage Elevator", sub: "Carbon arm • 52″ reach" },
                    { k: "Intake", v: "Compliant Roller", sub: "0.8s acquisition" },
                    { k: "Vision", v: "Limelight 3 + Arducam", sub: "PhotonVision • AprilTag" },
                    { k: "Auto", v: "4-piece • PathPlanner", sub: "On-the-fly replanning" },
                  ].map((s) => (
                    <div key={s.k} className="p-4">
                      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">{s.k}</div>
                      <div className="mt-1 text-sm font-bold text-white">{s.v}</div>
                      <div className="font-mono text-[11px] text-zinc-500">{s.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">Performance</h3>
                <div className="mt-4 space-y-4">
                  {[
                    { label: "Coral Cycle", value: "3.2s", pct: 82 },
                    { label: "Algae Net Shot", value: "92% Acc", pct: 92 },
                    { label: "Climb (Cage)", value: "4.1s", pct: 76 },
                    { label: "Auto Success", value: "4pc 78%", pct: 78 },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="uppercase tracking-wide text-zinc-400">{row.label}</span>
                        <span className="font-bold text-white">{row.value}</span>
                      </div>
                      <div className="mt-1 h-1.5 bg-zinc-800">
                        <div className="h-full bg-red-600" style={{ width: `${row.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <a
                    href="#"
                    className="flex-1 bg-white px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-zinc-900 hover:bg-zinc-100"
                  >
                    Reveal Video
                  </a>
                  <a href="#" className="flex-1 border border-zinc-700 bg-zinc-900 px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800">
                    CAD
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subsystems deep dive */}
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-red-600" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-red-500">Engineering Deep Dive</span>
          </div>
          <h2 className="mt-3 text-[28px] font-black uppercase tracking-[-0.02em] text-white sm:text-[36px]">Subsystems</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                title: "Swerve & Controls",
                points: ["Kraken X60 + CANcoder absolute", "Field-oriented, 16 ft/s, 0.05 m pose", "Command-based • SysId tuned"],
                color: "red",
              },
              {
                n: "02",
                title: "Elevator + Arm",
                points: ["Thrifty 2-stage cascade, 26 lb holding", "CF tube arm, active wrist, MAXSpline", "Preset scoring: L1–L4 + Algae"],
                color: "blue",
              },
              {
                n: "03",
                title: "Intake & Climber",
                points: ["Compliant double roller coral intake", "Algae net shot from 12 ft", "Everybot-style deep cage, 4.1s climb"],
                color: "zinc",
              },
            ].map((s) => (
              <div key={s.n} className="border border-zinc-800 bg-zinc-900 p-6">
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold tracking-[0.14em] ${s.color === "red" ? "text-red-500" : s.color === "blue" ? "text-blue-500" : "text-zinc-500"}`}>{s.n}</span>
                  <span className="h-px flex-1 mx-3 bg-zinc-800" />
                  <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-600">Subsystem</span>
                </div>
                <h3 className="mt-4 text-sm font-black uppercase tracking-[0.08em] text-white">{s.title}</h3>
                <ul className="mt-4 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm leading-relaxed text-zinc-400">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-zinc-600" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">Software Stack</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-xs">
                {[
                  "WPILib • Java 17",
                  "PathPlanner + Choreo",
                  "PhotonVision + NT4",
                  "AdvantageKit Logging",
                  "CTRE Phoenix 6",
                  "Redux + WPILOG Replay",
                ].map((t) => (
                  <span key={t} className="border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>
              <Link to="/resources" className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.1em] text-zinc-400 hover:text-white">
                View open-source code →
              </Link>
            </div>
            <div className="border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">Awards & Events 2025</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex justify-between border-b border-zinc-800 pb-3">
                  <span className="text-zinc-300">Hudson Valley Regional</span>
                  <span className="font-mono text-xs text-zinc-500">Finalist • Innovation</span>
                </li>
                <li className="flex justify-between border-b border-zinc-800 pb-3">
                  <span className="text-zinc-300">NYC Regional</span> <span className="font-mono text-xs text-zinc-500">Creativity Award</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-zinc-300">Offseason • Ra Cha Cha Ruckus</span> <span className="font-mono text-xs text-zinc-500">Winners</span>
                </li>
              </ul>
              <Link to="/awards" className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.1em] text-zinc-400 hover:text-white">
                All awards →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
    </AnimatedPage>
  );
}
