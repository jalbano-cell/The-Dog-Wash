import { Phone, MessageCircle } from "lucide-react";
import { business } from "@/data/business";
import { Container } from "@/components/ui/Container";

export function BookingCTA() {
  return (
    <section id="booking" className="bg-stone-800 bg-dog-pattern-dark py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Book your dog&rsquo;s appointment today
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            Call our Etobicoke studio directly or message us on Instagram to
            check availability — we&rsquo;ll find the right time for you and
            your dog.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={business.phoneHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-600/30 transition-all hover:bg-primary-700 sm:w-auto"
            >
              <Phone size={18} />
              Call {business.phone}
            </a>
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              <MessageCircle size={18} />
              Message to Book Online
            </a>
          </div>

          <p className="mt-6 text-xs text-white/50">
            Hours: Tue–Wed &amp; Fri–Sat 9am–5pm &middot; Thu 10am–6pm &middot; Closed Mon &amp; Sun
          </p>
        </div>
      </Container>
    </section>
  );
}
