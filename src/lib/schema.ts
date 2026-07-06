import { business } from "@/data/business";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "PetGroomer",
    name: business.name,
    image: "https://thedogwashetobicoke.ca/images/hero-dog-grooming.jpg",
    "@id": "https://thedogwashetobicoke.ca/#business",
    url: "https://thedogwashetobicoke.ca",
    telephone: business.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.line1,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating.value,
      reviewCount: business.rating.count,
    },
    openingHoursSpecification: business.hoursSchema.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    })),
    sameAs: [business.instagram],
  };
}
