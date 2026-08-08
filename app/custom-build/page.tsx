import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { templates, getTemplate } from "@/lib/templates";
import { formatPrice, plans } from "@/lib/pricing";
import { customBuildFaq } from "@/lib/faq";
import { Faq } from "@/components/templates/Faq";
import { Steps } from "@/components/home/Steps";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { Eyebrow, CheckMark } from "@/components/primitives/Marks";

export const metadata: Metadata = {
  title: "Custom website build",
  description:
    "Start from one of five engineered templates and have everything above it rebuilt around your brand. Custom builds from ₹75,000, usually live in 3 to 6 weeks.",
  alternates: { canonical: "/custom-build" },
};

const changeable = [
  {
    title: "Identity and visual language",
    body: "Logo, art direction, photographic treatment, illustration. It stops looking like the template and starts looking like you.",
  },
  {
    title: "Typography and colour",
    body: "New families, new scale, new palette. Centralised as tokens, so future changes stay cheap.",
  },
  {
    title: "Copy and imagery",
    body: "Your words and assets placed properly — or written and art-directed with you if they do not exist yet.",
  },
  {
    title: "Layout and architecture",
    body: "Page order, navigation and hierarchy rebuilt around what you actually sell and how people decide.",
  },
  {
    title: "Motion language",
    body: "Animation re-timed, reduced or removed. Restraint is a valid brief and we will say when it is the right one.",
  },
  {
    title: "3D and WebGL",
    body: "Product viewers and configurators, added where they answer a real buying question rather than for a showreel.",
  },
  {
    title: "Commerce and CMS",
    body: "Shopify, headless commerce, or a CMS your team edits without a developer.",
  },
  {
    title: "New pages and flows",
    body: "Configurators, booking, quotes, locations, documentation, careers — anything the template lacks.",
  },
  {
    title: "Hosting and deployment",
    body: "Domains, DNS, analytics, forms, redirects and search metadata, configured and documented.",
  },
  {
    title: "Support afterwards",
    body: "An optional monthly plan, or a clean handover to your team and no ongoing cost.",
  },
];

