import type { Metadata } from "next";
import Link from "next/link";
import { PawPrint, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { termsIntro, termsClauses } from "@/data/terms";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The Dog Wash grooming terms and conditions — liability, right to refuse service, pick-up inspection, and our 48-hour styling correction policy.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-cream">
      <header className="border-b border-sand-dark/60 bg-white">
        <Container className="flex h-18 items-center justify-between py-3">
          <Link href="/" className="flex items-baseline gap-2">
            <PawPrint size={22} className="mb-0.5 shrink-0 -rotate-12 text-playful-500" />
            <span className="font-display text-xl font-extrabold tracking-tight text-stone-800">
              The Dog Wash
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft size={16} />
            Back home
          </Link>
        </Container>
      </header>

      <main className="flex-1 py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
              Award-Winning Pet Grooming
            </span>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-stone-800">
              Terms and Conditions
            </h1>
            <p className="mt-5 text-base font-medium text-stone-700">{termsIntro}</p>

            <ol className="mt-6 space-y-4">
              {termsClauses.map((clause, index) => (
                <li
                  key={index}
                  className="flex gap-4 rounded-2xl border border-sand-dark/70 bg-white p-5 shadow-sm"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-stone-700">{clause}</p>
                </li>
              ))}
            </ol>

            <p className="mt-8 text-sm text-stone-600">
              Questions about our terms? Please{" "}
              <Link href="/" className="font-semibold text-primary-600 hover:text-primary-700">
                get in touch with your studio
              </Link>
              .
            </p>
          </div>
        </Container>
      </main>

      <footer className="border-t border-sand-dark/60 py-6">
        <Container className="text-center text-xs text-stone-500">
          © {new Date().getFullYear()} The Dog Wash · Premium dog grooming in Etobicoke &amp; Georgetown
        </Container>
      </footer>
    </div>
  );
}
