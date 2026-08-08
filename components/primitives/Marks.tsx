import type { ReactNode } from "react";

/**
 * Registration mark — the print crop cross used on gallery signage and
 * press sheets. Purely typographic furniture, but it is a large part of
 * what makes the platform read as an archive rather than a marketplace.
 */
export function RegistrationMark({
  className = "",
  tone = "paper",
}: {
  className?: string;
  tone?: "paper" | "void";
}) {
  const stroke = tone === "void" ? "text-void-rule" : "text-rule";
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`h-4 w-4 shrink-0 ${stroke} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M8 0v6M8 10v6M0 8h6M10 8h6" />
      <circle cx="8" cy="8" r="3" />
    </svg>
  );
}

/** Section label: mono index + title, separated by a hairline. */
export function SectionLabel({
  index,
  children,
  tone = "paper",
  className = "",
}: {
  index: string;
  children: ReactNode;
  tone?: "paper" | "void";
  className?: string;
}) {
  const rule = tone === "void" ? "bg-void-rule" : "bg-rule";
  const muted = tone === "void" ? "text-chalk-muted" : "text-ink-muted";
  return (
    <div className={`flex items-baseline gap-4 ${className}`}>
      <span className={`meta ${muted}`} aria-hidden="true">
        {index}
      </span>
      <span aria-hidden="true" className={`mt-2 h-px w-8 shrink-0 ${rule}`} />
      <span className={`meta ${muted}`}>{children}</span>
    </div>
  );
}

/** A hairline that spans the content column. */
export function Rule({
  tone = "paper",
  className = "",
}: {
  tone?: "paper" | "void";
  className?: string;
}) {
  return (
    <hr
      className={`h-px border-0 ${tone === "void" ? "bg-void-rule" : "bg-rule"} ${className}`}
    />
  );
}

/**
 * Availability pill. Deliberately not a glowing badge — a mono label with
 * a status dot, the way a gallery lists whether a piece is still for sale.
 */
export function AvailabilityMark({
  label,
  available,
  tone = "paper",
}: {
  label: string;
  available: boolean;
  tone?: "paper" | "void";
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden="true"
        className={`block h-1.5 w-1.5 rounded-full ${
          available ? "bg-accent" : tone === "void" ? "bg-chalk-muted" : "bg-ink-muted"
        }`}
      />
      <span className={`meta ${tone === "void" ? "text-chalk-muted" : "text-ink-muted"}`}>
        {label}
      </span>
    </span>
  );
}


/**
 * Arrows as SVG, not as characters.
 *
 * Geist Mono has no glyph for U+2192 or U+2197, so a text arrow inside the
 * `meta` style falls back to whatever the OS has — and on many systems that
 * means a tofu box. Drawing them means they always render, always match the
 * hairline weight of the rules around them, and inherit currentColor.
 */
export function Arrow({
  dir = "right",
  className = "",
}: {
  dir?: "right" | "ne" | "down";
  className?: string;
}) {
  const paths: Record<string, string> = {
    right: "M1 8h13M9.5 3.5 14 8l-4.5 4.5",
    ne: "M4 12 12.5 3.5M5.5 3.5H12.5V10.5",
    down: "M8 1v13M3.5 9.5 8 14l4.5-4.5",
  };
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      className={`inline-block h-[1em] w-[1em] shrink-0 align-[-0.1em] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
    >
      <path d={paths[dir]} />
    </svg>
  );
}

/** Play triangle for the preview-video control. */
export function PlayMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      focusable="false"
      className={`inline-block h-[0.85em] w-[0.85em] shrink-0 ${className}`}
      fill="currentColor"
    >
      <path d="M2 1l8 5-8 5z" />
    </svg>
  );
}
