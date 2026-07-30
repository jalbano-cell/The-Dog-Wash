export type Promo = {
  enabled: boolean;
  /** The announcement shown in the top banner. */
  text: string;
  cta: string;
};

// One promo per location. Set `enabled: false` to hide the banner entirely for
// a location (it renders nothing and does not affect layout).
const promosByLocation: Record<string, Promo> = {
  etobicoke: {
    enabled: true,
    text: "New client special — 10% off your first Full Groom",
    cta: "Book now",
  },
  georgetown: {
    enabled: true,
    text: "New client special — 10% off your first Full Groom",
    cta: "Book now",
  },
};

export function getPromoForLocation(slug: string): Promo | null {
  const promo = promosByLocation[slug];
  return promo && promo.enabled ? promo : null;
}
