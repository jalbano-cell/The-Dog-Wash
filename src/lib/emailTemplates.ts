import type { BookingPayload } from "@/lib/bookingToken";
import type { LocationInfo } from "@/data/locations";
import { siteHost } from "@/lib/site-config";

const BRAND = {
  primary600: "#d1367f",
  primary700: "#af2867",
  primary50: "#fdf1f7",
  cream: "#fdf2f8",
  stone800: "#2b3550",
  stone600: "#566281",
  sandDark: "#d9e6f5",
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
      <td style="padding:9px 0;border-bottom:1px solid ${BRAND.sandDark};font-size:13px;font-weight:600;color:${BRAND.stone600};width:38%;vertical-align:top;">${label}</td>
      <td style="padding:9px 0;border-bottom:1px solid ${BRAND.sandDark};font-size:14px;color:${BRAND.stone800};vertical-align:top;">${value}</td>
    </tr>`;
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
  <body style="margin:0;padding:0;background:${BRAND.cream};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.cream};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 1px 3px rgba(58,66,62,0.08);">
            <tr>
              <td style="background:${BRAND.primary600};padding:22px 28px;">
                <span style="font-size:17px;font-weight:700;color:#ffffff;letter-spacing:0.01em;">🐾 The Dog Wash</span>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;background:${BRAND.primary50};text-align:center;">
                <span style="font-size:11px;color:${BRAND.stone600};">This is an automated message from ${siteHost}</span>
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

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>

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

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${detailRow("Message", message.replace(/\n/g, "<br />"))}
    </table>`;

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

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    ${calendarUrl ? ctaButton(calendarUrl, "📅 Add to Google Calendar") : ""}

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
