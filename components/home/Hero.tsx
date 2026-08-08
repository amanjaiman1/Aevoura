import { site } from "@/lib/site";
import { works, getFeaturedWork } from "@/lib/works";
import { formatPrice } from "@/lib/pricing";
import { LineMask } from "@/components/primitives/LineMask";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { RegistrationMark, Arrow } from "@/components/primitives/Marks";
import { Aperture } from "./Aperture";

/**
 * HERO — manifesto and living preview.
 *
 * The commercial job of this screen is unambiguous: within ten seconds a
 * visitor should know there are exactly five websites, that they can be
 * bought outright, that they can be rebuilt around a brand, what that costs,
 * and that at least one of them can be opened and used right now.
 *
 * The artistic ambiguity is allowed to live in the aperture, not in the
 * copy or the pricing.
 */
export function Hero() {
  const featured = getFeaturedWork();
  const cheapestSource = Math.min(...works.map((w) => w.sourcePrice));
  const cheapestCustom = Math.min(...works.map((w) => w.customFrom));
  const liveCount = works.filter((w) => w.liveDemo).length;

  return (
    <section className="relative" aria-labelledby="hero-title">
      {/* ── archive header strip ── */}
      <div className="shell">
        <div className="flex items-center justify-between gap-4 border-b border-rule py-4">
          <div className="flex items-center gap-4 sm:gap-8">
            <span className="meta text-ink">EDITION {site.edition}</span>
            <span className="meta hidden text-ink-muted sm:inline">
              0{site.workCount} WORKS
            </span>
            <span className="meta hidden text-ink-muted md:inline">
              {liveCount > 0 ? `0${liveCount} LIVE DEMO` : "DEMOS ON REQUEST"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <RegistrationMark className="hidden sm:block" />
            <span className="meta text-ink-muted">{site.contact.location}</span>
          </div>
        </div>
      </div>

      {/* ── manifesto + window ── */}
      <div className="shell relative">
        {/* The layout grid, left visible like the guides on a press sheet.
            Desktop only, and quiet enough that you notice it second. */}
        <span aria-hidden="true" className="column-guides hidden xl:block" />

        <div className="relative grid gap-y-10 pt-10 pb-16 lg:grid-cols-12 lg:gap-x-8 lg:pt-16 lg:pb-24">
          {/* statement */}
          <div className="lg:col-span-7 lg:pr-8 xl:col-span-6">
            <h1 id="hero-title">
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-statement tracking-[-0.02em] text-ink"
                lines={[
                  "Websites that",
                  "could not belong",
                  <>
                    to anyone{" "}
                    <span className="italic text-accent">else.</span>
                  </>,
                ]}
              />
            </h1>

            <Reveal
              as="p"
              variant="up"
              mode="archive"
              delay={0.5}
              className="mt-8 max-w-lg text-lede text-ink-soft"
            >
              Edition {site.edition} is {site.workCountWord} complete website
              experiences — designed, engineered and performance-tested in full.
              Buy one as source code, or have us rebuild it entirely around your
              brand.
            </Reveal>

            {/* actions. The custom route carries the only accent fill on the
                platform, which is what makes it read as primary. */}
            <Reveal
              variant="up"
              mode="commerce"
              delay={0.66}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-stretch"
            >
              <ActionLink href="/custom-build" variant="accent">
                Commission a custom build
              </ActionLink>
              <ActionLink href="/collection" variant="outline">
                Enter the collection
              </ActionLink>
            </Reveal>

            {/* commercial clarity, immediately */}
            <Reveal
              variant="rise"
              mode="archive"
              delay={0.8}
              className="mt-8 border-t border-rule pt-5"
            >
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <p className="meta text-ink-muted">
                  Source from{" "}
                  <span className="text-ink">{formatPrice(cheapestSource)}</span>
                </p>
                <span aria-hidden="true" className="hidden h-3 w-px bg-rule sm:block" />
                <p className="meta text-ink-muted">
                  Built for you from{" "}
                  <span className="text-ink">{formatPrice(cheapestCustom)}</span>
                </p>
              </div>
              {featured.liveDemo && (
                <a
                  href={featured.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="external"
                  className="link-rule mt-3 inline-flex items-center gap-2 meta text-accent"
                >
                  Open the {featured.name} live experience
                  <Arrow dir="ne" />
                </a>
              )}
            </Reveal>
          </div>

          {/* the window */}
          <div className="lg:col-span-5 lg:col-start-8 xl:col-span-6 xl:col-start-7">
            <Aperture frameClassName="aspect-[16/10] sm:aspect-[3/2] lg:aspect-auto lg:h-[clamp(26rem,60vh,38rem)]" />
          </div>
        </div>
      </div>

      {/* ── handoff into the collection ── */}
      <div className="shell">
        <div className="flex items-end justify-between gap-6 border-t border-rule py-5">
          <p className="meta text-ink-muted">
            Below — the collection, in full
          </p>
          <span aria-hidden="true" className="meta text-ink-muted tabular-nums">
            001 — 00{site.workCount}
          </span>
        </div>
      </div>
    </section>
  );
}
