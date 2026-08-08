"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { primaryNav, site } from "@/lib/site";
import { works } from "@/lib/works";
import { formatPrice } from "@/lib/pricing";
import { Arrow } from "@/components/primitives/Marks";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen navigation drawer.
 *
 * Accessible dialog behaviour, done properly: labelled, modal, focus moved
 * in on open and restored on close, Tab cycled inside the panel, Escape to
 * dismiss, background scroll locked, and the rest of the page hidden from
 * assistive technology while it is open.
 *
 * It also carries the collection index, since the desktop archive rail is
 * not rendered on small screens.
 */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreTo.current = document.activeElement as HTMLElement | null;

    const scrollLock = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the panel.
    const first = panel.current?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;

      const items = Array.from(
        panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null);
      if (!items.length) return;

      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = scrollLock;
      restoreTo.current?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      hidden={!open}
      className="fixed inset-0 z-70 flex flex-col bg-paper lg:hidden"
    >
      <div className="flex items-center justify-between border-b border-rule px-gutter py-5">
        <p className="meta text-ink-muted">Index</p>
        <button
          type="button"
          onClick={onClose}
          className="-mr-2 flex min-h-11 min-w-11 items-center justify-center px-2 meta text-ink"
        >
          Close
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">
        <nav aria-label="Primary" className="border-b border-rule px-gutter py-6">
          <ul>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex min-h-14 items-center justify-between gap-4 py-2"
                >
                  <span
                    className={`font-display text-[2rem] leading-none ${
                      item.emphasis ? "text-accent" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </span>
                  <Arrow className="text-ink-muted" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-b border-rule px-gutter py-6">
          <p className="meta mb-4 text-ink-muted">
            Edition {site.edition} — 0{site.workCount} works
          </p>
          <ul>
            {works.map((work) => (
              <li key={work.slug} className="border-t border-rule first:border-t-0">
                <Link
                  href={`/collection/${work.slug}`}
                  onClick={onClose}
                  className="flex min-h-14 items-center gap-4 py-3"
                >
                  <span className="meta w-9 shrink-0 text-ink-muted tabular-nums">
                    {work.number}
                  </span>
                  <span className="flex-1">
                    <span className="block text-[1.0625rem] leading-tight text-ink">
                      {work.name}
                    </span>
                    <span className="meta text-ink-muted">{work.industry}</span>
                  </span>
                  <span className="meta shrink-0 text-ink-muted">
                    {formatPrice(work.sourcePrice)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-gutter py-8">
          <Link
            href="/custom-build"
            onClick={onClose}
            className="flex min-h-14 items-center justify-between border border-ink bg-ink px-5 py-4 text-paper"
          >
            <span className="meta">Commission a custom build</span>
            <Arrow />
          </Link>
          <a
            href={`mailto:${site.contact.email}`}
            className="mt-4 flex min-h-11 items-center meta text-ink-muted"
          >
            {site.contact.email}
          </a>
        </div>
      </div>
    </div>
  );
}
