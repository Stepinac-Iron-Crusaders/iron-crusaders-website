import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatedPage } from "../components/AnimatedPage";
import { gsap } from "../lib/gsap";

export default function Media() {
  const emptyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const card = emptyRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const icon = card.querySelector("[data-empty-icon]") as HTMLElement | null;
      if (icon) {
        gsap.to(icon, {
          y: -6,
          duration: 1.9,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        gsap.to(icon, {
          rotate: 1.2,
          duration: 2.7,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
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
      gsap.to(card, {
        yPercent: -1.5,
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
              <span className="text-zinc-300">Media</span>
            </div>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-8 bg-zinc-700" aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    Photos • Videos • Press
                  </span>
                </div>
                <h1 className="text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[52px]">Media</h1>
                <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-zinc-400">
                  Reveal videos, match footage, pit photos — every season documented.
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href="https://www.instagram.com/stepinacrobotics/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:opacity-90"
                >
                  Instagram →
                </a>
              </div>
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
                className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-pink-600/10 blur-[70px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-purple-600/10 blur-[70px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="relative flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
                <div className="mb-8 inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 bg-pink-600 animate-pulse" aria-hidden="true" />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                    Gallery • Coming Soon
                  </span>
                </div>

                <div
                  data-empty-icon
                  className="relative flex h-20 w-20 items-center justify-center border border-zinc-800 bg-zinc-900 will-change-transform"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" aria-hidden="true" />
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="relative text-zinc-300"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="1.5" />
                    <path d="M3 16l5-5 4 4 3-3 6 6" />
                    <circle cx="9" cy="9" r="1.7" />
                    <circle cx="15" cy="12" r="3.2" />
                    <path d="M15 10.2a1.8 1.8 0 0 1 1.8 1.8" />
                  </svg>
                  <span className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t border-zinc-700" aria-hidden="true" />
                  <span className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t border-zinc-700" aria-hidden="true" />
                  <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-zinc-700" aria-hidden="true" />
                  <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-zinc-700" aria-hidden="true" />
                </div>

                <h2 className="mt-8 text-[28px] font-black uppercase tracking-[-0.02em] text-white sm:text-[32px]">
                  Nothing to see here yet
                </h2>
                <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-zinc-400">
                  Our media archive is being built. Reveal videos, match footage, pit photos, and press will live here once our rookie season blasts off.
                </p>

                <div className="mt-6 flex items-center gap-2">
                  <span data-dot className="h-1.5 w-1.5 rounded-full bg-zinc-700 opacity-60" aria-hidden="true" />
                  <span data-dot className="h-1.5 w-1.5 rounded-full bg-zinc-600 opacity-60" aria-hidden="true" />
                  <span data-dot className="h-1.5 w-1.5 rounded-full bg-pink-600 opacity-60" aria-hidden="true" />
                </div>

                <div className="relative mt-8 h-1 w-48 overflow-hidden bg-zinc-800">
                  <div
                    data-shimmer
                    className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent"
                    style={{ x: "-100%" } as unknown as React.CSSProperties}
                  />
                </div>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">Gallery loading</p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <a
                    href="https://www.instagram.com/stepinacrobotics/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:opacity-90"
                  >
                    Follow on Instagram →
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center border border-zinc-700 bg-zinc-900 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800"
                  >
                    Get Notified
                  </Link>
                </div>

                <p className="mt-6 font-mono text-[11px] uppercase tracking-wide text-zinc-600">
                  Rookie season • First drops after kickoff
                </p>
              </div>

              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
            </div>
          </div>
        </section>
      </>
    </AnimatedPage>
  );
}
