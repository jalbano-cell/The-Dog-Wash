import { locations } from "@/data/locations";
import { getServicesForLocation } from "@/data/services";
import { getPricingForLocation } from "@/data/pricing";
import { faqs } from "@/data/faq";
import { business } from "@/data/business";
import { siteConfig } from "@/lib/site-config";

// Served at /llms.txt — a machine-readable summary for AI agents and LLM-based
// browsers (see llmstxt.org). Generated from the same data files the site
// renders from, so it never drifts out of sync. Statically generated.
export const dynamic = "force-static";

function stripPlaceholders(text: string) {
  return text.replace(/\s*\[PLACEHOLDER[^\]]*\]/g, "").trim();
}

function locationBlock(slug: string) {
  const loc = locations.find((l) => l.slug === slug)!;
  const services = getServicesForLocation(slug).map((s) => s.name);
  const pricing = getPricingForLocation(slug);
  const url = `${siteConfig.baseUrl}/locations/${loc.slug}`;

  const hours = loc.hours.map((h) => `  - ${h.day}: ${h.hours}`).join("\n");
  const tiers = pricing.sizeTiers
    .map((t) => `  - ${t.size} (${t.weight}): from $${t.fullGroomFrom}`)
    .join("\n");
  const addOns = pricing.addOns.map((a) => `${a.name} $${a.price}`).join(", ");
  const opensSunday = loc.hours.some((h) => h.day === "Sunday" && h.hours.toLowerCase() !== "closed");

  return `### The Dog Wash — ${loc.shortName}
- Page: ${url}
- Address: ${loc.address.full}
- Phone: ${loc.phone} (${loc.phoneHref})
- Google rating: ${loc.rating.value.toFixed(1)} (${loc.rating.count}+ reviews)
- Areas served: ${loc.areaServed.join(", ")}${opensSunday ? "\n- Open Sundays" : ""}
- Hours:
${hours}
- Services: ${services.join(", ")}
- Full groom pricing (starting from):
${tiers}
- Add-on services: ${addOns}
- Booking: online booking form on the page above, or call the studio.`;
}

export function GET() {
  const faqLines = faqs
    .map((f) => `- ${f.question}\n  ${stripPlaceholders(f.answer)}`)
    .join("\n");

  const body = `# The Dog Wash

> Premium, calm dog grooming with two Ontario studios — Etobicoke (Toronto) and Georgetown / Limehouse (Halton Hills). Award-winning, certified pet stylists who specialize in gentle, low-stress handling for every breed, including anxious and senior dogs. The Georgetown studio is open Sundays.

Booking is done through the online booking form on each location page or by phone. Final grooming price depends on breed, coat condition, and size, and is confirmed before the appointment begins.

## Locations

${locationBlock("etobicoke")}

${locationBlock("georgetown")}

## Frequently asked questions

${faqLines}

## Links
- Home / choose location: ${siteConfig.baseUrl}/
- Etobicoke: ${siteConfig.baseUrl}/locations/etobicoke
- Georgetown: ${siteConfig.baseUrl}/locations/georgetown
- Instagram: ${business.instagram}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
