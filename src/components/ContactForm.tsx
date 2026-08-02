"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import type { LocationInfo } from "@/data/locations";

type Status = "idle" | "submitting" | "success" | "error";

// Underline-only fields: the card already has a border, so boxing each input
// inside it doubles the visual weight. The textarea keeps a full border since
// a bare underline can't communicate a multi-line target.
const fieldClass =
  "w-full border-0 border-b border-border-input bg-transparent px-0.5 py-2.5 text-[14.5px] text-navy outline-none transition-colors focus:border-primary-600";
const labelClass =
  "mb-[7px] block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-stone-400";
const errorClass = "mt-1.5 flex items-center gap-1 text-[12px] font-medium text-red-600";

export function ContactForm({ location }: { location: LocationInfo }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; contact?: string; message?: string }>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const contact = String(fd.get("contact") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    const nextErrors: typeof errors = {};
    if (!name) nextErrors.name = "Please tell us your name.";
    if (!contact) nextErrors.contact = "Add a phone number or email so we can reply.";
    if (!message) nextErrors.message = "Let us know how we can help.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-[3px] border border-border bg-white p-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600">
          <CheckCircle2 size={28} />
        </span>
        <h3 className="mt-5 text-[26px] text-navy">Message sent</h3>
        <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-stone-500">
          Thanks for reaching out to our {location.shortName} studio — we&rsquo;ll get back to you
          as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[3px] border border-border bg-white p-6 sm:p-8"
    >
      <h3 className="text-[28px] text-navy">Send us a message</h3>
      <p className="mt-1.5 text-[13.5px] text-stone-400">
        Have a question about your dog or our services? We&rsquo;d love to hear from you.
      </p>

      <input type="hidden" name="location" value={location.slug} />
      {/* Honeypot — visually hidden, ignored by humans, catches bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden" style={{ position: "absolute" }}>
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Your name
          </label>
          <input id="contact-name" name="name" type="text" autoComplete="name" className={fieldClass} aria-invalid={!!errors.name} />
          {errors.name ? (
            <p className={errorClass}>
              <AlertCircle size={12} /> {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="contact-contact" className={labelClass}>
            Phone or email
          </label>
          <input id="contact-contact" name="contact" type="text" className={fieldClass} aria-invalid={!!errors.contact} />
          {errors.contact ? (
            <p className={errorClass}>
              <AlertCircle size={12} /> {errors.contact}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="contact-message" className={labelClass}>
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            className="w-full resize-none rounded-[2px] border border-border-input bg-transparent p-3 text-[14.5px] text-navy outline-none transition-colors focus:border-primary-600"
            aria-invalid={!!errors.message}
          />
          {errors.message ? (
            <p className={errorClass}>
              <AlertCircle size={12} /> {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      {status === "error" ? (
        <p className="mt-4 flex items-center gap-1.5 text-[13.5px] font-medium text-red-600">
          <AlertCircle size={15} />
          Something went wrong — please call us instead at {location.phone}.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-[26px] inline-flex min-h-11 w-full items-center justify-center gap-[9px] rounded-full bg-primary-600 px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-navy disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={15} className="animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send size={15} /> Send message
          </>
        )}
      </button>
    </form>
  );
}
