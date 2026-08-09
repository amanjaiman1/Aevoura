"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Template } from "@/lib/templates";
import { hasFinePointer, isLowPowerDevice } from "@/lib/motion";
import { PlayMark } from "@/components/primitives/Marks";

type PreviewMediaProps = {
  template: Template;
  /**
   * `visible` — video starts when the surface is properly on screen (desktop).
   * `intent`  — video starts only on deliberate hover or an explicit tap.
   */
  trigger?: "visible" | "intent";
  /** The first poster on a page should not be lazy. */
  priority?: boolean;
  className?: string;
  children?: React.ReactNode;
  sizes?: string;
};

/**
 * Poster first, always.
 *
 * Posters are real frames captured from the live demos, so they go through
 * `next/image`: AVIF and WebP variants, a responsive srcset from the `sizes`
 * hint, and a reserved box that cannot shift. `fill` is used because the frame
 * itself owns the aspect ratio — the crop changes per placement.
 *
 * Preview video stays a progressive enhancement: the <video> element is not
 * created until it is wanted, never downloads on a low-power or metered
 * connection until asked, and pauses the moment it leaves the viewport or the
 * tab is hidden. Works with `previewVideo: null`, which is the current state —
 * the poster simply stands alone.
 */
export function PreviewMedia({
  template,
  trigger = "visible",
  priority = false,
  className = "",
  children,
  sizes = "100vw",
}: PreviewMediaProps) {
  const [ratioW, ratioH] = template.posterAspect;
  const hasVideo = Boolean(template.previewVideo);

  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [wantsManual, setWantsManual] = useState(false);
  const inView = useRef(false);

  const autoAllowed = useCallback(() => {
    if (!hasVideo) return false;
    if (isLowPowerDevice()) return false;
    if (trigger === "intent") return false;
    return hasFinePointer();
  }, [hasVideo, trigger]);

  useEffect(() => {
    if (!hasVideo) return;
    const el = frame.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (autoAllowed()) setMounted(true);
        } else {
          video.current?.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.45 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasVideo, autoAllowed]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        video.current?.pause();
        setPlaying(false);
      } else if (inView.current && (autoAllowed() || wantsManual)) {
        void video.current?.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [autoAllowed, wantsManual]);

  const start = useCallback(() => {
    if (!hasVideo) return;
    setMounted(true);
    setWantsManual(true);
    window.setTimeout(() => {
      void video.current?.play().catch(() => {});
    }, 0);
  }, [hasVideo]);

  const stop = useCallback(() => {
    setWantsManual(false);
    if (trigger === "intent") {
      video.current?.pause();
      setPlaying(false);
    }
  }, [trigger]);

  return (
    <div
      ref={frame}
      className={`zoom-frame relative isolate bg-sunk ${className}`}
      style={{ aspectRatio: `${ratioW} / ${ratioH}` }}
      onPointerEnter={hasVideo && hasFinePointer() ? start : undefined}
      onPointerLeave={hasVideo && hasFinePointer() ? stop : undefined}
    >
      <Image
        src={template.poster}
        alt={template.posterAlt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="zoom-media object-cover"
      />

      {mounted && template.previewVideo && (
        <video
          ref={video}
          className="preview-video absolute inset-0 h-full w-full object-cover"
          data-playing={playing ? "true" : "false"}
          src={template.previewVideo}
          poster={template.poster}
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      )}

      {/* Touch and keyboard route to the preview. Never hover-only. */}
      {hasVideo && !playing && (
        <button
          type="button"
          onClick={start}
          className="absolute bottom-3 left-3 z-10 inline-flex min-h-11 items-center gap-2 rounded-full bg-black/55 px-4 text-[0.8125rem] font-bold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/75"
        >
          <PlayMark />
          Preview
        </button>
      )}

      {children}
    </div>
  );
}
