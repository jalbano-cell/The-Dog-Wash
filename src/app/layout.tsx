import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Caveat } from "next/font/google";
import { BookingModalProvider } from "@/components/BookingModalContext";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Casual handwriting accent for section labels and flourishes.
const script = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteUrl = siteConfig.baseUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Dog Wash | Premium Dog Grooming in Etobicoke",
    template: "%s | The Dog Wash",
  },
  description:
    "Award-winning dog grooming studio in Etobicoke, Toronto. Full grooming, bath & brush, nail trims and more from certified pet stylists. Book your dog's appointment today.",
  keywords: [
    "dog grooming",
    "dog groomer",
    "pet grooming near me",
    "dog wash",
    "dog grooming near me",
  ],
  openGraph: {
    title: "The Dog Wash | Premium Dog Grooming in Etobicoke",
    description:
      "Award-winning dog grooming studio in Etobicoke, Toronto. Certified pet stylists, calm handling, and premium results for every breed.",
    url: siteUrl,
    siteName: "The Dog Wash",
    locale: "en_CA",
    type: "website",
    images: [{ url: "/images/hero-dog-grooming.jpg", width: 1600, height: 900 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Dog Wash | Premium Dog Grooming in Etobicoke",
    description:
      "Award-winning dog grooming studio in Etobicoke, Toronto. Certified pet stylists and premium results for every breed.",
    images: ["/images/hero-dog-grooming.jpg"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className={`${display.variable} ${body.variable} ${script.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <BookingModalProvider>{children}</BookingModalProvider>
      </body>
    </html>
  );
}
