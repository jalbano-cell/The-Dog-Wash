export const business = {
  name: "The Dog Wash",
  legalName: "The Dog Wash",
  instagram: "https://www.instagram.com/the_dog_wash/",
  // Credentials shown in the trust badge strip, hero, and about section.
  // Angela has won multiple grooming awards — add the rest of the real ones in
  // place of the [PLACEHOLDER] entries (placeholders are filtered out of any
  // list that renders them, so it's safe to leave them until confirmed).
  credentials: {
    awards: [
      "2018 Canadian Pet Expo Mystery Groom — First Place",
      "[PLACEHOLDER — additional award]",
      "[PLACEHOLDER — additional award]",
    ],
    certification: "Ontario Pet Stylist Certificate",
  },
};

/** Awards with the [PLACEHOLDER] entries removed — safe to render in lists. */
export const realAwards = business.credentials.awards.filter(
  (award) => !award.includes("PLACEHOLDER")
);

export type ParsedAward = {
  /** e.g. "2018" */
  year: string;
  /** e.g. "Canadian Pet Expo Mystery Groom" */
  event: string;
  /** e.g. "First Place" */
  placing: string;
};

/**
 * Splits an award written as "{year} {event} — {placing}" so the hero pill and
 * the studio band can lead with the placing (the part worth reading first)
 * instead of the year.
 *
 * Returns null for anything not in that shape rather than guessing — callers
 * fall back to printing the award verbatim, so an oddly-formatted entry
 * degrades to plain text instead of rendering mangled.
 */
export function parseAward(award: string): ParsedAward | null {
  const match = award.match(/^(\d{4})\s+(.+?)\s+—\s+(.+)$/);
  if (!match) return null;
  return { year: match[1], event: match[2], placing: match[3] };
}
