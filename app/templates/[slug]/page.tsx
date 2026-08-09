import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { site } from "@/lib/site";
import {
  templates,
  getTemplate,
  getAdjacentTemplate,
  getRelatedTemplates,
  availabilityLabel,
  performanceStatement,
} from "@/lib/templates";
import { formatPrice, plans } from "@/lib/pricing";
import { templateFaq } from "@/lib/faq";

import { PreviewMedia } from "@/components/templates/PreviewMedia";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { StickyBuyBar } from "@/components/templates/StickyBuyBar";
import { PricingRows } from "@/components/commerce/Pricing";
import { Faq } from "@/components/templates/Faq";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import {
  ArrowUpRight,
  Badge,
  CheckMark,
  Eyebrow,
  LockIcon,
  StatusMark,
} from "@/components/primitives/Marks";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) return { title: "Template not found" };

  return {
    title: `${template.name} — ${template.industry} website template`,
    description: `${template.tagline} Full source code from ${formatPrice(template.sourcePrice)}, or built around your brand from ${formatPrice(template.customFrom)}.`,
    alternates: { canonical: `/templates/${template.slug}` },
    openGraph: {
      title: `${template.name} — ${template.industry} website template`,
      description: template.tagline,
      url: `${site.url}/templates/${template.slug}`,
      images: [{ url: template.poster, alt: template.posterAlt }],
    },
  };
}

