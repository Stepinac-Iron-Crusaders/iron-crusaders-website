import { Link } from "react-router-dom";

const ARCHIVE = [
  { year: 2025, game: "Reefscape", robot: "Crusader Mk. VII", drivetrain: "Swerve MK4i", weight: "119.8 lb", awards: 3, status: "Active" },
  { year: 2024, game: "Crescendo", robot: "Crusader Mk. VI — Aria", drivetrain: "Swerve MK4i", weight: "118.5 lb", awards: 2, status: "Retired" },
  { year: 2023, game: "Charged Up", robot: "Crusader Mk. V — Charge", drivetrain: "Swerve MK4", weight: "119.0 lb", awards: 2, status: "Retired" },
  { year: 2022, game: "Rapid React", robot: "Crusader Mk. IV", drivetrain: "Tank 6WD", weight: "112 lb", awards: 1, status: "Retired" },
  { year: 2020, game: "Infinite Recharge", robot: "Crusader Mk. III", drivetrain: "Tank 6WD", weight: "120 lb", awards: 0, status: "Demo" },
  { year: 2019, game: "Deep Space", robot: "Crusader Mk. II", drivetrain: "Tank 6WD", weight: "108 lb", awards: 1, status: "Disassembled" },
  { year: 2018, game: "Power Up", robot: "Crusader Mk. I", drivetrain: "Tank 4WD", weight: "105 lb", awards: 1, status: "Archived" },
];

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
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Complete History</span>
              </div>
              <h1 className="text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[48px]">Robot Archive</h1>
              <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-zinc-400">Sortable record of every competition chassis since 2018. Specs, results, and links to CAD and code.</p>
            </div>
            <div className="flex gap-2">
              <Link to="/robots/past" className="border border-zinc-800 bg-zinc-900 px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-zinc-300 hover:bg-zinc-800">Gallery</Link>
              <a href="#" className="bg-white px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wide text-zinc-900 hover:bg-zinc-100">Download CSV</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-10 lg:px-8 lg:py-12">
          {/* Desktop table */}
          <div className="hidden overflow-hidden border border-zinc-800 md:block">
            <table className="w-full border-collapse text-left">
              <thead className="bg-zinc-950">
                <tr className="border-b border-zinc-800 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">
                  <th className="px-5 py-3 font-semibold">Year</th>
                  <th className="px-5 py-3 font-semibold">Game</th>
                  <th className="px-5 py-3 font-semibold">Robot</th>
                  <th className="px-5 py-3 font-semibold">Drivetrain</th>
                  <th className="px-5 py-3 font-semibold">Weight</th>
                  <th className="px-5 py-3 font-semibold">Awards</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-zinc-950 text-sm">
                {ARCHIVE.map((r) => (
                  <tr key={r.year} className="transition-colors hover:bg-zinc-900">
                    <td className="px-5 py-4 font-mono text-sm font-bold text-white">{r.year}</td>
                    <td className="px-5 py-4 text-zinc-300">{r.game}</td>
                    <td className="px-5 py-4 font-medium text-white">{r.robot}</td>
                    <td className="px-5 py-4 font-mono text-xs text-zinc-400">{r.drivetrain}</td>
                    <td className="px-5 py-4 font-mono text-xs text-zinc-400">{r.weight}</td>
                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex min-w-7 justify-center border border-zinc-800 bg-zinc-900 px-2 py-1 font-mono text-xs text-zinc-300">{r.awards}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex border px-2 py-1 font-mono text-[11px] uppercase tracking-wide ${
                          r.status === "Active" ? "border-emerald-900 bg-emerald-950/40 text-emerald-400" : "border-zinc-700 bg-zinc-900 text-zinc-400"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="grid gap-4 md:hidden">
            {ARCHIVE.map((r) => (
              <div key={r.year} className="border border-zinc-800 bg-zinc-950 p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-white">{r.year} — {r.game}</span>
                  <span className={`border px-2 py-1 font-mono text-[11px] uppercase ${r.status === "Active" ? "border-emerald-900 text-emerald-400" : "border-zinc-700 text-zinc-500"}`}>{r.status}</span>
                </div>
                <div className="mt-2 text-sm font-bold text-white">{r.robot}</div>
                <div className="mt-2 flex flex-wrap gap-2 font-mono text-[11px] text-zinc-500">
                  <span className="border border-zinc-800 bg-zinc-900 px-2 py-1">{r.drivetrain}</span>
                  <span className="border border-zinc-800 bg-zinc-900 px-2 py-1">{r.weight}</span>
                  <span className="border border-zinc-800 bg-zinc-900 px-2 py-1">{r.awards} awards</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { k: "Total Robots", v: "7" },
              { k: "Awards Combined", v: "10+" },
              { k: "Years Competing", v: "2018–2025" },
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
