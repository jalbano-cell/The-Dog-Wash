import { NextResponse } from "next/server";
import { getLocationBySlug } from "@/data/locations";
import { getEmailConfigForLocation, sendMail } from "@/lib/email";
import { createBookingToken } from "@/lib/bookingToken";
import { ownerBookingRequestEmail } from "@/lib/emailTemplates";

function field(data: FormData, key: string) {
  return String(data.get(key) ?? "").trim();
}

export async function POST(request: Request) {
  const data = await request.formData();

  const location = getLocationBySlug(field(data, "location"));
  if (!location) {
    return NextResponse.json({ error: "Unknown location" }, { status: 400 });
  }

  const name = field(data, "name");
  const phone = field(data, "phone");
  const customerEmail = field(data, "customerEmail");
  if (!name || !phone || !customerEmail) {
    return NextResponse.json({ error: "Name, phone, and email are required" }, { status: 400 });
  }

  const service = field(data, "service");
  const customService = field(data, "customService");
  const date = field(data, "date");
  const time = field(data, "time");
  const dogName = field(data, "dogName");
  const dogBreed = field(data, "dogBreed");
  const dogSize = field(data, "dogSize");
  const message = field(data, "message");

  const serviceLine = service === "custom" ? `Custom — ${customService || "not specified"}` : service || "Not specified";

  try {
    const config = getEmailConfigForLocation(location.slug);

    const booking = {
      locationSlug: location.slug,
      name,
      phone,
      customerEmail,
      service,
      customService,
      date,
      time,
      dogName,
      dogBreed,
      dogSize,
      message,
    };

    const origin = new URL(request.url).origin;
    const manageUrl = `${origin}/booking/manage?token=${encodeURIComponent(createBookingToken(booking))}`;

    const textBody = [
      `New booking request — ${location.displayName}`,
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${customerEmail}`,
      `Service: ${serviceLine}`,
      `Preferred date: ${date || "Not specified"}`,
      `Preferred time: ${time || "Not specified"}`,
      `Dog's name: ${dogName || "Not specified"}`,
      `Breed: ${dogBreed || "Not specified"}`,
      `Size: ${dogSize || "Not specified"}`,
      `Notes: ${message || "None"}`,
      "",
      `Review & respond (approve or offer times): ${manageUrl}`,
    ].join("\n");

    await sendMail({
      config,
      to: location.bookingEmail,
      subject: `New booking request — ${name} (${location.shortName})`,
      text: textBody,
      html: ownerBookingRequestEmail({ booking, location, manageUrl }),
    });
  } catch (err) {
    console.error("Failed to send booking email", err);
    return NextResponse.json({ error: "Failed to send booking email" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
