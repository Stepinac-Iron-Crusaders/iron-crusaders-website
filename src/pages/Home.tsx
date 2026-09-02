import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PlaceholderImage } from "../components/PlaceholderImage";
import SponsorsGrid from "../components/SponsorsGrid";
import { SPONSORS } from "../data/sponsors";
import { gsap } from "../lib/gsap";
import { Reveal } from "../components/Reveal";
import { TiltCard } from "../components/TiltCard";
import { MagneticWrap } from "../components/MagneticButton";
import { CountUp } from "../components/CountUp";
import { Marquee } from "../components/Marquee";

const STATS = {
  students: "20+",
  awards: "N/A",
  competitions: "ROOKIE",
  founded: "2026",
} as const;

function KickoffCountdown() {
  const kickoff = new Date("2027-01-09T12:00:00-05:00").getTime();

  const getTimeLeft = () => {
    const difference = kickoff - Date.now();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useLayoutEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-4 py-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" />

              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-red-500">
                2027 FRC Season
              </span>
            </div>

            <h2 className="mt-1 text-sm font-black uppercase tracking-[0.08em] text-white">
              Countdown to Kickoff
            </h2>

            <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-zinc-500">
              January 9, 2027 • 12:00 PM ET
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="min-w-[58px] border border-zinc-800 bg-zinc-900 px-2 py-2.5 text-center sm:min-w-[72px] sm:px-3"
              >
                <div className="font-mono text-xl font-bold tabular-nums text-white sm:text-2xl">
                  {String(unit.value).padStart(2, "0")}
                </div>

                <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-zinc-500">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SponsorCountdown() {
  const deadline = new Date("2026-11-17T17:00:00-05:00").getTime();

  const getTimeLeft = () => {
    const difference = deadline - Date.now();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="mt-5 w-full max-w-xl border border-red-900/50 bg-red-950/20 px-4 py-3">
      <div className="mb-2 text-center font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-red-500">
        Time Left to Sponsor
      </div>

      <div className="grid grid-cols-4 gap-2">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="border border-zinc-800 bg-zinc-950 px-2 py-2 text-center"
          >
            <div className="font-mono text-lg font-bold tabular-nums text-white">
              {String(unit.value).padStart(2, "0")}
            </div>

            <div className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.12em] text-zinc-500">
              {unit.label}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-wide text-zinc-600">
        Sponsorship registration closes November 17, 2026 • 5:00 PM ET
      </p>
    </div>
  );
}


