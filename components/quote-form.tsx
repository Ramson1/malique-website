"use client";

import { useState } from "react";
import { Send, MessageCircle, Mail, CheckCircle2 } from "lucide-react";
import { DIVISION_OPTIONS as divisions } from "@/lib/divisions";

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    division: divisions[0],
    location: "",
    details: "",
  });

  const update =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const message = [
    "QUOTE REQUEST — Malique Website",
    `Name: ${form.name}`,
    form.company ? `Company: ${form.company}` : null,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
    `Service: ${form.division}`,
    form.location ? `Location: ${form.location}` : null,
    `Details: ${form.details}`,
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappUrl = `https://wa.me/2349031628721?text=${encodeURIComponent(message)}`;
  const mailtoUrl = `mailto:maliqueoilandgasltd@gmail.com?subject=${encodeURIComponent(
    "Quote Request: " + form.division
  )}&body=${encodeURIComponent(message)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full h-11 px-4 rounded-lg border border-slate-300 bg-white text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-colors";
  const labelClass =
    "block text-sm font-medium text-navy-900 mb-1.5";

  if (submitted) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-navy-900 mb-2">
          Thank you, {form.name.split(" ")[0] || "friend"}!
        </h3>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Your enquiry is ready. Send it instantly through WhatsApp (fastest
          response) or by email — our team will reply with a professional
          quotation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#1fb959] transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Send via WhatsApp
          </a>
          <a
            href={mailtoUrl}
            className="inline-flex items-center gap-2 h-12 px-8 rounded-xl gradient-amber text-white font-semibold hover:shadow-lg transition-shadow"
          >
            <Mail className="w-5 h-5" />
            Send via Email
          </a>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-slate-500 hover:text-amber-600 transition-colors underline underline-offset-2"
        >
          Edit my request
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
          <label className={labelClass} htmlFor="name">
            Full Name *
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="e.g. Chinedu Okafor"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="company">
            Company / Organisation
          </label>
          <input
            id="company"
            value={form.company}
            onChange={update("company")}
            placeholder="Optional"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={form.phone}
            onChange={update("phone")}
            placeholder="0803 000 0000"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="division">
            Service Needed *
          </label>
          <select
            id="division"
            value={form.division}
            onChange={update("division")}
            className={inputClass}
          >
            {divisions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="location">
            Delivery / Project Location
          </label>
          <input
            id="location"
            value={form.location}
            onChange={update("location")}
            placeholder="e.g. Elelenwo, Port Harcourt"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="details">
          Tell us what you need *
        </label>
        <textarea
          id="details"
          required
          rows={5}
          value={form.details}
          onChange={update("details")}
          placeholder="Describe the products, services or scope of work you would like a quote for."
          className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full md:w-auto inline-flex items-center justify-center gap-2 h-12 px-10 rounded-xl gradient-amber text-white font-semibold hover:shadow-lg transition-shadow"
      >
        <Send className="w-5 h-5" />
        Submit Enquiry
      </button>
      <p className="text-xs text-slate-400">
        Your enquiry is sent directly to our team via WhatsApp or email — we
        never store it without your consent.
      </p>
    </form>
  );
}
