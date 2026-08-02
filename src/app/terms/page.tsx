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
      <header className="border-b border-border bg-white">
        <Container className="flex h-[74px] items-center justify-between gap-4">
          <Link href="/" className="-my-2 flex items-center gap-[9px] py-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-white">
              <PawPrint size={16} />
            </span>
            <span className="whitespace-nowrap font-display text-[25px] leading-none tracking-[-0.01em] text-navy">
              The Dog Wash
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-500"
          >
            <ArrowLeft size={16} />
            Back home
          </Link>
        </Container>
      </header>

      <main className="flex-1 py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-stone-400">
              Award-winning pet grooming
            </span>
            <h1 className="mt-4 text-[38px] leading-[1.06] tracking-[-0.015em] text-navy sm:text-[48px]">
              Terms and Conditions
            </h1>
            <p className="mt-5 text-[15.5px] leading-[1.75] text-stone-600">{termsIntro}</p>

            <ol className="mt-8 space-y-3">
              {termsClauses.map((clause, index) => (
                <li
                  key={index}
                  className="flex gap-4 rounded-[3px] border border-border bg-white p-5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-600 text-[13px] font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="text-[13.5px] leading-[1.75] text-stone-600">{clause}</p>
                </li>
              ))}
            </ol>

            <p className="mt-8 text-sm text-stone-600">
              Questions about our terms? Please{" "}
              <Link href="/" className="-my-3 inline-block py-3 font-semibold text-primary-600 hover:text-primary-500">
                get in touch with your studio
              </Link>
              .
            </p>
          </div>
        </Container>
      </main>

      <footer className="border-t border-border py-6">
        <Container className="text-center text-xs text-stone-500">
          © {new Date().getFullYear()} The Dog Wash · Premium dog grooming in Etobicoke &amp; Georgetown
        </Container>
      </footer>
    </div>
  );
}
