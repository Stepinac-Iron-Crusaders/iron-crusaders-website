import { useState } from "react";
import { AnimatedPage } from "../components/AnimatedPage";
import { Link } from "react-router-dom";

function StudentPhoto({ name }: { name: string }) {
  const [failed, setFailed] = useState(false);
  const [phFailed, setPhFailed] = useState(false);
  if (failed) {
    if (phFailed) return <div className="h-12 w-12 rounded-full border border-zinc-700 bg-zinc-800" aria-hidden="true" />;
    return <img src={`${import.meta.env.BASE_URL}students/placeholder.jpg`} alt="placeholder" className="h-12 w-12 rounded-full border border-zinc-700 bg-zinc-800 object-cover" onError={() => setPhFailed(true)} loading="lazy" />;
  }
  const src = `${import.meta.env.BASE_URL}students/${encodeURIComponent(name)}.jpg`;
  return <img src={src} alt={name} className="h-12 w-12 rounded-full border border-zinc-700 bg-zinc-800 object-cover" onError={() => setFailed(true)} loading="lazy" />;
}

const SUBTEAMS = [
  { name: "Building/Design", lead: "Lead: TBD • TBD members", desc: "Leads design of robot systems." },
  { name: "Coding", lead: "Lead: TBD • TBD members", desc: "Autonomous, vision, robot control." },
  { name: "Finance", lead: "Lead: TBD • TBD members", desc: "Creates and implements business plan" },
  { name: "Media & Marketing", lead: "Lead: TBD • TBD members", desc: "Outreach, handles sponsor benefits, video" },
];

const ROSTER = [
  { n: "Jace Reyna", email: "jacereyna228@stepinac.org", role: "Coding Team, Finance Team, Marketing/Social Media Team", yr: "Junior" },
  { n: "Aston Seravo", email: "astonseravo509@stepinac.org", role: "Design/Build Team, Coding Team, Finance Team", yr: "Sophomore" },
  { n: "Joseph Uthuppan", email: "josephuthuppan930@stepinac.org", role: "Design/Build Team, Coding Team", yr: "Junior" },
  { n: "Joseph Alex", email: "josephalex823@stepinac.org", role: "Design/Build Team, Coding Team, Finance Team, Marketing/Social Media Team", yr: "Sophomore" },
  { n: "Julian Reiff", email: "julianreiff995@stepinac.org", role: "Design/Build Team, Coding Team", yr: "Sophomore" },
  { n: "Michael Yordan", email: "michaelyordan408@stepinac.org", role: "Design/Build Team, Finance Team", yr: "Sophomore" },
  { n: "Michael Peyton", email: "michaelpeyton872@stepinac.org", role: "Coding Team, Finance Team", yr: "Sophomore" },
  { n: "Oisin Stack", email: "oisinstack354@stepinac.org", role: "Finance Team, Marketing/Social Media Team", yr: "Junior" },
  { n: "Xavi Gonzalez", email: "xavigonzalez336@stepinac.org", role: "Design/Build Team", yr: "Sophomore" },
  { n: "Martin Kilcoyne", email: "martinkilcoyne337@stepinac.org", role: "Design/Build Team, Finance Team", yr: "Sophomore" },
  { n: "Thomas Munchoff", email: "thomasmunchoff469@stepinac.org", role: "Finance Team", yr: "Sophomore" },
  { n: "Viggo McCartney", email: "viggomccartney945@stepinac.org", role: "Design/Build Team, Finance Team", yr: "Sophomore" },
  { n: "Anthony MacDonald", email: "anthonymacdonald775@stepinac.org", role: "Design/Build Team", yr: "Sophomore" },
  { n: "Robert Geib", email: "robertgeib429@stepinac.org", role: "Coding Team", yr: "Junior" },
  { n: "Subash Jonnalagadda", email: "sjonnalagadda555@stepinac.org", role: "Design/Build Team, Coding Team, Finance Team, Marketing/Social Media Team", yr: "Sophomore" }
];

export default function Students() {
  return (
        <AnimatedPage>
<>
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="text-zinc-700">/</span>
            <Link to="/team/about" className="hover:text-white">The Team</Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-300">Students</span>
          </div>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-red-600" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-red-500">{ROSTER.length} Members • Grades 9–12 • Rookie 2026-2027</span>
              </div>
              <h1 className="text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[48px]">Students</h1>
              <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-zinc-400">Students own the robot. Mentors guide, but student hands hold the tools, the commits, and the match strategy.</p>
            </div>
            <Link to="/team/leadership" className="border border-zinc-700 bg-zinc-900 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800">View Leadership →</Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-14">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-white">Subteams</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SUBTEAMS.map((t) => (
              <div key={t.name} className="border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="text-sm font-black uppercase tracking-[0.08em] text-white">{t.name}</h3>
                <div className="mt-1 font-mono text-[11px] text-zinc-500">{t.lead}</div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-14">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-white">Roster</h2>
          <p className="mt-2 text-sm text-zinc-400">Current roster — {ROSTER.length} members.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ROSTER.map((m) => (
              <div key={m.n} className="border border-zinc-800 bg-zinc-900 p-5">
                <StudentPhoto name={m.n} />
                <div className="mt-4 text-sm font-bold text-white">{m.n}</div>
                <a
                  href={`mailto:${m.email}`}
                  className="mt-1 block text-xs text-zinc-500 hover:text-blue-500"
                >
                  {m.email}
                </a>
                <div className="text-xs leading-relaxed text-zinc-400">{m.role}</div>
                <div className="mt-2 inline-flex border border-zinc-800 bg-zinc-950 px-2 py-1 font-mono text-[11px] uppercase tracking-wide text-zinc-500">
                  {m.yr}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-hidden border border-zinc-800 bg-zinc-900">
              <img src={`${import.meta.env.BASE_URL}shop-action.png`} alt="Students working in the shop" className="aspect-[16/10] w-full object-cover" />
            </div>
            <div className="border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">Join the Team</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">No experience needed — just commitment. Freshmen start with onboarding, safety, and a starter project (bumpers, intake rollers, or auto sim). Recruitment opens each September; offseason build nights run year-round.</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                <li className="flex gap-2"><span className="mt-2 h-1 w-1 bg-red-600" /> Meetings: Tue/Thu 3:30–7pm • Sat 9am–4pm (build season)</li>
                <li className="flex gap-2"><span className="mt-2 h-1 w-1 bg-blue-600" /> Location: Stepinac Engineering Lab, Room 112</li>
              </ul>
              <Link to="/contact" className="mt-6 inline-flex bg-red-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-red-700">Contact Us to Join</Link>
            </div>
          </div>
        </div>
      </section>
    </>
    </AnimatedPage>
  );
}