export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  // ---- Hero entrance + scroll parallax ----
  useLayoutEffect(() => {
    const page = pageRef.current;
    const hero = heroRef.current;
    const imgWrap = heroImageRef.current;
    if (!page || !hero || !imgWrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // HERO ENTRANCE TIMELINE
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero-badge]", { y: 16, autoAlpha: 0, duration: 0.7, ease: "power3.out" }, 0.12)
        .from(
          "[data-hero-title-line]",
          { yPercent: 105, autoAlpha: 0, duration: 1.05, stagger: 0.12, ease: "expo.out" },
          0.22
        )
        .from("[data-hero-border]", { scaleY: 0, transformOrigin: "top", duration: 0.6, ease: "power3.out" }, 0.55)
        .from("[data-hero-copy]", { y: 16, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }, 0.62)
        .from("[data-hero-cta]", { y: 14, autoAlpha: 0, duration: 0.65, stagger: 0.09, ease: "back.out(1.4)" }, 0.78)
        .from("[data-hero-meta]", { autoAlpha: 0, duration: 0.6, ease: "power2.out" }, 0.95)
        // image mask reveal
        .fromTo(
          "[data-hero-image]",
          { clipPath: "inset(0 100% 0 0)", scale: 1.06 },
          { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.15, ease: "expo.out" },
          0.32
        )
        .from("[data-hero-caption]", { y: 10, autoAlpha: 0, duration: 0.5 }, 1.0);

      // parallax on hero grid + orb
      gsap.to("[data-hero-grid]", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to("[data-hero-orb]", {
        yPercent: -18,
        xPercent: 4,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.6,
        },
      });

      // subtle parallax on hero image
      gsap.to(imgWrap, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      // stagger reveals for sections below (generic)
      const sections = page.querySelectorAll<HTMLElement>("[data-section]");
      sections.forEach((section) => {
        const heads = section.querySelectorAll<HTMLElement>("[data-reveal-head]");
        const cards = section.querySelectorAll<HTMLElement>("[data-reveal-card]");
        const lines = section.querySelectorAll<HTMLElement>("[data-reveal-line]");

        if (heads.length) {
          gsap.from(heads, {
            y: 22,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              once: true,
            },
          });
        }
        if (cards.length) {
          gsap.from(cards, {
            y: 26,
            autoAlpha: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              once: true,
            },
          });
        }
        if (lines.length) {
          gsap.from(lines, {
            y: 16,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              once: true,
            },
          });
        }
      });

      // stats numbers already handled by CountUp, but stagger their containers
      gsap.from("[data-stat]", {
        y: 20,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-stats-grid]",
          start: "top 92%",
          once: true,
        },
      });

      // Mission cards have extra inner parallax icon
      gsap.utils.toArray<HTMLElement>("[data-mission-card]").forEach((card) => {
        const icon = card.querySelector("[data-mission-icon]");
        if (!icon) return;
        gsap.to(icon, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        });
      });

      // sponsors fade in stagger
      gsap.from("[data-sponsor-item]", {
        y: 14,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-sponsors-grid]",
          start: "top 90%",
          once: true,
        },
      });

      // CTA parallax background shift
      gsap.to("[data-cta-grid]", {
        xPercent: 3,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-cta]",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.3,
        },
      });

      // image parallax for workshop image
      const workshop = page.querySelector<HTMLElement>("[data-parallax-wrap]");
      if (workshop) {
        gsap.to(workshop, {
          yPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: workshop,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // In-progress cards reveal with clip
      gsap.utils.toArray<HTMLElement>("[data-progress-card]").forEach((card) => {
        gsap.from(card, {
          y: 18,
          autoAlpha: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
          },
        });
        const bar = card.querySelector<HTMLElement>("[data-progress-bar]");
        if (bar) {
          gsap.from(bar, {
            scaleX: 0,
            transformOrigin: "left",
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
            delay: 0.25,
          });
        }
      });
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="overflow-x-clip">
      <KickoffCountdown />
      
      {/* ===================================== 1. HERO ===================================== */}
      <section
        ref={heroRef}
        className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950"
      >
        {/* grid */}
        <div
          data-hero-grid
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035] will-change-transform"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* soft red orb */}
        <div
          data-hero-orb
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-10 h-[520px] w-[520px] rounded-full bg-red-600/10 blur-[90px] will-change-transform md:h-[680px] md:w-[680px]"
        />
        <div
          data-hero-orb
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[80px] will-change-transform"
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
            <div>
              <div
                data-hero-badge
                className="mb-6 inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900 px-3 py-1.5 will-change-transform"
              >
                <span className="h-1.5 w-1.5 bg-red-600 animate-pulse" aria-hidden="true" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  FRC Team • Archbishop Stepinac
                </span>
                <span className="hidden h-3 w-px bg-zinc-700 sm:block" aria-hidden="true" />
                <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500 sm:inline">
                  White Plains, NY
                </span>
              </div>

              <h1 className="font-sans text-[40px] font-black uppercase leading-[0.9] tracking-[-0.03em] text-white sm:text-[56px] lg:text-[72px]">
                <span
                  data-hero-title-line
                  className="block overflow-hidden will-change-transform"
                >
                  <span className="block">Iron</span>
                </span>
                <span
                  data-hero-title-line
                  className="block overflow-hidden will-change-transform"
                >
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-zinc-400">
                    Crusaders
                  </span>
                </span>
              </h1>

              <div data-hero-border className="mt-4 border-l-2 border-red-600 pl-4 will-change-transform origin-top">
                <p
                  data-hero-copy
                  className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400"
                >
                  Archbishop Stepinac High School
                  <span className="mx-2 text-zinc-600">|</span>
                  <span className="text-zinc-300">FIRST Robotics Competition</span>
                </p>

                <p
                  data-hero-copy
                  className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-zinc-300"
                >
                  Engineering. Competition. Community. We design, build, and compete with purposeful robots — and
                  build the next generation of engineers along the way.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticWrap>
                  <Link
                    data-hero-cta
                    to="/team/about"
                    data-cursor="hover"
                    className="inline-flex items-center justify-center bg-red-600 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_8px_30px_rgba(220,38,38,0.35)] transition-colors hover:bg-red-700 will-change-transform"
                  >
                    Meet the Team
                  </Link>
                </MagneticWrap>

                <MagneticWrap strength={0.28}>
                  <Link
                    data-hero-cta
                    to="/robots/current"
                    data-cursor="hover"
                    className="group inline-flex items-center justify-center border border-blue-600 bg-transparent px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all hover:border-blue-500 hover:bg-blue-600/10 will-change-transform"
                  >
                    <span>Our Robot</span>
                    <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </MagneticWrap>
              </div>

              <div
                data-hero-meta
                className="mt-8 flex flex-wrap items-center gap-6 border-t border-zinc-800 pt-6"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">Season</span>
                  <span className="text-sm font-semibold text-white">2026-2027</span>
                </div>

                <span className="hidden h-4 w-px bg-zinc-800 sm:block" aria-hidden="true" />

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)] animate-pulse" aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-wide text-zinc-400">
                    Biocore build season inactive
                  </span>
                </div>
              </div>
            </div>

            <div ref={heroImageRef} className="relative will-change-transform">
              <div className="absolute -inset-1 hidden border border-zinc-800 lg:block" aria-hidden="true" />
              {/* subtle floating ring */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -top-3 hidden h-24 w-24 border border-red-600/20 lg:block"
              />
              <div
                data-hero-image
                className="relative overflow-hidden will-change-transform"
                style={{ clipPath: "inset(0 0% 0 0)" }}
              >
                <PlaceholderImage label="HERO IMAGE PLACEHOLDER" className="aspect-[16/10] lg:aspect-[4/3] rounded-none" />
                {/* gloss */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.08] opacity-0 transition-opacity duration-700 hover:opacity-100" />
              </div>

              <div
                data-hero-caption
                className="flex items-center justify-between border-x border-b border-zinc-800 bg-zinc-900 px-4 py-3 will-change-transform"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                  Pit • Competition Floor • 2025
                </span>

                <span className="font-mono text-[11px] text-zinc-600">IMG_001 — 3840×2160</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* ===================================== 2. WHO WE ARE ===================================== */}
      <section data-section className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div data-reveal-head className="mb-6 flex items-center gap-3 will-change-transform">
                <span className="h-px w-8 bg-red-600" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-red-500">
                  Who We Are
                </span>
              </div>

              <h2
                data-reveal-head
                className="text-[28px] font-black uppercase leading-[0.95] tracking-[-0.02em] text-white sm:text-[36px] will-change-transform"
              >
                A team built on
                <br />
                <span className="text-zinc-300">engineering</span> &amp; community.
              </h2>

              <div data-reveal-line className="mt-6 space-y-4 text-[15px] leading-7 text-zinc-300 will-change-transform">
                <p>
                  The Iron Crusaders are the FIRST Robotics Competition team from Archbishop Stepinac High School in
                  White Plains, New York. We unite students, mentors, and alumni around a single mission: build
                  competitive robots while teaching STEM to the next generation.
                </p>

                <p className="text-zinc-400">
                  From CAD and fabrication to programming, strategy, and outreach — every student finds a role. We
                  compete at the highest level of FRC while leading STEM initiatives across Westchester County.
                </p>
              </div>

              <ul data-reveal-line className="mt-8 grid gap-3 border-t border-zinc-800 pt-6 sm:grid-cols-2 will-change-transform">
                {[
                  "Student-led design & fabrication",
                  "Python/C++ & SSLAM autonomy",
                  "Community STEM outreach",
                  "Professional mentorship",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-blue-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div data-reveal-line className="mt-8 flex gap-3 will-change-transform">
                <MagneticWrap>
                  <Link
                    to="/team/about"
                    data-cursor="hover"
                    className="inline-flex items-center gap-2 border border-zinc-700 bg-zinc-950 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-zinc-600"
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
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      <path d="M3 7h8M7 3l4 4-4 4" />
                    </svg>
                  </Link>
                </MagneticWrap>

                <a
                  href="https://stepinac.org"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400 transition-colors hover:text-white focus-visible:outline-none"
                >
                  School Website →
                </a>
              </div>
            </div>

            <div data-reveal-card className="relative will-change-transform" data-parallax-wrap>
              <div className="relative overflow-hidden">
                <PlaceholderImage label="TEAM WORKSHOP IMAGE PLACEHOLDER" className="aspect-[4/3] rounded-none" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent" />
              </div>

              <div className="absolute -bottom-4 -left-4 hidden border border-zinc-700 bg-zinc-950 p-4 shadow-xl lg:flex lg:items-center lg:gap-4 will-change-transform">
                <div className="flex h-10 w-10 items-center justify-center bg-red-600 text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6M10 13H8M16 17H8M13 13h1.5a2 2 0 0 1 0 4H13" />
                  </svg>
                </div>

                <div>
                  <div className="text-sm font-bold uppercase tracking-wide text-white">STEM Certified</div>
                  <div className="font-mono text-xs text-zinc-500">Outreach</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================== OUR ROBOT — IN PROGRESS ===================================== */}
      <section data-section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
          <div
            data-progress-card
            className="group relative flex min-h-[300px] items-center justify-center overflow-hidden border border-zinc-800 bg-zinc-900 will-change-transform"
          >
            {/* subtle hover glow */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-blue-600/10 via-transparent to-red-600/10" />
            <div className="max-w-xl px-6 py-12 text-center relative">
              <div data-reveal-head className="mb-6 flex justify-center will-change-transform">
                <div className="inline-flex items-center gap-2 border border-zinc-700 bg-zinc-950 px-4 py-2">
                  <span className="h-2 w-2 animate-pulse bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.7)]" />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                    Page In Progress
                  </span>
                </div>
              </div>

              <div data-reveal-head className="mb-3 flex items-center justify-center gap-3 will-change-transform">
                <span className="h-px w-8 bg-blue-600" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-blue-500">
                  Current Machine
                </span>
                <span className="h-px w-8 bg-blue-600" />
              </div>

              <h2 data-reveal-head className="text-[30px] font-black uppercase tracking-[-0.02em] text-white sm:text-[38px] will-change-transform">
                Our Robot
              </h2>

              <p data-reveal-line className="mt-4 text-sm leading-relaxed text-zinc-400 will-change-transform">
                We’re currently documenting our competition robot, including its drivetrain, mechanisms, electronics,
                software, and autonomous systems.
              </p>

              <div className="mx-auto mt-6 h-1 w-48 bg-zinc-800 overflow-hidden">
                <div data-progress-bar className="h-1 w-[45%] bg-blue-600 origin-left will-change-transform" />
              </div>

              <p data-reveal-line className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600 will-change-transform">
                Robot documentation in progress
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================== 4. THE TEAM ===================================== */}
      <section data-section id="team" className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div data-reveal-head className="mb-3 flex items-center justify-center gap-3 will-change-transform">
              <span className="h-px w-8 bg-zinc-700" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                The People
              </span>
              <span className="h-px w-8 bg-zinc-700" aria-hidden="true" />
            </div>

            <h2
              data-reveal-head
              className="text-[28px] font-black uppercase tracking-[-0.02em] text-white sm:text-[36px] will-change-transform"
            >
              The Team
            </h2>

            <p data-reveal-line className="mt-3 text-sm leading-relaxed text-zinc-400 will-change-transform">
              Students lead. Mentors guide. Leadership delivers. Every subteam ships.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Students",
                to: "/team/students",
                desc: "Design, fabrication, programming, and strategy — students own every subsystem and every match.",
                count: "20+ Members",
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
              <TiltCard key={card.title} className="h-full" intensity={7}>
                <div
                  data-reveal-card
                  data-cursor="hover"
                  className="group flex h-full flex-col border border-zinc-800 bg-zinc-950 p-6 transition-colors duration-300 hover:border-zinc-700 hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] will-change-transform"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center border will-change-transform ${
                        card.accent === "red"
                          ? "border-red-900/50 bg-red-600 text-white shadow-[0_8px_20px_rgba(220,38,38,0.35)]"
                          : card.accent === "blue"
                            ? "border-blue-900/50 bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.35)]"
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

                  <h3 className="mt-6 text-sm font-black uppercase tracking-[0.08em] text-white">{card.title}</h3>

                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{card.desc}</p>

                  <div className="mt-6 flex items-center gap-3 border-t border-zinc-800 pt-4">
                    <div className="flex -space-x-2">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="h-8 w-8 rounded-full border-2 border-zinc-950 bg-zinc-800"
                          style={{
                            background: "linear-gradient(135deg, #27272a 0%, #3f3f46 100%)",
                          }}
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    <span className="font-mono text-xs text-zinc-500">Meet the crew →</span>
                  </div>

                  <Link
                    to={card.to}
                    className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.1em] text-zinc-300 transition-colors group-hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600"
                  >
                    View {card.title}
                    <span aria-hidden="true" className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================== 5. OUR MISSION ===================================== */}
      <section data-section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div data-reveal-head className="will-change-transform">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-red-600" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-red-500">
                  Why We Build
                </span>
              </div>

              <h2 className="text-[28px] font-black uppercase tracking-[-0.02em] text-white sm:text-[36px]">Our Mission</h2>
            </div>

            <p data-reveal-line className="max-w-[44ch] text-sm leading-relaxed text-zinc-400 will-change-transform">
              Six pillars. One standard: do hard things well, and bring others with you.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Engineering",
                desc: "Rigorous design, tolerancing, and iteration. We measure twice, cut once — then test to failure.",
                icon: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z",
              },
              {
                title: "STEM",
                desc: "Real tools, real code, real physics. From CAD to controls — students ship production systems.",
                icon: "M10 2v7.5L7.5 15a1 1 0 0 0 .6 1.2l.4.1h7a1 1 0 0 0 .6-1.2L13 9.5V2a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1z M9 12h6 M9 16h6 M8 2h8",
              },
              {
                title: "Leadership",
                desc: "Ownership, accountability, and clear communication when pressure is highest.",
                icon: "M12 4l2 3h4l-3 2 1 4-4-3-4 3 1-4-3-2h4z M12 14v6 M8 18h8",
              },
              {
                title: "Collaboration",
                desc: "Mechanical, electrical, and software — one team, one robot, one pit crew.",
                icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
              },
              {
                title: "Innovation",
                desc: "Prototype fast, validate faster. We chase 1% gains that win matches.",
                icon: "M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z M9 18h6 M10 22h4",
              },
              {
                title: "Community",
                desc: "We teach what we learn — hosting workshops, demos, and STEM nights across Westchester.",
                icon: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2.08C10.5 3.5 9.26 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7z",
              },
            ].map((card) => (
              <div
                key={card.title}
                data-reveal-card
                data-mission-card
                data-cursor="hover"
                className="group relative overflow-hidden border border-zinc-800 bg-zinc-900 p-6 transition-colors duration-300 hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] will-change-transform"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-red-600/10 via-transparent to-blue-600/10" />
                <div
                  data-mission-icon
                  className="relative flex h-9 w-9 items-center justify-center border border-zinc-700 bg-zinc-950 text-zinc-300 will-change-transform"
                >
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

                <h3 className="relative mt-4 text-xs font-black uppercase tracking-[0.12em] text-white">{card.title}</h3>

                <p className="relative mt-2 text-sm leading-relaxed text-zinc-400">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================== OUTREACH — IN PROGRESS ===================================== */}
      <section data-section className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
          <div
            data-progress-card
            className="group relative flex min-h-[300px] items-center justify-center overflow-hidden border border-zinc-800 bg-zinc-950 will-change-transform"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-blue-600/10 via-transparent to-red-600/10" />
            <div className="max-w-xl px-6 py-12 text-center relative">
              <div data-reveal-head className="mb-6 flex justify-center will-change-transform">
                <div className="inline-flex items-center gap-2 border border-zinc-700 bg-zinc-900 px-4 py-2">
                  <span className="h-2 w-2 animate-pulse bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.7)]" />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                    Page In Progress
                  </span>
                </div>
              </div>

              <div data-reveal-head className="mb-3 flex items-center justify-center gap-3 will-change-transform">
                <span className="h-px w-8 bg-blue-600" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-blue-500">
                  Beyond the Field
                </span>
                <span className="h-px w-8 bg-blue-600" />
              </div>

              <h2 data-reveal-head className="text-[30px] font-black uppercase tracking-[-0.02em] text-white sm:text-[38px] will-change-transform">
                Outreach
              </h2>

              <p data-reveal-line className="mt-4 text-sm leading-relaxed text-zinc-400 will-change-transform">
                We’re currently building our outreach section to showcase STEM programs, school visits, workshops,
                community events, and mentorship.
              </p>

              <div className="mx-auto mt-6 h-1 w-48 bg-zinc-800 overflow-hidden">
                <div data-progress-bar className="h-1 w-[45%] bg-blue-600 origin-left will-change-transform" />
              </div>

              <p data-reveal-line className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600 will-change-transform">
                Outreach system in progress
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================== 7. ACHIEVEMENTS ===================================== */}
      <section data-section className="relative overflow-hidden border-y border-zinc-800 bg-zinc-950" aria-label="Achievements">
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
          <div data-stats-grid className="grid gap-8 divide-zinc-800 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x">
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
              <div key={stat.label} data-stat className="px-2 text-center lg:px-6 will-change-transform">
                <div className="font-sans text-[42px] font-black leading-none tracking-[-0.03em] text-white sm:text-[48px]">
                  <CountUp
                    value={stat.value}
                    className="tabular-nums"
                  />
                </div>

                <div className="mt-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-red-500">{stat.label}</div>

                <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-zinc-500">{stat.sub}</div>
              </div>
            ))}
          </div>

          <div
            data-reveal-line
            className="mt-10 flex flex-wrap items-center justify-center gap-3 border-t border-zinc-800 pt-8 will-change-transform"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">Competing in</span>
            <span className="border border-zinc-800 bg-zinc-900 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wide text-white">
              FIRST Robotics Competition
            </span>
            <span className="hidden h-4 w-px bg-zinc-800 sm:block" aria-hidden="true" />
            <span className="font-mono text-xs text-zinc-400">Hudson Valley • NYC Regionals</span>
          </div>
        </div>
      </section>

      {/* ===================================== 8. SPONSORS ===================================== */}
      <section data-section id="sponsors" className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div data-reveal-head className="mb-3 flex items-center justify-center gap-3 will-change-transform">
              <span className="h-px w-8 bg-zinc-700" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Partners</span>
              <span className="h-px w-8 bg-zinc-700" aria-hidden="true" />
            </div>

            <h2
              data-reveal-head
              className="text-[28px] font-black uppercase tracking-[-0.02em] text-white sm:text-[36px] will-change-transform"
            >
              Our Sponsors
            </h2>

            <p data-reveal-line className="mt-3 text-sm leading-relaxed text-zinc-400 will-change-transform">
              Industry and community partners who make our season possible — from materials and machining to travel and
              outreach.
            </p>
          </div>

          <div data-sponsors-grid className="mt-10">
            <div className="[&_[data-sponsor-item]]:will-change-transform">
              <SponsorsGrid sponsors={SPONSORS} />
            </div>
          </div>

          <div
            data-reveal-line
            className="mt-10 flex flex-col items-center gap-4 border-t border-zinc-800 pt-10 will-change-transform"
          >
            <p className="max-w-[48ch] text-center text-sm leading-relaxed text-zinc-400">
              Want your logo here? Sponsor a competitive, student-led engineering program with proven community impact.
            </p>
          
            <MagneticWrap>
              <Link
                to="/sponsors"
                data-cursor="hover"
                className="inline-flex items-center justify-center bg-red-600 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_30px_rgba(220,38,38,0.35)] transition-colors hover:bg-red-700"
              >
                Become a Sponsor
              </Link>
            </MagneticWrap>
          
            <SponsorCountdown />
          
            <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-600">
              501(c)(3) • Tax-deductible • Tier packages available
            </span>
          </div>
        </div>
      </section>

      {/* ===================================== LATEST NEWS — IN PROGRESS ===================================== */}
      <section data-section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-8 lg:py-20">
          <div
            data-progress-card
            className="group relative flex min-h-[300px] items-center justify-center overflow-hidden border border-zinc-800 bg-zinc-900 will-change-transform"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-zinc-700/10 via-transparent to-red-600/10" />
            <div className="max-w-xl px-6 py-12 text-center relative">
              <div data-reveal-head className="mb-6 flex justify-center will-change-transform">
                <div className="inline-flex items-center gap-2 border border-zinc-700 bg-zinc-950 px-4 py-2">
                  <span className="h-2 w-2 animate-pulse bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.7)]" />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                    Page In Progress
                  </span>
                </div>
              </div>

              <div data-reveal-head className="mb-3 flex items-center justify-center gap-3 will-change-transform">
                <span className="h-px w-8 bg-zinc-700" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Updates</span>
                <span className="h-px w-8 bg-zinc-700" />
              </div>

              <h2 data-reveal-head className="text-[30px] font-black uppercase tracking-[-0.02em] text-white sm:text-[38px] will-change-transform">
                Latest News
              </h2>

              <p data-reveal-line className="mt-4 text-sm leading-relaxed text-zinc-400 will-change-transform">
                We’re preparing our news and media system. Team updates, competition reports, project announcements, and
                community stories will appear here.
              </p>

              <div className="mx-auto mt-6 h-1 w-48 bg-zinc-800 overflow-hidden">
                <div data-progress-bar className="h-1 w-[45%] bg-blue-600 origin-left will-change-transform" />
              </div>

              <p data-reveal-line className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600 will-change-transform">
                News system in progress
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================== 10. FINAL CTA ===================================== */}
      <section data-cta className="relative overflow-hidden bg-red-600" aria-label="Call to action">
        <div
          data-cta-grid
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08] will-change-transform"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* soft glow */}
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/15 blur-[50px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-black/10 blur-[60px]" />

        <div className="relative mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-14">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-10">
            <Reveal y={18} triggerStart="top 95%">
              <h2 className="max-w-[18ch] text-center text-[26px] font-black uppercase leading-[0.95] tracking-[-0.02em] text-white sm:text-[32px] lg:text-left lg:text-[36px]">
                Build the future.
                <br />
                <span className="text-white/90">Support the Iron Crusaders.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12} y={18} triggerStart="top 96%">
              <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row">
                <MagneticWrap>
                  <Link
                    to="/sponsors"
                    data-cursor="hover"
                    className="inline-flex items-center justify-center bg-white px-8 py-4 text-xs font-black uppercase tracking-[0.14em] text-red-600 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all hover:bg-zinc-50"
                  >
                    Sponsor Us
                  </Link>
                </MagneticWrap>

                <span className="hidden font-mono text-xs uppercase tracking-wide text-red-100 sm:inline">
                  Tax-deductible • Contact us today
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
