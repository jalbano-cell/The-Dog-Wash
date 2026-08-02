import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { BookingModalProvider } from "@/components/BookingModalContext";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

// Instrument Serif ships a single weight (400) in roman and italic — the
// display voice for every headline. Don't request other weights; there aren't
// any, and asking for one gets a synthesised fake-bold.
const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = siteConfig.baseUrl;

/**
 * `viewportFit: "cover"` is what makes `env(safe-area-inset-*)` return real
 * values instead of 0 — without it the fixed mobile action bar sits under the
 * iPhone home indicator. Width/initialScale match Next's defaults and are
 * spelled out only because this export now exists.
 *
 * Deliberately no `maximumScale`/`userScalable: false` — pinch-zoom stays on.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

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
    <html lang="en-CA" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <BookingModalProvider>{children}</BookingModalProvider>
      </body>
    </html>
  );
}
