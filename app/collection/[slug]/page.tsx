import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { site } from "@/lib/site";
import {
  works,
  getWork,
  getAdjacentWork,
  availabilityLabel,
  performanceStatement,
} from "@/lib/works";
import { formatPrice, formatFrom } from "@/lib/pricing";
import { workFaq } from "@/lib/faq";

import { PreviewMedia } from "@/components/work/PreviewMedia";
import { WorkPurchase } from "@/components/work/WorkPurchase";
import { RelatedWorks } from "@/components/work/RelatedWorks";
import { Faq } from "@/components/work/Faq";
import { Reveal } from "@/components/primitives/Reveal";
import { LineMask } from "@/components/primitives/LineMask";
import { ActionLink } from "@/components/primitives/ActionLink";
import { AvailabilityMark, RegistrationMark, SectionLabel, Arrow } from "@/components/primitives/Marks";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return { title: "Work not found" };

  return {
    title: `${work.name} — ${work.industry}`,
    description: work.positioning,
    alternates: { canonical: `/collection/${work.slug}` },
    openGraph: {
      title: `${work.name} — ${work.industry} · ${site.name}`,
      description: work.positioning,
      url: `${site.url}/collection/${work.slug}`,
      images: [{ url: work.poster, alt: work.posterAlt }],
    },
  };
}

