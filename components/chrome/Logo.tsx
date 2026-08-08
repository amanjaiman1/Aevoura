import Link from "next/link";
import { site } from "@/lib/site";

/**
 * The mark: a crimson disc holding an "A" built from a rising stroke, next
 * to the wordmark. Small enough to work at 36px in the nav pill, and drawn
 * rather than typed so it never depends on a font loading.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M5 18.5 12 5l7 13.5"
          stroke="white"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8.6 14.4h6.8" stroke="white" strokeWidth="2.1" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function Logo({
  tone = "light",
  showMark = true,
  className = "",
}: {
  tone?: "light" | "dark";
  showMark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      {showMark && <LogoMark />}
      <span
        className={`font-display text-[1.0625rem] leading-none font-bold tracking-[-0.02em] ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        {site.name}
      </span>
    </Link>
  );
}
