"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { MobileMenu } from "./MobileMenu";

/**
 * Global navigation.
 *
 * It transforms on scroll — from an open, airy plate at the top of the page
 * to a compact bar with a paper ground and a hairline once you are reading —
 * but the transformation is only visual weight. Every link stays present,
 * in the same order, at every scroll position. Nothing is hidden to be
 * clever, and it never hides on scroll-down, which would make the primary
 * commercial route harder to reach the further someone reads.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [condensed, setCondensed] = useState(false);
  const frame = useRef(0);

  /**
   * The drawer is open only for the route it was opened on, so navigating
   * closes it as a consequence of rendering rather than through an effect
   * that fires after the new page is already visible behind it.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const menuOpen = openedOn === pathname;
  const closeMenu = useCallback(() => setOpenedOn(null), []);

  useEffect(() => {
    const read = () => {
      setCondensed(window.scrollY > 64);
      frame.current = 0;
    };
    const onScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame.current) window.cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only meta focus:fixed focus:top-3 focus:left-3 focus:z-90 focus:border focus:border-ink focus:bg-paper focus:px-4 focus:py-3"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-40 transition-[background-color,border-color,padding] duration-[var(--duration-archive)] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
          condensed
            ? "border-b border-rule bg-paper/92 py-3 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-6"
        }`}
      >
        <div className="shell flex items-center justify-between gap-6">
          <Wordmark />

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-cursor="link"
                aria-current={isCurrent(item.href) ? "page" : undefined}
                data-underlined={isCurrent(item.href) ? "true" : undefined}
                className={`link-rule meta transition-colors duration-200 ${
                  item.emphasis
                    ? "text-accent hover:text-accent-deep"
                    : isCurrent(item.href)
                      ? "text-ink"
                      : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              data-cursor="link"
              className="group/enq relative inline-flex min-h-11 items-center overflow-hidden border border-ink px-5 py-2.5 meta text-ink transition-colors duration-200 hover:text-paper"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-y-full bg-ink transition-transform duration-[280ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/enq:translate-y-0 group-focus-visible/enq:translate-y-0"
              />
              <span className="relative">Enquire</span>
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpenedOn(pathname)}
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            className="-mr-2 flex min-h-11 min-w-11 items-center justify-end gap-2 px-2 meta text-ink lg:hidden"
          >
            <span aria-hidden="true" className="flex flex-col gap-1">
              <span className="block h-px w-5 bg-ink" />
              <span className="block h-px w-5 bg-ink" />
            </span>
            Index
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
