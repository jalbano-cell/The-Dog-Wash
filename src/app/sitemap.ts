import type { MetadataRoute } from "next";
import { locations } from "@/data/locations";

const siteUrl = "https://thedogwashetobicoke.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  return locations.map((location) => ({
    url: location.isPrimary ? siteUrl : `${siteUrl}/locations/${location.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: location.isPrimary ? 1 : 0.9,
  }));
}
