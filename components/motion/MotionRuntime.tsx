"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { duration, ease, stagger, revealStart } from "@/lib/motion";

/**
 * The single animation runtime.
 *
 * One client component drives every scroll-linked entrance on the platform.
 * Sections stay server-rendered and only declare intent with data
 * attributes, which keeps the client bundle small and stops motion logic
 * from leaking into layout code.
 *
 * GSAP is dynamically imported so the animation payload never blocks first
 * paint or navigation.
 *
 * Contract
 *   [data-reveal="up"|"rise"]   one element fades and travels in
 *   [data-reveal-group="..."]   direct children stagger in
 *   [data-lines]                masked line reveal for .line-mask > span
 *   [data-counter="940"]        numeric count-up, tabular, archive motion
 *   [data-parallax]             restrained pointer parallax, fine pointers only
 *   [data-motion="mode"]        selects archive | exhibition | commerce timing
 *
 * Safety
 *   `js-motion` is added by an inline script in <head>, and only when the
 *   user has not asked for reduced motion. If this runtime fails to load
 *   for any reason, the failsafe below strips the class so nothing is left
 *   permanently invisible.
 */
export function MotionRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    // Reduced motion or no-JS: content is already visible. Do nothing.
    if (!root.classList.contains("js-motion")) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    // If GSAP never arrives, reveal everything rather than hide content.
    const failsafe = window.setTimeout(() => {
      if (!cancelled) root.classList.remove("js-motion");
    }, 3000);

    (async () => {
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (cancelled) return;
        window.clearTimeout(failsafe);

        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          const mode = (el: Element) =>
            (el.getAttribute("data-motion") as keyof typeof ease) || "archive";
          const delayOf = (el: Element) =>
            Number(el.getAttribute("data-reveal-delay") ?? 0) || 0;

          /* ---- single-element reveals ---- */
          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
            const m = mode(el);
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: duration[m],
              ease: ease[m],
              delay: delayOf(el),
              scrollTrigger: { trigger: el, start: revealStart, once: true },
            });
          });

          /* ---- staggered groups ---- */
          gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((el) => {
            const m = mode(el);
            const items = Array.from(el.children) as HTMLElement[];
            if (!items.length) return;
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: duration[m],
              ease: ease[m],
              delay: delayOf(el),
              stagger: stagger[m],
              scrollTrigger: { trigger: el, start: revealStart, once: true },
            });
          });

          /* ---- masked line reveals ---- */
          gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((el) => {
            const m = mode(el);
            const lines = el.querySelectorAll<HTMLElement>(".line-mask > span");
            if (!lines.length) return;
            gsap.to(lines, {
              y: "0%",
              duration: duration[m],
              ease: ease[m],
              delay: delayOf(el),
              stagger: stagger[m],
              scrollTrigger: { trigger: el, start: revealStart, once: true },
            });
          });

          /* ---- numeric counters (archive motion: stepped, not eased) ---- */
          gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
            const target = Number(el.getAttribute("data-counter") ?? 0);
            if (!Number.isFinite(target)) return;
            const decimals = Number(el.getAttribute("data-counter-decimals") ?? 0);
            const prefix = el.getAttribute("data-counter-prefix") ?? "";
            const suffix = el.getAttribute("data-counter-suffix") ?? "";
            const pad = Number(el.getAttribute("data-counter-pad") ?? 0);
            const obj = { v: 0 };
            gsap.to(obj, {
              v: target,
              duration: 1.1,
              ease: "steps(24)",
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
              onUpdate: () => {
                let text = obj.v.toFixed(decimals);
                if (pad) text = text.padStart(pad, "0");
                el.textContent = `${prefix}${text}${suffix}`;
              },
            });
          });

          /* ---- restrained pointer parallax, fine pointers only ---- */
          const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
          if (finePointer) {
            const layers = gsap.utils.toArray<HTMLElement>("[data-parallax]");
            if (layers.length) {
              const setters = layers.map((el) => ({
                el,
                strength: Number(el.getAttribute("data-parallax") ?? 12),
                x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
                y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
              }));
              const onMove = (event: PointerEvent) => {
                const nx = event.clientX / window.innerWidth - 0.5;
                const ny = event.clientY / window.innerHeight - 0.5;
                for (const s of setters) {
                  s.x(nx * s.strength);
                  s.y(ny * s.strength);
                }
              };
              window.addEventListener("pointermove", onMove, { passive: true });
              cleanup = () => window.removeEventListener("pointermove", onMove);
            }
          }
        });

        cleanup = ((prev) => () => {
          prev?.();
          ctx.revert();
        })(cleanup);

        if (cancelled) {
          cleanup?.();
          return;
        }

        // Recalculate once fonts settle, so triggers are not measured
        // against fallback metrics.
        document.fonts?.ready?.then(() => ScrollTrigger.refresh()).catch(() => {});
      } catch {
        root.classList.remove("js-motion");
      }
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
