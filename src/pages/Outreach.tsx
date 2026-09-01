import { Link } from "react-router-dom";
import { AnimatedPage } from "../components/AnimatedPage";
// import { PlaceholderImage } from "../components/PlaceholderImage";

export default function Outreach() {
  return (
        <AnimatedPage>
<>
      {/* ===================================== HEADER ===================================== */}
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            <Link to="/" className="hover:text-white">
              Home
            </Link>

            <span className="text-zinc-700">/</span>

            <span className="text-zinc-300">Outreach</span>
          </div>

          <div className="mt-6 max-w-3xl">
            <div className="mb-3 flex items-center gap-3">
              <span
                className="h-px w-8 bg-blue-600"
                aria-hidden="true"
              />

              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-blue-500">
                Beyond the Field
              </span>
            </div>

            <h1 className="text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[52px]">
              Outreach
            </h1>

            <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">
              If the robot is how we learn, outreach is why we learn.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================== IN PROGRESS ===================================== */}
      <section className="relative min-h-[560px] overflow-hidden border-b border-zinc-800 bg-zinc-900">
        {/* Background grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* Red/blue accent lines */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-600/50 to-transparent"
        />

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent"
        />

        <div className="relative mx-auto flex min-h-[560px] max-w-[1280px] items-center justify-center px-4 py-20 lg:px-8">
          <div className="w-full max-w-2xl text-center">
            {/* Status indicator */}
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center gap-2 border border-zinc-700 bg-zinc-950 px-4 py-2">
                <span
                  className="h-2 w-2 animate-pulse bg-blue-600"
                  aria-hidden="true"
                />

                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  Page In Progress
                </span>
              </div>
            </div>

            {/* Main message */}
            <h2 className="text-[42px] font-black uppercase leading-[0.9] tracking-[-0.03em] text-white sm:text-[60px]">
              Outreach
              <br />
              <span className="text-zinc-500">Under Construction</span>
            </h2>

            <div className="mx-auto mt-6 h-px w-16 bg-blue-600" />

            <p className="mx-auto mt-6 max-w-[52ch] text-[15px] leading-7 text-zinc-400">
              We’re currently building our outreach program page. Check back
              soon for information about our STEM programs, school visits,
              workshops, community events, and more.
            </p>

            {/* Progress block */}
            <div className="mx-auto mt-10 max-w-md border border-zinc-800 bg-zinc-950 p-5 text-left">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  Development Status
                </span>

                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-blue-500">
                  In Progress
                </span>
              </div>

              <div className="mt-4 h-1 w-full bg-zinc-800">
                <div className="h-1 w-[45%] bg-blue-600" />
              </div>

              <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-wide text-zinc-600">
                <span>Planning</span>
                <span>Building</span>
                <span>Launch</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center justify-center bg-red-600 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700"
              >
                Back to Home
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center border border-zinc-700 bg-zinc-950 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-500 hover:text-white"
              >
                Contact the Team
              </Link>
            </div>

            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-700">
              IRON CRUSADERS • OUTREACH SYSTEM • DEVELOPMENT BUILD
            </p>
          </div>
        </div>
      </section>

      {/*
      ===================================== CURRENT OUTREACH PAGE =====================================

      The original Outreach page is intentionally commented out while the
      page is being developed.

      It can be restored later.

      <section className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-14">

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                t: "School Demos",
                d: "Live robot demos + Q&A for elementary and middle schools. Kids drive; we explain.",
                img: "OUTREACH — SCHOOL DEMO PLACEHOLDER",
              },
              {
                t: "Community Workshops",
                d: "Hands-on nights: wiring, CAD, and Java — beginners solder, print, and code.",
                img: "OUTREACH — WORKSHOP PLACEHOLDER",
              },
              {
                t: "STEM Nights",
                d: "Family evenings at Stepinac with industry panels and pit tours.",
                img: "OUTREACH — STEM NIGHT PLACEHOLDER",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="border border-zinc-800 bg-zinc-950"
              >
                <PlaceholderImage
                  label={c.img}
                  className="aspect-[4/3] border-0 border-b border-zinc-800"
                />

                <div className="p-6">
                  <h3 className="text-sm font-black uppercase tracking-[0.08em] text-white">
                    {c.t}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {c.d}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">

            <div className="border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">
                Flagship Programs
              </h3>

              <ul className="mt-4 space-y-4">
                {[
                  {
                    n: "Crusader Mini-Bots",
                    d: "One-day FLL-style challenge for 5th–6th grade — 80 kids, 20 mentors, 1 gym.",
                  },
                  {
                    n: "Women in STEM",
                    d: "Panel and build night hosted by female subteam leads and alumnae.",
                  },
                  {
                    n: "Summer CAD Camp",
                    d: "Week-long Fusion crash course — each student ships a printed gearbox.",
                  },
                ].map((p) => (
                  <li
                    key={p.n}
                    className="border-l-2 border-zinc-800 pl-4"
                  >
                    <div className="text-sm font-bold text-white">
                      {p.n}
                    </div>

                    <div className="text-sm text-zinc-400">
                      {p.d}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">
                Request a Visit
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                We bring the robot, the team, and a 45-minute STEM program to
                your school or community group — free of charge within
                Westchester.
              </p>

              <ul className="mt-4 space-y-2 font-mono text-xs text-zinc-500">
                <li>
                  • Grades K–8 ideal • Gym or cafeteria • 60 kids max per demo
                </li>
                <li>• No fee • We handle AV and safety</li>
              </ul>

              <Link
                to="/contact"
                className="mt-6 inline-flex bg-red-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-red-700"
              >
                Request Outreach →
              </Link>
            </div>

          </div>
        </div>
      </section>

      <section className="bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8">
          <PlaceholderImage
            label="OUTREACH — GALLERY STRIP PLACEHOLDER (6 IMAGES)"
            className="aspect-[3/1]"
          />

          <div className="mt-3 flex justify-between font-mono text-[11px] uppercase tracking-wide text-zinc-600">
            <span>Outreach Gallery — 2023–2025</span>

            <Link
              to="/media"
              className="text-zinc-400 hover:text-white"
            >
              View Media →
            </Link>
          </div>
        </div>
      </section>

      ===================================== END ORIGINAL PAGE =====================================
      */}
    </>
    </AnimatedPage>
  );
}
