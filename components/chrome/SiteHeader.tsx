"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { IconButton } from "@/components/primitives/ActionLink";
import { ArrowUpRight, MailIcon, PhoneIcon } from "@/components/primitives/Marks";

/**
 * Global navigation: a floating glass pill.
 *
 * It stays white and opaque enough to read over both the dark hero panel and
 * the light page, which is why it never needs to swap themes on scroll. It
 * gains a shadow once you start reading and nothing else changes — every
 * link is present, in the same order, at every scroll position.
 *
 * The circular buttons carry the two actions a visitor most often wants and
 * shouldn't have to hunt for: email us, or go straight to ordering.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const frame = useRef(0);

  /**
   * The drawer is open only for the route it was opened on, so navigating
   * closes it as a consequence of rendering rather than through an effect.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const menuOpen = openedOn === pathname;
  const closeMenu = useCallback(() => setOpenedOn(null), []);

  useEffect(() => {
    const read = () => {
      setScrolled(window.scrollY > 24);
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

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full focus:fixed focus:top-4 focus:left-4 focus:z-70 focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 pt-3 sm:pt-4">
        <div className="shell">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* the pill */}
            <div
              className={`flex flex-1 items-center gap-1 rounded-full border border-white/70 bg-white/95 py-2 pr-3 pl-2 backdrop-blur-xl transition-shadow duration-300 ${
                scrolled ? "shadow-nav" : ""
              }`}
            >
              <Logo className="shrink-0 pr-2 pl-1" />

              <nav aria-label="Primary" className="hidden items-center lg:flex">
                {primaryNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    className={`rounded-full px-4 py-2 text-[0.875rem] font-medium transition-colors duration-200 ${
                      isCurrent(item.href)
                        ? "bg-sunk text-ink"
                        : "text-ink-soft hover:bg-sunk hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* circular actions */}
            <div className="flex shrink-0 items-center gap-2">
              {site.contact.phone && (
                <IconButton
                  href={`tel:${site.contact.phone}`}
                  label={`Call ${site.name}`}
                  variant="light"
                  className="hidden border border-rule sm:inline-flex"
                >
                  <PhoneIcon />
                </IconButton>
              )}
              <IconButton
                href={`mailto:${site.contact.email}`}
                label={`Email ${site.name}`}
                variant="light"
                className="hidden border border-rule sm:inline-flex"
              >
                <MailIcon />
              </IconButton>
              <IconButton href="/buy" label="Buy a template" variant="accent">
                <ArrowUpRight />
              </IconButton>

              <button
                type="button"
                onClick={() => setOpenedOn(pathname)}
                aria-expanded={menuOpen}
                aria-haspopup="dialog"
                aria-label="Open menu"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rule bg-white text-ink transition-colors duration-200 hover:bg-sunk lg:hidden"
              >
                <span aria-hidden="true" className="flex flex-col gap-[5px]">
                  <span className="block h-[1.5px] w-4 rounded-full bg-current" />
                  <span className="block h-[1.5px] w-4 rounded-full bg-current" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
