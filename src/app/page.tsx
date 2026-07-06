import { Header } from "@/components/Header";
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

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <Services />
        <WhyChooseUs />
        <Reviews />
        <Gallery />
        <About />
        <BookingCTA />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
