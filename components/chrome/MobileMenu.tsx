"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { primaryNav, site } from "@/lib/site";
import { templates } from "@/lib/templates";
import { formatPrice } from "@/lib/pricing";
import { ActionLink } from "@/components/primitives/ActionLink";
import { ArrowRight } from "@/components/primitives/Marks";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Navigation drawer.
 *
 * Accessible dialog behaviour: labelled, modal, focus moved in on open and
 * restored on close, Tab cycled inside, Escape to dismiss, background scroll
 * locked. It also carries the template list and prices, because on a phone
 * this is the fastest route to the thing someone came to buy.
 */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreTo.current = document.activeElement as HTMLElement | null;
    const scrollLock = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    panel.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

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

      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
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
      aria-label="Menu"
      hidden={!open}
      className="fixed inset-0 z-70 flex flex-col bg-page lg:hidden"
    >
      <div className="flex items-center justify-between px-gutter py-4">
        <p className="eyebrow text-ink-muted">Menu</p>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-[0.8125rem] font-bold text-white"
        >
          Close
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain px-gutter pb-8">
        <nav aria-label="Primary">
          <ul className="card overflow-hidden p-2">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex min-h-14 items-center justify-between gap-4 rounded-lg px-4 py-3 hover:bg-sunk"
                >
                  <span className="font-display text-[1.375rem] font-bold tracking-[-0.02em] text-ink">
                    {item.label}
                  </span>
                  <ArrowRight className="text-ink-faint" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="eyebrow mt-8 mb-3 text-ink-muted">
          {site.templateCount} templates
        </p>
        <ul className="card divide-y divide-rule-soft overflow-hidden">
          {templates.map((template) => (
            <li key={template.slug}>
              <Link
                href={`/templates/${template.slug}`}
                onClick={onClose}
                className="flex min-h-16 items-center gap-3 px-4 py-3 hover:bg-sunk"
              >
                <span className="num w-6 shrink-0 text-[0.75rem] text-ink-faint">
                  {template.number}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-[1.0625rem] font-bold text-ink">
                    {template.name}
                  </span>
                  <span className="block truncate text-[0.8125rem] text-ink-muted">
                    {template.industry}
                  </span>
                </span>
                <span className="num shrink-0 text-[0.8125rem] font-medium text-ink">
                  {formatPrice(template.sourcePrice)}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3">
          <ActionLink href="/buy" variant="primary" size="lg" full>
            Buy a template
          </ActionLink>
          <ActionLink href="/custom-build" variant="outline" size="lg" full>
            Commission a custom build
          </ActionLink>
          <a
            href={`mailto:${site.contact.email}`}
            className="mt-2 flex min-h-11 items-center justify-center text-[0.875rem] font-medium text-ink-muted"
          >
            {site.contact.email}
          </a>
        </div>
      </div>
    </div>
  );
}
