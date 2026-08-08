import type { ElementType, ReactNode } from "react";
import type { MotionMode } from "@/lib/motion";

type LineMaskProps = {
  /**
   * Each entry is one typeset line. Lines are authored by hand rather than
   * split at runtime: no layout thrash, no re-split on resize, and the
   * line breaks stay art-directed instead of accidental.
   */
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  mode?: MotionMode;
  delay?: number;
};

/**
 * Masked line reveal — each line rides up out of its own clip.
 * The platform's primary typographic entrance.
 */
export function LineMask({
  lines,
  as: Tag = "span",
  className,
  lineClassName,
  mode = "exhibition",
  delay,
}: LineMaskProps) {
  return (
    <Tag className={className} data-lines="" data-motion={mode} data-reveal-delay={delay}>
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          {/* The trailing space keeps the accessible name and any extracted
              text readable — without it, consecutive lines run together as
              "Websites thatcould not belong". It collapses visually. */}
          <span className={lineClassName}>{line} </span>
        </span>
      ))}
    </Tag>
  );
}
