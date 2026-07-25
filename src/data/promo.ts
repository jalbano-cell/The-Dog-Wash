export type Promo = {
  enabled: boolean;
  /** [PLACEHOLDER offer text] — the announcement shown in the top banner. */
  text: string;
  cta: string;
};

// One promo per location. Set `enabled: false` to hide the banner entirely for
// a location (it renders nothing and does not affect layout). Swap the
// [PLACEHOLDER] offer text for the real promotion.
const promosByLocation: Record<string, Promo> = {
  etobicoke: {
    enabled: true,
    text: "New client special — $10 off your first full groom [PLACEHOLDER offer text]",
    cta: "Book now",
  },
  georgetown: {
    enabled: true,
    text: "New client special — $10 off your first visit [PLACEHOLDER offer text]",
    cta: "Book now",
  },
};

export function getPromoForLocation(slug: string): Promo | null {
  const promo = promosByLocation[slug];
  return promo && promo.enabled ? promo : null;
}
