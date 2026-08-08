import type { Metadata } from "next";
import { site } from "@/lib/site";
import { works } from "@/lib/works";
import { formatPrice, upgradeCredit } from "@/lib/pricing";
import { CollectionIndex } from "@/components/collection/CollectionIndex";
import { LineMask } from "@/components/primitives/LineMask";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { RegistrationMark } from "@/components/primitives/Marks";
import { EngagementModels } from "@/components/commerce/EngagementModels";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: `The Collection — Edition ${site.edition}`,
  description: `Edition ${site.edition}: ${site.workCount} complete website experiences, available as source code, deployed for you, or rebuilt entirely around your brand.`,
  alternates: { canonical: "/collection" },
};

export default function CollectionPage() {
  const cheapest = Math.min(...works.map((w) => w.sourcePrice));
  const liveCount = works.filter((w) => w.liveDemo).length;

  return (
    <>
      {/* ── page head ── */}
      <section className="shell" aria-labelledby="collection-page-title">
        <div className="flex items-center justify-between gap-4 border-b border-rule py-4">
          <span className="meta text-ink">EDITION {site.edition}</span>
          <div className="flex items-center gap-4 sm:gap-8">
            <span className="meta hidden text-ink-muted sm:inline">
              {liveCount > 0 ? `0${liveCount} LIVE DEMO` : "DEMOS ON REQUEST"}
            </span>
            <RegistrationMark />
            <span className="meta text-ink-muted tabular-nums">
              001 — 00{site.workCount}
            </span>
          </div>
        </div>

        <div className="grid gap-y-8 pt-12 pb-14 lg:grid-cols-12 lg:gap-x-8 lg:pt-16">
          <div className="lg:col-span-7">
            <h1 id="collection-page-title">
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-statement tracking-[-0.02em] text-ink"
                lines={[
                  "The index.",
                  <>
                    Five works, in <span className="italic text-accent">full.</span>
                  </>,
                ]}
              />
            </h1>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:pt-3">
            <Reveal as="p" variant="up" mode="archive" className="text-lede text-ink-soft">
              Each entry is a finished build. Open one to see the concept, the
              interactions, everything included, and the three ways to own it.
            </Reveal>
            <Reveal
              variant="rise"
              mode="archive"
              className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-rule pt-5"
            >
              <p className="meta text-ink-muted">
                Source from <span className="text-ink">{formatPrice(cheapest)}</span>
              </p>
              <p className="meta text-ink-muted">
                {upgradeCredit.windowDays}-day upgrade credit
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── the index ── */}
      <section className="shell pb-16 lg:pb-24" aria-label="Collection index">
        <CollectionIndex />
      </section>

      {/* ── the alternative to buying one as-is ── */}
      <section className="shell border-t border-rule section-y" aria-labelledby="none-fit">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-6">
            <span className="meta text-accent">IF NONE OF THEM FIT</span>
            <h2 id="none-fit" className="mt-6">
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-headline tracking-[-0.015em] text-ink"
                lines={["Five is not meant", "to cover everything."]}
              />
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal as="p" variant="up" mode="archive" className="text-lede text-ink-soft">
              A finite collection is honest about its limits. If none of the
              five is right, the closest one becomes a structural starting
              point and the rest is built for you — or we start from nothing.
            </Reveal>
            <Reveal variant="rise" mode="commerce" className="mt-8">
              <ActionLink href="/custom-build" variant="accent">
                Commission a custom build
              </ActionLink>
            </Reveal>
          </div>
        </div>
      </section>

      <EngagementModels />
      <FinalCta />
    </>
  );
}
