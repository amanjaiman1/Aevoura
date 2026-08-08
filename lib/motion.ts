/**
 * Motion grammar.
 *
 * Three modes, and only three. Anything animated on this platform must
 * belong to one of them, which is what stops the site accumulating a pile
 * of unrelated effects.
 *
 *   ARCHIVE     precise, linear, typographic.
 *               Metadata, counters, labels, navigation, rail.
 *   EXHIBITION  slow, cinematic, spatial.
 *               Large previews, aperture, transitions between works.
 *   COMMERCE    fast, responsive, reassuring.
 *               Buttons, price options, forms, CTAs.
 *
 * Values mirror the CSS custom properties in globals.css. Kept in sync
 * by hand deliberately — two small lists beat a runtime style read.
 */

export type MotionMode = "archive" | "exhibition" | "commerce";

export const ease: Record<MotionMode, string> = {
  archive: "power3.out",
  exhibition: "expo.out",
  commerce: "power2.out",
};

/** Seconds, for GSAP. */
export const duration: Record<MotionMode, number> = {
  archive: 0.52,
  exhibition: 1.15,
  commerce: 0.2,
};

export const stagger: Record<MotionMode, number> = {
  archive: 0.055,
  exhibition: 0.12,
  commerce: 0.03,
};

/** Shared ScrollTrigger entry point. Never pins, never jacks the scroll. */
export const revealStart = "top 82%";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Desktop-only affordances (custom cursor, pointer parallax, hover preview). */
export function hasFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/**
 * Rough low-power detection. Used to skip non-essential motion and to keep
 * preview video off mid-range hardware until it is genuinely asked for.
 */
export function isLowPowerDevice(): boolean {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  if (nav.connection?.saveData) return true;
  if (nav.connection?.effectiveType && /2g/.test(nav.connection.effectiveType)) return true;
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4) return true;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) return true;
  return false;
}
