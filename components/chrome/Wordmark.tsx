"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

/**
 * The wordmark. Letters are spaced individually so the name reads like a
 * plate on a gallery wall rather than a logo. The trailing rule and edition
 * number are part of the mark — the collection size is never hidden.
 */
export function Wordmark({
  tone = "paper",
  showEdition = true,
  className = "",
}: {
  tone?: "paper" | "void";
  showEdition?: boolean;
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <Link
      href="/"
      data-cursor="link"
      aria-label={`${site.name} — home`}
      aria-current={pathname === "/" ? "page" : undefined}
      className={`group/mark inline-flex items-baseline gap-3 ${className}`}
    >
      <span
        className={`text-[0.95rem] leading-none font-medium tracking-[0.34em] uppercase ${
          tone === "void" ? "text-chalk" : "text-ink"
        }`}
      >
        {site.wordmark}
      </span>
      {showEdition && (
        <span
          aria-hidden="true"
          className={`meta hidden sm:inline ${
            tone === "void" ? "text-chalk-muted" : "text-ink-muted"
          }`}
        >
          /&nbsp;ED&nbsp;{site.edition}
        </span>
      )}
    </Link>
  );
}
