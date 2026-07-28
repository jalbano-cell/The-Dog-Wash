import type { BookingPayload } from "@/lib/bookingToken";
import type { LocationInfo } from "@/data/locations";
import { siteHost } from "@/lib/site-config";

const BRAND = {
  primary600: "#d1367f", // pink
  primary700: "#af2867",
  primary50: "#fdf1f7",
  accent: "#3f8fd6", // blue
  accentDark: "#2f74b8",
  cream: "#fdf2f8",
  stone800: "#2b3550",
  stone600: "#566281",
  sandDark: "#d9e6f5",
  line: "#f2dce9", // soft pink divider
  pageBg: "#f6f2f6",
  gold: "#e34d9b",
};

function serviceLine(booking: Pick<BookingPayload, "service" | "customService">) {
  return booking.service === "custom"
    ? `Custom — ${booking.customService || "not specified"}`
    : booking.service || "Not specified";
}

function formatDate(date: string) {
  if (!date) return "Not specified";
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return date;
  return new Date(year, month - 1, day).toLocaleDateString("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function detailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.03em;color:${BRAND.stone600};width:34%;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};font-size:14px;color:${BRAND.stone800};vertical-align:top;">${value}</td>
    </tr>`;
}

/** Wraps detail rows in a soft, rounded card. */
function detailCard(rowsHtml: string) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.primary50};border:1px solid ${BRAND.line};border-radius:14px;">
      <tr><td style="padding:6px 18px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsHtml}</table>
      </td></tr>
    </table>`;
}

function ctaButtonSecondary(url: string, label: string) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:14px auto 0;">
      <tr>
        <td style="border-radius:999px;border:2px solid ${BRAND.accent};">
          <a href="${url}" style="display:inline-block;padding:12px 28px;font-size:14px;font-weight:700;color:${BRAND.accentDark};text-decoration:none;border-radius:999px;">
            ${label}
          </a>
        </td>
      </tr>
    </table>`;
}

function layout({
  title,
  preheader,
  bodyHtml,
}: {
  title: string;
  preheader: string;
  bodyHtml: string;
}) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background:${BRAND.pageBg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.pageBg};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:22px;overflow:hidden;box-shadow:0 6px 24px rgba(43,53,80,0.10);">
            <!-- Blue accent strip -->
            <tr><td style="height:5px;background:${BRAND.accent};font-size:0;line-height:0;">&nbsp;</td></tr>
            <!-- Pink header with brand + tagline -->
            <tr>
              <td style="background:${BRAND.primary600};padding:26px 32px;">
                <span style="font-size:21px;font-weight:800;color:#ffffff;letter-spacing:0.01em;">🐾 The Dog Wash</span>
                <div style="margin-top:4px;font-size:12px;font-weight:600;color:#fbdcec;letter-spacing:0.02em;">Premium Dog Grooming · Etobicoke &amp; Georgetown</div>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:22px 32px;background:${BRAND.primary50};border-top:1px solid ${BRAND.line};text-align:center;">
                <div style="font-size:14px;font-weight:800;color:${BRAND.stone800};">The Dog Wash</div>
                <div style="margin-top:3px;font-size:11px;color:${BRAND.stone600};">Premium dog grooming · ${siteHost}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function ctaButton(url: string, label: string) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px auto 6px;">
      <tr>
        <td style="border-radius:999px;background:${BRAND.primary600};">
          <a href="${url}" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">
            ${label}
          </a>
        </td>
      </tr>
    </table>`;
}

export function ownerBookingRequestEmail({
  booking,
  location,
  manageUrl,
}: {
  booking: BookingPayload;
  location: LocationInfo;
  manageUrl: string;
}) {
  const rows = [
    detailRow("Location", location.displayName),
    detailRow("Service", serviceLine(booking)),
    detailRow("Preferred date", formatDate(booking.date)),
    detailRow("Preferred time", booking.time || "Not specified"),
    detailRow("Dog's name", booking.dogName || "Not specified"),
    detailRow("Breed", booking.dogBreed || "Not specified"),
    detailRow("Size", booking.dogSize || "Not specified"),
    detailRow("Notes", booking.message || "None"),
  ].join("");

  const bodyHtml = `
    <h1 style="margin:0 0 4px;font-size:20px;font-weight:700;color:${BRAND.stone800};">New booking request</h1>
    <p style="margin:0 0 20px;font-size:14px;color:${BRAND.stone600};">${location.shortName} studio</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.primary50};border-radius:14px;padding:16px 18px;margin-bottom:22px;">
      <tr><td style="font-size:15px;font-weight:700;color:${BRAND.stone800};padding-bottom:2px;">${booking.name}</td></tr>
      <tr><td style="font-size:13px;color:${BRAND.stone600};">${booking.phone} &nbsp;•&nbsp; ${booking.customerEmail}</td></tr>
    </table>

    ${detailCard(rows)}

    ${ctaButton(manageUrl, "Review &amp; respond →")}
    <p style="margin:10px 0 0;text-align:center;font-size:12px;color:${BRAND.stone600};">
      Approve the requested time${location.bookingMode === "approve" ? ", or offer two alternatives" : ""} — ${booking.name} is emailed a confirmation once you do.
    </p>`;

  return layout({
    title: "New booking request",
    preheader: `${booking.name} requested an appointment at ${location.shortName}`,
    bodyHtml,
  });
}

