import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { works } from "@/lib/works";
import { licenceFaq } from "@/lib/faq";
import { engagements, formatFrom } from "@/lib/pricing";
import { Faq } from "@/components/work/Faq";
import { LineMask } from "@/components/primitives/LineMask";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { RegistrationMark, SectionLabel, Arrow } from "@/components/primitives/Marks";

export const metadata: Metadata = {
  title: "Licensing — what you may and may not do",
  description:
    "Standard licence, exclusive licence, and exactly what is handed over. Written in plain language rather than defensive legalese.",
  alternates: { canonical: "/license" },
};

const permitted = [
  "Build and run one production website per licence",
  "Modify anything — code, design, structure, content",
  "Use it for your own brand or for one client site",
  "Deploy it to any host you like",
  "Keep using it forever, with no renewal or key",
];

const notPermitted = [
  "Resell, sublicense or redistribute the source",
  "Repackage it as a template, theme or starter kit",
  "Use one licence across multiple production sites",
  "Publish it to a public repository as your own work",
  "Claim authorship of the original design",
];

const handover = [
  {
    title: "The repository",
    body: "Complete source — pages, components, animation code, styles and design tokens. Git history included when the project was built for you.",
  },
  {
    title: "Documentation",
    body: "A README covering local setup, environment variables, content locations, deployment, and where the design tokens live.",
  },
  {
    title: "Assets",
    body: "Placeholder art, poster frames and icons, all cleared for your use. Any raster assets in editable form where they exist.",
  },
  {
    title: "Fonts",
    body: "Open-source families are included and named. Commercially licensed families are listed with a purchase link — those licences must be bought in your own name, because they legally cannot be transferred.",
  },
  {
    title: "Third-party services",
    body: "Named, with the configuration documented. Accounts for hosting, commerce or email are created in your name so you are never renting access from us.",
  },
];

