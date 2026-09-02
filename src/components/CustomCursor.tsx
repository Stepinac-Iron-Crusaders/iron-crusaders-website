import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    const anyFine = window.matchMedia("(any-pointer: fine)").matches;
    const isTouchOnly = isCoarse && !hasHover && !anyFine;

    if (isTouchOnly) {
      dot.style.display = "none";
      ring.style.display = "none";
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");
    dot.style.display = "block";
    ring.style.display = "block";

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, force3D: true });

    const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    gsap.set(dot, { x: mouseX, y: mouseY, autoAlpha: 1 });
    gsap.set(ring, { x: mouseX, y: mouseY, autoAlpha: 1 });

    let visible = true;
    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.18, overwrite: "auto" });
    };
    const hide = () => {
      if (!visible) return;
      visible = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.18, overwrite: "auto" });
    };

    // --- hover / active state machine ---
    const hoverSelector = "a, button, [data-cursor='hover'], [data-cursor-hover], [data-magnetic]";
    let isHovering = false;
    let isMagneticHover = false;
    let isMouseDown = false;

    const applyState = () => {
      if (isMouseDown) {
        // pressed — shrink, keep color logic based on hover
        gsap.to(dot, {
          scale: 0.68,
          duration: 0.1,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(ring, {
          scale: 0.9,
          duration: 0.1,
          ease: "power2.out",
          overwrite: "auto",
        });
        return;
      }
      if (isHovering) {
        gsap.to(dot, {
          scale: isMagneticHover ? 0.45 : 2.05,
          backgroundColor: isMagneticHover ? "#ffffff" : "#dc2626",
          duration: 0.22,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(ring, {
          scale: isMagneticHover ? 1.6 : 1.75,
          borderColor: isMagneticHover ? "rgba(255,255,255,0.9)" : "rgba(220,38,38,0.85)",
          backgroundColor: "rgba(220,38,38,0.10)",
          duration: 0.24,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(dot, { boxShadow: "0 0 20px rgba(220,38,38,0.75)", duration: 0.2, overwrite: "auto" });
      } else {
        gsap.to(dot, {
          scale: 1,
          backgroundColor: "#dc2626",
          boxShadow: "0 0 14px rgba(220,38,38,0.9), 0 0 30px rgba(220,38,38,0.45)",
          duration: 0.22,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(220,38,38,0.45)",
          backgroundColor: "rgba(220,38,38,0)",
          duration: 0.24,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    };

    const refreshHover = () => {
      const el = document.elementFromPoint(mouseX, mouseY) as HTMLElement | null;
      const hoverEl = el?.closest?.(hoverSelector) as HTMLElement | null;
      const magneticEl = el?.closest?.("[data-magnetic]") as HTMLElement | null;
      const nextHover = !!hoverEl;
      const nextMag = !!magneticEl;
      if (nextHover !== isHovering || nextMag !== isMagneticHover) {
        isHovering = nextHover;
        isMagneticHover = nextMag;
        applyState();
      }
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      xDot(mouseX);
      yDot(mouseY);
      show();
      refreshHover();
    };

    const onLeave = () => hide();
    const onEnter = () => show();

    const tick = () => {
      xRing(mouseX);
      yRing(mouseY);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onMouseDown = (e: MouseEvent) => {
      // only primary button
      if (e.button !== 0) return;
      isMouseDown = true;
      applyState();
    };
    const onMouseUp = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isMouseDown = false;
      // re-evaluate hover at current position — mouse may still be over interactive
      refreshHover();
      // if refresh didn't change state (still same hover), we still need to restore hover scale
      // applyState will handle it, but refresh already did if hover changed
      // ensure we apply even if hover unchanged
      if (!isHovering) applyState();
      else applyState();
    };

    // also handle pointer cancel / drag edge cases
    const onPointerCancel = () => {
      isMouseDown = false;
      applyState();
    };

    const onBlur = () => {
      isMouseDown = false;
      hide();
      applyState();
    };
    const onFocus = () => show();

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("pointerup", onPointerCancel);
    window.addEventListener("pointercancel", onPointerCancel);
    window.addEventListener("dragend", onPointerCancel);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);

    const safety = window.setTimeout(() => show(), 280);

    // handle cases where hover state needs refresh without mousemove (e.g., after scroll reveals new elements under cursor)
    const hoverInterval = window.setInterval(refreshHover, 180);

    return () => {
      window.clearTimeout(safety);
      window.clearInterval(hoverInterval);
      document.documentElement.classList.remove("has-custom-cursor");
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("pointerup", onPointerCancel);
      window.removeEventListener("pointercancel", onPointerCancel);
      window.removeEventListener("dragend", onPointerCancel);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      gsap.killTweensOf([dot, ring]);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border border-red-600/45 bg-transparent will-change-transform"
        style={{ opacity: 1, display: "block", transform: "translate3d(0,0,0)" }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[10px] w-[10px] rounded-full bg-red-600 will-change-transform"
        style={{
          opacity: 1,
          display: "block",
          transform: "translate3d(0,0,0)",
          boxShadow: "0 0 14px rgba(220,38,38,0.9), 0 0 30px rgba(220,38,38,0.45)",
        }}
      />
    </>
  );
}
