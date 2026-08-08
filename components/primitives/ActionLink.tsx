import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "@/components/primitives/Marks";

type Tone = "paper" | "void";
type Variant = "solid" | "accent" | "outline" | "quiet";

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  /** Opens in a new tab with the correct security attributes. */
  external?: boolean;
  className?: string;
  /** Small mono index shown before the label, e.g. "01". */
  index?: string;
  /** Announced label when the visible text is not descriptive enough. */
  ariaLabel?: string;
  full?: boolean;
};

const base =
  "group/action relative inline-flex items-center justify-between gap-6 overflow-hidden meta transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] min-h-11";

const shapes: Record<Variant, string> = {
  solid: "px-6 py-4 border",
  accent: "px-6 py-4 border",
  outline: "px-6 py-4 border",
  quiet: "py-2",
};

/**
 * Commerce motion: fast, responsive, reassuring. Nothing bounces.
 *
 * `accent` is reserved for the primary commercial route — commissioning a
 * build. It is the only vermilion-filled control on the platform, which is
 * what makes it read as the most important thing on the screen.
 */
const skins: Record<Tone, Record<Variant, string>> = {
  paper: {
    solid: "border-ink bg-ink text-paper hover:text-paper",
    accent: "border-accent bg-accent text-paper hover:text-paper",
    outline: "border-rule text-ink hover:text-paper hover:border-ink",
    quiet: "text-ink-muted hover:text-accent",
  },
  void: {
    solid: "border-chalk bg-chalk text-void hover:text-void",
    accent: "border-accent bg-accent text-paper hover:text-void",
    outline: "border-void-rule text-chalk hover:text-void hover:border-chalk",
    quiet: "text-chalk-muted hover:text-chalk",
  },
};

/** The fill that slides up on hover. Only the bordered variants have one. */
const fills: Record<Tone, Record<Variant, string>> = {
  paper: {
    solid: "bg-accent",
    accent: "bg-ink",
    outline: "bg-ink",
    quiet: "",
  },
  void: {
    solid: "bg-accent",
    accent: "bg-chalk",
    outline: "bg-chalk",
    quiet: "",
  },
};

export function ActionLink({
  href,
  children,
  variant = "outline",
  tone = "paper",
  external = false,
  className = "",
  index,
  ariaLabel,
  full = false,
}: ActionLinkProps) {
  const hasFill = variant !== "quiet";

  const content = (
    <>
      {hasFill && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 translate-y-full transition-transform duration-[280ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/action:translate-y-0 group-focus-visible/action:translate-y-0 ${fills[tone][variant]}`}
        />
      )}
      <span className="relative flex items-center gap-3">
        {index && (
          <span aria-hidden="true" className="opacity-45">
            {index}
          </span>
        )}
        <span>{children}</span>
      </span>
      <span
        aria-hidden="true"
        className="relative block w-4 shrink-0 overflow-hidden"
      >
        <span className="block transition-transform duration-[280ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/action:translate-x-[130%] group-focus-visible/action:translate-x-[130%]">
          <Arrow dir={external ? "ne" : "right"} />
        </span>
        <span className="absolute inset-0 block -translate-x-[130%] transition-transform duration-[280ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/action:translate-x-0 group-focus-visible/action:translate-x-0">
          <Arrow dir={external ? "ne" : "right"} />
        </span>
      </span>
    </>
  );

  const classes = [
    base,
    shapes[variant],
    skins[tone][variant],
    full ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // mailto: and tel: are plain anchors — no router, no new tab.
  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel} data-cursor="link">
        {content}
      </a>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
        data-cursor="external"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel} data-cursor="link">
      {content}
    </Link>
  );
}
