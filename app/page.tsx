import type { Metadata } from "next";
import { site } from "@/lib/site";
import { templates } from "@/lib/templates";
import { plans } from "@/lib/pricing";
import { templateFaq } from "@/lib/faq";

import { Hero } from "@/components/home/Hero";
import { TemplateShowcase } from "@/components/home/TemplateShowcase";
import { Included } from "@/components/home/Included";
import { WhyUs } from "@/components/home/WhyUs";
import { Steps } from "@/components/home/Steps";
import { PricingRows } from "@/components/commerce/Pricing";
import { CustomBand } from "@/components/home/CustomBand";
import { Faq } from "@/components/templates/Faq";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * Structured data. Honest by construction: it describes five real products
 * with real starting prices and claims nothing about ratings or review
 * counts we do not have.
 */
function StructuredData() {
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
        "@type": "ItemList",
        name: "Website templates",
        numberOfItems: templates.length,
        itemListElement: templates.map((template, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Product",
            name: `${template.name} — ${template.industry} website template`,
            description: template.tagline,
            category: template.category,
            url: `${site.url}/templates/${template.slug}`,
            image: `${site.url}${template.poster}`,
            brand: { "@type": "Brand", name: site.name },
            offers: {
              "@type": "Offer",
              priceCurrency: site.market.currency,
              price: template.sourcePrice,
              availability:
                template.availability === "available"
                  ? "https://schema.org/InStock"
                  : "https://schema.org/SoldOut",
              url: `${site.url}/buy?template=${template.slug}`,
            },
          },
        })),
      },
      {
        "@type": "Service",
        "@id": `${site.url}#custom-build`,
        name: "Custom website design and development",
        provider: { "@id": `${site.url}#organization` },
        description: plans.find((p) => p.id === "custom")?.who ?? "",
        areaServed: "Worldwide",
        offers: {
          "@type": "Offer",
          priceCurrency: site.market.currency,
          price: plans.find((p) => p.id === "custom")?.price ?? 75000,
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
      <StructuredData />
      <Hero />
      <TemplateShowcase />
      <Included />
      <WhyUs />
      <Steps />
      <PricingRows />
      <CustomBand />
      <Faq
        items={templateFaq}
        eyebrow="Questions"
        title="What buyers ask before paying."
        lead={`Anything else, email ${site.contact.email} — you will get an answer from the person who built it.`}
      />
    </>
  );
}
