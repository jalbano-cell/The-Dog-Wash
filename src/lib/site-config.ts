// Single source of truth for the site's base URL. Every canonical tag,
// OpenGraph URL, JSON-LD URL, and sitemap entry derives from this — never
// hardcode a domain elsewhere. Override per-environment with NEXT_PUBLIC_SITE_URL.
const DEFAULT_SITE_URL = "https://www.thedogwash.ca";

export const siteConfig = {
  /** e.g. "https://www.thedogwash.ca" — no trailing slash. */
  baseUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/+$/, ""),
};

/** Host without protocol or leading www, e.g. "thedogwash.ca". */
export const siteHost = new URL(siteConfig.baseUrl).host.replace(/^www\./, "");
