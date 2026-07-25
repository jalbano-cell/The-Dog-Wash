"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import type { LocationInfo } from "@/data/locations";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-sand-dark bg-cream/50 px-4 py-2.5 text-sm text-stone-800 outline-none transition-colors focus:border-primary-500 focus:bg-white";

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
      <div className="flex flex-col items-center rounded-2xl bg-white p-8 text-center ring-1 ring-stone-800/5">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-600">
          <CheckCircle2 size={28} />
        </span>
        <h3 className="mt-5 text-xl font-bold text-stone-800">Message sent!</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-600">
          Thanks for reaching out to our {location.shortName} studio — we&rsquo;ll get back to you as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl bg-white p-6 ring-1 ring-stone-800/5 sm:p-8">
      <h3 className="text-lg font-bold text-stone-800">Send us a message</h3>
      <p className="mt-1 text-sm text-stone-600">
        Have a question about your dog or our services? We&rsquo;d love to hear from you.
      </p>

      <input type="hidden" name="location" value={location.slug} />
      {/* Honeypot — visually hidden, ignored by humans, catches bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden" style={{ position: "absolute" }}>
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold text-stone-700">
            Your name
          </label>
          <input id="contact-name" name="name" type="text" className={inputClass} aria-invalid={!!errors.name} />
          {errors.name ? (
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-600">
              <AlertCircle size={12} /> {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="contact-contact" className="mb-1.5 block text-xs font-semibold text-stone-700">
            Phone or email
          </label>
          <input id="contact-contact" name="contact" type="text" className={inputClass} aria-invalid={!!errors.contact} />
          {errors.contact ? (
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-600">
              <AlertCircle size={12} /> {errors.contact}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold text-stone-700">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            className={`${inputClass} resize-none`}
            aria-invalid={!!errors.message}
          />
          {errors.message ? (
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-600">
              <AlertCircle size={12} /> {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      {status === "error" ? (
        <p className="mt-4 flex items-center gap-1.5 text-sm font-medium text-red-600">
          <AlertCircle size={15} />
          Something went wrong — please call us instead at {location.phone}.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send size={16} /> Send message
          </>
        )}
      </button>
    </form>
  );
}