export function contactMessageEmail({
  location,
  name,
  contact,
  message,
}: {
  location: LocationInfo;
  name: string;
  contact: string;
  message: string;
}) {
  const bodyHtml = `
    <h1 style="margin:0 0 4px;font-size:20px;font-weight:700;color:${BRAND.stone800};">New contact message</h1>
    <p style="margin:0 0 20px;font-size:14px;color:${BRAND.stone600};">${location.shortName} studio</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.primary50};border-radius:14px;padding:16px 18px;margin-bottom:22px;">
      <tr><td style="font-size:15px;font-weight:700;color:${BRAND.stone800};padding-bottom:2px;">${name}</td></tr>
      <tr><td style="font-size:13px;color:${BRAND.stone600};">${contact}</td></tr>
    </table>

    ${detailCard(detailRow("Message", message.replace(/\n/g, "<br />")))}`;

  return layout({
    title: "New contact message",
    preheader: `${name} sent a message via the ${location.shortName} contact form`,
    bodyHtml,
  });
}

export function customerConfirmationEmail({
  booking,
  location,
  calendarUrl,
}: {
  booking: BookingPayload;
  location: LocationInfo;
  calendarUrl?: string | null;
}) {
  const rows = [
    detailRow("Location", `${location.displayName} — ${location.address.full}`),
    detailRow("Service", serviceLine(booking)),
    detailRow("Date", formatDate(booking.date)),
    detailRow("Time", booking.time || "To be confirmed"),
    detailRow("Dog", [booking.dogName, booking.dogBreed].filter(Boolean).join(" — ") || "Not specified"),
  ].join("");

  const bodyHtml = `
    <h1 style="margin:0 0 4px;font-size:20px;font-weight:700;color:${BRAND.stone800};">You're all set, ${booking.name.split(" ")[0]}! 🎉</h1>
    <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:${BRAND.stone600};">
      Your appointment at ${location.shortName} has been confirmed. Here are the details:
    </p>

    ${detailCard(rows)}
    ${calendarUrl ? ctaButtonSecondary(calendarUrl, "📅 Add to Google Calendar") : ""}

    <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:${BRAND.stone600};">
      Need to reschedule or have a question? Just call or text us at
      <a href="${location.phoneHref}" style="color:${BRAND.primary600};font-weight:700;text-decoration:none;">${location.phone}</a>.
    </p>
    <p style="margin:18px 0 0;font-size:14px;color:${BRAND.stone800};">See you soon! 🐾</p>`;

  return layout({
    title: "Your appointment is confirmed",
    preheader: `Your ${location.shortName} appointment is confirmed`,
    bodyHtml,
  });
}

export function customerOfferEmail({
  booking,
  location,
  options,
}: {
  booking: BookingPayload;
  location: LocationInfo;
  options: { label: string; url: string }[];
}) {
  const buttons = options
    .map((opt) => ctaButton(opt.url, opt.label))
    .join("");

  const bodyHtml = `
    <h1 style="margin:0 0 4px;font-size:20px;font-weight:700;color:${BRAND.stone800};">Two times for you, ${booking.name.split(" ")[0]}!</h1>
    <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:${BRAND.stone600};">
      Thanks for your request at ${location.shortName}. We have two openings that
      would work${booking.dogName ? ` for ${booking.dogName}` : ""} — tap whichever suits you best and we'll lock it in.
    </p>
    ${buttons}
    <p style="margin:18px 0 0;text-align:center;font-size:12px;color:${BRAND.stone600};">
      Whichever you pick is confirmed instantly. Questions? Call us at
      <a href="${location.phoneHref}" style="color:${BRAND.primary600};font-weight:700;text-decoration:none;">${location.phone}</a>.
    </p>`;

  return layout({
    title: "Two appointment times to choose from",
    preheader: `Pick one of two times for your ${location.shortName} appointment`,
    bodyHtml,
  });
}
