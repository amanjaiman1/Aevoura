import Link from "next/link";
import type { Work } from "@/lib/works";
import { works, availabilityLabel } from "@/lib/works";
import { formatPrice } from "@/lib/pricing";
import { site } from "@/lib/site";
import { PreviewMedia } from "@/components/work/PreviewMedia";
import { Reveal } from "@/components/primitives/Reveal";
import { LineMask } from "@/components/primitives/LineMask";
import { AvailabilityMark, RegistrationMark, Arrow } from "@/components/primitives/Marks";

/**
 * THE COLLECTION SEQUENCE
 *
 * Five entries, five compositions. The layouts are authored per work rather
 * than generated from a loop, because five cloned cards is exactly what this
 * platform is not. Each entry gets real screen space, its own crop, and the
 * same three routes out: look closer, open it live, or have it rebuilt.
 *
 * Every entry is also a rail anchor (`data-rail-work`), which is what lets
 * the archive rail act as an index of this page.
 */

type Composition = {
  /** Grid placement for the media column. */
  media: string;
  /** Grid placement for the text column. */
  text: string;
  /** Crop, chosen per work so the five never feel stamped from one die. */
  crop: string;
  /** Order on mobile: media first reads better for most, text first for one. */
  textFirstOnMobile?: boolean;
};

const compositions: Composition[] = [
  // 001 Aurvi — wide left plate, caption held high to the right
  {
    media: "lg:col-span-7 lg:col-start-1",
    text: "lg:col-span-4 lg:col-start-9",
    crop: "aspect-[4/3] sm:aspect-[16/10]",
  },
  // 002 Kinetic — text leads, media runs off to the right edge
  {
    media: "lg:col-span-8 lg:col-start-5",
    text: "lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:pt-4",
    crop: "aspect-[16/10] sm:aspect-[21/9]",
    textFirstOnMobile: true,
  },
  // 003 Monolith — full measure, caption dropped underneath like a plate
  {
    media: "lg:col-span-12",
    text: "lg:col-span-5 lg:col-start-1",
    crop: "aspect-[16/10] sm:aspect-[2/1]",
  },
  // 004 Velora — narrow portrait window, generous air on the left
  {
    media: "lg:col-span-5 lg:col-start-8",
    text: "lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:pt-20",
    crop: "aspect-[4/3] sm:aspect-[3/4]",
    textFirstOnMobile: true,
  },
  // 005 Orbital — wide plate, caption sitting at its foot
  {
    media: "lg:col-span-7 lg:col-start-6",
    text: "lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:self-end lg:pb-6",
    crop: "aspect-[4/3] sm:aspect-[16/10]",
  },
];

