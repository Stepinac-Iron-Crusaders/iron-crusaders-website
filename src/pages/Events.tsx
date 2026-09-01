import { Link } from "react-router-dom";
import { AnimatedPage } from "../components/AnimatedPage";

const EVENTS = [
  { date: "Mar 7–9, 2025", name: "Hudson Valley Regional", loc: "Rockland CC • Suffern, NY", status: "Finalist" as const, type: "Regional" },
  { date: "Mar 20–22, 2025", name: "New York City Regional", loc: "The Armory • Manhattan", status: "Qualifier" as const, type: "Regional" },
  { date: "Jul 27, 2025", name: "Ra Cha Cha Ruckus", loc: "Rochester, NY", status: "Winners" as const, type: "Offseason" },
  { date: "Sep 14, 2025", name: "Demo Day — Westchester STEM Fest", loc: "White Plains, NY", status: "Host" as const, type: "Outreach" },
  { date: "Oct 18, 2025", name: "NYC FIRST Kickoff Preview", loc: "Virtual • Strategy Night", status: "Upcoming" as const, type: "Workshop" },
  { date: "Jan 4, 2026", name: "Kickoff — Reefscape Rewatch", loc: "Stepinac — Room 112", status: "Planned" as const, type: "Build Season" },
];

export default function Events() {
  return (
        <AnimatedPage>
<>
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-300">Events</span>
          </div>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-zinc-700" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Calendar 2025–2026</span>
              </div>
              <h1 className="text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[52px]">Events</h1>
              <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-zinc-400">Regionals, offseasons, and community dates. Build season is sacred — attendance and punctuality matter.</p>
            </div>
            <a href="#" className="inline-flex border border-zinc-800 bg-zinc-900 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800">Add to Calendar • ICS</a>
          </div>
        </div>
      </section>

      <section className="bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-10 lg:px-8 lg:py-12">
          <div className="overflow-hidden border border-zinc-800">
            <div className="hidden divide-y divide-zinc-800 md:block">
              <div className="grid grid-cols-[160px_1fr_220px_130px_120px] bg-zinc-950 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">
                <span>Date</span>
                <span>Event</span>
                <span>Location</span>
                <span>Type</span>
                <span className="text-right">Result</span>
              </div>
              {EVENTS.map((e) => (
                <div key={e.name} className="grid grid-cols-[160px_1fr_220px_130px_120px] items-center bg-zinc-950 px-5 py-4 text-sm hover:bg-zinc-900">
                  <span className="font-mono text-xs text-zinc-400">{e.date}</span>
                  <span className="font-bold text-white">{e.name}</span>
                  <span className="text-zinc-400">{e.loc}</span>
                  <span className="font-mono text-xs uppercase tracking-wide text-zinc-500">{e.type}</span>
                  <span className="flex justify-end">
                    <span className={`border px-2 py-1 font-mono text-[11px] uppercase tracking-wide ${e.status === "Winners" || e.status === "Finalist" ? "border-red-900/30 bg-red-950/30 text-red-400" : e.status === "Upcoming" || e.status === "Planned" ? "border-blue-900/30 bg-blue-950/30 text-blue-400" : "border-zinc-700 bg-zinc-900 text-zinc-400"}`}>
                      {e.status}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            {/* mobile */}
            <div className="grid gap-3 divide-y divide-zinc-800 md:hidden bg-zinc-950 p-4">
              {EVENTS.map((e) => (
                <div key={e.name} className="pt-4 first:pt-0">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">{e.date} • {e.type}</span>
                    <span className="border border-zinc-700 bg-zinc-900 px-2 py-1 font-mono text-[11px] uppercase text-zinc-400">{e.status}</span>
                  </div>
                  <div className="mt-2 text-sm font-bold text-white">{e.name}</div>
                  <div className="text-xs text-zinc-400">{e.loc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">Weekly Cadence</h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li className="flex justify-between border-b border-zinc-800 pb-3"><span className="text-zinc-300">Build Season (Jan–Mar)</span><span className="font-mono text-xs">Tue/Thu 3:30–7 • Sat 9–4</span></li>
                <li className="flex justify-between border-b border-zinc-800 pb-3"><span className="text-zinc-300">Offseason</span><span className="font-mono text-xs">Thu 3:30–6 + event prep</span></li>
                <li className="flex justify-between"><span className="text-zinc-300">Summer</span><span className="font-mono text-xs">Workshops weekly</span></li>
              </ul>
            </div>
            <div className="border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">Location</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">Archbishop Stepinac High School • 950 Mamaroneck Ave, White Plains, NY 10605<br />Room 112 — Engineering Lab. Enter via gym lot; buzz “Robotics”.</p>
              <a href="https://maps.google.com/?q=950+Mamaroneck+Ave+White+Plains+NY" target="_blank" rel="noreferrer" className="mt-4 inline-flex border border-zinc-700 bg-zinc-900 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800">Open in Maps →</a>
            </div>
          </div>
        </div>
      </section>
    </>
    </AnimatedPage>
  );
}
