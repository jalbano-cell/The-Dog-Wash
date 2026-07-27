import type { MetadataRoute } from "next";
import { locations } from "@/data/locations";
import { siteConfig } from "@/lib/site-config";

const siteUrl = siteConfig.baseUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...locations.map((location) => ({
      url: `${siteUrl}/locations/${location.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: location.isPrimary ? 0.9 : 0.8,
    })),
  ];
}
