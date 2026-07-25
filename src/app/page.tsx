import type { Metadata } from "next";
import { LocationChooser } from "@/components/LocationChooser";
import { locations } from "@/data/locations";
import { localBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "The Dog Wash | Choose Your Location — Etobicoke & Georgetown",
  description:
    "Premium dog grooming with two studios near Toronto. Choose the Etobicoke or Georgetown location to see services, hours, and book your dog's appointment.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {locations.map((location) => (
        <script
          key={location.slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(location)) }}
        />
      ))}
      <LocationChooser />
    </>
  );
}
