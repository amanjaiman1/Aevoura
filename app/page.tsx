import type { Metadata } from "next";
import { site } from "@/lib/site";
import { works } from "@/lib/works";
import { engagements } from "@/lib/pricing";

import { EnterSequence } from "@/components/chrome/EnterSequence";
import { Hero } from "@/components/home/Hero";
import { CollectionSequence } from "@/components/home/CollectionSequence";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { CustomBuildSection } from "@/components/home/CustomBuildSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { EngagementModels } from "@/components/commerce/EngagementModels";
import { QualitySection } from "@/components/home/QualitySection";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * Structured data. Honest by construction: it describes a small collection
 * of five products with real starting prices, and claims nothing about
 * ratings or review counts we do not have.
 */
function StructuredData() {
  const lowest = Math.min(...works.map((w) => w.sourcePrice));
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}#organization`,
        name: site.name,
        url: site.url,
        email: site.contact.email,
        description: site.description,
        areaServed: "Worldwide",
        address: { "@type": "PostalAddress", addressCountry: "IN" },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": `${site.url}#organization` },
        inLanguage: "en",
      },
      {
        "@type": "CollectionPage",
        "@id": `${site.url}#collection`,
        name: `Edition ${site.edition}`,
        description: `${site.workCount} premium website experiences.`,
        isPartOf: { "@id": `${site.url}#website` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: works.length,
          itemListElement: works.map((work, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name: work.name,
              description: work.positioning,
              category: work.industry,
              url: `${site.url}/collection/${work.slug}`,
              image: `${site.url}${work.poster}`,
              offers: {
                "@type": "Offer",
                priceCurrency: site.market.currency,
                price: work.sourcePrice,
                availability:
                  work.availability === "available"
                    ? "https://schema.org/InStock"
                    : "https://schema.org/SoldOut",
                url: `${site.url}/collection/${work.slug}`,
              },
            },
          })),
        },
      },
      {
        "@type": "Service",
        "@id": `${site.url}#custom-build`,
        name: "Custom website build",
        provider: { "@id": `${site.url}#organization` },
        description:
          engagements.find((e) => e.id === "custom")?.who ??
          "Custom website design and development.",
        areaServed: "Worldwide",
        offers: {
          "@type": "Offer",
          priceCurrency: site.market.currency,
          price: engagements.find((e) => e.id === "custom")?.priceFrom ?? lowest,
          url: `${site.url}/custom-build`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <EnterSequence />
      <StructuredData />
      <Hero />
      <CollectionSequence />
      <FeaturedWork />
      <CustomBuildSection />
      <HowItWorks />
      <EngagementModels />
      <QualitySection />
      <FinalCta />
    </>
  );
}
