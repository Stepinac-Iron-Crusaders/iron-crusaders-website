import { Link } from "react-router-dom";
import { PlaceholderImage } from "../components/PlaceholderImage";
import SponsorsGrid from "../components/SponsorsGrid";
import { SPONSORS } from "../data/sponsors";

const STATS = {
  students: "20+",
  awards: "N/A",
  competitions: "ROOKIE",
  founded: "2026",
} as const;

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

        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent"
        />

        <div className="relative mx-auto max-w-[1280px] px-4 py-12 md:py-16 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div className="animate-fade-in">
              <div className="mb-6 inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900 px-3 py-1.5">
                <span
                  className="h-1.5 w-1.5 bg-red-600"
                  aria-hidden="true"
                />

                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  FRC Team • Archbishop Stepinac
                </span>

                <span
                  className="hidden h-3 w-px bg-zinc-700 sm:block"
                  aria-hidden="true"
                />

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
                  <span className="text-zinc-300">
                    FIRST Robotics Competition
                  </span>
                </p>

                <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-zinc-300">
                  Engineering. Competition. Community. We design, build, and
                  compete with purposeful robots — and build the next
                  generation of engineers along the way.
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
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">
                    Season
                  </span>

                  <span className="text-sm font-semibold text-white">2026-2027</span>
                </div>

                <span
                  className="hidden h-4 w-px bg-zinc-800 sm:block"
                  aria-hidden="true"
                />

                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full bg-red-500"
                    aria-hidden="true"
                  />

                  <span className="font-mono text-xs uppercase tracking-wide text-zinc-400">Biocore build season inactive</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -inset-1 hidden border border-zinc-800 lg:block"
                aria-hidden="true"
              />

              <PlaceholderImage
                label="HERO IMAGE PLACEHOLDER"
                className="aspect-[16/10] lg:aspect-[4/3]"
              />

              <div className="flex items-center justify-between border-x border-b border-zinc-800 bg-zinc-900 px-4 py-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                  Pit • Competition Floor • 2025
                </span>

                <span className="font-mono text-[11px] text-zinc-600">
                  IMG_001 — 3840×2160
                </span>
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
                <span
                  className="h-px w-8 bg-red-600"
                  aria-hidden="true"
                />

                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-red-500">
                  Who We Are
                </span>
              </div>

              <h2 className="text-[28px] font-black uppercase leading-[0.95] tracking-[-0.02em] text-white sm:text-[36px]">
                A team built on
                <br />
                <span className="text-zinc-300">engineering</span> &amp;
                community.
              </h2>

              <div className="mt-6 space-y-4 text-[15px] leading-7 text-zinc-300">
                <p>
                  The Iron Crusaders are the FIRST Robotics Competition team
                  from Archbishop Stepinac High School in White Plains, New
                  York. We unite students, mentors, and alumni around a single
                  mission: build competitive robots while teaching STEM to the
                  next generation.
                </p>

                <p className="text-zinc-400">
                  From CAD and fabrication to programming, strategy, and
                  outreach — every student finds a role. We compete at the
                  highest level of FRC while leading STEM initiatives across
                  Westchester County.
                </p>
              </div>

              <ul className="mt-8 grid gap-3 border-t border-zinc-800 pt-6 sm:grid-cols-2">
                {[
                  "Student-led design & fabrication",
                  "Python/C++ & SSLAM autonomy",
                  "Community STEM outreach",
                  "Professional mentorship",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-zinc-300"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-blue-600"
                      aria-hidden="true"
                    />
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

                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    aria-hidden="true"
                  >
                    <path d="M3 7h8M7 3l4 4-4 4" />
                  </svg>
                </Link>

                <a
                  href="https://stepinac.org"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400 transition-colors hover:text-white focus-visible:outline-none"
                >
                  School Website →
                </a>
              </div>
            </div>

            <div className="relative">
              <PlaceholderImage
                label="TEAM WORKSHOP IMAGE PLACEHOLDER"
                className="aspect-[4/3]"
              />

              <div className="absolute -bottom-4 -left-4 hidden border border-zinc-700 bg-zinc-950 p-4 shadow-xl lg:flex lg:items-center lg:gap-4">
                <div className="flex h-10 w-10 items-center justify-center bg-red-600 text-white">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6M10 13H8M16 17H8M13 13h1.5a2 2 0 0 1 0 4H13" />
                  </svg>
                </div>

                <div>
                  <div className="text-sm font-bold uppercase tracking-wide text-white">
                    STEM Certified
                  </div>

                  <div className="font-mono text-xs text-zinc-500">
                    Outreach
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================== 3. OUR ROBOT ===================================== */}
      <section
        id="robot"
        className="border-b border-zinc-800 bg-zinc-950"
      >
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="h-px w-8 bg-blue-600"
                  aria-hidden="true"
                />

                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-blue-500">
                  Current Machine
                </span>
              </div>

              <h2 className="text-[28px] font-black uppercase leading-none tracking-[-0.02em] text-white sm:text-[36px]">
                Our Robot
              </h2>

              <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-zinc-400">
                Engineered for precision, speed, and reliability on the
                Reefscape field.
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
                120 lb • 28″×32″
              </span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <PlaceholderImage
              label="ROBOT IMAGE PLACEHOLDER"
              className="aspect-[16/10] lg:aspect-[4/3]"
            />

            <div className="flex flex-col">
              <div className="border border-zinc-800 bg-zinc-900">
                <div className="grid grid-cols-3 divide-x divide-zinc-800 border-b border-zinc-800">
                  {[
                    { k: "Drivetrain", v: "Swerve MK4i" },
                    { k: "Weight", v: "119.8 lb" },
                    { k: "Auto", v: "3.2s cycle" },
                  ].map((s) => (
                    <div key={s.k} className="px-4 py-3 text-center">
                      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">
                        {s.k}
                      </div>

                      <div className="mt-1 text-xs font-bold uppercase tracking-wide text-white">
                        {s.v}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 p-6">
                  <div>
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white">
                      <span
                        className="h-1 w-1 bg-red-600"
                        aria-hidden="true"
                      />
                      Drivetrain
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      SDS MK4i swerve modules with Kraken X60 drive.
                      Field-oriented control tuned for 16 ft/s with precise
                      pose estimation.
                    </p>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white">
                      <span
                        className="h-1 w-1 bg-blue-600"
                        aria-hidden="true"
                      />
                      Manipulator
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      Dual-stage elevator with carbon-fiber arm. Compliant
                      intake for coral and algae — 0.8s acquisition.
                    </p>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white">
                      <span
                        className="h-1 w-1 bg-zinc-500"
                        aria-hidden="true"
                      />
                      Autonomous
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      STALLION - Stereo computer vision and SLAM for
                      on-the-go pathfinding. Powered by the Arduino Uno Q.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  to="/robots/current"
                  className="flex-1 bg-red-600 px-6 py-3.5 text-center text-xs font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700"
                >
                  View Robot
                </Link>

                <Link
                  to="/robots/archive"
                  className="border border-zinc-800 bg-zinc-900 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
                >
                  Specs
                </Link>
              </div>

              <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-wide text-zinc-600">
                CAD • Code • Reveal video available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================== 4. THE TEAM ===================================== */}
      <section id="team" className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span
                className="h-px w-8 bg-zinc-700"
                aria-hidden="true"
              />

              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                The People
              </span>

              <span
                className="h-px w-8 bg-zinc-700"
                aria-hidden="true"
              />
            </div>

            <h2 className="text-[28px] font-black uppercase tracking-[-0.02em] text-white sm:text-[36px]">
              The Team
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Students lead. Mentors guide. Leadership delivers. Every subteam
              ships.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Students",
                to: "/team/students",
                desc: "Design, fabrication, programming, and strategy — students own every subsystem and every match.",
                count: "30+ Members",
                accent: "red",
              },
              {
                title: "Mentors",
                to: "/team/mentors",
                desc: "Professional engineers and educators who teach process, safety, and high-level competitive thinking.",
                count: "12 Mentors",
                accent: "blue",
              },
              {
                title: "Leadership",
                to: "/team/leadership",
                desc: "Captains and leads who set build timelines, run reviews, and hold the standard on quality.",
                count: "6 Leads",
                accent: "zinc",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="group border border-zinc-800 bg-zinc-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center border ${
                      card.accent === "red"
                        ? "border-red-900/50 bg-red-600 text-white"
                        : card.accent === "blue"
                          ? "border-blue-900/50 bg-blue-600 text-white"
                          : "border-zinc-700 bg-zinc-900 text-zinc-300"
                    }`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      aria-hidden="true"
                    >
                      {card.title === "Students" && (
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      )}

                      {card.title === "Mentors" && (
                        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM6 20v-2a6 6 0 0 1 12 0v2M16 8l2 2 4-4" />
                      )}

                      {card.title === "Leadership" && (
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a7.5 7.5 0 0 0-14.8 0M12 3v1M12 20v1M4.22 4.22l.7.7M18.36 18.36l.7.7M3 12h1M20 12h1" />
                      )}
                    </svg>
                  </div>

                  <span className="border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-zinc-500">
                    {card.count}
                  </span>
                </div>

                <h3 className="mt-6 text-sm font-black uppercase tracking-[0.08em] text-white">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {card.desc}
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-zinc-800 pt-4">
                  <div className="flex -space-x-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-zinc-950 bg-zinc-800"
                        style={{
                          background:
                            "linear-gradient(135deg, #27272a 0%, #3f3f46 100%)",
                        }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <span className="font-mono text-xs text-zinc-500">
                    Meet the crew →
                  </span>
                </div>

                <Link
                  to={card.to}
                  className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.1em] text-zinc-300 transition-colors group-hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600"
                >
                  View {card.title}

                  <span
                    aria-hidden="true"
                    className="ml-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================== 5. OUR MISSION ===================================== */}
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="h-px w-8 bg-red-600"
                  aria-hidden="true"
                />

                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-red-500">
                  Why We Build
                </span>
              </div>

              <h2 className="text-[28px] font-black uppercase tracking-[-0.02em] text-white sm:text-[36px]">
                Our Mission
              </h2>
            </div>

            <p className="max-w-[44ch] text-sm leading-relaxed text-zinc-400">
              Six pillars. One standard: do hard things well, and bring others
              with you.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Engineering",
                desc: "Rigorous design, tolerancing, and iteration. We measure twice, cut once — then test to failure.",
                icon: "M14.5 2a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 0 5",
              },
              {
                title: "STEM",
                desc: "Real tools, real code, real physics. From CAD to controls — students ship production systems.",
                icon: "M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2",
              },
              {
                title: "Leadership",
                desc: "Ownership, accountability, and clear communication when pressure is highest.",
                icon: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a7.5 7.5 0 0 0-14.8 0",
              },
              {
                title: "Collaboration",
                desc: "Mechanical, electrical, and software — one team, one robot, one pit crew.",
                icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 8",
              },
              {
                title: "Innovation",
                desc: "Prototype fast, validate faster. We chase 1% gains that win matches.",
                icon: "M12 2a7 7 0 0 0-7 7c0 3.5 3 6.5 7 10",
              },
              {
                title: "Community",
                desc: "We teach what we learn — hosting workshops, demos, and STEM nights across Westchester.",
                icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="border border-zinc-800 bg-zinc-900 p-6 transition-colors duration-300 hover:bg-zinc-900"
              >
                <div className="flex h-9 w-9 items-center justify-center border border-zinc-700 bg-zinc-950 text-zinc-300">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    aria-hidden="true"
                  >
                    <path d={card.icon} />
                  </svg>
                </div>

                <h3 className="mt-4 text-xs font-black uppercase tracking-[0.12em] text-white">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================== 6. OUTREACH ===================================== */}
      <section className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="h-px w-8 bg-blue-600"
                  aria-hidden="true"
                />

                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-blue-500">
                  Beyond the Field
                </span>
              </div>

              <h2 className="text-[28px] font-black uppercase tracking-[-0.02em] text-white sm:text-[36px]">
                Outreach
              </h2>

              <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-zinc-400">
                We bring robotics to the community — demos, workshops, and
                mentorship that make STEM tangible.
              </p>
            </div>

            <Link
              to="/outreach"
              className="hidden items-center gap-2 border border-zinc-700 bg-zinc-950 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-zinc-600"
            >
              View All Outreach

              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                label: "OUTREACH — SCHOOL DEMO PLACEHOLDER",
                title: "School Demos",
                desc: "Live robot demos and Q&A for elementary and middle schools.",
              },
              {
                label: "OUTREACH — COMMUNITY WORKSHOP PLACEHOLDER",
                title: "Community Workshops",
                desc: "Hands-on build nights — wiring, CAD, and programming for beginners.",
              },
              {
                label: "OUTREACH — STEM NIGHT PLACEHOLDER",
                title: "STEM Nights",
                desc: "Evening events with families, faculty, and local industry partners.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="group border border-zinc-800 bg-zinc-950"
              >
                <PlaceholderImage
                  label={card.label}
                  className="aspect-[4/3] rounded-none border-0 border-b border-zinc-800"
                />

                <div className="p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-white">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {card.desc}
                  </p>

                  <Link
                    to="/outreach"
                    className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.1em] text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center sm:hidden">
            <Link
              to="/outreach"
              className="inline-flex items-center gap-2 border border-zinc-700 bg-zinc-950 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white"
            >
              View All Outreach{" "}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================== 7. ACHIEVEMENTS ===================================== */}
      <section
        className="relative overflow-hidden border-y border-zinc-800 bg-zinc-950"
        aria-label="Achievements"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-14">
          <div className="grid gap-8 divide-zinc-800 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x">
            {[
              {
                value: STATS.students,
                label: "Students",
                sub: "Active roster",
              },
              {
                value: STATS.awards,
                label: "Awards",
                sub: "Regional & district",
              },
              {
                value: STATS.competitions,
                label: "Competitions",
                sub: "FRC events",
              },
              {
                value: STATS.founded,
                label: "Founded",
                sub: "White Plains, NY",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="px-2 text-center lg:px-6"
              >
                <div className="font-sans text-[42px] font-black leading-none tracking-[-0.03em] text-white sm:text-[48px]">
                  {stat.value}
                </div>

                <div className="mt-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-red-500">
                  {stat.label}
                </div>

                <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-zinc-500">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 border-t border-zinc-800 pt-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
              Competing in
            </span>

            <span className="border border-zinc-800 bg-zinc-900 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wide text-white">
              FIRST Robotics Competition
            </span>

            <span
              className="hidden h-4 w-px bg-zinc-800 sm:block"
              aria-hidden="true"
            />

            <span className="font-mono text-xs text-zinc-400">
              Hudson Valley • NYC Regionals
            </span>
          </div>
        </div>
      </section>

      {/* ===================================== 8. SPONSORS ===================================== */}
      <section
        id="sponsors"
        className="border-b border-zinc-800 bg-zinc-900"
      >
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span
                className="h-px w-8 bg-zinc-700"
                aria-hidden="true"
              />

              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Partners
              </span>

              <span
                className="h-px w-8 bg-zinc-700"
                aria-hidden="true"
              />
            </div>

            <h2 className="text-[28px] font-black uppercase tracking-[-0.02em] text-white sm:text-[36px]">
              Our Sponsors
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Industry and community partners who make our season possible —
              from materials and machining to travel and outreach.
            </p>
          </div>

          <div className="mt-10">
            <SponsorsGrid sponsors={SPONSORS} />
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 border-t border-zinc-800 pt-10">
            <p className="max-w-[48ch] text-center text-sm leading-relaxed text-zinc-400">
              Want your logo here? Sponsor a competitive, student-led
              engineering program with proven community impact.
            </p>

            <Link
              to="/sponsors"
              className="inline-flex items-center justify-center bg-red-600 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-1"
            >
              Become a Sponsor
            </Link>

            <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-600">
              501(c)(3) • Tax-deductible • Tier packages available
            </span>
          </div>
        </div>
      </section>

      {/* ===================================== 9. NEWS ===================================== */}
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="h-px w-8 bg-zinc-700"
                  aria-hidden="true"
                />

                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  Updates
                </span>
              </div>

              <h2 className="text-[28px] font-black uppercase tracking-[-0.02em] text-white sm:text-[36px]">
                Latest News
              </h2>
            </div>

            <Link
              to="/media"
              className="hidden text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600"
            >
              View all posts →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                date: "Aug 28, 2026",
                title: "Kickoff Countdown: Build Season Prep Underway",
                excerpt:
                  "Inventory, strategy binders, and swerve calibration — how we’re starting strong for Reefscape season.",
                tag: "Build",
              },
              {
                date: "Aug 15, 2026",
                title: "Alumni Spotlight: From Pit Crew to Mechanical Engineer",
                excerpt:
                  "A Stepinac graduate reflects on how FRC shaped a career in aerospace manufacturing",
                tag: "Alumni",
              },
              {
                date: "Aug 02, 2026",
                title: "Community Demo Day Draws 200+ Future Engineers",
                excerpt:
                  "Live demos, mini-bot driving, and a packed Q&A — outreach by the numbers.",
                tag: "Outreach",
              },
            ].map((post) => (
              <article
                key={post.title}
                className="group flex flex-col border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-lg"
              >
                <PlaceholderImage
                  label="NEWS IMAGE PLACEHOLDER"
                  className="aspect-[16/9] rounded-none border-0 border-b border-zinc-800"
                />

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2">
                    <span className="border border-zinc-700 bg-zinc-950 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-400">
                      {post.tag}
                    </span>

                    <span className="font-mono text-[11px] text-zinc-500">
                      {post.date}
                    </span>
                  </div>

                  <h3 className="mt-3 text-[15px] font-bold leading-snug text-white transition-colors group-hover:text-zinc-100">
                    {post.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">
                    {post.excerpt}
                  </p>

                  <Link
                    to="/media"
                    className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.1em] text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600"
                  >
                    Read article →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex justify-center md:hidden">
            <Link
              to="/media"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400 hover:text-white"
            >
              View all posts →
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================== 10. FINAL CTA ===================================== */}
      <section
        className="relative overflow-hidden bg-red-600"
        aria-label="Call to action"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-14">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-10">
            <h2 className="max-w-[18ch] text-center text-[26px] font-black uppercase leading-[0.95] tracking-[-0.02em] text-white sm:text-[32px] lg:text-left lg:text-[36px]">
              Build the future.
              <br />
              <span className="text-white/90">
                Support the Iron Crusaders.
              </span>
            </h2>

            <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row">
              <Link
                to="/sponsors"
                className="inline-flex items-center justify-center bg-white px-8 py-4 text-xs font-black uppercase tracking-[0.14em] text-red-600 transition-all duration-300 hover:-translate-y-0.5"
              >
                Sponsor Us
              </Link>

              <span className="hidden font-mono text-xs uppercase tracking-wide text-red-100 sm:inline">
                Tax-deductible • Contact us today
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
