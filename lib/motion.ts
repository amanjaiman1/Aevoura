/**
 * Motion grammar. Three modes, and only three, so the site never
 * accumulates a pile of unrelated effects.
 *
 *   ARCHIVE  precise and short. Labels, counters, metadata, navigation.
 *   REVEAL   calm and spatial. Sections and media entering.
 *   ACTION   fast and reassuring. Buttons, prices, forms.
 *
 * Values mirror the custom properties in globals.css.
 */

export type MotionMode = "archive" | "reveal" | "action";

export const ease: Record<MotionMode, string> = {
  archive: "power3.out",
  reveal: "expo.out",
  action: "power2.out",
};

/** Seconds, for GSAP. */
export const duration: Record<MotionMode, number> = {
  archive: 0.46,
  reveal: 0.8,
  action: 0.2,
};

export const stagger: Record<MotionMode, number> = {
  archive: 0.05,
  reveal: 0.09,
  action: 0.03,
};

/** Shared ScrollTrigger entry point. Never pins, never jacks the scroll. */
export const revealStart = "top 85%";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/**
 * Rough low-power detection, used to keep preview video off mid-range
 * hardware and metered connections until it is genuinely asked for.
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
