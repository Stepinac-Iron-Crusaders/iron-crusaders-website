import { Link } from "react-router-dom";
import { PlaceholderImage } from "../components/PlaceholderImage";

const MENTORS = [
  { n: "Mr. Alex Estrella", role: "Lead Mentor", bg: "Faculty - Computer Science and Engineering", years: "5 yrs" },
  { n: "Dr. Samantha Asche-Godin", role: "Outreach", bg: "Faculty - Science Department", years: "4 yrs" },
];

export default function Mentors() {
  return (
    <>
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="text-zinc-700">/</span>
            <Link to="/team/about" className="hover:text-white">The Team</Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-300">Mentors</span>
          </div>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-blue-600" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-blue-500">Mentors • 12 Active</span>
              </div>
              <h1 className="text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[48px]">Mentors</h1>
              <p className="mt-4 max-w-[48ch] text-[15px] leading-7 text-zinc-300">Engineers, educators, and alumni who teach process over parts — safety, iteration, and Gracious Professionalism.</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">We don’t build the robot for students; we make students build the robot — then hold them to a professional standard.</p>
              <div className="mt-6 inline-flex border border-zinc-800 bg-zinc-900 px-4 py-3 font-mono text-xs text-zinc-300">
                Interested in mentoring? <Link to="/contact" className="ml-2 font-bold text-white underline decoration-zinc-600 underline-offset-4 hover:decoration-white">Get in touch</Link>
              </div>
            </div>
            <PlaceholderImage label="MENTORS — MENTOR GUIDING STUDENTS PLACEHOLDER" className="aspect-[4/3]" />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-14">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MENTORS.map((m) => (
              <div key={m.n} className="border border-zinc-800 bg-zinc-950 p-6">
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 shrink-0 border border-zinc-700 bg-zinc-800" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-bold text-white">{m.n}</div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-zinc-400">{m.role}</div>
                  </div>
                </div>
                <div className="mt-4 text-sm leading-relaxed text-zinc-400">{m.bg}</div>
                <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-3">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">{m.years} • Volunteer</span>
                  <span className="h-1 w-1 bg-blue-600" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">What Mentors Do</h3>
              <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                <li className="flex gap-2"><span className="mt-2 h-1 w-1 bg-red-600" /> Teach manufacturing: mill/lathe, sheet metal, 3D print, wiring</li>
                <li className="flex gap-2"><span className="mt-2 h-1 w-1 bg-blue-600" /> Review CAD and code — not do it</li>
                <li className="flex gap-2"><span className="mt-2 h-1 w-1 bg-zinc-500" /> Hold safety and schedule, run design reviews</li>
              </ul>
            </div>
            <div className="border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">Why They Stay</h3>
              <blockquote className="mt-3 border-l-2 border-blue-600 pl-4 text-sm italic leading-relaxed text-zinc-300">“Watching a freshman who barely knew CAD lead the elevator review as a junior — that’s the whole point.” — Mr. O’Connell</blockquote>
              <p className="mt-3 text-sm text-zinc-500">6 alumni now mentor. 4 mentors are Stepinac parents. All volunteer evenings and weekends Jan–April.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
