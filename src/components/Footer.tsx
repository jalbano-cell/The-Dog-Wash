import { AtSign, MapPin, Phone, PawPrint } from "lucide-react";
import { business } from "@/data/business";
import { Container } from "@/components/ui/Container";

const pawRotations = [-15, 10, -8, 16, -12, 8];

export function Footer() {
  return (
    <footer className="relative bg-stone-800 bg-dog-pattern-dark pb-28 pt-14 text-white/70 lg:pb-14">
      <div aria-hidden>
        <Container className="flex justify-center gap-6 pb-8 opacity-40 sm:justify-start">
          {pawRotations.map((rotate, i) => (
            <PawPrint
              key={i}
              size={14}
              style={{ transform: `rotate(${rotate}deg)` }}
              className="text-playful-400"
            />
          ))}
        </Container>
      </div>
      <Container>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-xl font-extrabold text-white">The Dog Wash</p>
            <p className="mt-3 text-sm leading-relaxed">
              Premium, calm dog grooming in Etobicoke — trusted by pet parents
              across Toronto.
            </p>
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white"
            >
              <AtSign size={16} />
              @the_dog_wash
            </a>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-white">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#reviews" className="hover:text-white">Reviews</a></li>
              <li><a href="#gallery" className="hover:text-white">Gallery</a></li>
              <li><a href="#about" className="hover:text-white">About</a></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-white">Contact</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                {business.address.full}
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" />
                <a href={business.phoneHref} className="hover:text-white">
                  {business.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} The Dog Wash. All rights reserved.</p>
          <p>Etobicoke, Toronto, Ontario</p>
        </div>
      </Container>
    </footer>
  );
}
