import { NextResponse } from "next/server";
import { getLocationBySlug } from "@/data/locations";
import { getEmailConfigForLocation, sendMail } from "@/lib/email";
import { contactMessageEmail } from "@/lib/emailTemplates";

function field(data: FormData, key: string) {
  return String(data.get(key) ?? "").trim();
}

export async function POST(request: Request) {
  const data = await request.formData();

  // Honeypot — real users never fill this hidden field.
  if (field(data, "company")) {
    return NextResponse.json({ success: true });
  }

  const location = getLocationBySlug(field(data, "location"));
  if (!location) {
    return NextResponse.json({ error: "Unknown location" }, { status: 400 });
  }

  const name = field(data, "name");
  const contact = field(data, "contact");
  const message = field(data, "message");
  if (!name || !contact || !message) {
    return NextResponse.json({ error: "Name, contact, and message are required" }, { status: 400 });
  }

  try {
    const config = getEmailConfigForLocation(location.slug);
    const textBody = [
      `New contact message — ${location.displayName}`,
      "",
      `Name: ${name}`,
      `Contact: ${contact}`,
      "",
      "Message:",
      message,
    ].join("\n");

    await sendMail({
      config,
      to: location.bookingEmail,
      subject: `New contact message — ${name} (${location.shortName})`,
      text: textBody,
      html: contactMessageEmail({ location, name, contact, message }),
    });
  } catch (err) {
    console.error("Failed to send contact email", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
