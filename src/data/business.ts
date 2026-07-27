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
