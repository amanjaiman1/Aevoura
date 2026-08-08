import type { ElementType, ReactNode } from "react";
import type { MotionMode } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** `up` travels further; `rise` is a restrained nudge for dense content. */
  variant?: "up" | "rise";
  mode?: MotionMode;
  /** Seconds. */
  delay?: number;
  /** Stagger children that carry `data-reveal-item` instead of the wrapper. */
  group?: boolean;
  id?: string;
};

/**
 * Declarative reveal marker.
 *
 * Renders no client JavaScript of its own — it only writes data attributes.
 * MotionRuntime finds them once, animates them with a single ScrollTrigger
 * batch, and never touches them again. Without JS, or with reduced motion,
 * the content is simply visible (see globals.css).
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  variant = "up",
  mode = "archive",
  delay,
  group,
  id,
}: RevealProps) {
  return (
    <Tag
      id={id}
      className={className}
      data-reveal={group ? undefined : variant}
      data-reveal-group={group ? variant : undefined}
      data-motion={mode}
      data-reveal-delay={delay}
    >
      {children}
    </Tag>
  );
}
