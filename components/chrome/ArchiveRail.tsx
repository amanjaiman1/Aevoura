"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { works } from "@/lib/works";
import { site } from "@/lib/site";

/**
 * THE ARCHIVE RAIL — the platform's signature.
 *
 * A single thin element that does three jobs at once, which is why it earns
 * permanent screen space:
 *
 *   1. Index      the five works, always listed, always reachable
 *   2. Indicator  which work you are currently looking at
 *   3. Progress   how far through the document you are
 *
 * It is a real navigation control, not decoration. Numbers are always
 * legible without hovering; names appear on hover or focus as an addition,
 * never as the only way to read them.
 *
 * Desktop: the full rail in the left margin.
 * Mobile:  a 2px progress hairline only — the index lives in the menu,
 *          because a 44px-tall rail would eat a phone screen for no gain.
 */
export function ArchiveRail() {
  const pathname = usePathname();
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const frame = useRef(0);

  /**
   * Active work is derived, not synchronised.
   *
   * On a work detail route the route itself is the answer, so it is computed
   * during render. Elsewhere it comes from the intersection observer, which is
   * a genuine external system. The observed value is stamped with the pathname
   * it was measured on, so a route change invalidates it without an effect.
   */
  const routeSlug = pathname.match(/^\/collection\/([^/]+)/)?.[1] ?? null;
  const [observed, setObserved] = useState<{ path: string; slug: string } | null>(null);
  const active =
    routeSlug ?? (observed?.path === pathname ? observed.slug : null);

  /* ---- document progress ---- */
  useEffect(() => {
    const read = () => {
      const doc = document.documentElement;
      const span = doc.scrollHeight - window.innerHeight;
      setProgress(span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0);
      frame.current = 0;
    };
    const onScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame.current) window.cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* ---- which work is on screen ---- */
  useEffect(() => {
    if (routeSlug) return; // the route already answers this
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-rail-work]")
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const slug = visible?.target.getAttribute("data-rail-work");
        if (slug) setObserved({ path: pathname, slug });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname, routeSlug]);

  /**
   * If the work exists as a section on this page, scroll to it.
   * Otherwise navigate to its detail route. One control, two contexts.
   */
  const goTo = useCallback(
    (slug: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      const section = document.getElementById(`work-${slug}`);
      if (!section) return; // let the link navigate
      event.preventDefault();
      section.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
      // Keep the URL honest without adding a history entry per tick.
      window.history.replaceState(null, "", `#work-${slug}`);
      void router;
    },
    [router]
  );

  return (
    <>
      {/* ── mobile: progress hairline only ── */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent lg:hidden"
      >
        <div
          className="h-full origin-left bg-accent"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* ── desktop: the full rail ── */}
      <div
        className="pointer-events-none fixed inset-y-0 left-0 z-30 hidden w-rail lg:block"
        aria-hidden={false}
      >
        {/* the spine */}
        <div className="absolute inset-y-0 right-0 w-px bg-rule" aria-hidden="true" />
        <div
          className="absolute top-0 right-0 w-px origin-top bg-accent"
          style={{ height: "100%", transform: `scaleY(${progress})` }}
          aria-hidden="true"
        />

        {/* edition mark */}
        <div aria-hidden="true" className="absolute top-28 right-0 w-full">
          <p className="meta rotate-180 text-center text-ink-muted [writing-mode:vertical-rl]">
            ED&nbsp;{site.edition}
          </p>
        </div>

        {/* the index */}
        <nav
          aria-label="Collection index"
          className="pointer-events-auto absolute top-1/2 right-0 -translate-y-1/2"
        >
          <ol className="flex flex-col items-end">
            {works.map((work) => {
              const isActive = active === work.slug;
              return (
                <li key={work.slug} className="relative">
                  <a
                    href={`/collection/${work.slug}`}
                    onClick={goTo(work.slug)}
                    aria-current={isActive ? "true" : undefined}
                    data-cursor="link"
                    className="group/tick flex h-11 items-center justify-end gap-2 pr-0 pl-4"
                  >
                    <span
                      className={`meta tabular-nums transition-colors duration-[var(--duration-archive)] ${
                        isActive
                          ? "text-accent"
                          : "text-ink-muted group-hover/tick:text-ink"
                      }`}
                    >
                      {work.number}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`block h-px transition-all duration-[var(--duration-archive)] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                        isActive
                          ? "w-5 bg-accent"
                          : "w-2 bg-rule group-hover/tick:w-4 group-hover/tick:bg-ink"
                      }`}
                    />
                    {/* Name is an enhancement on hover/focus, never the only source. */}
                    <span className="pointer-events-none absolute top-1/2 left-full -translate-y-1/2 translate-x-1 border border-rule bg-paper-raised px-2 py-1 opacity-0 transition-opacity duration-200 group-hover/tick:opacity-100 group-focus-visible/tick:opacity-100">
                      <span className="meta whitespace-nowrap text-ink">{work.name}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* count motif */}
        <div aria-hidden="true" className="absolute bottom-28 right-0 w-full">
          <p className="meta rotate-180 text-center text-ink-muted [writing-mode:vertical-rl]">
            0{site.workCount}&nbsp;WORKS
          </p>
        </div>
      </div>
    </>
  );
}
