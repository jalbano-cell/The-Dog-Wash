import { NextResponse } from "next/server";
import { getLocationBySlug } from "@/data/locations";
import { getEmailConfigForLocation, sendMail } from "@/lib/email";
import { verifyBookingToken, createBookingToken } from "@/lib/bookingToken";
import { customerOfferEmail } from "@/lib/emailTemplates";

const STONE = "#2b3550";
const STONE_MUTED = "#566281";
const CREAM = "#fdf2f8";

function page({ title, bodyHtml, status = 200 }: { title: string; bodyHtml: string; status?: number }) {
  const html = `<!doctype html>
<html>
  <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${title}</title></head>
  <body style="margin:0;padding:0;background:${CREAM};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <div style="max-width:480px;margin:48px auto;padding:32px;background:#fff;border-radius:20px;box-shadow:0 1px 3px rgba(58,66,62,0.08);">${bodyHtml}</div>
  </body>
</html>`;
  return new NextResponse(html, { status, headers: { "content-type": "text/html; charset=utf-8" } });
}

function errorPage(heading: string, detail: string, status = 400) {
  return page({
    title: heading,
    status,
    bodyHtml: `<h1 style="margin:0 0 8px;font-size:19px;color:${STONE};">${heading}</h1><p style="margin:0;font-size:14px;color:${STONE_MUTED};line-height:1.6;">${detail}</p>`,
  });
}

function parseLocalDateTime(value: string) {
  const [date, time] = value.split("T");
  return date && time ? { date, time: time.slice(0, 5) } : null;
}

function formatLabel(date: string, time: string) {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  if (!y || !m || !d || Number.isNaN(hh)) return `${date} ${time}`;
  return new Date(y, m - 1, d, hh, mm).toLocaleString("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";
  const booking = verifyBookingToken(token);
  if (!booking) return errorPage("This link isn't valid", "It may have been altered or is from an old email.");

  const location = getLocationBySlug(booking.locationSlug);
  if (!location) return errorPage("This link isn't valid", "Unknown location.");

  const parsed = [url.searchParams.get("t1") ?? "", url.searchParams.get("t2") ?? ""]
    .map(parseLocalDateTime)
    .filter((v): v is { date: string; time: string } => v !== null);

  if (parsed.length < 2) {
    return errorPage("Pick two times", "Please go back and choose two complete date &amp; time options to offer.");
  }

  const options = parsed.map(({ date, time }) => {
    const optionToken = createBookingToken({ ...booking, date, time });
    return {
      label: formatLabel(date, time),
      url: `${url.origin}/api/booking/approve?token=${encodeURIComponent(optionToken)}`,
    };
  });

  try {
    const config = getEmailConfigForLocation(location.slug);
    await sendMail({
      config,
      to: booking.customerEmail,
      subject: `Two appointment times for you — The Dog Wash ${location.shortName}`,
      text: `Pick whichever works:\n1) ${options[0].label}: ${options[0].url}\n2) ${options[1].label}: ${options[1].url}`,
      html: customerOfferEmail({ booking, location, options }),
    });
  } catch (err) {
    console.error("Failed to send offer email", err);
    return errorPage(
      "Couldn't send the email",
      `The email to ${booking.customerEmail} failed to send. Please contact them directly.`,
      500
    );
  }

  return page({
    title: "Times sent",
    bodyHtml: `
      <h1 style="margin:0 0 8px;font-size:19px;color:${STONE};">✓ Two times sent</h1>
      <p style="margin:0;font-size:14px;color:${STONE_MUTED};line-height:1.6;">
        We emailed <strong style="color:${STONE};">${booking.customerEmail}</strong> both options
        (${options[0].label} &amp; ${options[1].label}). Whichever ${booking.name.split(" ")[0]} picks is confirmed
        automatically, and you'll get a note letting you know which one.
      </p>`,
  });
}
