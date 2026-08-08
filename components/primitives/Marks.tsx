import type { ReactNode } from "react";

/* ============================================================
   ICONS — thin line set, 1.5px stroke, inherit currentColor.
   Drawn rather than typed: the display font has no arrow glyphs,
   and a text arrow falls back to a tofu box on many systems.
   ============================================================ */

type IconProps = { className?: string };

const svg = (className = "") =>
  ({
    viewBox: "0 0 20 20",
    "aria-hidden": true as const,
    focusable: "false" as const,
    fill: "none" as const,
    stroke: "currentColor" as const,
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: `inline-block h-[1.15em] w-[1.15em] shrink-0 ${className}`,
  });

export function ArrowRight({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M3.5 10h13M11.5 5l5 5-5 5" />
    </svg>
  );
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M5.5 14.5 14.5 5.5M7 5.5h7.5V13" />
    </svg>
  );
}

export function CheckMark({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M4 10.5 8 14.5l8-9" />
    </svg>
  );
}

export function CartIcon({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M2.5 3h2l2 9.5h9l2-7H6" />
      <circle cx="8" cy="16" r="1.25" />
      <circle cx="14.5" cy="16" r="1.25" />
    </svg>
  );
}

export function RocketIcon({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M9 13.5 6.5 11c0-4 3-7.5 7.5-8.5.5 4.5-2 8-4.5 9.5l-.5 1.5Z" />
      <path d="M6.5 11 4 12l1 3 3 1 1-2.5M5 15l-2.5 2.5" />
    </svg>
  );
}

export function LayersIcon({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M10 2.5 17.5 6 10 9.5 2.5 6l7.5-3.5Z" />
      <path d="M2.5 10 10 13.5 17.5 10M2.5 14 10 17.5 17.5 14" />
    </svg>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <rect x="4" y="8.5" width="12" height="9" rx="2.5" />
      <path d="M7 8.5V6a3 3 0 0 1 6 0v2.5" />
    </svg>
  );
}

export function WrenchIcon({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M12.5 3a4 4 0 0 0-3.4 6.1L3 15.2 4.8 17l6.1-6.1A4 4 0 0 0 16 4.5l-2.2 2.2-1.5-1.5L14.5 3a4 4 0 0 0-2 0Z" />
    </svg>
  );
}

export function PlayMark({ className = "" }: IconProps) {
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

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M6.5 3h-2A1.5 1.5 0 0 0 3 4.6C3 10.9 9.1 17 15.4 17A1.5 1.5 0 0 0 17 15.5v-2l-3-1.2-1.6 1.8a11 11 0 0 1-4.5-4.5L9.7 8 6.5 3Z" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="m3.5 6 6.5 4.5L16.5 6" />
    </svg>
  );
}

export function CopyIcon({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M13 4.5H5a1.5 1.5 0 0 0-1.5 1.5v8" />
    </svg>
  );
}

/** Named lookup so data files can reference an icon without importing React. */
export const iconMap = {
  cart: CartIcon,
  rocket: RocketIcon,
  layers: LayersIcon,
  lock: LockIcon,
  wrench: WrenchIcon,
} as const;

export type IconName = keyof typeof iconMap;

/* ============================================================
   LABELS AND BADGES
   ============================================================ */

/** Small uppercase label above a heading. */
export function Eyebrow({
  children,
  tone = "light",
  className = "",
  rules = false,
}: {
  children: ReactNode;
  tone?: "light" | "dark" | "accent";
  className?: string;
  /** Flanking hairlines, for centred section labels. */
  rules?: boolean;
}) {
  const colour =
    tone === "dark"
      ? "text-chalk-muted"
      : tone === "accent"
        ? "text-accent"
        : "text-ink-muted";
  const rule = tone === "dark" ? "bg-dark-rule" : "bg-rule";

  if (rules) {
    return (
      <div className={`flex items-center justify-center gap-4 ${className}`}>
        <span aria-hidden="true" className={`h-px w-10 ${rule}`} />
        <span className={`eyebrow ${colour}`}>{children}</span>
        <span aria-hidden="true" className={`h-px w-10 ${rule}`} />
      </div>
    );
  }
  return <p className={`eyebrow ${colour} ${className}`}>{children}</p>;
}

/** Endorsement pill. Teal, because the crimson accent means "action". */
export function Badge({
  children,
  tone = "endorse",
  className = "",
}: {
  children: ReactNode;
  tone?: "endorse" | "accent" | "neutral" | "dark";
  className?: string;
}) {
  const skins = {
    endorse: "bg-endorse text-white",
    accent: "bg-accent text-white",
    neutral: "bg-sunk text-ink-muted",
    dark: "bg-white/15 text-white backdrop-blur-sm",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.625rem] font-bold tracking-[0.06em] uppercase ${skins[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Availability dot + label. */
export function StatusMark({
  label,
  available,
  tone = "light",
}: {
  label: string;
  available: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden="true"
        className={`block h-1.5 w-1.5 rounded-full ${
          available ? "bg-endorse" : tone === "dark" ? "bg-chalk-muted" : "bg-ink-faint"
        }`}
      />
      <span
        className={`text-[0.8125rem] font-medium ${
          tone === "dark" ? "text-chalk-muted" : "text-ink-muted"
        }`}
      >
        {label}
      </span>
    </span>
  );
}

export function Rule({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <hr
      className={`h-px border-0 ${tone === "dark" ? "bg-dark-rule" : "bg-rule"} ${className}`}
    />
  );
}
