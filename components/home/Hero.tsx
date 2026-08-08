import { site } from "@/lib/site";
import { templates, getFeaturedTemplate } from "@/lib/templates";
import { formatPrice } from "@/lib/pricing";
import { LineMask } from "@/components/primitives/LineMask";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { Badge, CheckMark } from "@/components/primitives/Marks";

/**
 * HERO
 *
 * The commercial job of this screen: in about five seconds a visitor should
 * know what is for sale, roughly what it costs, that they can try one right
 * now, and how to buy.
 *
 * The right-hand side shows the actual products as a fanned stack of previews
 * rather than a decorative background wash. On a site selling website
 * templates, the templates are the strongest possible hero image — and it
 * means no stock photography and no extra assets to load.
 */
export function Hero() {
  const featured = getFeaturedTemplate();
  const cheapest = Math.min(...templates.map((t) => t.sourcePrice));
  const cheapestCustom = Math.min(...templates.map((t) => t.customFrom));
  const liveCount = templates.filter((t) => t.liveDemo).length;

  /** Front card last so it paints on top. */
  const fan = [templates[2], templates[1], featured];

  return (
    <section className="px-2 pt-3 sm:px-3" aria-labelledby="hero-title">
      <div className="on-dark panel relative -mt-[4.75rem] overflow-hidden pt-[4.75rem]">
        {/* Atmosphere only — cheap, static, no image request. */}
        <div
          aria-hidden="true"
          className="absolute -top-40 -right-32 h-[36rem] w-[36rem] rounded-full bg-accent/20 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-52 -left-24 h-[30rem] w-[30rem] rounded-full bg-white/5 blur-[110px]"
        />

        <div className="shell relative pt-10 pb-12 sm:pt-14 lg:pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* ── copy ── */}
            <div className="lg:col-span-6">
              <Reveal
                variant="rise"
                mode="archive"
                className="flex flex-wrap items-center gap-2.5"
              >
                <Badge tone="accent">{site.templateCount} templates available</Badge>
                {liveCount > 0 && <Badge tone="dark">Live 3D demo</Badge>}
              </Reveal>

              <h1 id="hero-title" className="mt-6">
                <LineMask
                  as="span"
                  mode="reveal"
                  className="block font-display text-hero font-bold text-white"
                  lines={[
                    "Premium websites,",
                    <>
                      ready to <span className="text-accent">launch.</span>
                    </>,
                  ]}
                />
              </h1>

              <Reveal
                as="p"
                variant="up"
                mode="archive"
                delay={0.35}
                className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/80"
              >
                {site.templateCountWord.charAt(0).toUpperCase() +
                  site.templateCountWord.slice(1)}{" "}
                website templates built to the standard of a full agency
                project. Buy the source code, have us launch it with your
                content, or commission a custom build around your brand.
              </Reveal>

              <Reveal
                variant="up"
                mode="action"
                delay={0.5}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <ActionLink href="/buy" variant="primary" size="lg">
                  Buy a template
                </ActionLink>
                <ActionLink href="/templates" variant="outlineLight" size="lg">
                  See all {site.templateCount}
                </ActionLink>
              </Reveal>

              {featured.liveDemo && (
                <Reveal variant="rise" mode="archive" delay={0.6} className="mt-5">
                  <a
                    href={featured.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-rule inline-flex min-h-11 items-center text-[0.875rem] font-bold text-white"
                  >
                    Try the {featured.name} 3D product demo — no signup
                  </a>
                </Reveal>
              )}

              <Reveal
                variant="rise"
                mode="archive"
                delay={0.68}
                className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2 border-t border-white/15 pt-6"
              >
                <p className="text-[0.875rem] text-white/70">
                  Source from{" "}
                  <span className="num font-bold text-white">
                    {formatPrice(cheapest)}
                  </span>
                </p>
                <p className="text-[0.875rem] text-white/70">
                  Built for you from{" "}
                  <span className="num font-bold text-white">
                    {formatPrice(cheapestCustom)}
                  </span>
                </p>
                <p className="text-[0.875rem] text-white/70">
                  One-time ·{" "}
                  <span className="font-bold text-white">no subscription</span>
                </p>
              </Reveal>
            </div>

            {/* ── the products ──
                Deliberately not scroll-revealed: on a phone this sits right at
                the fold, and a hero image that needs a scroll to appear is a
                hero image that is broken. */}
            <div className="lg:col-span-6 lg:pl-6">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-xl sm:aspect-[16/11]">
                {fan.map((template, i) => {
                  // Back to front: each card sits lower, larger and straighter.
                  const layout = [
                    "left-[6%] top-0 w-[74%] -rotate-6",
                    "right-[4%] top-[14%] w-[76%] rotate-3",
                    "left-1/2 bottom-0 w-[86%] -translate-x-1/2 rotate-0",
                  ][i];
                  return (
                    <figure
                      key={template.slug}
                      className={`absolute ${layout} overflow-hidden rounded-xl ring-1 ring-white/15`}
                      style={{
                        boxShadow: "0 24px 60px -20px rgba(0,0,0,0.75)",
                        zIndex: i + 1,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised SVG posters */}
                      <img
                        src={template.poster}
                        alt={
                          i === fan.length - 1
                            ? `${template.name} template preview`
                            : ""
                        }
                        aria-hidden={i === fan.length - 1 ? undefined : true}
                        width={template.posterAspect[0]}
                        height={template.posterAspect[1]}
                        loading={i === fan.length - 1 ? "eager" : "lazy"}
                        fetchPriority={i === fan.length - 1 ? "high" : "auto"}
                        decoding={i === fan.length - 1 ? "sync" : "async"}
                        sizes="(max-width: 1024px) 90vw, 40vw"
                        className="aspect-[16/10] w-full object-cover"
                      />
                      {i === fan.length - 1 && (
                        <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/85 to-transparent px-4 pt-8 pb-3">
                          <span className="font-display text-[0.9375rem] font-bold text-white">
                            {template.name}
                          </span>
                          <span className="num text-[0.8125rem] font-bold text-white">
                            {formatPrice(template.sourcePrice)}
                          </span>
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* promises */}
      <Reveal
        as="ul"
        variant="rise"
        mode="archive"
        group
        className="mt-4 grid gap-x-6 gap-y-3 rounded-lg border border-rule bg-surface px-6 py-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {site.promises.map((promise) => (
          <li key={promise} className="flex gap-2.5">
            <CheckMark className="mt-0.5 shrink-0 text-endorse" />
            <span className="text-[0.875rem] leading-snug text-ink-soft">{promise}</span>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
