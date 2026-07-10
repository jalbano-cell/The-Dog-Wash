import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { LocationTabs } from "@/components/LocationTabs";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Services } from "@/components/Services";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Reviews } from "@/components/Reviews";
import { Gallery } from "@/components/Gallery";
import { About } from "@/components/About";
import { BookingCTA } from "@/components/BookingCTA";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { locations, getLocationBySlug } from "@/data/locations";
import { localBusinessSchema } from "@/lib/schema";

export function generateStaticParams() {
  return locations.filter((location) => !location.isPrimary).map((location) => ({ slug: location.slug }));
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
  if (location.isPrimary) redirect("/");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(location)) }}
      />
      <Header location={location} />
      <LocationTabs />
      <main className="flex-1">
        <Hero location={location} />
        <TrustBar location={location} />
        <Services location={location} />
        <WhyChooseUs />
        <Reviews location={location} />
        <Gallery />
        <About location={location} />
        <BookingCTA location={location} />
        <Contact location={location} />
      </main>
      <Footer location={location} />
      <MobileActionBar location={location} />
    </>
  );
}