export default async function TemplatePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();

  const next = getAdjacentTemplate(template.slug, 1);
  const related = getRelatedTemplates(template.slug, 2);
  const available = template.availability === "available";
  const exclusive = plans.find((p) => p.id === "exclusive")!;
  const buyHref = `/buy?template=${template.slug}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${template.name} — ${template.industry} website template`,
    description: template.tagline,
    category: template.category,
    url: `${site.url}/templates/${template.slug}`,
    image: `${site.url}${template.poster}`,
    brand: { "@type": "Brand", name: site.name },
    offers: [
      {
        "@type": "Offer",
        name: "Source code",
        priceCurrency: site.market.currency,
        price: template.sourcePrice,
        availability: available
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
        url: `${site.url}${buyHref}`,
      },
      {
        "@type": "Offer",
        name: "Custom build",
        priceCurrency: site.market.currency,
        price: template.customFrom,
        availability: "https://schema.org/InStock",
        url: `${site.url}/custom-build?template=${template.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* ══ HEAD + BUY ══ */}
      <section className="shell pt-8 pb-8 sm:pt-12">
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol className="flex items-center gap-2 text-[0.8125rem] text-ink-muted">
            <li>
              <Link href="/templates" className="link-rule">
                Templates
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span className="font-medium text-ink" aria-current="page">
                {template.name}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="num text-[0.75rem] text-ink-faint">{template.number}</span>
              <span aria-hidden="true" className="h-px w-4 bg-rule" />
              <span className="text-[0.8125rem] font-medium text-ink-muted">
                {template.category}
              </span>
              {template.liveDemo && <Badge tone="accent">Live demo</Badge>}
            </div>

            <h1 className="mt-4 font-display text-[clamp(2.5rem,4.8vw,4rem)] leading-[1.02] font-bold tracking-[-0.03em] text-ink">
              {template.name}
            </h1>

            <p className="mt-5 max-w-xl text-lead text-ink-soft">{template.tagline}</p>

            <p className="mt-4 text-[0.875rem] text-ink-muted">
              The demo ships configured as{" "}
              <span className="font-medium text-ink-soft">{template.demoBrand}</span>.
              All of that content lives in config and data files — no component
              holds it.
            </p>

            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
              {template.bestFor.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckMark className="mt-0.5 shrink-0 text-endorse" />
                  <span className="text-[0.875rem] text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* buy box */}
          <div className="lg:col-span-5">
            <div className="card p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.8125rem] font-medium text-ink-muted">
                    Source code
                  </p>
                  <p className="num mt-1 font-display text-[2.25rem] leading-none font-bold text-ink">
                    {formatPrice(template.sourcePrice)}
                  </p>
                  <p className="mt-1.5 text-[0.8125rem] text-ink-muted">
                    One-time · yours to keep
                  </p>
                </div>
                <StatusMark
                  label={availabilityLabel[template.availability]}
                  available={available}
                />
              </div>

              <div className="mt-6 flex flex-col gap-2.5">
                <ActionLink href={buyHref} variant="primary" size="lg" full>
                  Buy this template
                </ActionLink>
                {template.liveDemo ? (
                  <ActionLink
                    href={template.liveDemo}
                    variant="dark"
                    size="lg"
                    external
                    full
                    ariaLabel={`Open the ${template.name} live demo in a new tab`}
                  >
                    Open live demo
                  </ActionLink>
                ) : (
                  <ActionLink
                    href={`/contact?intent=demo&template=${template.slug}`}
                    variant="outline"
                    size="lg"
                    full
                  >
                    Request a private demo
                  </ActionLink>
                )}
              </div>

              <div className="mt-6 space-y-2.5 border-t border-rule-soft pt-5">
                {site.promises.map((promise) => (
                  <p key={promise} className="flex gap-2.5">
                    <CheckMark className="mt-0.5 shrink-0 text-endorse" />
                    <span className="text-[0.8125rem] leading-snug text-ink-soft">
                      {promise}
                    </span>
                  </p>
                ))}
              </div>

              <div className="mt-6 rounded-lg bg-sunk p-4">
                <p className="text-[0.8125rem] text-ink-muted">
                  Want it launched or rebuilt for your brand?
                </p>
                <p className="num mt-1 text-[0.9375rem] font-bold text-ink">
                  From {formatPrice(template.customFrom)}
                </p>
                <Link
                  href={`/custom-build?template=${template.slug}`}
                  className="link-rule mt-2 inline-block text-[0.8125rem] font-bold text-accent"
                >
                  See custom build options
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StickyBuyBar template={template} />

      {/* ══ THE PLATE ══ */}
      <section className="px-2 sm:px-3" aria-label={`${template.name} preview`}>
        <Reveal variant="up" mode="reveal">
          <div
            className="panel p-2 sm:p-4"
            style={{ backgroundColor: template.theme.ground }}
          >
            <PreviewMedia
              template={template}
              priority
              className="aspect-[4/3] rounded-lg sm:aspect-[2/1]"
              sizes="100vw"
            />
          </div>
        </Reveal>
        {template.liveDemoNote && (
          <p className="shell mt-3 text-[0.8125rem] text-ink-muted">
            {template.liveDemoNote}
          </p>
        )}
      </section>

      {/* ══ MORE OF THE BUILD ══ */}
      {template.gallery && template.gallery.length > 0 && (
        <section className="shell mt-6 sm:mt-8" aria-label={`More screens from ${template.name}`}>
          <Reveal variant="up" mode="reveal" group className="grid gap-4 sm:grid-cols-2">
            {template.gallery.map((shot) => (
              <figure
                key={shot.src}
                className="panel overflow-hidden border border-rule"
                style={{ backgroundColor: template.theme.ground }}
              >
                <div className="relative" style={{ aspectRatio: "16 / 10" }}>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 46vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              </figure>
            ))}
          </Reveal>
          <p className="mt-3 text-[0.8125rem] text-ink-muted">
            Real screens from the live build, not mock-ups.{" "}
            {template.liveDemo && (
              <a
                href={template.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="link-rule font-bold text-ink"
              >
                Open the demo and check
              </a>
            )}
          </p>
        </section>
      )}

      {/* ══ WHY IT SELLS ══ */}
      <section className="shell section-y" aria-labelledby="highlights-title">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Why it works</Eyebrow>
            <h2
              id="highlights-title"
              className="mt-4 font-display text-display font-bold text-ink"
            >
              What this template does for your business.
            </h2>
          </div>
          <p className="text-[1rem] leading-relaxed text-ink-muted lg:col-span-5">
            {template.pitch}
          </p>
        </div>

        <Reveal
          as="ul"
          variant="up"
          mode="reveal"
          group
          className="mt-10 grid gap-4 lg:grid-cols-3"
        >
          {template.highlights.map((item, i) => (
            <li key={item.title} className="card flex flex-col p-6 sm:p-7">
              <span className="num text-[0.8125rem] font-bold text-accent">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-[1.25rem] leading-snug font-bold text-ink">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">
                {item.body}
              </p>
            </li>
          ))}
        </Reveal>
      </section>

      {/* ══ CONCEPT + INTERACTIONS ══ */}
      <section className="shell pb-4" aria-labelledby="concept-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <Eyebrow>The design</Eyebrow>
            <h2
              id="concept-title"
              className="mt-4 font-display text-display font-bold text-ink"
            >
              Why it looks the way it does.
            </h2>
            <p className="mt-5 max-w-sm font-display text-[1.125rem] leading-snug font-bold text-accent">
              {template.pitch}
            </p>
          </div>

          <div className="lg:col-span-8">
            <Reveal variant="up" mode="archive" className="prose-body measure">
              {template.concept.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </Reveal>

            <Reveal
              as="ul"
              variant="rise"
              mode="archive"
              group
              className="mt-10 divide-y divide-rule-soft border-t border-rule"
            >
              {template.interactions.map((item, i) => (
                <li key={item.title} className="flex gap-5 py-6">
                  <span className="num shrink-0 pt-0.5 text-[0.75rem] font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.125rem] font-bold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 measure text-[0.9375rem] leading-relaxed text-ink-muted">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ WHAT'S INCLUDED ══ */}
      <section className="shell section-y" aria-labelledby="included-title">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <Eyebrow>Included</Eyebrow>
            <h2
              id="included-title"
              className="mt-4 font-display text-display font-bold text-ink"
            >
              Everything in the box.
            </h2>
          </div>
          <p className="num text-[0.8125rem] font-medium text-ink-muted">
            {template.pages.length} pages · {template.features.length} features
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <Reveal variant="rise" mode="archive" className="card p-6 sm:p-7">
            <h3 className="eyebrow text-ink-muted">Pages</h3>
            <ul className="mt-4 space-y-2.5">
              {template.pages.map((page, i) => (
                <li key={page} className="flex gap-3">
                  <span className="num shrink-0 text-[0.75rem] text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.875rem] leading-snug text-ink-soft">
                    {page}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="rise" mode="archive" delay={0.06} className="card p-6 sm:p-7">
            <h3 className="eyebrow text-ink-muted">Features</h3>
            <ul className="mt-4 space-y-2.5">
              {template.features.map((feature) => (
                <li key={feature} className="flex gap-2.5">
                  <CheckMark className="mt-0.5 shrink-0 text-endorse" />
                  <span className="text-[0.875rem] leading-snug text-ink-soft">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="rise" mode="archive" delay={0.12} className="flex flex-col gap-5">
            <div className="card p-6 sm:p-7">
              <h3 className="eyebrow text-ink-muted">Built with</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {template.technology.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-rule px-3 py-1.5 text-[0.75rem] font-medium text-ink-soft"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-muted">
                No page builder, no premium plugin dependency, no licence key.
                Runs on any Node host.
              </p>
            </div>

            <div className="card p-6 sm:p-7">
              <h3 className="eyebrow text-ink-muted">Performance</h3>
              <dl className="mt-4 space-y-2.5">
                {template.performance.map((fact) => (
                  <div key={fact.label} className="flex justify-between gap-4">
                    <dt className="text-[0.8125rem] text-ink-muted">{fact.label}</dt>
                    <dd className="text-right text-[0.8125rem] font-medium text-ink">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 border-t border-rule-soft pt-4 text-[0.8125rem] leading-relaxed text-ink-muted">
                {performanceStatement}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <PricingRows template={template.slug} />

      {/* ══ EXCLUSIVE ══ */}
      {template.exclusiveAvailable && (
        <section className="shell pb-4" aria-labelledby="exclusive-title">
          <div className="on-dark panel px-7 py-10 sm:px-10">
            <div className="grid gap-7 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-accent">
                  <LockIcon />
                </span>
                <h2
                  id="exclusive-title"
                  className="mt-5 font-display text-[clamp(1.75rem,2.8vw,2.5rem)] leading-tight font-bold text-white"
                >
                  Buy {template.name} exclusively and nobody else can have it.
                </h2>
                <p className="mt-5 measure text-[1rem] leading-relaxed text-chalk-muted">
                  An exclusive licence transfers the design to you and
                  permanently withdraws it from this collection — delisted from
                  the site, never sold again, recorded in a written agreement.
                  Currently no one else holds a licence for it.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <p className="eyebrow text-chalk-muted">Exclusive licence</p>
                <p className="mt-2 font-display text-[1.75rem] font-bold text-white">
                  By quotation
                </p>
                <p className="mt-1 text-[0.8125rem] text-chalk-muted">
                  {exclusive.delivery}
                </p>
                <div className="mt-5 lg:flex lg:justify-end">
                  <ActionLink
                    href={`/buy?template=${template.slug}&plan=exclusive`}
                    variant="primary"
                    size="lg"
                  >
                    Request a quote
                  </ActionLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ FAQ ══ */}
      <Faq
        items={templateFaq}
        eyebrow="Questions"
        title="Before you buy."
        lead={`Everything here applies to ${template.name} and every other template. Anything else, email ${site.contact.email}.`}
      />

      {/* ══ RELATED ══ */}
      <section className="shell pb-16" aria-labelledby="related-title">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <Eyebrow>Also available</Eyebrow>
            <h2
              id="related-title"
              className="mt-4 font-display text-display font-bold text-ink"
            >
              Other templates.
            </h2>
          </div>
          <Link href="/templates" className="link-rule text-[0.9375rem] font-bold text-ink">
            See all {site.templateCount}
          </Link>
        </div>

        <Reveal variant="up" mode="reveal" group className="mt-8 grid gap-5 sm:grid-cols-2">
          {related.map((item) => (
            <TemplateCard key={item.slug} template={item} />
          ))}
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
          <p className="text-[0.9375rem] text-ink-muted">
            Next up:{" "}
            <Link
              href={`/templates/${next.slug}`}
              className="link-rule font-bold text-ink"
            >
              {next.name} — {next.industry}
            </Link>
          </p>
          <a
            href={`mailto:${site.contact.email}?subject=${encodeURIComponent(
              `Question about ${template.name}`
            )}`}
            className="link-rule inline-flex items-center gap-1.5 text-[0.9375rem] font-bold text-ink"
          >
            Ask a question <ArrowUpRight />
          </a>
        </div>
      </section>
    </>
  );
}
