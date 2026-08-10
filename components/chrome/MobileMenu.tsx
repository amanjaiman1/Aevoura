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
 * ── Why it stays mounted ────────────────────────────────────────────────
 *
 * The panel is always in the DOM and hidden with `visibility`, not with the
 * `hidden` attribute or `display: none`. That is what lets it animate *out* as
 * well as in — a display swap has no closing transition to run. `visibility`
 * also removes it from the tab order and the accessibility tree while closed,
 * which `opacity: 0` alone would not.
 *
 * ── Why the close button is in the header ───────────────────────────────
 *
 * The header sits above this panel, so the hamburger stays visible and
 * transforms into the close control rather than being covered by a second
 * button. The trade-off is that the panel's close affordance lives outside the
 * dialog, so the toggle is passed in and spliced into the focus cycle — first,
 * so Shift+Tab from the top of the menu lands on it.
 *
 * Accessible dialog behaviour otherwise: labelled, modal, focus moved in on
 * open and restored on close, Tab cycled, Escape to dismiss, scroll locked.
 */
export function MobileMenu({
  open,
  onClose,
  toggleRef,
}: {
  open: boolean;
  onClose: () => void;
  toggleRef?: React.RefObject<HTMLButtonElement | null>;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreTo.current = document.activeElement as HTMLElement | null;
    const scrollLock = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Let the panel become visible before focus moves, so the browser does not
    // scroll a still-hidden element into view.
    const focusFirst = window.requestAnimationFrame(() => {
      panel.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;

      const inPanel = Array.from(
        panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null);
      // The toggle is the close control, so it belongs in the cycle.
      const items = [toggleRef?.current, ...inPanel].filter(
        (el): el is HTMLElement => Boolean(el)
      );
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
      window.cancelAnimationFrame(focusFirst);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = scrollLock;
      restoreTo.current?.focus();
    };
  }, [open, onClose, toggleRef]);

  /** Stagger index, continuing across the two lists. */
  let order = 0;
  const next = () => ({ ["--i" as string]: order++ });

  return (
    <div
      id="mobile-menu"
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      data-open={open ? "true" : "false"}
      className="menu-panel fixed inset-0 z-60 flex flex-col bg-page lg:hidden"
    >
      {/* Clears the header pill, which floats above this panel. */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-gutter pt-24 pb-8">
        <nav aria-label="Primary">
          <ul className="card overflow-hidden p-2">
            {primaryNav.map((item) => (
              <li key={item.href} className="menu-item" style={next()}>
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

        <p className="menu-item eyebrow mt-8 mb-3 text-ink-muted" style={next()}>
          {site.templateCount} templates
        </p>
        <ul className="card divide-y divide-rule-soft overflow-hidden">
          {templates.map((template) => (
            <li key={template.slug} className="menu-item" style={next()}>
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
          <div className="menu-item" style={next()}>
            <ActionLink href="/buy" variant="primary" size="lg" full>
              Buy a template
            </ActionLink>
          </div>
          <div className="menu-item" style={next()}>
            <ActionLink href="/custom-build" variant="outline" size="lg" full>
              Commission a custom build
            </ActionLink>
          </div>
          <a
            href={`mailto:${site.contact.email}`}
            className="menu-item mt-2 flex min-h-11 items-center justify-center text-[0.875rem] font-medium text-ink-muted"
            style={next()}
          >
            {site.contact.email}
          </a>
        </div>
      </div>
    </div>
  );
}
