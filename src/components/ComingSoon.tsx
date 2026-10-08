import { Link } from "react-router-dom";
import { AnimatedPage } from "./AnimatedPage";

type Props = {
  /** Page name shown as the heading, e.g. "Budget & Fundraising". */
  title: string;
  /** Short sentence explaining the hold. */
  blurb?: string;
  /** Route for the primary call to action. Defaults to "/contact". */
  ctaTo?: string;
  /** Label for the primary call to action. */
  ctaLabel?: string;
};

/**
 * Placeholder for a page whose component still exists but is not ready to
 * ship. Keeps the route (and every link pointing at it) working, so nothing
 * 404s. Swap back to the real component in App.tsx when the page is ready.
 */
export function ComingSoon({
  title,
  blurb = "This page is still being built. Check back soon.",
  ctaTo = "/contact",
  ctaLabel = "Contact Us",
}: Props) {
  return (
    <AnimatedPage>
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-24 lg:px-8 lg:py-32 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-red-600" aria-hidden="true" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-red-500">
              Coming Soon
            </span>
            <span className="h-px w-8 bg-red-600" aria-hidden="true" />
          </div>

          <h1 className="mt-6 text-[36px] font-black uppercase tracking-[-0.02em] text-white sm:text-[48px]">
            {title}
          </h1>

          <p className="mx-auto mt-4 max-w-[52ch] text-sm leading-relaxed text-zinc-400">
            {blurb}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="border border-zinc-700 bg-zinc-900 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800"
            >
              Go Home
            </Link>
            <Link
              to={ctaTo}
              className="bg-red-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-red-700"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}