function WorkEntry({
  work,
  composition,
  index,
}: {
  work: Work;
  composition: Composition;
  index: number;
}) {
  const available = work.availability === "available";

  return (
    <article
      id={`work-${work.slug}`}
      data-rail-work={work.slug}
      className="scroll-mt-24 border-t border-rule py-14 first:border-t-0 lg:py-20"
      aria-labelledby={`work-${work.slug}-title`}
    >
      <div className="grid gap-y-8 lg:grid-cols-12 lg:items-start lg:gap-x-8">
        {/* ── media ── */}
        <Reveal
          variant="up"
          mode="exhibition"
          className={`${composition.media} ${
            composition.textFirstOnMobile ? "order-2 lg:order-none" : "order-1 lg:order-none"
          }`}
        >
          <Link
            href={`/collection/${work.slug}`}
            data-cursor="view"
            aria-label={`View ${work.name} — ${work.industry}`}
            className="exhibit-link block"
          >
            <div className="exhibit relative border border-rule">
              <PreviewMedia
                work={work}
                priority={index === 0}
                className={`${composition.crop} exhibit-zoom`}
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              {/* corner plate */}
              <div className="pointer-events-none absolute top-0 left-0 flex items-center gap-3 bg-paper px-3 py-2">
                <span className="meta text-ink tabular-nums">WORK {work.number}</span>
              </div>
            </div>
          </Link>
        </Reveal>

        {/* ── text ── */}
        <div
          className={`${composition.text} ${
            composition.textFirstOnMobile ? "order-1 lg:order-none" : "order-2 lg:order-none"
          }`}
        >
          <Reveal variant="rise" mode="archive" className="flex items-center justify-between gap-4">
            <span className="meta text-ink-muted">
              {work.classification.toUpperCase()}
            </span>
            <AvailabilityMark
              label={availabilityLabel[work.availability]}
              available={available}
            />
          </Reveal>

          <h3 id={`work-${work.slug}-title`} className="mt-5">
            <Link
              href={`/collection/${work.slug}`}
              data-cursor="link"
              className="link-rule font-display text-headline tracking-[-0.015em] text-ink"
            >
              {work.name}
            </Link>
          </h3>

          <LineMask
            as="p"
            mode="archive"
            className="mt-4 max-w-md font-display text-title text-ink-soft"
            lines={[work.philosophy]}
          />

          <Reveal
            as="p"
            variant="rise"
            mode="archive"
            className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-ink-muted"
          >
            {work.positioning}
          </Reveal>

          {/* price + routes out */}
          <Reveal variant="rise" mode="commerce" className="mt-7 border-t border-rule pt-5">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <p className="meta text-ink-muted">
                Source{" "}
                <span className="text-ink">{formatPrice(work.sourcePrice)}</span>
              </p>
              <p className="meta text-ink-muted">
                Built for you{" "}
                <span className="text-ink">{formatPrice(work.customFrom)}</span>
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-x-6 gap-y-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={`/collection/${work.slug}`}
                data-cursor="link"
                className="link-rule meta text-ink"
              >
                View work <Arrow />
              </Link>
              {work.liveDemo && (
                <a
                  href={work.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="external"
                  className="link-rule meta text-accent"
                >
                  Open live experience <Arrow dir="ne" />
                </a>
              )}
              <Link
                href={`/custom-build?work=${work.slug}`}
                data-cursor="link"
                className="link-rule meta text-ink-muted hover:text-ink"
              >
                Build this for my brand <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

export function CollectionSequence() {
  return (
    <section className="shell" aria-labelledby="collection-title">
      {/* ── introduction ── */}
      <div className="grid gap-y-8 border-t border-rule py-14 lg:grid-cols-12 lg:gap-x-8 lg:py-20">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4">
            <span className="meta text-ink-muted">THE COLLECTION</span>
            <RegistrationMark />
          </div>
          <h2 id="collection-title" className="mt-6">
            <LineMask
              as="span"
              mode="exhibition"
              className="block font-display text-headline tracking-[-0.015em] text-ink"
              lines={["Five works.", "Not a catalogue."]}
            />
          </h2>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal as="p" variant="up" mode="archive" className="text-lede text-ink-soft">
            We are not trying to have something for everyone. Edition{" "}
            {site.edition} is {site.workCountWord} builds, each taken to the point
            where it could launch tomorrow — and each one still a starting
            point if you want it to be.
          </Reveal>
          <Reveal
            as="dl"
            variant="rise"
            mode="archive"
            group
            className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-rule pt-6 sm:grid-cols-3"
          >
            <div>
              <dt className="meta text-ink-muted">Works in edition</dt>
              <dd
                className="mt-1.5 font-display text-title text-ink tabular-nums"
                data-counter={site.workCount}
                data-counter-pad="2"
              >
                0{site.workCount}
              </dd>
            </div>
            <div>
              <dt className="meta text-ink-muted">Edition</dt>
              <dd className="mt-1.5 font-display text-title text-ink tabular-nums">
                {site.edition}
              </dd>
            </div>
            <div>
              <dt className="meta text-ink-muted">Sold exclusively</dt>
              <dd className="mt-1.5 font-display text-title text-ink tabular-nums">
                00
              </dd>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── the five ── */}
      {works.map((work, i) => (
        <WorkEntry
          key={work.slug}
          work={work}
          index={i}
          composition={compositions[i % compositions.length]}
        />
      ))}
    </section>
  );
}
