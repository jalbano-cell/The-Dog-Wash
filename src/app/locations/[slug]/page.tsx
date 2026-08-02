import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PromoBanner } from "@/components/PromoBanner";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { Pricing } from "@/components/Pricing";
import { Studio } from "@/components/Studio";
import { Reviews } from "@/components/Reviews";
import { BookingCTA } from "@/components/BookingCTA";
import { Visit } from "@/components/Visit";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { locations, getLocationBySlug } from "@/data/locations";
import { faqs } from "@/data/faq";
import { localBusinessSchema, faqPageSchema } from "@/lib/schema";

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};

  const path = `/locations/${location.slug}`;
  const title = `${location.shortName} | ${location.tagline}`;
  // Per-location keywords so Etobicoke terms never appear on the Georgetown
  // page (or vice versa).
  const keywords = [
    ...location.areaServed.flatMap((area) => [`dog grooming ${area}`, `dog groomer ${area}`]),
    "pet grooming near me",
    "dog wash",
  ];

  return {
    title,
    description: location.seoDescription,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description: location.seoDescription,
      url: path,
      type: "website",
      images: [{ url: "/images/hero-dog-grooming.jpg", width: 1600, height: 900 }],
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(location)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqs)) }}
      />
      <PromoBanner location={location} />
      <Header location={location} />
      <main className="flex-1">
        <Hero location={location} />
        <TrustStrip location={location} />
        <Services location={location} />
        <Gallery />
        <Pricing location={location} />
        <Studio location={location} />
        <Reviews location={location} />
        <BookingCTA location={location} />
        <Visit location={location} />
      </main>
      <Footer location={location} />
      <MobileActionBar location={location} />
    </>
  );
}
