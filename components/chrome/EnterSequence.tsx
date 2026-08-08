"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const SESSION_KEY = "aevoura:entered";

/**
 * The entry moment.
 *
 * Deliberately short and deliberately honest: it waits for fonts to settle
 * and then leaves. It is not a progress theatre, it does not hold content
 * hostage, and it does not run twice.
 *
 *   · First load of a session only.
 *   · Skipped entirely when reduced motion is requested.
 *   · Dismissed instantly by any key, click or scroll.
 *   · Hard-capped at 1100ms — if fonts are slow, we leave without them.
 *
 * The inline script below runs while the HTML is still parsing, so returning
 * visitors never see a flash of the overlay before React hydrates.
 */
export function EnterSequence() {
  const [phase, setPhase] = useState<"holding" | "leaving" | "gone">("holding");

  useEffect(() => {
    let already = false;
    try {
      already = sessionStorage.getItem(SESSION_KEY) === "1";
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* private mode: treat as a first visit */
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let removeTimer = 0;

    // Returning visitor, or motion is unwelcome. The inline script has already
    // hidden the overlay before paint; this only drops it out of the tree.
    // Queued rather than called inline so the effect never renders twice.
    if (already || reduced) {
      document.documentElement.removeAttribute("data-entering");
      removeTimer = window.setTimeout(() => setPhase("gone"), 0);
      return () => window.clearTimeout(removeTimer);
    }

    document.documentElement.setAttribute("data-entering", "");

    let left = false;
    const leave = () => {
      if (left) return;
      left = true;
      setPhase("leaving");
      document.documentElement.removeAttribute("data-entering");
      removeTimer = window.setTimeout(() => setPhase("gone"), 760);
    };

    // Leave as soon as fonts settle, but never later than the cap.
    const cap = window.setTimeout(leave, 1100);
    const minimum = window.setTimeout(() => {
      document.fonts?.ready?.then(leave).catch(leave);
    }, 420);

    window.addEventListener("keydown", leave, { once: true });
    window.addEventListener("pointerdown", leave, { once: true });
    window.addEventListener("wheel", leave, { once: true, passive: true });

    return () => {
      window.clearTimeout(cap);
      window.clearTimeout(minimum);
      window.clearTimeout(removeTimer);
      window.removeEventListener("keydown", leave);
      window.removeEventListener("pointerdown", leave);
      window.removeEventListener("wheel", leave);
      document.documentElement.removeAttribute("data-entering");
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <>
      <div
        id="aevoura-enter"
        aria-hidden="true"
        data-leaving={phase === "leaving" ? "true" : undefined}
        className="pointer-events-none fixed inset-0 z-90 flex flex-col justify-between bg-paper px-gutter py-8"
      >
        <div className="flex items-start justify-between">
          <span className="meta text-ink-muted">Edition {site.edition}</span>
          <span className="meta text-ink-muted">{site.contact.location}</span>
        </div>

        <div className="flex items-end justify-between gap-6">
          <p className="enter-word text-[clamp(2.25rem,9vw,7rem)] leading-[0.85] font-display tracking-[-0.015em] text-ink">
            {site.wordmark.split("").map((letter, i) => (
              <span
                key={i}
                className="inline-block"
                style={{ animationDelay: `${60 + i * 42}ms` }}
              >
                {letter}
              </span>
            ))}
          </p>
          <p className="meta shrink-0 pb-2 text-ink-muted tabular-nums">
            0{site.workCount}
          </p>
        </div>

        <div className="flex items-end justify-between gap-6">
          <span className="meta text-ink-muted">A finite collection</span>
          <span aria-hidden="true" className="block h-px w-24 origin-left bg-rule">
            <span className="enter-bar block h-full w-full origin-left bg-accent" />
          </span>
        </div>
      </div>

      {/* Runs during HTML parse: no overlay flash for returning visitors. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var s=sessionStorage.getItem('${SESSION_KEY}')==='1';var r=matchMedia('(prefers-reduced-motion: reduce)').matches;var e=document.getElementById('aevoura-enter');if(e&&(s||r)){e.style.display='none';}else{document.documentElement.setAttribute('data-entering','');}}catch(_){}})();`,
        }}
      />
    </>
  );
}
