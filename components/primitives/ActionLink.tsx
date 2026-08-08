import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "./Marks";

type Variant = "primary" | "dark" | "light" | "outline" | "outlineLight" | "quiet";
type Size = "sm" | "md" | "lg";

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Opens in a new tab with the correct security attributes. */
  external?: boolean;
  /** Show a trailing arrow. On by default for everything but `quiet`. */
  arrow?: boolean;
  className?: string;
  ariaLabel?: string;
  full?: boolean;
  /** Optional leading icon element. */
  icon?: ReactNode;
};

/**
 * The button. Fully rounded pill, bold label, trailing arrow that slides.
 *
 * `primary` is crimson and reserved for the single most important action on
 * a screen — buying, or starting a project. Everything else is dark, light
 * or outlined so the crimson never has to compete with itself.
 */

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[0.8125rem] gap-2",
  md: "px-6 py-3.5 text-[0.875rem] gap-2.5",
  lg: "px-7 py-4 text-[0.9375rem] gap-3",
};

const skins: Record<Variant, string> = {
  primary:
    "bg-accent text-white border border-accent hover:bg-accent-deep hover:border-accent-deep",
  dark: "bg-ink text-white border border-ink hover:bg-dark hover:border-dark",
  light: "bg-white text-ink border border-white hover:bg-white/90",
  outline:
    "bg-transparent text-ink border border-rule hover:border-ink hover:bg-surface",
  outlineLight:
    "bg-transparent text-white border border-white/35 hover:border-white hover:bg-white/10",
  quiet: "bg-transparent text-ink-muted hover:text-accent border border-transparent px-0",
};

export function ActionLink({
  href,
  children,
  variant = "outline",
  size = "md",
  external = false,
  arrow,
  className = "",
  ariaLabel,
  full = false,
  icon,
}: ActionLinkProps) {
  const showArrow = arrow ?? variant !== "quiet";
  const Arrow = external ? ArrowUpRight : ArrowRight;

  const classes = [
    "group/action inline-flex min-h-11 items-center justify-center rounded-full font-bold leading-none transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]",
    sizes[size],
    skins[variant],
    full ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {showArrow && (
        <Arrow className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/action:translate-x-0.5 motion-reduce:transition-none" />
      )}
    </>
  );

  // mailto: and tel: are plain anchors — no router, no new tab.
  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
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
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}

/** Circular icon button, as used in the header. */
export function IconButton({
  href,
  label,
  children,
  external = false,
  variant = "dark",
  className = "",
}: {
  href: string;
  label: string;
  children: ReactNode;
  external?: boolean;
  variant?: "dark" | "light" | "accent";
  className?: string;
}) {
  const skin = {
    dark: "bg-ink text-white hover:bg-accent",
    light: "bg-white text-ink hover:bg-white/90",
    accent: "bg-accent text-white hover:bg-accent-deep",
  }[variant];

  const classes = `inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${skin} ${className}`;

  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} aria-label={label} title={label} className={classes}>
        {children}
      </a>
    );
  }
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
        className={classes}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} aria-label={label} title={label} className={classes}>
      {children}
    </Link>
  );
}
