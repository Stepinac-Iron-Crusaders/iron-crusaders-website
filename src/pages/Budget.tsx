import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedPage } from "../components/AnimatedPage";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import {
  BUDGET_CATEGORIES,
  BUDGET_PHASES,
  BUDGET_TOTAL,
  SEASON,
  budgetTotals,
  formatUSD,
} from "../data/budget";
import {
  FUNDRAISING_MILESTONES,
  FUNDRAISING_SHEET_ID,
  FUNDRAISING_SOURCES,
  FUNDRAISING_TARGET,
  fetchFundraising,
  fundraisingTotals,
  type FundraisingSource,
} from "../data/fundraising";

type SheetState = "idle" | "loading" | "live" | "fallback" | "error";

/** Counts a dollar figure up on scroll-in. */
function MoneyTicker({
  value,
  className,
  duration = 1.6,
}: {
  value: number;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = formatUSD(value);
      return;
    }

    const obj = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: value,
        duration,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => {
          el.textContent = formatUSD(Math.round(obj.n));
        },
      });
    }, el);

    return () => ctx.revert();
  }, [duration, value]);

  return <span ref={ref} className={className}>{formatUSD(0)}</span>;
}

/** A row in the fundraising ledger. */
function SourceRow({
  source,
  max,
  live,
}: {
  source: FundraisingSource;
  max: number;
  live: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const share = max > 0 ? (source.raised / max) * 100 : 0;

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(row, {
        x: -18,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: row, start: "top 94%", once: true },
      });

      gsap.fromTo(
        row.querySelector("[data-bar]"),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 94%", once: true },
        },
      );
    }, row);

    return () => ctx.revert();
  }, [share]);

  return (
    <div
      ref={rowRef}
      data-source-row
      className="group relative border-b border-zinc-800/80 py-4 last:border-b-0"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div className="flex items-center gap-2.5">
          <span className={`h-2 w-2 shrink-0 ${source.accent}`} aria-hidden="true" />
          <span className="text-sm font-bold text-white">{source.label}</span>
          {live && (
            <span className="border border-emerald-500/40 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-400">
              Live
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-3 font-mono">
          <span className="text-sm font-bold text-white">{formatUSD(source.raised)}</span>
          {source.pledged > 0 && (
            <span className="text-[11px] text-zinc-500">+{formatUSD(source.pledged)} pledged</span>
          )}
        </div>
      </div>

      <div className="mt-2.5 h-1 w-full overflow-hidden bg-zinc-900" aria-hidden="true">
        <div
          data-bar
          className={`h-full origin-left ${source.accent}`}
          style={{ width: `${share}%` }}
        />
      </div>
    </div>
  );
}

export default function Budget() {
  const rootRef = useRef<HTMLDivElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);

  const [sources, setSources] = useState<FundraisingSource[]>(FUNDRAISING_SOURCES);
  const [sheetState, setSheetState] = useState<SheetState>(
    FUNDRAISING_SHEET_ID ? "loading" : "idle",
  );

  // Live fundraising figures from the published Google Sheet.
  useEffect(() => {
    if (!FUNDRAISING_SHEET_ID) return;

    const controller = new AbortController();

    fetchFundraising(FUNDRAISING_SHEET_ID, controller.signal)
      .then((rows) => {
        setSources(rows);
        setSheetState("live");
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        console.warn("Fundraising sheet unavailable, using local figures:", err);
        setSheetState("error");
      });

    return () => controller.abort();
  }, []);

  const bTotals = useMemo(() => budgetTotals(), []);
  const fTotals = useMemo(() => fundraisingTotals(sources, FUNDRAISING_TARGET), [sources]);
  const maxSource = useMemo(
    () => Math.max(1, ...sources.map((s) => Math.max(s.raised, s.pledged))),
    [sources],
  );

  const sheetLabel: Record<SheetState, string> = {
    idle: "Static figures",
    loading: "Syncing sheet…",
    live: "Live from Google Sheets",
    fallback: "Local figures",
    error: "Sheet unreachable",
  };

  const sheetDot: Record<SheetState, string> = {
    idle: "bg-zinc-600",
    loading: "bg-amber-500 animate-pulse",
    live: "bg-emerald-500 animate-pulse",
    fallback: "bg-zinc-600",
    error: "bg-amber-500",
  };

  // Page-level motion: hero counter, gauge sweep, staggered cards.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero-line]", {
        y: 26,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.08,
      }, 0);

      tl.from("[data-hero-stat]", {
        y: 22,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.09,
      }, 0.15);

      // The fundraising gauge needle sweeps from empty (-90deg) to full
      // (+90deg), matching the semicircle arc drawn in the SVG below.
      if (gaugeRef.current) {
        gsap.fromTo(
          gaugeRef.current,
          { rotation: -90 },
          {
            rotation: -90 + (fTotals.progress / 100) * 180,
            duration: 1.8,
            ease: "expo.out",
            transformOrigin: "left bottom",
            scrollTrigger: { trigger: gaugeRef.current, start: "top 88%", once: true },
          },
        );
      }

      // Category cards cascade in.
      gsap.from("[data-cat-card]", {
        y: 30,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-cat-grid]",
          start: "top 85%",
          once: true,
        },
      });

      // Each category's fill bar grows from zero.
      gsap.utils.toArray<HTMLElement>("[data-cat-bar]").forEach((bar) => {
        const pct = Number(bar.dataset.pct ?? "0");
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: pct / 100,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: bar, start: "top 92%", once: true },
          },
        );
      });

      // Phase markers light up in sequence.
      gsap.from("[data-phase]", {
        scale: 0.7,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: "[data-phase-track]",
          start: "top 88%",
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [fTotals.progress]);

  return (
    <AnimatedPage>
      <div ref={rootRef}>
        {/* =========================================================
            PAGE HEADER
        ========================================================= */}
        <section className="border-b border-zinc-800 bg-zinc-950">
          <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
              <Link to="/" className="hover:text-white">
                Home
              </Link>

              <span className="text-zinc-700">/</span>

              <span className="text-zinc-300">Budget &amp; Fundraising</span>
            </div>

            <div className="mt-6 max-w-3xl">
              <div data-hero-line className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-zinc-700" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  {SEASON} Season • {formatUSD(BUDGET_TOTAL)} Budget
                </span>
              </div>

              <h1
                data-hero-line
                className="text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[48px]"
              >
                Where The Money Goes
              </h1>

              <p
                data-hero-line
                className="mt-4 text-[15px] leading-relaxed text-zinc-400"
              >
                Every dollar we raise is spent on the robot, the travel to get
                there, and the tools to build it. We publish the whole budget
                because a team that shows its numbers is easier to trust.
              </p>
            </div>

            {/* Headline numbers */}
            <div className="mt-10 grid gap-px border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
              <div data-hero-stat className="bg-zinc-950 p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                  Raised To Date
                </div>
                <div className="mt-2 text-2xl font-black text-white">
                  <MoneyTicker value={fTotals.raised} />
                </div>
                <div className="mt-1 font-mono text-[11px] text-emerald-500">
                  +{formatUSD(fTotals.pledged)} pledged
                </div>
              </div>

              <div data-hero-stat className="bg-zinc-950 p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                  Spent So Far
                </div>
                <div className="mt-2 text-2xl font-black text-white">
                  <MoneyTicker value={bTotals.spent} />
                </div>
                <div className="mt-1 font-mono text-[11px] text-zinc-500">
                  {bTotals.used.toFixed(0)}% of allocation
                </div>
              </div>

              <div data-hero-stat className="bg-zinc-950 p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                  Budget Remaining
                </div>
                <div className="mt-2 text-2xl font-black text-white">
                  <MoneyTicker value={bTotals.remaining} />
                </div>
                <div className="mt-1 font-mono text-[11px] text-zinc-500">
                  of {formatUSD(bTotals.allocated)} allocated
                </div>
              </div>

              <div data-hero-stat className="bg-zinc-950 p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                  Still To Raise
                </div>
                <div className="mt-2 text-2xl font-black text-white">
                  <MoneyTicker value={fTotals.remaining} />
                </div>
                <div className="mt-1 font-mono text-[11px] text-zinc-500">
                  to hit {formatUSD(FUNDRAISING_TARGET)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SPEND BREAKDOWN
        ========================================================= */}
        <section className="border-b border-zinc-800 bg-zinc-900">
          <div className="mx-auto max-w-[1280px] px-4 py-14 lg:px-8 lg:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-white">
                  Season Budget
                </h2>
                <p className="mt-2 max-w-[54ch] text-sm text-zinc-400">
                  Fixed allocation set at season planning. Each card tracks
                  planned spend against what we have actually spent.
                </p>
              </div>

              <div className="flex gap-px border border-zinc-800 bg-zinc-800 font-mono text-[11px]">
                <span className="bg-zinc-950 px-3 py-2 uppercase tracking-wide text-zinc-500">
                  Allocated <span className="text-white">{formatUSD(bTotals.allocated)}</span>
                </span>
                <span className="bg-zinc-950 px-3 py-2 uppercase tracking-wide text-zinc-500">
                  Planned <span className="text-white">{formatUSD(bTotals.planned)}</span>
                </span>
              </div>
            </div>

            <div data-cat-grid className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BUDGET_CATEGORIES.map((c) => {
                const used = c.allocated > 0 ? Math.min(100, (c.spent / c.allocated) * 100) : 0;
                const over = c.spent > c.allocated;

                return (
                  <article
                    key={c.id}
                    data-cat-card
                    className="group relative flex flex-col overflow-hidden border border-zinc-800 bg-zinc-950 p-5 transition-colors duration-200 hover:border-zinc-700"
                  >
                    <span
                      className={`absolute inset-x-0 top-0 h-0.5 ${c.accent}`}
                      aria-hidden="true"
                    />

                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-black uppercase tracking-[0.06em] text-white">
                        {c.label}
                      </h3>

                      <span
                        className={`shrink-0 font-mono text-[10px] font-bold uppercase tracking-wide ${
                          over ? "text-red-500" : used > 80 ? "text-amber-500" : "text-zinc-500"
                        }`}
                      >
                        {over ? "Over" : `${Math.round(used)}%`}
                      </span>
                    </div>

                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-white">
                        <MoneyTicker value={c.spent} duration={1.1} />
                      </span>
                      <span className="font-mono text-xs text-zinc-500">
                        / {formatUSD(c.allocated)}
                      </span>
                    </div>

                    <div className="mt-3 h-1.5 w-full overflow-hidden bg-zinc-900" aria-hidden="true">
                      <div
                        data-cat-bar
                        data-pct={used}
                        className={`h-full origin-left ${over ? "bg-red-500" : c.accent}`}
                        style={{ width: `${used}%` }}
                      />
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-zinc-400">{c.note}</p>

                    <div className="mt-auto flex items-baseline justify-between border-t border-zinc-800/80 pt-3 font-mono text-[10px] uppercase tracking-wide text-zinc-600">
                      <span>Planned {formatUSD(c.planned)}</span>
                      <span>{formatUSD(Math.max(0, c.allocated - c.spent))} left</span>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Season phases */}
            <div className="mt-10 border border-zinc-800 bg-zinc-950 p-5 lg:p-6">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                Budget Commit Timeline
              </h3>

              <div data-phase-track className="relative mt-6">
                <div
                  className="absolute left-0 right-0 top-[7px] h-px bg-zinc-800"
                  aria-hidden="true"
                />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {BUDGET_PHASES.map((p) => (
                    <div key={p.label} data-phase className="relative">
                      <span
                        className="relative z-10 block h-3.5 w-3.5 bg-zinc-900 ring-1 ring-zinc-600"
                        aria-hidden="true"
                      />
                      <div className="mt-3 text-xs font-black uppercase tracking-wide text-white">
                        {p.label}
                      </div>
                      <div className="mt-1 font-mono text-[11px] text-zinc-500">
                        {p.share}% committed
                      </div>
                      <div className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                        {p.caption}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FUNDRAISING
        ========================================================= */}
        <section className="border-b border-zinc-800 bg-zinc-950">
          <div className="mx-auto max-w-[1280px] px-4 py-14 lg:px-8 lg:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-white">
                  Fundraising
                </h2>
                <p className="mt-2 max-w-[54ch] text-sm text-zinc-400">
                  Cash received and pledges committed, tracked live against our{" "}
                  {formatUSD(FUNDRAISING_TARGET)} season goal.
                </p>
              </div>

              {/* Data provenance */}
              <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-900 px-3 py-2">
                <span className={`h-2 w-2 ${sheetDot[sheetState]}`} aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-400">
                  {sheetLabel[sheetState]}
                </span>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              {/* Gauge */}
              <div className="relative overflow-hidden border border-zinc-800 bg-zinc-900 p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                  Season Progress
                </div>

                {/* Half-circle gauge, drawn with two arcs */}
                <div className="relative mx-auto mt-8 h-[150px] w-[280px] max-w-full">
                  <svg viewBox="0 0 220 120" className="h-full w-full" aria-hidden="true">
                    <path
                      d="M20 110 A 90 90 0 0 1 200 110"
                      fill="none"
                      stroke="#27272a"
                      strokeWidth="12"
                      strokeLinecap="butt"
                    />
                    <path
                      d="M20 110 A 90 90 0 0 1 200 110"
                      fill="none"
                      stroke="#dc2626"
                      strokeWidth="12"
                      strokeLinecap="butt"
                      pathLength={100}
                      strokeDasharray={100}
                      strokeDashoffset={100 - fTotals.progress}
                    />
                  </svg>

                  {/* Needle. Pivots at the arc centre, which sits ~12px above
                      the container floor once the 220x120 viewBox is scaled. */}
                  <div
                    ref={gaugeRef}
                    className="absolute bottom-[12px] left-1/2 h-[112px] w-[2px] bg-white"
                    style={{ transform: "rotate(-90deg)", transformOrigin: "left bottom" }}
                    aria-hidden="true"
                  >
                    <span className="absolute -left-[3px] -top-[3px] h-2 w-2 bg-white" />
                  </div>

                  <div className="absolute inset-x-0 bottom-1 text-center">
                    <div className="text-2xl font-black text-white">
                      {fTotals.progress.toFixed(0)}%
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-px border border-zinc-800 bg-zinc-800">
                  <div className="flex items-baseline justify-between bg-zinc-950 px-4 py-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">
                      Cash In
                    </span>
                    <span className="font-mono text-sm font-bold text-white">
                      {formatUSD(fTotals.raised)}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between bg-zinc-950 px-4 py-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">
                      Pledged
                    </span>
                    <span className="font-mono text-sm font-bold text-zinc-300">
                      {formatUSD(fTotals.pledged)}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between bg-zinc-950 px-4 py-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">
                      Still Needed
                    </span>
                    <span className="font-mono text-sm font-bold text-red-500">
                      {formatUSD(fTotals.remaining)}
                    </span>
                  </div>
                </div>

                <p className="mt-4 font-mono text-[10px] leading-relaxed text-zinc-600">
                  Pledges are committed but not yet received, so they are shown
                  separately from cash in hand.
                </p>
              </div>

              {/* Ledger */}
              <div className="border border-zinc-800 bg-zinc-900 p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                    Where It Came From
                  </h3>
                  <span className="font-mono text-[10px] text-zinc-600">
                    peak {formatUSD(maxSource)}
                  </span>
                </div>

                <div className="mt-2">
                  {sources.map((s) => (
                    <SourceRow key={s.id} source={s} max={maxSource} live={sheetState === "live"} />
                  ))}
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div className="mt-6 border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                What The Money Unlocks
              </h3>

              <div className="mt-5 grid gap-px bg-zinc-800 sm:grid-cols-2 lg:grid-cols-5">
                {FUNDRAISING_MILESTONES.map((m) => {
                  const funded = m.reached || fTotals.total >= m.amount;
                  const pct = Math.min(100, (fTotals.total / m.amount) * 100);

                  return (
                    <div key={m.label} className="bg-zinc-950 p-4">
                      <div className="font-mono text-sm font-black text-white">
                        {formatUSD(m.amount)}
                      </div>
                      <div className="mt-1 text-xs leading-relaxed text-zinc-400">{m.label}</div>

                      <div className="mt-3 h-1 w-full overflow-hidden bg-zinc-900" aria-hidden="true">
                        <div
                          className={`h-full ${funded ? "bg-emerald-500" : "bg-zinc-700"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      <div
                        className={`mt-2 font-mono text-[10px] uppercase tracking-wide ${
                          funded ? "text-emerald-500" : "text-zinc-600"
                        }`}
                      >
                        {funded ? "Funded" : `${Math.round(pct)}% there`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3">
              <Link
                to="/sponsors"
                className="inline-flex items-center justify-center bg-red-600 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_30px_rgba(220,38,38,0.35)] transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                Help Us Close The Gap
              </Link>

              <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-600">
                501(c)(3) • Tax-deductible
              </span>
            </div>
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
}
