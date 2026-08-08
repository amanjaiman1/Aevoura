"use client";

import { useEffect, useRef, useState } from "react";

type State = "default" | "link" | "external" | "view";

const LABELS: Record<State, string> = {
  default: "",
  link: "",
  external: "Open",
  view: "View",
};

/**
 * Custom cursor — desktop only, and only when it adds information.
 *
 * It is not a decorative blob that trails the pointer. It changes to tell
 * you what a target does: a ring over links, a filled disc labelled "Open"
 * over anything that leaves the gallery, "View" over a work surface.
 *
 * Rendered only for fine pointers with motion enabled. Touch devices and
 * reduced-motion users keep their native cursor, and the real cursor is
 * never hidden unless this element is actually on screen.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef<State>("default");

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setEnabled(fine.matches && !reduced.matches);
    decide();
    fine.addEventListener("change", decide);
    reduced.addEventListener("change", decide);
    return () => {
      fine.removeEventListener("change", decide);
      reduced.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;

    const root = document.documentElement;
    root.classList.add("cursor-active");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;
    let visible = false;

    const render = () => {
      // Light easing: enough to feel considered, not enough to feel laggy.
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      raf = window.requestAnimationFrame(render);
    };
    raf = window.requestAnimationFrame(render);

    const onMove = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }

      const target = event.target as Element | null;
      const hit = target?.closest?.("[data-cursor]");
      const next = ((hit?.getAttribute("data-cursor") as State) || "default") satisfies State;
      if (next !== state.current) {
        state.current = next;
        el.dataset.state = next;
        const label = el.querySelector(".cursor-label");
        if (label) label.textContent = LABELS[next];
      }

      // Invert over dark sections so the cursor never disappears.
      const onVoid = Boolean(target?.closest?.(".on-void"));
      el.dataset.onVoid = onVoid ? "true" : "false";
    };

    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      root.classList.remove("cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div id="aevoura-cursor" ref={ref} aria-hidden="true" style={{ opacity: 0 }}>
      <span className="cursor-label" />
    </div>
  );
}