export default function LicensePage() {
  const exclusive = engagements.find((e) => e.id === "exclusive")!;
  const withdrawn = works.filter((w) => w.availability === "withdrawn");

  return (
    <>
      <section className="shell" aria-labelledby="licence-title">
        <div className="flex items-center justify-between gap-4 border-b border-rule py-4">
          <span className="meta text-ink">LICENSING</span>
          <div className="flex items-center gap-4 sm:gap-8">
            <RegistrationMark className="hidden sm:block" />
            <span className="meta text-ink-muted">EDITION {site.edition}</span>
          </div>
        </div>

        <div className="grid gap-y-10 pt-12 pb-16 lg:grid-cols-12 lg:gap-x-8 lg:pt-16">
          <div className="lg:col-span-7">
            <h1 id="licence-title">
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-statement tracking-[-0.02em] text-ink"
                lines={[
                  "What you own,",
                  <>
                    in{" "}
                    <span className="italic text-accent">plain words.</span>
                  </>,
                ]}
              />
            </h1>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-3">
            <Reveal as="p" variant="up" mode="archive" className="text-lede text-ink-soft">
              This page is a summary written to be understood, not to protect us
              from you. The signed agreement matches it. If anything here is
              unclear, ask before you buy.
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── standard licence ── */}
      <section
        id="standard"
        className="shell scroll-mt-20 border-t border-rule section-y"
        aria-labelledby="standard-title"
      >
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4">
            <SectionLabel index="01">STANDARD LICENCE</SectionLabel>
            <h2 id="standard-title" className="mt-6">
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-headline tracking-[-0.015em] text-ink"
                lines={["One licence,", "one live site."]}
              />
            </h2>
            <Reveal
              as="p"
              variant="up"
              mode="archive"
              className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-ink-muted"
            >
              Included with every source-code purchase and with every Launch and
              Custom project. Perpetual — there is nothing to renew and no key
              that can be revoked.
            </Reveal>
          </div>

          <div className="grid gap-x-8 gap-y-10 lg:col-span-7 lg:col-start-6 lg:grid-cols-2">
            <Reveal variant="rise" mode="archive">
              <h3 className="meta border-b border-rule pb-4 text-ink">YOU MAY</h3>
              <ul>
                {permitted.map((item) => (
                  <li key={item} className="flex gap-4 border-b border-rule py-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 block h-px w-3 shrink-0 bg-accent"
                    />
                    <span className="text-[0.9375rem] leading-snug text-ink-soft">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="rise" mode="archive" delay={0.06}>
              <h3 className="meta border-b border-rule pb-4 text-ink-muted">
                YOU MAY NOT
              </h3>
              <ul>
                {notPermitted.map((item) => (
                  <li key={item} className="flex gap-4 border-b border-rule py-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 block h-2 w-2 shrink-0 rotate-45 border-t border-r border-ink-muted"
                    />
                    <span className="text-[0.9375rem] leading-snug text-ink-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── exclusive licence ── */}
      <section
        id="exclusive"
        className="on-void grain relative scroll-mt-20 overflow-hidden"
        aria-labelledby="exclusive-title"
      >
        <span aria-hidden="true" className="grain-layer opacity-[0.12]" />
        <div className="shell relative section-y">
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5">
              <SectionLabel index="02" tone="void">
                EXCLUSIVE LICENCE
              </SectionLabel>
              <h2 id="exclusive-title" className="mt-6">
                <LineMask
                  as="span"
                  mode="exhibition"
                  className="block font-display text-headline tracking-[-0.015em] text-chalk"
                  lines={[
                    "Buy it, and it",
                    <>
                      leaves the{" "}
                      <span className="italic text-accent">collection.</span>
                    </>,
                  ]}
                />
              </h2>
              <Reveal
                as="p"
                variant="up"
                mode="archive"
                className="mt-7 measure text-[0.9375rem] leading-relaxed text-chalk-muted"
              >
                An exclusive licence transfers the design to you and permanently
                withdraws it from sale. The work is delisted from this site,
                never sold again, and its slot in the edition is closed. We keep
                no right to reuse the design for another client.
              </Reveal>
              <Reveal variant="rise" mode="commerce" className="mt-8">
                <ActionLink
                  href="/contact?intent=exclusive"
                  variant="accent"
                  tone="void"
                >
                  Request exclusivity
                </ActionLink>
              </Reveal>
              <Reveal as="p" variant="rise" mode="archive" className="mt-5 meta text-chalk-muted">
                {formatFrom(exclusive.priceFrom).toUpperCase()} — {exclusive.delivery}
              </Reveal>
            </div>

            <Reveal
              as="dl"
              variant="rise"
              mode="archive"
              group
              className="border-t border-void-rule lg:col-span-6 lg:col-start-7"
            >
              {[
                {
                  t: "Delisted, publicly",
                  d: "The work is marked withdrawn in the collection rather than quietly deleted, so the record of the edition stays honest.",
                },
                {
                  t: "Written and dated",
                  d: "Exclusivity is a signed agreement naming the work and the date it left the collection — not a promise in an email thread.",
                },
                {
                  t: "Full transfer",
                  d: "Source code, design files and the right to use the design however you want, including registering it as your own.",
                },
                {
                  t: "Existing licences stand",
                  d: "Anyone who legitimately bought the source before the exclusive sale keeps their licence. We tell you how many that is before you commit — currently none for every available work.",
                },
              ].map((item) => (
                <div key={item.t} className="border-b border-void-rule py-6">
                  <dt className="text-[1.0625rem] text-chalk">{item.t}</dt>
                  <dd className="mt-2.5 measure text-[0.9375rem] leading-relaxed text-chalk-muted">
                    {item.d}
                  </dd>
                </div>
              ))}
            </Reveal>
          </div>

          {/* the register — honest even when empty */}
          <Reveal
            variant="rise"
            mode="archive"
            className="mt-12 border-t border-void-rule pt-8"
          >
            <p className="meta text-chalk-muted">WITHDRAWN FROM EDITION {site.edition}</p>
            {withdrawn.length === 0 ? (
              <p className="mt-3 text-[0.9375rem] text-chalk-muted">
                None yet. All {works.length} works are still available.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {withdrawn.map((work) => (
                  <li key={work.slug} className="meta text-chalk">
                    {work.number} — {work.name}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </div>
      </section>

      {/* ── handover ── */}
      <section
        id="handover"
        className="shell scroll-mt-20 border-t border-rule section-y"
        aria-labelledby="handover-title"
      >
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4">
            <SectionLabel index="03">HANDOVER</SectionLabel>
            <h2 id="handover-title" className="mt-6">
              <LineMask
                as="span"
                mode="exhibition"
                className="block font-display text-headline tracking-[-0.015em] text-ink"
                lines={["Exactly what", "arrives."]}
              />
            </h2>
            <Reveal variant="rise" mode="archive" className="mt-6">
              <Link href="/contact" className="link-rule meta text-ink">
                Ask about anything here <Arrow />
              </Link>
            </Reveal>
          </div>
          <Reveal
            as="dl"
            variant="rise"
            mode="archive"
            group
            className="border-t border-rule lg:col-span-7 lg:col-start-6"
          >
            {handover.map((item) => (
              <div key={item.title} className="border-b border-rule py-6">
                <dt className="text-[1.0625rem] font-medium text-ink">{item.title}</dt>
                <dd className="mt-2.5 measure text-[0.9375rem] leading-relaxed text-ink-muted">
                  {item.body}
                </dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <Faq
        items={licenceFaq}
        index="04"
        title={["Licence", "questions."]}
        lead={`Anything not covered here, write to ${site.contact.email} and we will answer before you buy.`}
        id="licence-faq"
      />

      {/* ── legal footnote ── */}
      <section className="shell border-t border-rule py-12">
        <p className="measure meta leading-relaxed text-ink-muted">
          This page is a plain-language summary and is provided for clarity. The
          signed licence agreement issued with your purchase is the governing
          document, and it is written to say the same things. Refunds are
          handled case by case: source-code purchases are not refundable once
          repository access has been granted, because they cannot be returned —
          which is why we publish live demos and answer questions first.
        </p>
      </section>
    </>
  );
}
