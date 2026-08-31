import { Link } from "react-router-dom";
import { PlaceholderImage } from "../components/PlaceholderImage";

export default function About() {
  return (
    <>
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="text-zinc-700">/</span>
            <Link to="/team/about" className="hover:text-white">The Team</Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-300">About Us</span>
          </div>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-red-600" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-red-500">Archbishop Stepinac High School• Since 2026</span>
              </div>
              <h1 className="text-[36px] font-black uppercase leading-[0.9] tracking-[-0.03em] text-white sm:text-[52px]">
                About
                <br />
                <span className="text-zinc-500">Us</span>
              </h1>
              <p className="mt-6 max-w-[48ch] text-[15px] leading-7 text-zinc-300">
                 We are a group of passionate students who want to challenge the elite teams of FIRST Robotics with radical new ideas. We want to make robotics competitive even for teams that do not have a monopoly on resources. By making our systems open-source, other small teams are able to use our more affordable methods to move forward.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-zinc-800 pt-6">
                {[
                  { v: "ROOKIE", k: "Seasons" },
                  { v: "0", k: "Alumni" },
                  { v: "501(c)(3)", k: "Nonprofit" },
                ].map((s) => (
                  <div key={s.k} className="border border-zinc-800 bg-zinc-900 p-4 text-center">
                    <div className="text-lg font-black text-white">{s.v}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">{s.k}</div>
                  </div>
                ))}
              </div>
            </div>
            <PlaceholderImage label="ABOUT US — TEAM GROUP PHOTO PLACEHOLDER" className="aspect-[4/3]" />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-[24px] font-black uppercase tracking-[-0.02em] text-white">Our Story</h2>
              <div className="mt-6 space-y-4 text-sm leading-7 text-zinc-300">
                <p>
                  Founded in 2014 by a handful of Stepinac students and two faculty mentors, the Iron Crusaders began in a single classroom with a KoP chassis and a drill press. Year by year we earned shop space, sponsors, and district banners.
                </p>
                <p className="text-zinc-400">
                  Today we operate a full machine shop — mills, lathes, Markforged, laser — and a controls lab with vision rigs and swerve calibration jigs. Students own every subsystem from CAD lock to pit repair.
                </p>
                <p className="text-zinc-400">
                  Competition is the forcing function. Community is the purpose. We host Westchester STEM nights, mentor FLL teams, and run summer workshops for middle schoolers.
                </p>
              </div>
              <div className="mt-8 flex gap-3">
                <Link to="/team/students" className="bg-red-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-red-700">Meet Students</Link>
                <Link to="/outreach" className="border border-zinc-700 bg-zinc-950 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-900">Our Outreach</Link>
              </div>
            </div>
            <div>
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-white">Timeline</h3>
              <div className="mt-6 space-y-0 border-l border-zinc-800 pl-6">
                {[
                  { yr: "2014", t: "Team Founded", d: "Stepinac 1.0 — Power Up dreams, Woodie Flowers mindset." },
                  { yr: "2018", t: "First FRC Robot", d: "Crusader Mk. I competes at Hudson Valley." },
                  { yr: "2020", t: "Shop Expansion", d: "Move to dedicated engineering lab; fundraising milestone." },
                  { yr: "2023", t: "Swerve Transition", d: "Full swerve adoption; autonomous leap." },
                  { yr: "2025", t: "Reefscape — Mk. VII", d: "Fastest cycle yet; 30+ active students." },
                ].map((e) => (
                  <div key={e.yr} className="relative pb-8 last:pb-0">
                    <span className="absolute -left-[25px] top-1 h-2 w-2 bg-red-600" />
                    <div className="font-mono text-xs font-bold text-red-500">{e.yr}</div>
                    <div className="mt-1 text-sm font-bold text-white">{e.t}</div>
                    <div className="text-sm leading-relaxed text-zinc-400">{e.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-zinc-700" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Values</span>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { t: "Learn by Building", d: "Hands on tools, hands on code — we keep the student hands on the robot." },
              { t: "Hold the Standard", d: "Tolerancing, review, test. We ship work we are proud to put our name on." },
              { t: "Bring Others With You", d: "Teach what you learn. Outreach is not extra — it’s the point." },
            ].map((v) => (
              <div key={v.t} className="border border-zinc-800 bg-zinc-900 p-6">
                <h3 className="text-xs font-black uppercase tracking-[0.1em] text-white">{v.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
