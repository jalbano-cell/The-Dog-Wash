import { NextResponse } from "next/server";
import { getLocationBySlug, type LocationInfo } from "@/data/locations";
import { getEmailConfigForLocation, sendMail } from "@/lib/email";
import { verifyBookingToken, type BookingPayload } from "@/lib/bookingToken";
import { customerConfirmationEmail } from "@/lib/emailTemplates";
import { googleCalendarUrl } from "@/lib/calendar";

const PRIMARY = "#2f74b8";
const STONE = "#2b3550";
const STONE_MUTED = "#566281";
const CREAM = "#f1f6fb";

function page({ title, bodyHtml, status = 200 }: { title: string; bodyHtml: string; status?: number }) {
  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background:${CREAM};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <div style="max-width:480px;margin:48px auto;padding:32px;background:#fff;border-radius:20px;box-shadow:0 1px 3px rgba(58,66,62,0.08);">
      ${bodyHtml}
    </div>
  </body>
</html>`;
  return new NextResponse(html, { status, headers: { "content-type": "text/html; charset=utf-8" } });
}

function invalidTokenPage() {
  return page({
    title: "Invalid link",
    status: 400,
    bodyHtml: `
      <h1 style="margin:0 0 8px;font-size:19px;color:${STONE};">This link isn't valid</h1>
      <p style="margin:0;font-size:14px;color:${STONE_MUTED};line-height:1.6;">
        It may have been altered or is from an old email. Check the original email and try again.
      </p>`,
  });
}

async function sendConfirmation(booking: BookingPayload, location: LocationInfo, notifyOwner: boolean) {
  const config = getEmailConfigForLocation(location.slug);
  const calendarUrl = location.bookingMode === "calendar" ? googleCalendarUrl(booking, location) : null;

  await sendMail({
    config,
    to: booking.customerEmail,
    subject: `Confirmed: your appointment at ${location.shortName}`,
    text: `Your appointment at ${location.displayName} is confirmed for ${booking.date || "the requested date"} at ${booking.time || "the requested time"}. Call or text ${location.phone} with any questions.`,
    html: customerConfirmationEmail({ booking, location, calendarUrl }),
  });

  if (notifyOwner) {
    await sendMail({
      config,
      to: location.bookingEmail,
      subject: `Confirmed: ${booking.name} — ${booking.date || ""} ${booking.time || ""} (${location.shortName})`,
      text: `${booking.name} confirmed their appointment at ${location.displayName} for ${booking.date || "the requested date"} at ${booking.time || "the requested time"}. Phone: ${booking.phone}. Email: ${booking.customerEmail}.`,
    });
  }

  return calendarUrl;
}

// Customer-facing confirm page (reached from the "pick one of two times" email).
// GET has no side effects — confirmation only happens on the POST below, which
// protects against email/link prefetchers firing a confirmation prematurely.
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  const booking = verifyBookingToken(token);
  if (!booking) return invalidTokenPage();

  const location = getLocationBySlug(booking.locationSlug);
  if (!location) return invalidTokenPage();

  return page({
    title: "Confirm your appointment",
    bodyHtml: `
      <h1 style="margin:0 0 4px;font-size:19px;color:${STONE};">Confirm this time?</h1>
      <p style="margin:0 0 20px;font-size:13px;color:${STONE_MUTED};">The Dog Wash — ${location.shortName}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:${STONE};margin-bottom:24px;">
        <tr><td style="padding:6px 0;color:${STONE_MUTED};width:36%;">Date</td><td style="padding:6px 0;">${booking.date || "Not specified"}</td></tr>
        <tr><td style="padding:6px 0;color:${STONE_MUTED};">Time</td><td style="padding:6px 0;">${booking.time || "Not specified"}</td></tr>
      </table>
      <form method="POST" action="/api/booking/approve">
        <input type="hidden" name="token" value="${token}" />
        <input type="hidden" name="by" value="customer" />
        <button type="submit" style="width:100%;padding:14px;border:none;border-radius:999px;background:${PRIMARY};color:#fff;font-size:15px;font-weight:700;cursor:pointer;">
          ✓ Confirm this appointment
        </button>
      </form>`,
  });
}

export async function POST(request: Request) {
  const data = await request.formData();
  const token = String(data.get("token") ?? "");
  const by = String(data.get("by") ?? "owner");
  const booking = verifyBookingToken(token);
  if (!booking) return invalidTokenPage();

  const location = getLocationBySlug(booking.locationSlug);
  if (!location) return invalidTokenPage();

  let calendarUrl: string | null = null;
  try {
    calendarUrl = await sendConfirmation(booking, location, by === "customer");
  } catch (err) {
    console.error("Failed to send confirmation email", err);
    return page({
      title: "Something went wrong",
      status: 500,
      bodyHtml: `
        <h1 style="margin:0 0 8px;font-size:19px;color:${STONE};">Couldn't send the confirmation</h1>
        <p style="margin:0;font-size:14px;color:${STONE_MUTED};line-height:1.6;">
          The email to ${booking.customerEmail} failed to send. Please contact them directly to confirm.
        </p>`,
    });
  }

  const calendarButton = calendarUrl
    ? `<a href="${calendarUrl}" style="display:inline-block;margin-top:20px;padding:12px 24px;border-radius:999px;background:${PRIMARY};color:#fff;font-size:14px;font-weight:700;text-decoration:none;">📅 Add to your Google Calendar</a>`
    : "";

  return page({
    title: "Appointment confirmed",
    bodyHtml: `
      <h1 style="margin:0 0 8px;font-size:19px;color:${STONE};">✓ Confirmed</h1>
      <p style="margin:0;font-size:14px;color:${STONE_MUTED};line-height:1.6;">
        A confirmation email was sent to <strong style="color:${STONE};">${booking.customerEmail}</strong> for ${booking.name}'s appointment at ${location.shortName}${booking.date ? ` on ${booking.date}` : ""}${booking.time ? ` at ${booking.time}` : ""}.
      </p>
      ${calendarButton}`,
  });
}
