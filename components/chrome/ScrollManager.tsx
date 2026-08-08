"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * SCROLL ON NAVIGATION
 *
 * Two jobs, and they are opposites — which is why the default behaviour was
 * wrong in both directions:
 *
 *   Forward navigation  → pin the document to the very top.
 *   Back / forward      → return the visitor to where they were.
 *
 * The App Router resets scroll by scrolling the changed segment into view
 * rather than pinning to the top, so links inside cards deeper down the page
 * landed 15-17px short — enough to clip the top edge of the rounded hero panel.
 *
 * Four things here are load-bearing and easy to break:
 *
 * 1. The reset runs inside a double `requestAnimationFrame` so it lands *after*
 *    the router's own scroll rather than racing it. A single frame loses.
 *
 * 2. Restoration keeps re-applying until the position holds for a few frames,
 *    for the same reason, and because the target page may still be growing as
 *    its images arrive. It gives up after RESTORE_TIMEOUT and yields at once if
 *    the visitor touches the scrollbar.
 *
 * 3. Recording stops the moment a navigation is initiated. This is the subtle
 *    one: the router scrolls the outgoing page before React has rebound this
 *    component's listener, so a naive recorder captures the router's landing
 *    position instead of where the visitor actually was — which silently turns
 *    restoration into "restore to 15px".
 *
 * 4. Nothing is recorded in the effect cleanup, for the same reason.
 *
 * Positions live in a Map rather than sessionStorage: this component sits in
 * the root layout and never unmounts during client-side navigation.
 */

/** How long a restoring page gets to reach the height it needs. */
const RESTORE_TIMEOUT = 1000;
/** Release the recording lock if a click never actually navigated. */
const NAV_LOCK_TIMEOUT = 1500;

export function ScrollManager() {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const positions = useRef<Map<string, number>>(new Map());
  const traversed = useRef(false);
  const firstRender = useRef(true);
  /** True between "a navigation was initiated" and "the new route arrived". */
  const navigating = useRef(false);
  const unlockTimer = useRef(0);

  /* ---- keep the current route available to the listeners ---- */
  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  /* ---- remember where the visitor is, per route ---- */
  useEffect(() => {
    const onScroll = () => {
      // Once a navigation is under way, every further scroll is the router's,
      // not the visitor's. Recording it would destroy the saved position.
      if (navigating.current) return;
      positions.current.set(pathnameRef.current, window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- freeze the position the instant a link is activated ---- */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.("a[href]") as
        | HTMLAnchorElement
        | null;
      if (!anchor || anchor.target === "_blank") return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same-page anchors and same-route links do not change the route.
      if (url.hash && url.pathname === window.location.pathname) return;
      if (url.pathname === window.location.pathname) return;

      positions.current.set(pathnameRef.current, window.scrollY);
      navigating.current = true;

      window.clearTimeout(unlockTimer.current);
      unlockTimer.current = window.setTimeout(() => {
        navigating.current = false;
      }, NAV_LOCK_TIMEOUT);
    };

    // Capture phase, so this runs before the router handles the click.
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(unlockTimer.current);
    };
  }, []);

  /* ---- distinguish a traversal from a fresh navigation ---- */
  useEffect(() => {
    const onPopState = () => {
      traversed.current = true;
      navigating.current = true;
      window.clearTimeout(unlockTimer.current);
      unlockTimer.current = window.setTimeout(() => {
        navigating.current = false;
      }, NAV_LOCK_TIMEOUT);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  /* ---- act on the new route ---- */
  useEffect(() => {
    // Never fight the browser's own restoration on the very first paint.
    if (firstRender.current) {
      firstRender.current = false;
      navigating.current = false;
      return;
    }

    // An anchor target owns the scroll position.
    if (window.location.hash) {
      traversed.current = false;
      navigating.current = false;
      return;
    }

    const isTraversal = traversed.current;
    traversed.current = false;

    let raf = 0;
    let cancelled = false;
    /** Recording stays off until we have finished positioning the new page. */
    const release = () => {
      window.clearTimeout(unlockTimer.current);
      navigating.current = false;
    };

    if (isTraversal) {
      const target = positions.current.get(pathname);
      if (target === undefined || target < 1) {
        release();
        return;
      }

      const started = performance.now();
      let settled = 0;

      const step = () => {
        if (cancelled) return;
        const reachable = document.documentElement.scrollHeight - window.innerHeight;

        if (reachable >= target) {
          if (Math.abs(window.scrollY - target) > 2) {
            window.scrollTo({ top: target, left: 0, behavior: "auto" });
            settled = 0;
          } else if (++settled >= 3) {
            release(); // held for three frames — nothing is competing now
            return;
          }
        }

        if (performance.now() - started < RESTORE_TIMEOUT) {
          raf = window.requestAnimationFrame(step);
        } else {
          if (reachable > 0 && reachable < target) {
            window.scrollTo({ top: reachable, left: 0, behavior: "auto" });
          }
          release();
        }
      };

      // Never wrestle the visitor for control of the scrollbar.
      const yieldToUser = () => {
        cancelled = true;
        release();
      };
      const passiveOnce = { once: true, passive: true } as const;
      window.addEventListener("wheel", yieldToUser, passiveOnce);
      window.addEventListener("touchstart", yieldToUser, passiveOnce);
      window.addEventListener("keydown", yieldToUser, { once: true });

      raf = window.requestAnimationFrame(step);

      return () => {
        cancelled = true;
        if (raf) window.cancelAnimationFrame(raf);
        window.removeEventListener("wheel", yieldToUser);
        window.removeEventListener("touchstart", yieldToUser);
        window.removeEventListener("keydown", yieldToUser);
        release();
      };
    }

    // Fresh navigation: pin to the top, after the router has had its turn.
    raf = window.requestAnimationFrame(() => {
      if (cancelled) return;
      raf = window.requestAnimationFrame(() => {
        if (cancelled) return;
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        release();
      });
    });

    return () => {
      cancelled = true;
      if (raf) window.cancelAnimationFrame(raf);
      release();
    };
  }, [pathname]);

  return null;
}