export default async function WorkPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const next = getAdjacentWork(work.slug, 1);
  const available = work.availability === "available";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: work.name,
    description: work.positioning,
    category: work.industry,
    url: `${site.url}/collection/${work.slug}`,
    image: `${site.url}${work.poster}`,
    brand: { "@type": "Brand", name: site.name },
    offers: [
      {
        "@type": "Offer",
        name: "Source code",
        priceCurrency: site.market.currency,
        price: work.sourcePrice,
        availability: available
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
        url: `${site.url}/collection/${work.slug}#purchase`,
      },
      {
        "@type": "Offer",
        name: "Custom build",
        priceCurrency: site.market.currency,
        price: work.customFrom,
        availability: "https://schema.org/InStock",
        url: `${site.url}/custom-build?work=${work.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* ══ 1–2. HERO: cinematic plate + identity ══ */}
      <section className="shell" aria-labelledby="work-title">
        {/* breadcrumb / archive strip */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center justify-between gap-4 border-b border-rule py-4"
        >
          <ol className="flex items-center gap-3">
            <li>
              <Link href="/collection" className="link-rule meta text-ink-muted">
                Collection
              </Link>
            </li>
            <li aria-hidden="true" className="meta text-ink-muted">
              /
            </li>
            <li>
              <span className="meta text-ink" aria-current="page">
                WORK {work.number}
              </span>
            </li>
          </ol>
          <div className="flex items-center gap-4 sm:gap-8">
            <RegistrationMark className="hidden sm:block" />
            <span className="meta text-ink-muted">EDITION {site.edition}</span>
          </div>
        </nav>

        <div className="grid gap-y-8 pt-10 pb-8 lg:grid-cols-12 lg:gap-x-8 lg:pt-14">
          <div className="lg:col-span-7">
            <h1 id="work-title" className="flex flex-wrap items-baseline gap-x-6">
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-statement tracking-[-0.02em] text-ink"
                lines={[work.name]}
              />
              <span className="meta pb-3 text-ink-muted tabular-nums">
                {work.number}
              </span>
            </h1>
            <Reveal
              variant="rise"
              mode="archive"
              delay={0.3}
              className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2"
            >
              <span className="meta text-ink-muted">
                {work.classification.toUpperCase()}
              </span>
              <span aria-hidden="true" className="hidden h-3 w-px bg-rule sm:block" />
              <span className="meta text-ink-muted">{work.theme.mood.toUpperCase()}</span>
              <span aria-hidden="true" className="hidden h-3 w-px bg-rule sm:block" />
              <AvailabilityMark
                label={availabilityLabel[work.availability]}
                available={available}
              />
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:pt-4">
            <Reveal as="p" variant="up" mode="archive" className="text-lede text-ink-soft">
              {work.positioning}
            </Reveal>
          </div>
        </div>

        {/* the plate, sitting on the work's own ground colour */}
        <Reveal variant="up" mode="exhibition">
          <div
            className="relative border border-rule p-3 sm:p-5"
            style={{ backgroundColor: work.theme.ground }}
          >
            {/* 2:1 rather than taller: the plate has to stay cinematic while
                still letting the three commercial routes below it reach the
                first screen on a laptop. */}
            <PreviewMedia
              work={work}
              priority
              className="aspect-[4/3] sm:aspect-[2/1]"
              sizes="100vw"
            />
          </div>
        </Reveal>
      </section>

      {/* ══ 3–5. THE THREE ROUTES OUT ══ */}
      <section
        className="shell mt-10 lg:mt-12"
        aria-label={`Ways to acquire ${work.name}`}
      >
        {/* Crossing from the gallery into the work. Deliberately its own
            full-width band: this is the one action that leaves the site. */}
        {work.liveDemo ? (
          <a
            href={work.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="external"
            className="group/demo relative block overflow-hidden border-2 border-accent"
            aria-label={`Open the ${work.name} live experience in a new tab`}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-[420ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/demo:translate-x-0 group-focus-visible/demo:translate-x-0 motion-reduce:transition-none"
            />
            <span className="relative flex flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <span className="block">
                <span className="meta block text-accent transition-colors duration-300 group-hover/demo:text-paper">
                  LIVE EXPERIENCE
                </span>
                <span className="mt-2 block font-display text-title text-ink transition-colors duration-300 group-hover/demo:text-paper">
                  Walk into {work.name} — the real build, running now
                </span>
              </span>
              <span className="meta shrink-0 text-ink transition-colors duration-300 group-hover/demo:text-paper">
                Open in a new tab <Arrow dir="ne" />
              </span>
            </span>
          </a>
        ) : (
          <div className="border border-rule px-6 py-7 sm:px-8">
            <p className="meta text-ink-muted">LIVE EXPERIENCE</p>
            <p className="mt-2 measure text-[0.9375rem] leading-relaxed text-ink-soft">
              A hosted demo for {work.name} is not public yet. Ask and we will
              send a private link, or walk you through it on a call.
            </p>
            <Link
              href={`/contact?intent=demo&work=${work.slug}`}
              className="link-rule mt-4 inline-block meta text-ink"
            >
              Request a private demo <Arrow />
            </Link>
          </div>
        )}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <ActionLink href={`/custom-build?work=${work.slug}`} variant="accent" full>
            Build this for my brand
          </ActionLink>
          <ActionLink href="#purchase" variant="outline" full>
            Buy the source — {formatPrice(work.sourcePrice)}
          </ActionLink>
        </div>

        {work.liveDemoNote && (
          <p className="mt-4 meta text-ink-muted">{work.liveDemoNote}</p>
        )}
      </section>

      {/* ══ 6. DESIGN CONCEPT ══ */}
      <section
        className="shell mt-16 border-t border-rule pt-14 lg:mt-24 lg:pt-20"
        aria-labelledby="concept-title"
      >
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4">
            <SectionLabel index="01">DESIGN CONCEPT</SectionLabel>
            <h2 id="concept-title" className="mt-6">
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-headline tracking-[-0.015em] text-ink"
                lines={["Why it looks", "the way it does."]}
              />
            </h2>
            <Reveal
              as="p"
              variant="rise"
              mode="archive"
              className="mt-6 max-w-sm font-display text-title text-accent"
            >
              {work.philosophy}
            </Reveal>
          </div>
          <Reveal
            variant="up"
            mode="archive"
            className="prose-editorial measure text-ink-soft lg:col-span-7 lg:col-start-6"
          >
            {work.concept.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══ 7. INTERACTION HIGHLIGHTS ══ */}
      <section
        className="shell mt-16 border-t border-rule pt-14 lg:mt-24 lg:pt-20"
        aria-labelledby="interactions-title"
      >
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4">
            <SectionLabel index="02">INTERACTIONS</SectionLabel>
            <h2 id="interactions-title" className="mt-6">
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-headline tracking-[-0.015em] text-ink"
                lines={["What it does", "that a static", "page cannot."]}
              />
            </h2>
          </div>
          <Reveal
            as="ol"
            variant="up"
            mode="archive"
            group
            className="border-t border-rule lg:col-span-7 lg:col-start-6"
          >
            {work.interactions.map((item, i) => (
              <li key={item.title} className="border-b border-rule py-7">
                <div className="flex gap-5 sm:gap-8">
                  <span className="meta shrink-0 pt-1 text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-title text-ink">{item.title}</h3>
                    <p className="mt-3 measure text-[0.9375rem] leading-relaxed text-ink-muted">
                      {item.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══ 8–9. WHAT IS INCLUDED + TECHNOLOGY ══ */}
      <section
        className="shell mt-16 border-t border-rule pt-14 lg:mt-24 lg:pt-20"
        aria-labelledby="included-title"
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="03">WHAT IS INCLUDED</SectionLabel>
            <h2 id="included-title" className="mt-5">
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-headline tracking-[-0.015em] text-ink"
                lines={["Everything in the box."]}
              />
            </h2>
          </div>
          <p className="meta text-ink-muted tabular-nums">
            {work.pages.length} PAGES · {work.features.length} FEATURES
          </p>
        </div>

        <div className="mt-12 grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <Reveal as="div" variant="rise" mode="archive" className="lg:col-span-4">
            <h3 className="meta border-b border-rule pb-4 text-ink">PAGES</h3>
            <ul className="mt-0">
              {work.pages.map((page, i) => (
                <li
                  key={page}
                  className="flex items-baseline gap-4 border-b border-rule py-3.5"
                >
                  <span className="meta shrink-0 text-ink-muted tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.9375rem] leading-snug text-ink-soft">
                    {page}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="div" variant="rise" mode="archive" className="lg:col-span-4">
            <h3 className="meta border-b border-rule pb-4 text-ink">FEATURES</h3>
            <ul>
              {work.features.map((feature) => (
                <li key={feature} className="flex gap-4 border-b border-rule py-3.5">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 block h-px w-3 shrink-0 bg-accent"
                  />
                  <span className="text-[0.9375rem] leading-snug text-ink-soft">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="div" variant="rise" mode="archive" className="lg:col-span-3 lg:col-start-10">
            <h3 className="meta border-b border-rule pb-4 text-ink">BUILT WITH</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {work.technology.map((tech) => (
                <li
                  key={tech}
                  className="border border-rule px-3 py-2 meta text-ink-soft"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.875rem] leading-relaxed text-ink-muted">
              No page builder, no premium plugin dependency, no licence key. The
              repository runs on any Node host.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ 10. RESPONSIVE + PERFORMANCE ══ */}
      <section
        className="on-void grain relative mt-16 overflow-hidden lg:mt-24"
        aria-labelledby="perf-title"
      >
        <span aria-hidden="true" className="grain-layer opacity-[0.12]" />
        <div className="shell relative section-y">
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5">
              <SectionLabel index="04" tone="void">
                RESPONSIVE &amp; PERFORMANCE
              </SectionLabel>
              <h2 id="perf-title" className="mt-6">
                <LineMask
                  as="span"
                  mode="exhibition"
                  className="block font-display text-headline tracking-[-0.015em] text-chalk"
                  lines={["Fast is part", "of the design."]}
                />
              </h2>
              <Reveal
                as="p"
                variant="up"
                mode="archive"
                className="mt-7 max-w-md text-[0.9375rem] leading-relaxed text-chalk-muted"
              >
                {performanceStatement}
              </Reveal>
              <Reveal
                as="p"
                variant="rise"
                mode="archive"
                className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-chalk-muted"
              >
                Mobile is a separate composition, not a squeezed desktop one.
                Nothing important hides behind a hover, every touch target
                clears 44px, and the heavier interactions have a designed
                fallback rather than being switched off.
              </Reveal>
            </div>

            <Reveal
              as="dl"
              variant="rise"
              mode="archive"
              group
              className="border-t border-void-rule lg:col-span-6 lg:col-start-7"
            >
              {work.performance.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-void-rule py-5"
                >
                  <dt className="meta text-chalk-muted">{fact.label.toUpperCase()}</dt>
                  <dd className="text-[0.9375rem] text-chalk">{fact.value}</dd>
                </div>
              ))}
              <div className="pt-5">
                <p className="meta text-chalk-muted">
                  Performance-tested before delivery. No published scores —
                  audit the live build yourself.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 11–12. PURCHASE + EXCLUSIVITY ══ */}
      <WorkPurchase work={work} />

      {/* ══ 13. FAQ ══ */}
      <Faq
        items={workFaq}
        index="05"
        title={["Before you", "spend anything."]}
        lead={`Everything below applies to ${work.name} and to every other work in the edition.`}
      />

      {/* ══ 14. RELATED WORKS ══ */}
      <RelatedWorks slug={work.slug} />

      {/* ══ 15. FINAL ENQUIRY ══ */}
      <section className="on-void grain relative overflow-hidden" aria-labelledby="enquire-title">
        <span aria-hidden="true" className="grain-layer opacity-[0.12]" />
        <div className="shell relative section-y">
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-7">
              <span className="meta text-chalk-muted">WORK {work.number}</span>
              <h2 id="enquire-title" className="mt-7">
                <LineMask
                  as="span"
                  mode="exhibition"
                  className="block font-display text-statement tracking-[-0.02em] text-chalk"
                  lines={[
                    `Take ${work.name}`,
                    <>
                      somewhere{" "}
                      <span className="italic text-accent">further.</span>
                    </>,
                  ]}
                />
              </h2>
              <Reveal
                as="p"
                variant="up"
                mode="archive"
                className="mt-8 max-w-xl text-lede text-chalk-muted"
              >
                Tell us what your brand needs and we will tell you, plainly,
                whether {work.name} is the right foundation — or whether
                something else in the edition is closer.
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 lg:pt-4">
              <Reveal variant="rise" mode="commerce" group className="flex flex-col gap-3">
                <ActionLink
                  href={`/custom-build?work=${work.slug}`}
                  variant="accent"
                  tone="void"
                  full
                >
                  Start a project
                </ActionLink>
                <ActionLink
                  href={`/collection/${next.slug}`}
                  variant="outline"
                  tone="void"
                  full
                >
                  Next — {next.name}
                </ActionLink>
              </Reveal>
              <Reveal variant="rise" mode="archive" className="mt-8 border-t border-void-rule pt-6">
                <p className="meta text-chalk-muted">SOURCE</p>
                <p className="mt-2 text-[1.0625rem] text-chalk">
                  {formatPrice(work.sourcePrice)}
                  <span className="meta ml-3 text-chalk-muted">
                    / BUILT {formatFrom(work.customFrom).toUpperCase()}
                  </span>
                </p>
                <a
                  href={`mailto:${site.contact.email}?subject=${encodeURIComponent(
                    `${work.name} — enquiry`
                  )}`}
                  className="link-rule mt-4 inline-block meta text-chalk"
                >
                  {site.contact.email}
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
