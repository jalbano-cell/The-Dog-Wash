import { business } from "@/data/business";
import type { LocationInfo } from "@/data/locations";
import type { FaqItem } from "@/data/faq";
import { siteConfig } from "@/lib/site-config";

const siteUrl = siteConfig.baseUrl;

export function faqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        // Strip internal placeholder notes from the public structured data.
        text: item.answer.replace(/\s*\[PLACEHOLDER[^\]]*\]/g, "").trim(),
      },
    })),
  };
}

export function localBusinessSchema(location: LocationInfo) {
  const pageUrl = `${siteUrl}/locations/${location.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${pageUrl}#${location.slug}`,
    name: `The Dog Wash - ${location.shortName}`,
    description: location.seoDescription,
    url: pageUrl,
    image: `${siteUrl}/images/hero-dog-grooming.jpg`,
    // E.164 form, derived from the tel: link so it always matches the visible number.
    telephone: location.phoneHref.replace(/^tel:/, ""),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.line1,
      addressLocality: location.address.city,
      addressRegion: location.address.region,
      postalCode: location.address.postalCode,
      addressCountry: location.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.geo.lat,
      longitude: location.geo.lng,
    },
    openingHoursSpecification: location.hoursSchema.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    })),
    // Must match the rating shown on the page (trust badge + reviews section).
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: location.rating.value.toFixed(1),
      reviewCount: String(location.rating.count),
    },
    sameAs: [business.instagram],
    areaServed: location.areaServed,
  };
}
