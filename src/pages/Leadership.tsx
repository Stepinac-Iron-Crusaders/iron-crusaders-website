import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedPage } from "../components/AnimatedPage";
import { PlaceholderImage } from "../components/PlaceholderImage";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import { BRANCHES, CAPTAINS, branchMembers } from "../data/leadership";
import { ROSTER } from "../data/team";

function PersonPhoto({
  name,
  className,
}: {
  name: string;
  className: string;
}) {
  const [failed, setFailed] = useState(false);
  const [phFailed, setPhFailed] = useState(false);

  if (failed) {
    if (phFailed) {
      return (
        <div
          className={`${className} border border-zinc-700 bg-zinc-800`}
          aria-hidden="true"
        />
      );
    }
    return (
      <img
        src={`${import.meta.env.BASE_URL}students/placeholder.jpg`}
        alt=""
        className={`${className} border border-zinc-700 bg-zinc-800 object-cover`}
        onError={() => setPhFailed(true)}
        loading="lazy"
      />
    );
  }

  return (
    <img
      src={`${import.meta.env.BASE_URL}students/${encodeURIComponent(name)}.jpg`}
      alt={name}
      className={`${className} border border-zinc-700 bg-zinc-800 object-cover`}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}

export default function Leadership() {
  const treeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tree = treeRef.current;
    if (!tree || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Connector lines draw downward, then the cross rail fills in.
      const drops = tree.querySelectorAll<HTMLElement>("[data-drop]");
      const rail = tree.querySelector<HTMLElement>("[data-rail]");
      const stem = tree.querySelector<HTMLElement>("[data-stem]");

      if (stem) {
        gsap.from(stem, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: tree, start: "top 85%", once: true },
        });
      }

      if (drops.length) {
        gsap.from(drops, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.5,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.12,
          scrollTrigger: { trigger: tree, start: "top 85%", once: true },
        });
      }

      if (rail) {
        gsap.from(rail, {
          scaleX: 0,
          transformOrigin: "center center",
          duration: 0.8,
          ease: "expo.out",
          delay: 0.3,
          scrollTrigger: { trigger: tree, start: "top 85%", once: true },
        });
      }

      // Captain nodes breathe once as the tree settles.
      const captains = tree.querySelectorAll<HTMLElement>("[data-captain]");
      if (captains.length) {
        gsap.from(captains, {
          y: -6,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.55,
          yoyo: true,
          repeat: 1,
          scrollTrigger: { trigger: tree, start: "top 85%", once: true },
        });
      }
    }, tree);

    return () => ctx.revert();
  }, []);

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
                <span className="h-px w-8 bg-zinc-700" aria-hidden="true" />

                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  {CAPTAINS.length} Captains • {BRANCHES.length} Subteams •{" "}
                  {ROSTER.length} Students
                </span>
              </div>

              <h1 className="text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[48px]">
                Leadership
              </h1>

              <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">
                Two co-captains set the direction. Four subteam leads turn it
                into builds, code, budgets, and content. Everyone else makes it
                real.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            LEADERSHIP TREE
        ========================================================= */}
        <section className="border-b border-zinc-800 bg-zinc-900">
          <div className="mx-auto max-w-[1280px] px-4 py-14 lg:px-8 lg:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-white">
                  Chain of Command
                </h2>

                <p className="mt-2 max-w-[60ch] text-sm text-zinc-400">
                  Captains at the top, subteam leads beneath them, and the
                  students carrying the work.
                </p>
              </div>

              <span className="border border-zinc-800 bg-zinc-950 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">
                Captains → Leads → Members
              </span>
            </div>

            <div ref={treeRef} className="mt-12">
              {/* ----------------------------------------------
                  TIER 1 — CAPTAINS
              ---------------------------------------------- */}
              <div className="flex flex-wrap justify-center gap-5 sm:gap-8">
                {CAPTAINS.map((c) => (
                  <div
                    key={c.n}
                    data-captain
                    className="relative w-full max-w-[320px] border border-red-900/50 bg-zinc-950 p-5 transition-colors duration-200 hover:border-red-800/70"
                  >
                    <span
                      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"
                      aria-hidden="true"
                    />

                    <div className="flex items-center gap-4">
                      <PersonPhoto
                        name={c.n}
                        className="h-14 w-14 shrink-0"
                      />

                      <div className="min-w-0">
                        <div className="text-sm font-black uppercase tracking-wide text-white">
                          {c.n}
                        </div>

                        <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-zinc-500">
                          {c.yr}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.roles.map((role) => (
                        <span
                          key={role}
                          className="border border-red-900/60 bg-red-950/30 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-red-400"
                        >
                          {role}
                        </span>
                      ))}
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                      {c.focus}
                    </p>
                  </div>
                ))}
              </div>

              {/* Captain tier label */}
              <div className="mt-6 flex justify-center">
                <span className="border border-red-900/50 bg-red-950/20 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-red-400">
                  Tier 1 — Co-Captains
                </span>
              </div>

              {/* Vertical stem down to the cross rail */}
              <div
                data-stem
                className="mx-auto h-8 w-px bg-gradient-to-b from-red-600/60 to-zinc-700"
                aria-hidden="true"
              />

              {/* ----------------------------------------------
                  TIER 2 — SUBTEAM BRANCHES
              ---------------------------------------------- */}
              <div
                className="relative"
                style={{ "--col-gap": "1.25rem" } as React.CSSProperties}
              >
                {/* Horizontal rail: spans centre-to-centre of the first and
                    last branch, accounting for the column gap so it meets each
                    drop line exactly. */}
                <div
                  data-rail
                  className="absolute top-0 hidden h-px bg-zinc-700 lg:block
                    left-[calc((100%_-_3_*_var(--col-gap))/8)]
                    right-[calc((100%_-_3_*_var(--col-gap))/8)]"
                  aria-hidden="true"
                />

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {BRANCHES.map((b) => {
                    const preview = branchMembers(b.id);
                    const remaining = Math.max(0, b.members - preview.length);

                    return (
                      <div key={b.id} className="relative pt-8">
                        {/* Drop line from the rail into this branch */}
                        <span
                          data-drop
                          className="absolute left-1/2 top-0 ml-[-0.5px] h-8 w-px bg-zinc-700"
                          aria-hidden="true"
                        />

                        <div className="flex h-full flex-col border border-zinc-800 bg-zinc-950 transition-colors duration-200 hover:border-zinc-700">
                          <span
                            className={`block h-0.5 w-full ${b.accentBar}`}
                            aria-hidden="true"
                          />

                          <div className="flex flex-1 flex-col p-5">
                            {/* Branch header */}
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="text-sm font-black uppercase tracking-[0.08em] text-white">
                                {b.name}
                              </h3>

                              <span
                                className={`shrink-0 border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide ${b.chip}`}
                              >
                                {b.members}
                              </span>
                            </div>

                            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-600">
                              Tier 2 — {b.members} members
                            </div>

                            {/* Leads */}
                            <div className="mt-4 space-y-3">
                              {b.leads.map((l) => (
                                <div
                                  key={l.n}
                                  className="flex items-center gap-3"
                                >
                                  <PersonPhoto
                                    name={l.n}
                                    className="h-10 w-10 shrink-0"
                                  />

                                  <div className="min-w-0">
                                    <div className="truncate text-xs font-bold text-white">
                                      {l.n}
                                    </div>

                                    <div
                                      className={`mt-0.5 font-mono text-[10px] uppercase tracking-wide ${b.leadText}`}
                                    >
                                      {l.role}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <p className="mt-4 text-xs leading-relaxed text-zinc-400">
                              {b.desc}
                            </p>

                            {/* Tier 3 — member preview */}
                            <div className="mt-auto pt-5">
                              <div className="border-t border-zinc-800 pt-4">
                                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-600">
                                  Tier 3 — On this subteam
                                </div>

                                <ul className="mt-2 space-y-1">
                                  {preview.map((name) => (
                                    <li
                                      key={name}
                                      className="flex items-center gap-2 text-xs text-zinc-400"
                                    >
                                      <span
                                        className={`h-1 w-1 shrink-0 ${b.dot}`}
                                        aria-hidden="true"
                                      />
                                      <span className="truncate">{name}</span>
                                    </li>
                                  ))}
                                </ul>

                                {remaining > 0 && (
                                  <div className="mt-2 font-mono text-[10px] uppercase tracking-wide text-zinc-600">
                                    +{remaining} more
                                  </div>
                                )}

                                <Link
                                  to="/team/students"
                                  className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-400 transition-colors duration-200 hover:text-white"
                                >
                                  View roster
                                  <span aria-hidden="true">→</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            HOW WE LEAD
        ========================================================= */}
        <section className="border-b border-zinc-800 bg-zinc-950">
          <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <PlaceholderImage
                label="LEADERSHIP — CAPTAINS AT WHITEBOARD PLACEHOLDER"
                className="aspect-[4/3]"
              />

              <div className="border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="text-xs font-black uppercase tracking-[0.12em] text-white">
                  How We Lead
                </h2>

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
                <div className="mt-6 flex flex-wrap gap-3">
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