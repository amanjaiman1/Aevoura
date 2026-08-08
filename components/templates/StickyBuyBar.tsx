"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Template } from "@/lib/templates";
import { formatPrice } from "@/lib/pricing";
import { ArrowRight } from "@/components/primitives/Marks";

/**
 * Sticky buy bar for small screens.
 *
 * On a phone the price and the Buy button scroll off after the first screen
 * and never come back until the very bottom. This keeps both one thumb-tap
 * away for the whole page — the single highest-leverage commercial fix on a
 * product page.
 *
 * It appears only after the hero's own buttons have scrolled away, so it
 * never duplicates a control that is already on screen.
 */
export function StickyBuyBar({ template }: { template: Template }) {
  const [visible, setVisible] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="h-px w-full" />

      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-surface/95 px-4 py-3 backdrop-blur-lg transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none lg:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.75rem] text-ink-muted">
              {template.name} — source code
            </p>
            <p className="num font-display text-[1.125rem] leading-tight font-bold text-ink">
              {formatPrice(template.sourcePrice)}
            </p>
          </div>
          <Link
            href={`/buy?template=${template.slug}`}
            className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-accent px-6 text-[0.875rem] font-bold text-white"
          >
            Buy now
            <ArrowRight />
          </Link>
        </div>
      </div>
    </>
  );
}
