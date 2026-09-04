import { useLayoutEffect, useRef } from "react";
import type { Sponsor } from "../data/sponsors";
import { getLogoClass } from "../data/sponsors";
import { gsap, prefersReducedMotion } from "../lib/gsap";

/**
 * Finds the most visually prominent saturated color in an image.
 *
 * The algorithm:
 * - Ignores transparent pixels
 * - Ignores very dark pixels
 * - Ignores near-white pixels
 * - Prefers pixels with high saturation
 * - Gives more weight to pixels that occur frequently
 */
function getDominantSaturatedColor(
  img: HTMLImageElement
): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    if (!ctx) {
      resolve("rgba(220, 38, 38, 0.35)");
      return;
    }

    const analyze = () => {
      // Scale the image down for performance.
      const maxSize = 100;
      const scale = Math.min(
        1,
        maxSize / Math.max(img.naturalWidth, img.naturalHeight)
      );

      canvas.width = Math.max(1, Math.floor(img.naturalWidth * scale));
      canvas.height = Math.max(1, Math.floor(img.naturalHeight * scale));

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      const pixels = imageData.data;

      /**
       * Quantized RGB buckets.
       *
       * This prevents tiny differences between neighboring pixels
       * from becoming separate colors.
       */
      const colorBuckets = new Map<
        string,
        { count: number; saturation: number; brightness: number }
      >();

      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];

        // Ignore transparent pixels.
        if (a < 100) continue;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        const brightness = max / 255;
        const saturation =
          max === 0 ? 0 : (max - min) / max;

        // Ignore extremely dark pixels.
        if (brightness < 0.15) continue;

        // Ignore nearly white pixels.
        if (brightness > 0.93 && saturation < 0.15) continue;

        // Prefer genuinely colorful pixels.
        if (saturation < 0.25) continue;

        // Quantize colors into 16-value buckets.
        const qr = Math.round(r / 16) * 16;
        const qg = Math.round(g / 16) * 16;
        const qb = Math.round(b / 16) * 16;

        const key = `${qr},${qg},${qb}`;

        const existing = colorBuckets.get(key);

        if (existing) {
          existing.count++;
        } else {
          colorBuckets.set(key, {
            count: 1,
            saturation,
            brightness,
          });
        }
      }

      if (colorBuckets.size === 0) {
        resolve("rgba(220, 38, 38, 0.35)");
        return;
      }

      /**
       * Score each color.
       *
       * Frequency matters, but saturation matters too.
       *
       * This means a large colorful region wins over:
       * - white backgrounds
       * - black outlines
       * - tiny colorful artifacts
       */
      let bestColor = "";
      let bestScore = -Infinity;

      for (const [color, data] of colorBuckets.entries()) {
        const frequencyScore = Math.sqrt(data.count);

        const saturationScore = Math.pow(data.saturation, 1.5);

        // Avoid extremely bright colors dominating the glow.
        const brightnessPenalty =
          data.brightness > 0.9
            ? 0.65
            : data.brightness < 0.25
              ? 0.7
              : 1;

        const score =
          frequencyScore *
          saturationScore *
          brightnessPenalty;

        if (score > bestScore) {
          bestScore = score;
          bestColor = color;
        }
      }

      const [r, g, b] = bestColor.split(",").map(Number);

      resolve(`rgba(${r}, ${g}, ${b}, 0.38)`);
    };

    // If the image is already loaded, analyze immediately.
    if (img.complete && img.naturalWidth > 0) {
      analyze();
    } else {
      img.addEventListener("load", analyze, { once: true });
    }
  });
}

export default function SponsorsGrid({
  sponsors,
}: {
  sponsors: Sponsor[];
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;

    if (!grid) return;

    // Respect reduced-motion preferences.
    if (prefersReducedMotion()) return;

    const sponsorItems =
      grid.querySelectorAll<HTMLElement>("[data-sponsor-item]");

    const ctx = gsap.context(() => {
      sponsorItems.forEach((item, index) => {
        const img =
          item.querySelector<HTMLImageElement>("img");

        if (!img) return;

        /**
         * --------------------------------------------------
         * 1. Automatically determine the logo's color
         * --------------------------------------------------
         */
        getDominantSaturatedColor(img).then((auraColor) => {
          if (!item.isConnected) return;

          /**
           * --------------------------------------------------
           * 2. Initial glow
           * --------------------------------------------------
           */
          gsap.set(item, {
            filter: `
              drop-shadow(0 0 6px ${auraColor})
              drop-shadow(0 0 14px ${auraColor})
            `,
          });

          /**
           * --------------------------------------------------
           * 3. Pulsing aura
           * --------------------------------------------------
           */
          gsap.to(item, {
            filter: `
              drop-shadow(0 0 10px ${auraColor})
              drop-shadow(0 0 25px ${auraColor})
              drop-shadow(0 0 40px ${auraColor})
            `,
            duration: 2.2 + (index % 3) * 0.25,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.15,
          });
        });

        /**
         * --------------------------------------------------
         * 4. Bobbing animation
         * --------------------------------------------------
         */
        gsap.to(item, {
          y: -8,
          duration: 1.8 + (index % 3) * 0.25,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.18,
        });
      });
    }, grid);

    return () => ctx.revert();
  }, [sponsors]);

  return (
    <div
      ref={gridRef}
      className="mt-8 flex flex-wrap items-center justify-center gap-10"
    >
      {sponsors.map((s) => (
        <div
          key={s.name}
          data-sponsor-item
          className="flex items-center justify-center p-4 will-change-transform"
        >
          {s.logo ? (
            <img
              src={s.logo}
              alt={s.name}
              title={s.name}
              className={`${getLogoClass(
                s.tier
              )} object-contain`}
              style={{
                width: "auto",
              }}
            />
          ) : (
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500">
              {s.name}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
