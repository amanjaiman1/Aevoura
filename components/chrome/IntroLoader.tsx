"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/**
 * THE OPENING
 *
 * A white canvas, a small black dot that falls to the centre, and an expansion
 * that takes the whole screen before the site is revealed underneath.
 *
 *   EMPTY → CURIOUS → IMPACT → REVEAL
 *
 * It runs on every full page load. There is no session storage and no
 * "once per visit" check anywhere in this file.
 *
 * ── Division of labour ──────────────────────────────────────────────────
 *
 * Almost nothing happens here. The choreography is entirely CSS (see THE
 * OPENING in globals.css) and the decision to run it at all is made by an
 * inline script in <head> — before the body is parsed, so the site can never
 * flash underneath first, and so a visitor with JavaScript disabled or reduced
 * motion enabled simply never sees the overlay.
 *
 * This component only:
 *   · unmounts the node once the sequence is over
 *   · releases the scroll lock at the same moment
 *   · keeps `--intro-cover` correct if the window is resized mid-sequence
 *
 * The head script also arms a fallback timer that strips `data-intro`, so the
 * scroll lock releases even if React never hydrates. Nothing here is load
 * bearing for the visitor getting to the site.
 */
export function IntroLoader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!site.intro.enabled) return;

    const root = document.documentElement;

    // The head script did not opt in: reduced motion, or it never ran.
    // Nothing is on screen, so there is nothing to tear down.
    if (!root.hasAttribute("data-intro")) {
      const idle = window.setTimeout(() => setGone(true), 0);
      return () => window.clearTimeout(idle);
    }

    /**
     * The scale that takes a dot of `--intro-dot` to the far corner of the
     * viewport. Computed rather than guessed, so it is exact on a phone and on
     * an ultrawide alike. The head script sets this before the expansion
     * begins; this keeps it honest if the window is resized or a phone is
     * rotated part-way through.
     */
    const measure = () => {
      const dot =
        Number.parseFloat(
          getComputedStyle(root).getPropertyValue("--intro-dot")
        ) || 14;
      const radius = Math.hypot(window.innerWidth, window.innerHeight) / 2;
      root.style.setProperty(
        "--intro-cover",
        String(Math.ceil(radius / (dot / 2)) + 2)
      );
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("orientationchange", measure);

    const total = site.intro.totalMs;

    // Release the page the moment the reveal has finished, then drop the node.
    const unlock = window.setTimeout(() => {
      root.removeAttribute("data-intro");
    }, total * 1.14);
    const remove = window.setTimeout(() => setGone(true), total * 1.3);

    return () => {
      window.clearTimeout(unlock);
      window.clearTimeout(remove);
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
      root.removeAttribute("data-intro");
    };
  }, []);

  if (gone || !site.intro.enabled) return null;

  return (
    <div id="aevoura-intro" aria-hidden="true">
      {/* The ink drop. One element, one animation, transform and opacity only. */}
      <span className="intro-dot" />
      {/* Reaches full black exactly as the dot finishes expanding, so there is
          never a white corner at the moment of handover. */}
      <span className="intro-fill" />
    </div>
  );
}
