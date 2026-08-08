"use client";

import { useState } from "react";
import Link from "next/link";
import { works, availabilityLabel } from "@/lib/works";
import { formatPrice } from "@/lib/pricing";
import { Arrow } from "@/components/primitives/Marks";

/**
 * THE INDEX.
 *
 * The collection route is an archive index, not a second copy of the
 * homepage sequence. It reads like the register at the front of a catalogue:
 * five rows, every fact on the row, scannable in one pass.
 *
 * On desktop, moving through the rows swaps a large plate in the sticky
 * panel alongside — the interaction that makes an index feel like a gallery.
 * That plate is an enhancement only: every row already carries its number,
 * name, industry, mood, price and availability as text, and on touch each
 * row shows its own poster inline. Nothing is hover-only.
 */
export function CollectionIndex() {
  const [active, setActive] = useState(0);
  const activeWork = works[active];

  return (
    <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
      {/* ── rows ── */}
      <ol className="border-t border-rule lg:col-span-7">
        {works.map((work, i) => {
          const isActive = i === active;
          return (
            <li key={work.slug} className="border-b border-rule">
              <Link
                href={`/collection/${work.slug}`}
                data-cursor="view"
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group/row block py-6 transition-colors duration-200 lg:py-8"
                aria-label={`${work.name} — ${work.industry}, work ${work.number}`}
              >
                <div className="flex items-start gap-4 sm:gap-8">
                  <span
                    className={`meta shrink-0 pt-2 tabular-nums transition-colors duration-200 ${
                      isActive ? "text-accent" : "text-ink-muted"
                    }`}
                  >
                    {work.number}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-none tracking-[-0.015em] text-ink">
                        {work.name}
                      </h2>
                      <span className="meta basis-full text-ink-muted sm:basis-auto">
                        {formatPrice(work.sourcePrice)}
                        <span aria-hidden="true"> / </span>
                        {formatPrice(work.customFrom)}
                      </span>
                    </div>

                    <p className="mt-2.5 meta text-ink-muted">
                      {work.classification.toUpperCase()}
                      <span aria-hidden="true"> · </span>
                      {work.theme.mood.toUpperCase()}
                    </p>

                    <p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-ink-soft">
                      {work.philosophy}
                    </p>

                    {/* Poster inline on touch and small screens, where there
                        is no sticky panel to show it in. */}
                    <div className="mt-5 lg:hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised SVG poster */}
                      <img
                        src={work.poster}
                        alt={work.posterAlt}
                        width={work.posterAspect[0]}
                        height={work.posterAspect[1]}
                        loading={i === 0 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : "auto"}
                        sizes="100vw"
                        className="w-full border border-rule object-cover"
                        style={{ aspectRatio: "16 / 10" }}
                      />
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                      <span className="meta text-ink group-hover/row:text-accent">
                        View work <Arrow />
                      </span>
                      {work.liveDemo && (
                        <span className="meta text-accent">LIVE DEMO</span>
                      )}
                      <span className="meta text-ink-muted">
                        {availabilityLabel[work.availability].toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>

      {/* ── sticky plate (desktop only) ── */}
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <div className="relative overflow-hidden border border-rule bg-paper-sunk">
            <div className="relative" style={{ aspectRatio: "4 / 5" }}>
              {works.map((work, i) => (
                // eslint-disable-next-line @next/next/no-img-element -- pre-optimised SVG poster
                <img
                  key={work.slug}
                  src={work.poster}
                  alt=""
                  aria-hidden="true"
                  width={work.posterAspect[0]}
                  height={work.posterAspect[1]}
                  loading={i === 0 ? "eager" : "lazy"}
                  sizes="40vw"
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-[cubic-bezier(0.62,0.01,0.2,1)] motion-reduce:transition-none"
                  style={{ opacity: i === active ? 1 : 0 }}
                />
              ))}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5">
                <span className="meta text-chalk/70 tabular-nums">
                  WORK {activeWork.number}
                </span>
                <span className="meta text-chalk/70">
                  {activeWork.industry.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="meta text-ink-muted tabular-nums">
              {activeWork.number} / 00{works.length}
            </p>
            <p className="meta text-ink-muted">
              {activeWork.technology.slice(0, 3).join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
