import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { templates } from "@/lib/templates";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: {
    path: string;
    priority: number;
    frequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "", priority: 1, frequency: "monthly" },
    { path: "/templates", priority: 0.9, frequency: "monthly" },
    { path: "/buy", priority: 0.9, frequency: "monthly" },
    { path: "/pricing", priority: 0.9, frequency: "monthly" },
    { path: "/custom-build", priority: 0.9, frequency: "monthly" },
    { path: "/process", priority: 0.6, frequency: "yearly" },
    { path: "/about", priority: 0.6, frequency: "yearly" },
    { path: "/license", priority: 0.4, frequency: "yearly" },
    { path: "/contact", priority: 0.7, frequency: "yearly" },
  ];

  return [
    ...routes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: route.frequency,
      priority: route.priority,
    })),
    // Templates sold exclusively stay out; they are no longer for sale.
    ...templates
      .filter((template) => template.availability !== "sold")
      .map((template) => ({
        url: `${site.url}/templates/${template.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
