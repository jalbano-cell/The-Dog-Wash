import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PromoBanner } from "@/components/PromoBanner";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustBadges } from "@/components/TrustBadges";
import { TrustBar } from "@/components/TrustBar";
import { Services } from "@/components/Services";
import { Pricing } from "@/components/Pricing";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Reviews } from "@/components/Reviews";
import { Gallery } from "@/components/Gallery";
import { About } from "@/components/About";
import { Team } from "@/components/Team";
import { BookingCTA } from "@/components/BookingCTA";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { ScrollReveal } from "@/components/ScrollReveal";
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

  return {
    title: `${location.shortName} | ${location.tagline}`,
    description: location.descriptionShort,
    alternates: {
      canonical: `/locations/${location.slug}`,
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
        <TrustBadges location={location} />
        <TrustBar location={location} />
        <Services location={location} />
        <Pricing location={location} />
        <WhyChooseUs />
        <Reviews location={location} />
        <Gallery />
        <About location={location} />
        <Team />
        <BookingCTA location={location} />
        <Faq />
        <Contact location={location} />
      </main>
      <Footer location={location} />
      <MobileActionBar location={location} />
      <ScrollReveal />
    </>
  );
}
