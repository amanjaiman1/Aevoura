import Link from "next/link";
import { site, footerNav, legalName } from "@/lib/site";
import { works } from "@/lib/works";
import { Rule } from "@/components/primitives/Marks";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const withdrawn = works.filter((w) => w.availability === "withdrawn").length;
  const available = works.length - withdrawn;

  return (
    <footer className="on-void grain relative overflow-hidden">
      <span aria-hidden="true" className="grain-layer opacity-[0.14]" />

      <div className="shell relative">
        {/* brand statement */}
        <div className="grid gap-10 pt-16 pb-14 lg:grid-cols-12 lg:gap-6 lg:pt-24">
          <div className="lg:col-span-5">
            <p className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.06] text-chalk">
              A finite collection.
              <span className="block text-chalk-muted">Built to be taken further.</span>
            </p>
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-chalk-muted">
              {site.market.internationalNote}
            </p>
            <a
              href={`mailto:${site.contact.email}`}
              data-cursor="link"
              className="link-rule mt-6 inline-block text-[0.9375rem] text-chalk"
            >
              {site.contact.email}
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="meta text-chalk-muted">{group.title}</h2>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        data-cursor="link"
                        className="link-rule inline-block text-[0.9375rem] text-chalk/85 hover:text-chalk"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <Rule tone="void" />

        {/* social + archive state */}
        <div className="flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {site.social.map((channel) =>
              channel.href ? (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="external"
                    className="link-rule meta text-chalk/80 hover:text-chalk"
                  >
                    {channel.label}
                  </a>
                </li>
              ) : (
                <li key={channel.label}>
                  {/* Placeholder: add a URL in lib/site.ts to activate. */}
                  <span className="meta text-chalk-muted/50" title="Coming soon">
                    {channel.label}
                  </span>
                </li>
              )
            )}
          </ul>

          <dl className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <div className="flex items-baseline gap-2">
              <dt className="meta text-chalk-muted">Edition</dt>
              <dd className="meta text-chalk tabular-nums">{site.edition}</dd>
            </div>
            <div className="flex items-baseline gap-2">
              <dt className="meta text-chalk-muted">Works</dt>
              <dd className="meta text-chalk tabular-nums">
                0{available}
                {withdrawn > 0 && (
                  <span className="text-chalk-muted"> / 0{withdrawn} withdrawn</span>
                )}
              </dd>
            </div>
            <div className="flex items-baseline gap-2">
              <dt className="meta text-chalk-muted">Hours</dt>
              <dd className="meta text-chalk">{site.contact.timezone}</dd>
            </div>
          </dl>
        </div>

        <Rule tone="void" />

        {/* the wordmark as a base plate */}
        <div className="relative overflow-hidden pt-10 pb-8">
          <p
            aria-hidden="true"
            className="text-[clamp(3rem,13vw,11rem)] leading-[0.82] font-display tracking-[-0.02em] text-chalk/12 select-none"
          >
            {site.wordmark}
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-void-rule py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="meta text-chalk-muted">
            © {year} {legalName}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/license" className="link-rule meta text-chalk-muted hover:text-chalk">
              Licensing
            </Link>
            <Link href="/contact" className="link-rule meta text-chalk-muted hover:text-chalk">
              Enquire
            </Link>
            <span className="meta text-chalk-muted/60">{site.domain}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
