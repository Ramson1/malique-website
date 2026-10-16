"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { api } from "@/lib/api/client";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  const update =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      // Only send non-empty optional fields so the DTO whitelist stays happy.
      const payload: Record<string, string> = { message: form.message };
      if (form.name.trim()) payload.name = form.name.trim();
      if (form.email.trim()) payload.email = form.email.trim();
      if (form.phone.trim()) payload.phone = form.phone.trim();
      if (form.subject.trim()) payload.subject = form.subject.trim();
      await api.post("/messages", payload);
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  const inputClass =
    "w-full h-11 px-4 rounded-lg border border-slate-300 bg-white text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-colors";
  const labelClass = "block text-sm font-medium text-navy-900 mb-1.5";

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-navy-900 mb-2">Message sent!</h3>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">
          Thank you for reaching out. Our team will review your enquiry and get
          back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm text-slate-500 hover:text-amber-600 transition-colors underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="contact-name">
            Full Name
          </label>
          <input
            id="contact-name"
            value={form.name}
            onChange={update("name")}
            placeholder="e.g. Chinedu Okafor"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="contact-phone">
            Phone Number
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder="0803 000 0000"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="contact-email">
            Email Address
          </label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="contact-subject">
            Subject
          </label>
          <input
            id="contact-subject"
            value={form.subject}
            onChange={update("subject")}
            placeholder="What is this about?"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="contact-message">
          Message *
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder="How can we help you?"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full md:w-auto inline-flex items-center justify-center gap-2 h-12 px-10 rounded-xl gradient-amber text-white font-semibold hover:shadow-lg transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
      <p className="text-xs text-slate-400">
        Your message goes straight to our team inbox — we respond during opening
        hours.
      </p>
    </form>
  );
}
