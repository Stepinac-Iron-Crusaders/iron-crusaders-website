import { Link } from "react-router-dom";
import { PlaceholderImage } from "../components/PlaceholderImage";

const ROBOTS = [
  {
    year: 2024,
    game: "Crescendo",
    name: "Crusader Mk. VI — Aria",
    awards: ["Excellence in Engineering", "Hudson Valley Finalist"],
    spec: "Swerve • Speaker & Amp • Harmony Climb",
    accent: "red",
  },
  {
    year: 2023,
    game: "Charged Up",
    name: "Crusader Mk. V — Charge",
    awards: ["Autonomous Award", "NYC Quarterfinalist"],
    spec: "Swerve • Cube/Cone • Charge Station",
    accent: "blue",
  },
  {
    year: 2022,
    game: "Rapid React",
    name: "Crusader Mk. IV",
    awards: ["Rookie? — Veteran Resilience"],
    spec: "Tank • Shooter • Climber",
    accent: "zinc",
  },
  {
    year: 2020,
    game: "Infinite Recharge",
    name: "Crusader Mk. III",
    awards: ["Season shortened — virtual showcase"],
    spec: "Tank • Turret • 10b climb",
    accent: "red",
  },
  {
    year: 2019,
    game: "Destination: Deep Space",
    name: "Crusader Mk. II",
    awards: ["Quality Award"],
    spec: "Hatch & Cargo — Elevator",
    accent: "blue",
  },
  {
    year: 2018,
    game: "Power Up",
    name: "Crusader Mk. I",
    awards: ["FTC Roots → FRC debut"],
    spec: "Scale & Switch — Intake",
    accent: "zinc",
  },
];

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
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-red-500">Season History</span>
            </div>
            <h1 className="text-[36px] font-black uppercase leading-[0.9] tracking-[-0.03em] text-white sm:text-[48px]">Past Robots</h1>
            <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-zinc-400">
              Seven seasons of iteration. Each machine carries lessons forward — from tank to swerve, bag motors to Krakens, prototype to production.
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ROBOTS.map((r) => (
              <div
                key={r.year}
                className="group flex flex-col border border-zinc-800 bg-zinc-950 transition-all hover:-translate-y-1 hover:border-zinc-700 hover:shadow-lg"
              >
                <PlaceholderImage label={`${r.year} ${r.game.toUpperCase()} — ${r.name} PLACEHOLDER`} className="aspect-[16/10] border-0 border-b border-zinc-800" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2">
                    <span className={`border px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-wide ${r.accent === "red" ? "border-red-900/40 bg-red-950/30 text-red-400" : r.accent === "blue" ? "border-blue-900/40 bg-blue-950/30 text-blue-400" : "border-zinc-700 bg-zinc-900 text-zinc-400"}`}>
                      {r.year}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">{r.game}</span>
                  </div>
                  <h3 className="mt-3 text-sm font-black uppercase tracking-[0.06em] text-white">{r.name}</h3>
                  <p className="mt-1 font-mono text-xs text-zinc-500">{r.spec}</p>
                  <ul className="mt-4 space-y-1.5">
                    {r.awards.map((a) => (
                      <li key={a} className="flex gap-2 text-xs text-zinc-400">
                        <span className="mt-1.5 h-1 w-1 shrink-0 bg-zinc-600" /> {a}
                      </li>
                    ))}
                  </ul>
                  <Link to="/robots/archive" className="mt-5 inline-flex text-xs font-semibold uppercase tracking-[0.1em] text-zinc-400 group-hover:text-white">
                    Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 border border-zinc-800 bg-zinc-950 p-8 text-center">
            <h3 className="text-sm font-black uppercase tracking-[0.08em] text-white">Evolution Note</h3>
            <p className="mx-auto mt-3 max-w-[56ch] text-sm leading-relaxed text-zinc-400">
              From our 2018 Power Up rookie chassis to the 2025 dual-stage elevator, every season is documented with CAD, code, and build logs — open for students and mentors to learn from.
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
