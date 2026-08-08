import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getWork } from "@/lib/works";
import { engagements, carePlan, formatFrom, formatPrice } from "@/lib/pricing";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { LineMask } from "@/components/primitives/LineMask";
import { Reveal } from "@/components/primitives/Reveal";
import { RegistrationMark, SectionLabel, Arrow } from "@/components/primitives/Marks";

export const metadata: Metadata = {
  title: "Enquire — talk to the people who build it",
  description: `Buy a source licence, get a work deployed, commission a custom build, or ask about exclusivity. Written replies within one working day from ${site.contact.email}.`,
  alternates: { canonical: "/contact" },
};

/** Intent arrives from CTAs across the site and shapes this page's framing. */
const intents: Record<
  string,
  { label: string; heading: [string, string?]; lead: string; services: string[] }
> = {
  source: {
    label: "SOURCE LICENCE",
    heading: ["Buy the", "source code."],
    lead: "Tell us which work and we will send the invoice and repository access. Installation support is included for 14 days, and the price is credited if you upgrade to a custom build within 30 days.",
    services: ["Source code only"],
  },
  launch: {
    label: "SETUP & DEPLOYMENT",
    heading: ["Get it live,", "properly."],
    lead: "We put your content into the work, swap it to your brand, configure hosting, analytics and metadata, and hand you a finished site. Usually five to eight working days.",
    services: ["Setup & deployment"],
  },
  exclusive: {
    label: "EXCLUSIVE LICENCE",
    heading: ["Take it off", "the market."],
    lead: "Tell us which work you want exclusively. We will quote it, and if you proceed the design is withdrawn from the collection permanently and transferred to you in writing.",
    services: ["Exclusive licence"],
  },
  care: {
    label: "CARE PLAN",
    heading: ["Keep it", "improving."],
    lead: "Monthly upkeep, updates, performance monitoring and small additions. Works on sites we built and, after a review, on sites we did not.",
    services: ["Ongoing care plan"],
  },
  demo: {
    label: "PRIVATE DEMO",
    heading: ["See it", "running."],
    lead: "Not every work has a public demo yet. Ask and we will send a private link or walk you through it on a call — including the parts that are hard to appreciate in a screenshot.",
    services: [],
  },
};

const defaultIntent = {
  label: "ENQUIRE",
  heading: ["Talk to the people", "who build it."] as [string, string?],
  lead: "There is no sales team, no chatbot and no drip sequence. Your enquiry reaches the person who would do the work, and you get a written reply within one working day.",
  services: [] as string[],
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string; work?: string }>;
}) {
  const params = await searchParams;
  const intent = (params.intent && intents[params.intent]) || defaultIntent;
  const selected = params.work ? getWork(params.work) : undefined;

  return (
    <>
      <section className="shell" aria-labelledby="contact-title">
        <div className="flex items-center justify-between gap-4 border-b border-rule py-4">
          <span className="meta text-ink">{intent.label}</span>
          <div className="flex items-center gap-4 sm:gap-8">
            <RegistrationMark className="hidden sm:block" />
            <span className="meta text-ink-muted">{site.contact.timezone}</span>
          </div>
        </div>

        <div className="grid gap-y-10 pt-12 pb-14 lg:grid-cols-12 lg:gap-x-8 lg:pt-16">
          <div className="lg:col-span-7">
            <h1 id="contact-title">
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-statement tracking-[-0.02em] text-ink"
                lines={intent.heading.filter(Boolean) as string[]}
              />
            </h1>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-3">
            <Reveal as="p" variant="up" mode="archive" className="text-lede text-ink-soft">
              {intent.lead}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="shell border-t border-rule section-y" aria-labelledby="form-title">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-8">
          {/* ── side: routes and prices ── */}
          <div className="lg:col-span-4">
            <SectionLabel index="—">DIRECT</SectionLabel>
            <h2 id="form-title" className="mt-6 font-display text-title text-ink">
              Email, if you prefer
            </h2>
            <a
              href={`mailto:${site.contact.email}`}
              className="link-rule mt-3 inline-block text-[1.0625rem] break-all text-ink"
            >
              {site.contact.email}
            </a>
            <p className="mt-4 meta text-ink-muted">
              Replies within one working day · {site.contact.location}
            </p>

            <div className="mt-10 border-t border-rule pt-6">
              <p className="meta text-ink-muted">WHAT THINGS COST</p>
              <dl className="mt-4">
                {engagements.map((model) => (
                  <div
                    key={model.id}
                    className="flex items-baseline justify-between gap-4 border-b border-rule py-3"
                  >
                    <dt className="text-[0.9375rem] text-ink-soft">{model.name}</dt>
                    <dd className="meta text-ink">{formatFrom(model.priceFrom)}</dd>
                  </div>
                ))}
                <div className="flex items-baseline justify-between gap-4 border-b border-rule py-3">
                  <dt className="text-[0.9375rem] text-ink-soft">{carePlan.name}</dt>
                  <dd className="meta text-ink">
                    {formatPrice(carePlan.priceFrom)}
                    <span className="text-ink-muted"> /mo</span>
                  </dd>
                </div>
              </dl>
              <Link href="/license" className="link-rule mt-5 inline-block meta text-ink-muted">
                Licence terms <Arrow />
              </Link>
            </div>

            {selected && (
              <Reveal
                variant="rise"
                mode="archive"
                className="mt-10 border-l-2 border-accent bg-paper-raised px-5 py-4"
              >
                <p className="meta text-accent">WORK {selected.number}</p>
                <p className="mt-2 text-[0.9375rem] text-ink">{selected.name}</p>
                <p className="mt-1 meta text-ink-muted">
                  {selected.classification.toUpperCase()}
                </p>
                <Link
                  href={`/collection/${selected.slug}`}
                  className="link-rule mt-3 inline-block meta text-ink"
                >
                  Review the work <Arrow />
                </Link>
              </Reveal>
            )}
          </div>

          {/* ── the form ── */}
          <div className="lg:col-span-7 lg:col-start-6">
            <EnquiryForm
              defaultWork={selected?.slug ?? ""}
              defaultServices={intent.services}
            />
          </div>
        </div>
      </section>
    </>
  );
}
