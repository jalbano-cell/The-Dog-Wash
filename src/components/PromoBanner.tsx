"use client";

import { useEffect, useState } from "react";
import { X, Tag } from "lucide-react";
import type { LocationInfo } from "@/data/locations";
import { getPromoForLocation } from "@/data/promo";
import { useBookingModal } from "@/components/BookingModalContext";

const COOKIE = "tdw_promo_dismissed";

export function PromoBanner({ location }: { location: LocationInfo }) {
  const promo = getPromoForLocation(location.slug);
  const [dismissed, setDismissed] = useState(false);
  const { openBookingModal } = useBookingModal();

  useEffect(() => {
    // Read the session cookie on mount (unavailable during SSR, so this can't
    // be a lazy initializer without a hydration mismatch).
    if (document.cookie.split("; ").some((c) => c.startsWith(`${COOKIE}=`))) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDismissed(true);
    }
  }, []);

  if (!promo || dismissed) return null;

  function dismiss() {
    // Session cookie (no Max-Age/Expires) — clears when the browser session ends.
    document.cookie = `${COOKIE}=1; path=/; SameSite=Lax`;
    setDismissed(true);
  }

  return (
    <div className="relative bg-primary-600 text-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-3 px-10 py-2.5 text-center text-sm">
        <Tag size={15} className="hidden shrink-0 sm:block" />
        <p className="font-medium">
          {promo.text}{" "}
          <button
            type="button"
            onClick={() => openBookingModal(location)}
            // Inline in a sentence, so it can't be a 44px-tall block — instead the
            // tap area is extended past the text with padding that's pulled back
            // out with a negative margin, leaving the visual line height unchanged.
            className="-my-3 inline-block px-2 py-3 font-bold underline underline-offset-2 transition-opacity hover:opacity-80"
          >
            {promo.cta}
          </button>
        </p>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        // 44x44 tap area (the icon stays 16px) — the background is transparent
        // until hover, so the larger target isn't visible.
        className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
      >
        <X size={16} />
      </button>
    </div>
  );
}
