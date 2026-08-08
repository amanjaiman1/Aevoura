"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { works } from "@/lib/works";
import { availabilityLabel } from "@/lib/works";

const DWELL = 3600;

/**
 * THE APERTURE — the hero's living preview.
 *
 * A single window that opens from a slit and then shows fragments of all
 * five worlds in rotation. It exists for a commercial reason, not a
 * decorative one: within the first screen a visitor sees that there are
 * exactly five works, that they look nothing like each other, and that each
 * one is a real destination they can walk into.
 *
 * Restraint, deliberately:
 *   · Posters only. No video, no WebGL, no canvas in the hero.
 *   · Slides are created as they are first shown, so the initial load is
 *     one image rather than five.
 *   · Rotation stops on hover, on focus, when offscreen, and when the tab
 *     is hidden. It never restarts behind your back.
 *   · Reduced motion: no rotation, no parallax, no opening animation. The
 *     ticks still work, so all five are still reachable.
 *   · The window is a link, and the ticks are real buttons — the content is
 *     never trapped behind a hover.
 */
export function Aperture({
  /** Sizing for the window itself, so the hero can shape it per breakpoint. */
  frameClassName = "aspect-[16/10]",
}: {
  frameClassName?: string;
}) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState<number[]>([0]);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const onScreen = useRef(true);

  const show = useCallback((next: number) => {
    setIndex(next);
    setMounted((prev) => (prev.includes(next) ? prev : [...prev, next]));
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  /* Only rotate while the window is genuinely on screen. */
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen.current = entry.isIntersecting;
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const timer = window.setInterval(() => {
      if (document.hidden || !onScreen.current) return;
      setIndex((current) => {
        const next = (current + 1) % works.length;
        setMounted((prev) => (prev.includes(next) ? prev : [...prev, next]));
        return next;
      });
    }, DWELL);
    return () => window.clearInterval(timer);
  }, [reduced, paused]);

  const active = works[index];

  return (
    <div
      className="w-full"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* ── the window ── */}
      <div
        ref={frame}
        className="aperture relative isolate overflow-hidden border border-rule bg-void"
      >
        <Link
          href={`/collection/${active.slug}`}
          data-cursor="view"
          aria-label={`View ${active.name} — ${active.industry}`}
          className="group/ap block"
        >
          <div className={`relative w-full ${frameClassName}`}>
            {/* Pointer parallax is handled centrally by MotionRuntime and is
                skipped on coarse pointers and for reduced motion. */}
            <div
              data-parallax="16"
              className="absolute -inset-6 will-change-transform"
            >
              {works.map((work, i) =>
                mounted.includes(i) ? (
                  // eslint-disable-next-line @next/next/no-img-element -- pre-optimised SVG posters
                  <img
                    key={work.slug}
                    src={work.poster}
                    alt={i === index ? work.posterAlt : ""}
                    aria-hidden={i === index ? undefined : true}
                    width={work.posterAspect[0]}
                    height={work.posterAspect[1]}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    decoding={i === 0 ? "sync" : "async"}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1100ms] ease-[cubic-bezier(0.62,0.01,0.2,1)] motion-reduce:transition-none"
                    style={{ opacity: i === index ? 1 : 0 }}
                  />
                ) : null
              )}
            </div>

            {/* in-frame archive metadata, exhibition label style */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="meta text-chalk/70 tabular-nums">
                  WORK {active.number}
                </span>
                <span className="meta hidden text-chalk/70 sm:block">
                  {active.classification.toUpperCase()}
                </span>
              </div>
              <div className="flex items-end justify-between gap-4">
                <span className="font-display text-[clamp(1.5rem,3.2vw,2.5rem)] leading-none text-chalk">
                  {active.name}
                </span>
                <span className="meta text-chalk/70">
                  {availabilityLabel[active.availability].toUpperCase()}
                </span>
              </div>
            </div>

            {/* the shutter blades, visible only while opening */}
            <span
              aria-hidden="true"
              className="aperture-blade aperture-blade--top pointer-events-none absolute inset-x-0 top-0 bg-paper"
            />
            <span
              aria-hidden="true"
              className="aperture-blade aperture-blade--bottom pointer-events-none absolute inset-x-0 bottom-0 bg-paper"
            />
          </div>
        </Link>
      </div>

      {/* ── controls: outside the link, real buttons, always visible ── */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div
          role="group"
          aria-label="Preview a work"
          className="flex items-center gap-1"
        >
          {works.map((work, i) => (
            <button
              key={work.slug}
              type="button"
              aria-pressed={i === index}
              aria-label={`Preview ${work.name} — ${work.industry}`}
              onClick={() => show(i)}
              className="group/tab flex min-h-11 items-center px-1"
            >
              <span
                aria-hidden="true"
                className={`block h-px transition-all duration-[var(--duration-archive)] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                  i === index
                    ? "w-10 bg-accent"
                    : "w-5 bg-rule group-hover/tab:w-8 group-hover/tab:bg-ink"
                }`}
              />
            </button>
          ))}
          <span className="ml-3 meta text-ink-muted tabular-nums">
            {active.number} / 00{works.length}
          </span>
        </div>

        <p className="meta text-ink-muted">
          <span className="text-ink">{active.industry}</span>
          <span aria-hidden="true"> — </span>
          {active.theme.mood}
        </p>
      </div>
    </div>
  );
}
