import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "../lib/gsap";

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);
  const firstMount = useRef(true);

  useLayoutEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (firstMount.current) {
      firstMount.current = false;
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", overwrite: true }
      );
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out", overwrite: true, delay: 0.06 }
      );
      // refresh ScrollTrigger after route change
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (gsap as any).ScrollTrigger?.refresh();
      }, 80);
    }, el);

    return () => ctx.revert();
  }, [pathname]);

  return <div ref={mainRef}>{children}</div>;
}
