import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import { BUDGET_CATEGORIES, budgetTotals, formatUSD } from "../data/budget";
import {
  FUNDRAISING_SHEET_ID,
  FUNDRAISING_SOURCES,
  FUNDRAISING_TARGET,
  fetchFundraising,
  fundraisingTotals,
  type FundraisingSource,
} from "../data/fundraising";

type SheetState = "idle" | "loading" | "live" | "error";

/**
 * Compact budget + fundraising summary for the home page. Shares the data
 * modules with the full /budget page so the two can never disagree.
 */
export default function HomeFinanceWidget() {
  const rootRef = useRef<HTMLDivElement>(null);

  const [sources, setSources] = useState<FundraisingSource[]>(FUNDRAISING_SOURCES);
  const [sheetState, setSheetState] = useState<SheetState>(
    FUNDRAISING_SHEET_ID ? "loading" : "idle",
  );

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

  const b = useMemo(() => budgetTotals(), []);
  const f = useMemo(() => fundraisingTotals(sources, FUNDRAISING_TARGET), [sources]);

  const statusLabel: Record<SheetState, string> = {
    idle: "Static figures",
    loading: "Syncing sheet…",
    live: "Live from Google Sheets",
    error: "Sheet unreachable",
  };

  const statusDot: Record<SheetState, string> = {
    idle: "bg-zinc-600",
    loading: "bg-amber-500 animate-pulse",
    live: "bg-emerald-500 animate-pulse",
    error: "bg-amber-500",
  };

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-fx-card]", {
        y: 28,
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 88%", once: true },
      });

      // The fundraising progress bar fills once the card is on screen.
      gsap.fromTo(
        "[data-fx-raisebar]",
        { scaleX: 0 },
        {
          scaleX: f.progress / 100,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: root, start: "top 88%", once: true },
        },
      );

      // Budget category bars grow to their spent share.
      gsap.utils.toArray<HTMLElement>("[data-fx-catbar]").forEach((bar) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: Number(bar.dataset.pct ?? 0) / 100,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: bar, start: "top 94%", once: true },
          },
        );
      });

      // Raised total counts up.
      const counter = root.querySelector<HTMLElement>("[data-fx-raised]");
      if (counter) {
        const obj = { n: 0 };
        gsap.to(obj, {
          n: f.raised,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 88%", once: true },
          onUpdate: () => {
            counter.textContent = formatUSD(Math.round(obj.n));
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, [f.raised, f.progress]);

  return (
    <div ref={rootRef} className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.25fr]">
      {/* ---------------------------------------------- RAISED */}
      <div
        data-fx-card
        className="relative flex flex-col overflow-hidden border border-zinc-800 bg-zinc-900 p-6 will-change-transform"
      >
        <span className="absolute inset-x-0 top-0 h-0.5 bg-red-500" aria-hidden="true" />

        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
          Raised This Season
        </div>

        <div data-fx-raised className="mt-2 text-[34px] font-black leading-none text-white will-change-transform">
          {formatUSD(f.raised)}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className={`h-2 w-2 ${statusDot[sheetState]}`} aria-hidden="true" />
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">
            {statusLabel[sheetState]}
          </span>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-wide text-zinc-500">
            <span>{f.progress.toFixed(0)}% of {formatUSD(FUNDRAISING_TARGET)}</span>
            <span>{formatUSD(f.remaining)} to go</span>
          </div>

          <div className="mt-2 h-2 w-full overflow-hidden bg-zinc-950" aria-hidden="true">
            <div data-fx-raisebar className="h-full origin-left bg-red-500" style={{ width: "100%" }} />
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-px border border-zinc-800 bg-zinc-800 pt-5">
          <div className="bg-zinc-900 pb-4 pr-3">
            <div className="font-mono text-[10px] uppercase tracking-wide text-zinc-500">Pledged</div>
            <div className="mt-1 font-mono text-sm font-bold text-zinc-300">{formatUSD(f.pledged)}</div>
          </div>
          <div className="bg-zinc-900 pb-4 pl-3">
            <div className="font-mono text-[10px] uppercase tracking-wide text-zinc-500">Spent</div>
            <div className="mt-1 font-mono text-sm font-bold text-zinc-300">{formatUSD(b.spent)}</div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------- BUDGET */}
      <div data-fx-card className="border border-zinc-800 bg-zinc-900 p-6 will-change-transform">
        <div className="flex items-baseline justify-between">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
            Season Budget
          </h3>
          <span className="font-mono text-[10px] text-zinc-600">
            {formatUSD(b.spent)} of {formatUSD(b.allocated)} spent
          </span>
        </div>

        <div className="mt-5 space-y-3.5">
          {BUDGET_CATEGORIES.map((c) => {
            const pct = c.allocated > 0 ? Math.min(100, (c.spent / c.allocated) * 100) : 0;
            const over = c.spent > c.allocated;

            return (
              <div key={c.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="flex items-center gap-2 text-xs text-zinc-300">
                    <span className={`h-1.5 w-1.5 shrink-0 ${over ? "bg-red-500" : c.accent}`} aria-hidden="true" />
                    {c.label}
                  </span>

                  <span className="shrink-0 font-mono text-[11px] text-zinc-500">
                    <span className="font-bold text-white">{formatUSD(c.spent)}</span>
                    {" / "}
                    {formatUSD(c.allocated)}
                  </span>
                </div>

                <div className="mt-1.5 h-1 w-full overflow-hidden bg-zinc-950" aria-hidden="true">
                  <div
                    data-fx-catbar
                    data-pct={pct}
                    className={`h-full origin-left ${over ? "bg-red-500" : c.accent}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
