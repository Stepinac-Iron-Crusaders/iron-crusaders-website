import { Link } from "react-router-dom";
import { PlaceholderImage } from "../components/PlaceholderImage";

export default function Outreach() {
  return (
    <>
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-300">Outreach</span>
          </div>
          <div className="mt-6 max-w-3xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-blue-600" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-blue-500">Beyond the Field</span>
            </div>
            <h1 className="text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[52px]">Outreach</h1>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">If the robot is how we learn, outreach is why we learn. 20+ events a year across Westchester — demos, workshops, and mentorship that make STEM tangible.</p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3 max-w-xl">
            {[
              { v: "2000+", k: "Students Reached" },
              { v: "18", k: "Schools" },
              { v: "120hrs", k: "Volunteer / yr" },
            ].map((s) => (
              <div key={s.k} className="border border-zinc-800 bg-zinc-900 p-4 text-center">
                <div className="text-lg font-black text-white">{s.v}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-14">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { t: "School Demos", d: "Live robot demos + Q&A for elementary and middle schools. Kids drive; we explain.", img: "OUTREACH — SCHOOL DEMO PLACEHOLDER" },
              { t: "Community Workshops", d: "Hands-on nights: wiring, CAD, and Java — beginners solder, print, and code.", img: "OUTREACH — WORKSHOP PLACEHOLDER" },
              { t: "STEM Nights", d: "Family evenings at Stepinac with industry panels and pit tours.", img: "OUTREACH — STEM NIGHT PLACEHOLDER" },
            ].map((c) => (
              <div key={c.t} className="border border-zinc-800 bg-zinc-950">
                <PlaceholderImage label={c.img} className="aspect-[4/3] border-0 border-b border-zinc-800" />
                <div className="p-6">
                  <h3 className="text-sm font-black uppercase tracking-[0.08em] text-white">{c.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{c.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">Flagship Programs</h3>
              <ul className="mt-4 space-y-4">
                {[
                  { n: "Crusader Mini-Bots", d: "One-day FLL-style challenge for 5th–6th grade — 80 kids, 20 mentors, 1 gym." },
                  { n: "Women in STEM", d: "Panel and build night hosted by female subteam leads and alumnae." },
                  { n: "Summer CAD Camp", d: "Week-long Fusion crash course — each student ships a printed gearbox." },
                ].map((p) => (
                  <li key={p.n} className="border-l-2 border-zinc-800 pl-4">
                    <div className="text-sm font-bold text-white">{p.n}</div>
                    <div className="text-sm text-zinc-400">{p.d}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">Request a Visit</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">We bring the robot, the team, and a 45-minute STEM program to your school or community group — free of charge within Westchester.</p>
              <ul className="mt-4 space-y-2 font-mono text-xs text-zinc-500">
                <li>• Grades K–8 ideal • Gym or cafeteria • 60 kids max per demo</li>
                <li>• No fee • We handle AV and safety</li>
              </ul>
              <Link to="/contact" className="mt-6 inline-flex bg-red-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-red-700">Request Outreach →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8">
          <PlaceholderImage label="OUTREACH — GALLERY STRIP PLACEHOLDER (6 IMAGES)" className="aspect-[3/1]" />
          <div className="mt-3 flex justify-between font-mono text-[11px] uppercase tracking-wide text-zinc-600">
            <span>Outreach Gallery — 2023–2025</span>
            <Link to="/media" className="text-zinc-400 hover:text-white">View Media →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
