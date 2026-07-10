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
import { getPrimaryLocation } from "@/data/locations";
import { localBusinessSchema } from "@/lib/schema";

export default function Home() {
  const location = getPrimaryLocation();

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
