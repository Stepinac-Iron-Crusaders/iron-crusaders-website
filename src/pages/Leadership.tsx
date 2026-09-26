import { Link } from "react-router-dom";
import { AnimatedPage } from "../components/AnimatedPage";
import { PlaceholderImage } from "../components/PlaceholderImage";

const LEADS = [
  {
    n: "Joseph Alex",
    yr: "Sophomore",
    roles: [
      "Co-Captain",
      "Building/Design Co-Lead",
    ],
    focus:
      "Owns season timeline, design reviews, pit operations, and robot system design.",
  },
  {
    n: "Subash Jonnalagadda",
    yr: "Junior",
    roles: [
      "Co-Captain",
      "Building/Design Co-Lead",
    ],
    focus:
      "Owns season timeline, design reviews, pit operations, and robot construction.",
  },
  {
    n: "Julian Reiff",
    yr: "Sophomore",
    roles: ["Coding Lead"],
    focus:
      "Leads autonomous systems, computer vision, and robot control.",
  },
  {
    n: "Mathew Kulapurathazhe",
    yr: "Sophomore",
    roles: ["Finance Co-Lead"],
    focus:
      "Creates and implements the team's business and financial plan.",
  },
  {
    n: "Thomas Munchoff",
    yr: "Sophomore",
    roles: ["Finance Co-Lead"],
    focus:
      "Creates and implements the team's business and financial plan.",
  },
  {
    n: "Oisin Stack",
    yr: "Junior",
    roles: ["Social Media & Marketing Lead"],
    focus:
      "Leads outreach, manages sponsor benefits, and produces team media.",
  },
];

export default function Leadership() {
  return (
    <AnimatedPage>
      <>
        {/* =========================================================
            PAGE HEADER
        ========================================================= */}
        <section className="border-b border-zinc-800 bg-zinc-950">
          <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
              <Link to="/" className="hover:text-white">
                Home
              </Link>

              <span className="text-zinc-700">/</span>

              <Link to="/team/about" className="hover:text-white">
                The Team
              </Link>

              <span className="text-zinc-700">/</span>

              <span className="text-zinc-300">Leadership</span>
            </div>

            {/* Title */}
            <div className="mt-6 max-w-3xl">
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="h-px w-8 bg-zinc-700"
                  aria-hidden="true"
                />

                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  Student Leadership • 6 Leads
                </span>
              </div>

              <h1 className="text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[48px]">
                Leadership
              </h1>

              <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">
                Leadership is service. Leads set the bar for preparation,
                communication, and accountability — then pull the team over
                it.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            LEADERSHIP CARDS
        ========================================================= */}
        <section className="border-b border-zinc-800 bg-zinc-900">
          <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-14">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {LEADS.map((l) => (
                <div
                  key={l.n}
                  className="border border-zinc-800 bg-zinc-950 p-6 transition-colors duration-200 hover:border-zinc-700"
                >
                  {/* =================================================
                      PERSON HEADER
                  ================================================= */}
                  <div className="flex items-start gap-4">
                    <img
                      src={`/students/${encodeURIComponent(l.n)}.jpg`}
                      alt={l.n}
                      className="h-14 w-14 shrink-0 border border-zinc-700 bg-zinc-800 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/students/placeholder.jpg";
                      }}
                    />

                    <div className="min-w-0">
                      <div className="text-sm font-black uppercase tracking-wide text-white">
                        {l.n}
                      </div>

                      <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-zinc-500">
                        {l.yr}
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      ROLES
                  ================================================= */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {l.roles.map((role) => (
                      <span
                        key={role}
                        className="border border-red-900/60 bg-red-950/30 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-red-400"
                      >
                        {role}
                      </span>
                    ))}
                  </div>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {l.focus}
                  </p>

                  {/* =================================================
                      CARD FOOTER
                  ================================================= */}
                  <div className="mt-4 border-t border-zinc-800 pt-3 font-mono text-[11px] uppercase tracking-wide text-zinc-600">
                    Student Leadership
                  </div>
                </div>
              ))}
            </div>

            {/* =======================================================
                HOW WE LEAD
            ======================================================= */}
            <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <PlaceholderImage
                label="LEADERSHIP — CAPTAINS AT WHITEBOARD PLACEHOLDER"
                className="aspect-[4/3]"
              />

              <div className="border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">
                  How We Lead
                </h3>

                <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-400">
                  <p>
                    <span className="font-bold text-white">
                      Weekly standups
                    </span>{" "}
                    — subteam blockers, build milestones, and match prep.
                    Leads publish notes Friday.
                  </p>

                  <p>
                    <span className="font-bold text-white">
                      Design reviews
                    </span>{" "}
                    — every subsystem defended with drawings, calcs, and
                    failure modes before manufacture.
                  </p>

                  <p>
                    <span className="font-bold text-white">
                      Pit discipline
                    </span>{" "}
                    — checklists, battery logs, and time boxed repairs. Matches
                    are won in the pit.
                  </p>
                </div>

                {/* Navigation */}
                <div className="mt-6 flex gap-3">
                  <Link
                    to="/team/students"
                    className="border border-zinc-700 bg-zinc-900 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800"
                  >
                    Students
                  </Link>

                  <Link
                    to="/team/mentors"
                    className="border border-zinc-700 bg-zinc-900 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800"
                  >
                    Mentors
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </AnimatedPage>
  );
}
