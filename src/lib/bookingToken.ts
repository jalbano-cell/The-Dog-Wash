import crypto from "crypto";

export type BookingPayload = {
  locationSlug: string;
  name: string;
  phone: string;
  customerEmail: string;
  service: string;
  customService: string;
  date: string;
  time: string;
  dogName: string;
  dogBreed: string;
  dogSize: string;
  message: string;
};

function secret() {
  const value = process.env.BOOKING_TOKEN_SECRET;
  if (!value) {
    throw new Error("Missing BOOKING_TOKEN_SECRET env var. Set it in .env.local.");
  }
  return value;
}

function sign(payload: string) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createBookingToken(data: BookingPayload): string {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyBookingToken(token: string): BookingPayload | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString());
  } catch {
    return null;
  }
}
