import { business } from "@/data/business";
import type { LocationInfo } from "@/data/locations";

const siteUrl = "https://thedogwashetobicoke.ca";

export function localBusinessSchema(location: LocationInfo) {
  const pageUrl = location.isPrimary ? siteUrl : `${siteUrl}/locations/${location.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "PetGroomer",
    name: location.displayName,
    image: `${siteUrl}/images/hero-dog-grooming.jpg`,
    "@id": `${pageUrl}/#business`,
    url: pageUrl,
    telephone: location.phone,
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: location.rating.value,
      reviewCount: location.rating.count,
    },
    openingHoursSpecification: location.hoursSchema.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    })),
    sameAs: [business.instagram],
  };
}
