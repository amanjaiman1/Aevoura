"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const SESSION_KEY = "aevoura:entered";
const PANELS = 5;

/**
 * THE ENTRANCE
 *
 * A dark stage holds the mark while a counter steps 01 → 05, then the screen
 * splits into five panels that lift away with a crimson leading edge to
 * reveal the site. Five panels, five templates — the motif is the product.
 *
 * ── Why it is built this way ────────────────────────────────────────────
 *
 * The exit runs on CSS animations with fixed delays, not on JavaScript. This
 * matters: the overlay is server-rendered, so if its removal depended on a
 * React effect then a visitor with JavaScript disabled would be left staring
 * at a permanent dark screen with the whole site behind it. The animation
 * always runs. JavaScript only ever makes it leave *sooner* (on any key,
 * click or scroll) and then drops the node from the tree.
 *
 * · First load of a session only — `site.intro.oncePerSession`.
 * · Skipped entirely under `prefers-reduced-motion`.
 * · Content renders underneath the whole time; nothing waits on this.
 * · The counter shows 01–05, the real number of templates. It is not a fake
 *   progress percentage, because there is nothing genuine to measure.
 *
 * The inline script at the bottom runs while the HTML is still parsing, so
 * returning visitors never see a flash before React hydrates.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState<"holding" | "leaving" | "gone">("holding");

  useEffect(() => {
    // Switched off in config: nothing is rendered, so there is nothing to do.
    if (!site.intro.enabled) return;

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
    // hidden it before paint; this only drops it out of the tree. Queued so
    // the effect never sets state synchronously.
    if ((already && site.intro.oncePerSession) || reduced) {
      document.documentElement.removeAttribute("data-booting");
      removeTimer = window.setTimeout(() => setPhase("gone"), 0);
      return () => window.clearTimeout(removeTimer);
    }

    document.documentElement.setAttribute("data-booting", "");

    // A reload or a restored tab can bring back a previous scroll position.
    // The intro would then hide it and the reveal would drop the visitor into
    // the middle of the page. If we are showing an intro, start at the top.
    window.scrollTo(0, 0);

    let left = false;
    const leave = () => {
      if (left) return;
      left = true;
      setPhase("leaving");
      document.documentElement.removeAttribute("data-booting");
      // Longest panel finishes at stagger(4 x 60ms) + 700ms duration.
      removeTimer = window.setTimeout(() => setPhase("gone"), 1100);
    };

    // The CSS runs the whole sequence on its own. This timer only exists to
    // release the scroll lock and unmount at the right moment.
    const auto = window.setTimeout(leave, site.intro.holdMs);

    // Let anyone impatient skip straight to the reveal.
    window.addEventListener("keydown", leave, { once: true });
    window.addEventListener("pointerdown", leave, { once: true });
    window.addEventListener("wheel", leave, { once: true, passive: true });

    return () => {
      window.clearTimeout(auto);
      window.clearTimeout(removeTimer);
      window.removeEventListener("keydown", leave);
      window.removeEventListener("pointerdown", leave);
      window.removeEventListener("wheel", leave);
      document.documentElement.removeAttribute("data-booting");
    };
  }, []);

  if (phase === "gone" || !site.intro.enabled) return null;

  const word = site.name.split("");

  return (
    <>
      <div
        id="aevoura-boot"
        aria-hidden="true"
        data-leaving={phase === "leaving" ? "true" : undefined}
        style={{
          // Fallback timing for visitors with no JavaScript. Deliberately a
          // little later than the JS timer so JS normally triggers first.
          ["--boot-hold" as string]: `${site.intro.holdMs + 260}ms`,
        }}
      >
        {/* the five shutters */}
        <div className="boot-panels">
          {Array.from({ length: PANELS }, (_, i) => (
            <span
              key={i}
              className="boot-panel"
              style={{ left: `${(i * 100) / PANELS}%`, ["--i" as string]: i }}
            />
          ))}
        </div>

        {/* Four hairlines on the seams, so the five-way split reads as
            designed rather than arbitrary when the panels part. */}
        <div className="boot-seams" aria-hidden="true">
          {Array.from({ length: PANELS - 1 }, (_, i) => (
            <span
              key={i}
              style={{
                left: `${((i + 1) * 100) / PANELS}%`,
                animationDelay: `${360 + i * 70}ms`,
              }}
            />
          ))}
        </div>

        {/* the stage */}
        <div className="boot-stage">
          <div className="boot-center">
            <span className="boot-mark">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  className="boot-mark-a"
                  d="M5 18.5 12 5l7 13.5"
                  stroke="#fff"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="boot-mark-bar"
                  d="M8.6 14.4h6.8"
                  stroke="#fff"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <p className="boot-word">
              {word.map((letter, i) => (
                <span key={i} style={{ animationDelay: `${300 + i * 42}ms` }}>
                  {letter}
                </span>
              ))}
            </p>

            <p className="boot-tagline">{site.tagline}</p>
          </div>

          {/* status band */}
          <div className="boot-band">
            <span className="boot-count" aria-hidden="true">
              <span className="boot-count-strip">
                {Array.from({ length: PANELS }, (_, i) => (
                  <span key={i}>0{i + 1}</span>
                ))}
              </span>
            </span>

            <span className="boot-rail">
              <span className="boot-rail-fill" />
            </span>

            <span className="boot-label">
              0{site.templateCount}&nbsp;Templates
            </span>
          </div>
        </div>
      </div>

      {/* Runs during HTML parse: no flash for returning visitors. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var o=${site.intro.oncePerSession};var s=sessionStorage.getItem('${SESSION_KEY}')==='1';var r=matchMedia('(prefers-reduced-motion: reduce)').matches;var e=document.getElementById('aevoura-boot');if(e&&((o&&s)||r)){e.style.display='none';}else{document.documentElement.setAttribute('data-booting','');}}catch(_){}})();`,
        }}
      />
    </>
  );
}
