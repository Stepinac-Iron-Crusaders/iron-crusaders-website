import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatedPage } from "../components/AnimatedPage";
import { gsap } from "../lib/gsap";

export default function Events() {
  const emptyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const card = emptyRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // float icon
      const icon = card.querySelector("[data-empty-icon]") as HTMLElement | null;
      if (icon) {
        gsap.to(icon, {
          y: -6,
          duration: 1.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        gsap.to(icon, {
          rotate: 1.5,
          duration: 2.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // shimmer bar
      const shimmer = card.querySelector("[data-shimmer]") as HTMLElement | null;
      if (shimmer) {
        gsap.to(shimmer, {
          xPercent: 100,
          duration: 1.4,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 1.2,
        });
      }

      // dots pulse stagger
      const dots = card.querySelectorAll<HTMLElement>("[data-dot]");
      if (dots.length) {
        gsap.to(dots, {
          scale: 1.25,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // subtle card parallax on scroll
      gsap.to(card, {
        yPercent: -2,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, card);

    return () => ctx.revert();
  }, []);

  return (
    <AnimatedPage>
      <>
        <section className="border-b border-zinc-800 bg-zinc-950">
          <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
              <Link to="/" className="hover:text-white">
                Home
              </Link>
              <span className="text-zinc-700">/</span>
              <span className="text-zinc-300">Events</span>
            </div>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-8 bg-zinc-700" aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    Calendar 2025–2026
                  </span>
                </div>
                <h1 className="text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[52px]">Events</h1>
                <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-zinc-400">
                  Regionals, offseasons, and community dates. Build season is sacred — attendance and punctuality matter.
                </p>
              </div>
              <a
                href="#"
                className="inline-flex border border-zinc-800 bg-zinc-900 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800"
              >
                Add to Calendar • ICS
              </a>
            </div>
          </div>
        </section>

        {/* ——— Nothing to see here yet ——— */}
        <section className="bg-zinc-900">
          <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
            <div
              ref={emptyRef}
              className="group relative overflow-hidden border border-zinc-800 bg-zinc-950 will-change-transform"
            >
              {/* grid + glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-[70px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-red-600/10 blur-[70px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="relative flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
                {/* top badge */}
                <div className="mb-8 inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 bg-blue-600 animate-pulse" aria-hidden="true" />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                    Season 2025–2026 • Coming Soon
                  </span>
                </div>

                {/* icon */}
                <div
                  data-empty-icon
                  className="relative flex h-20 w-20 items-center justify-center border border-zinc-800 bg-zinc-900 will-change-transform"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" aria-hidden="true" />
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="relative text-zinc-300"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="16" rx="1.5" />
                    <path d="M8 2v4M16 2v4M3 9h18" />
                    <path d="M8 13h2M12 13h2M8 17h2M12 17h2" strokeLinecap="round" />
                  </svg>
                  {/* corner accents */}
                  <span className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t border-zinc-700" aria-hidden="true" />
                  <span className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t border-zinc-700" aria-hidden="true" />
                  <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-zinc-700" aria-hidden="true" />
                  <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-zinc-700" aria-hidden="true" />
                </div>

                <h2 className="mt-8 text-[28px] font-black uppercase tracking-[-0.02em] text-white sm:text-[32px]">
                  Nothing to see here yet
                </h2>
                <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-zinc-400">
                  Our event calendar is being finalized. Once regionals, offseasons, and outreach dates are locked, they’ll appear here with dates, locations, and results.
                </p>

                {/* animated dots */}
                <div className="mt-6 flex items-center gap-2">
                  <span data-dot className="h-1.5 w-1.5 rounded-full bg-zinc-700 opacity-60" aria-hidden="true" />
                  <span data-dot className="h-1.5 w-1.5 rounded-full bg-zinc-600 opacity-60" aria-hidden="true" />
                  <span data-dot className="h-1.5 w-1.5 rounded-full bg-blue-600 opacity-60" aria-hidden="true" />
                </div>

                {/* shimmer skeleton */}
                <div className="relative mt-8 h-1 w-48 overflow-hidden bg-zinc-800">
                  <div data-shimmer className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent" style={{ x: "-100%" } as unknown as React.CSSProperties} />
                  <div className="absolute inset-0 flex">
                    <div className="h-full w-[45%] bg-blue-600/0" />
                  </div>
                </div>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">Calendar loading</p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-zinc-900 hover:bg-zinc-100"
                  >
                    Get Notified
                    <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    to="/team/about"
                    className="inline-flex items-center justify-center border border-zinc-700 bg-zinc-900 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800"
                  >
                    About the Team
                  </Link>
                </div>

                <p className="mt-6 font-mono text-[11px] uppercase tracking-wide text-zinc-600">
                  Rookie season • First events drop after kickoff
                </p>
              </div>

              {/* bottom hairline */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
            </div>

            {/* secondary info — still useful, animated via AnimatedPage */}
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">Weekly Cadence</h3>
                <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                  <li className="flex justify-between border-b border-zinc-800 pb-3">
                    <span className="text-zinc-300">Build Season (Jan–Mar)</span>
                    <span className="font-mono text-xs">Tue/Thu 3:30–7 • Sat 9–4</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-800 pb-3">
                    <span className="text-zinc-300">Offseason</span>
                    <span className="font-mono text-xs">Thu 3:30–6 + event prep</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-zinc-300">Summer</span>
                    <span className="font-mono text-xs">Workshops weekly</span>
                  </li>
                </ul>
              </div>
              <div className="border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">Location</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  Archbishop Stepinac High School • 950 Mamaroneck Ave, White Plains, NY 10605
                  <br />
                  Room 112 — Engineering Lab. Enter via gym lot; buzz “Robotics”.
                </p>
                <a
                  href="https://maps.google.com/?q=950+Mamaroneck+Ave+White+Plains+NY"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex border border-zinc-700 bg-zinc-900 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800"
                >
                  Open in Maps →
                </a>
              </div>
            </div>
          </div>
        </section>
      </>
    </AnimatedPage>
  );
}
