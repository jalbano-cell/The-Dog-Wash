"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
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

  // The banner sets the offer itself in semibold. Promo copy is written as
  // "<lead> — <offer>" (src/data/promo.ts); if a future promo has no dash,
  // the whole string just renders as the lead.
  const dashAt = promo.text.indexOf("—");
  const lead = dashAt === -1 ? promo.text : promo.text.slice(0, dashAt).trim();
  const offer = dashAt === -1 ? "" : promo.text.slice(dashAt + 1).trim();

  function dismiss() {
    // Session cookie (no Max-Age/Expires) — clears when the browser session ends.
    document.cookie = `${COOKIE}=1; path=/; SameSite=Lax`;
    setDismissed(true);
  }

  return (
    <div className="relative bg-navy text-[#e8f1fa]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-center gap-x-[10px] gap-y-1 px-12 py-[9px] text-center text-[12.5px] tracking-[0.01em]">
        {/* Decorative only, and it strands itself on its own line once the
            banner wraps — so it's desktop-only. */}
        <span aria-hidden className="hidden h-[5px] w-[5px] shrink-0 rounded-full bg-accent-500 sm:block" />
        <span>
          {lead}
          {offer ? (
            <>
              {" — "}
              <strong className="font-semibold">{offer}</strong>
            </>
          ) : null}
        </span>
        <span aria-hidden className="hidden opacity-40 sm:inline">
          ·
        </span>
        <button
          type="button"
          onClick={() => openBookingModal(location)}
          // Inline in a sentence, so it can't be a 44px-tall block — the tap
          // area is extended past the text with padding pulled back out by a
          // negative margin, leaving the line height unchanged.
          className="-my-3.5 inline-block border-b border-[#e8f1fa]/45 px-2 py-3.5 transition-colors hover:border-[#e8f1fa]"
        >
          {promo.cta}
        </button>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        // 44x44 tap area; the background is transparent until hover so the
        // larger target isn't visible.
        className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X size={15} />
      </button>
    </div>
  );
}