export default async function CustomBuildPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string }>;
}) {
  const params = await searchParams;
  const selected = params.template ? getTemplate(params.template) : undefined;
  const custom = plans.find((p) => p.id === "custom")!;
  const orderHref = selected
    ? `/buy?template=${selected.slug}&plan=custom`
    : "/buy?plan=custom";

  return (
    <>
      {/* ── head ── */}
      <section className="shell pt-10 pb-8 sm:pt-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow tone="accent">Custom build</Eyebrow>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,4.4vw,3.5rem)] leading-[1.04] font-bold tracking-[-0.03em] text-ink">
              A finished starting point. None of the limits.
            </h1>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
              A custom build takes one of the {site.templateCount} templates as
              its structural and engineering foundation, then rebuilds
              everything above it around your brand. You get the standard of a
              long agency engagement without paying for the weeks where nobody
              knows what it should look like yet.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href={orderHref} variant="primary" size="lg">
                Start a custom project
              </ActionLink>
              <ActionLink href="/pricing" variant="outline" size="lg">
                See pricing
              </ActionLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card p-6 sm:p-7">
              <p className="eyebrow text-ink-muted">Custom builds start at</p>
              <p className="num mt-2 font-display text-[2.5rem] leading-none font-bold text-ink">
                {formatPrice(custom.price)}
              </p>
              <p className="mt-2 text-[0.875rem] text-ink-muted">{custom.delivery}</p>
              <ul className="mt-6 space-y-2.5 border-t border-rule-soft pt-5">
                {[
                  "Fixed scope and fixed price before we start",
                  "Staging URL from the first week",
                  "Full ownership at launch",
                  "40 / 40 / 20 payment milestones",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <CheckMark className="mt-0.5 shrink-0 text-endorse" />
                    <span className="text-[0.875rem] leading-snug text-ink-soft">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {selected && (
                <div className="mt-6 rounded-lg bg-sunk p-4">
                  <p className="text-[0.75rem] font-bold text-ink-muted uppercase">
                    Starting from
                  </p>
                  <p className="mt-1 font-display text-[1.0625rem] font-bold text-ink">
                    {selected.name}
                  </p>
                  <p className="mt-1 text-[0.8125rem] text-ink-muted">
                    {selected.tagline}
                  </p>
                  <Link
                    href={`/templates/${selected.slug}`}
                    className="link-rule mt-2 inline-block text-[0.8125rem] font-bold text-accent"
                  >
                    Review the template
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── pick a starting point ── */}
      <section className="shell section-y" aria-labelledby="start-title">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Step one</Eyebrow>
            <h2 id="start-title" className="mt-4 font-display text-display font-bold text-ink">
              Choose the closest starting point.
            </h2>
          </div>
          <p className="text-[1rem] leading-relaxed text-ink-muted lg:col-span-5">
            The template decides the structure and the engineering, not the
            final look. If none is close, we start from nothing — same standard,
            quoted per project.
          </p>
        </div>

        <Reveal
          as="ul"
          variant="rise"
          mode="archive"
          group
          className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
        >
          {templates.map((template) => (
            <li key={template.slug}>
              <Link
                href={`/buy?template=${template.slug}&plan=custom`}
                className="card card-hover flex h-full items-center gap-4 p-4"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised SVG poster */}
                <img
                  src={template.poster}
                  alt=""
                  width={template.posterAspect[0]}
                  height={template.posterAspect[1]}
                  loading="lazy"
                  sizes="112px"
                  className="h-16 w-28 shrink-0 rounded-md object-cover"
                />
                <span className="min-w-0">
                  <span className="block font-display text-[1.0625rem] font-bold text-ink">
                    {template.name}
                  </span>
                  <span className="block truncate text-[0.8125rem] text-ink-muted">
                    {template.industry}
                  </span>
                  <span className="num mt-1 block text-[0.8125rem] font-bold text-ink">
                    from {formatPrice(template.customFrom)}
                  </span>
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/buy?plan=custom"
              className="card card-hover flex h-full flex-col justify-center gap-1 border-2 border-dashed border-rule bg-transparent p-5 shadow-none"
            >
              <span className="font-display text-[1.0625rem] font-bold text-ink">
                Start from nothing
              </span>
              <span className="text-[0.8125rem] text-ink-muted">
                Fully bespoke, quoted per project
              </span>
            </Link>
          </li>
        </Reveal>
      </section>

      {/* ── scope ── */}
      <section className="px-2 sm:px-3" aria-labelledby="scope-title">
        <div className="on-dark panel">
          <div className="shell py-14 lg:py-20">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Eyebrow tone="accent">Scope</Eyebrow>
                <h2
                  id="scope-title"
                  className="mt-4 font-display text-display font-bold text-white"
                >
                  What can change: all of it.
                </h2>
              </div>
              <p className="text-[1rem] leading-relaxed text-chalk-muted lg:col-span-5">
                Some projects keep the structure and change the face. Others keep
                only the engineering standard. The starting point is a floor, not
                a ceiling.
              </p>
            </div>

            <Reveal
              as="ul"
              variant="rise"
              mode="archive"
              group
              className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {changeable.map((item, i) => (
                <li key={item.title}>
                  <span className="num text-[0.75rem] font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2.5 font-display text-[1.0625rem] font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-chalk-muted">
                    {item.body}
                  </p>
                </li>
              ))}
            </Reveal>

            <div className="mt-12 flex flex-wrap gap-3 border-t border-dark-rule pt-8">
              <ActionLink href={orderHref} variant="primary" size="lg">
                Start a custom project
              </ActionLink>
              <ActionLink
                href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Custom build enquiry")}`}
                variant="outlineLight"
                size="lg"
                arrow={false}
              >
                Email us instead
              </ActionLink>
            </div>
          </div>
        </div>
      </section>

      <Steps />

      <Faq
        items={customBuildFaq}
        eyebrow="Custom builds"
        title="The questions we always get."
        lead={`If yours is not here, ask — ${site.contact.email}.`}
        id="custom-faq"
      />
    </>
  );
}
