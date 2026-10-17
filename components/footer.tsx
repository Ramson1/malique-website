import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, Users, Facebook, Instagram, Linkedin } from "lucide-react";
import { WHATSAPP_GROUP_URL } from "@/lib/whatsapp";
import { COMPANY_EMAIL } from "@/lib/company";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Malique Oil and Gas logo" className="w-9 h-9 rounded-full" />
              <div>
                <div className="text-lg font-bold leading-tight">Malique</div>
                <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                  Oil & Gas
                </div>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              A Nigerian company delivering integrated energy, infrastructure
              and commercial solutions — LPG and gas, oil &amp; gas operations,
              filling stations and gas plants, engineering, construction, real
              estate, water works, dredging, transportation, procurement,
              import/export and training.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Our Services" },
                { href: "/projects", label: "Projects & Capability" },
                { href: "/hse", label: "Health, Safety & Environment" },
                { href: "/quote", label: "Request a Quote" },
                { href: "/#branches", label: "Branch Locations" },
                { href: "/order", label: "Order Gas Online" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-amber-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400">Igboh Etche · +234 903 162 8721</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400">Igboh Etche · +234 915 597 7415</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400">Elelenwo (Off Odani Rd) · +234 903 056 8003</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400">
                  {COMPANY_EMAIL}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400">
                  Igboh Etche, Etche LGA &amp; Elelenwo, Port Harcourt — Rivers State
                </span>
              </li>
              <li className="flex items-start gap-2">
                <a
                  href="https://wa.me/2349031628721?text=Hello%20Malique%20Oil%20and%20Gas%2C%20I%20would%20like%20to%20make%20an%20enquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-green-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-green-400 shrink-0" />
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2">
                <a
                  href={WHATSAPP_GROUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-green-400 transition-colors"
                >
                  <Users className="w-4 h-4 text-green-400 shrink-0" />
                  Join our WhatsApp Group
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Malique on Facebook"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-600 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Malique on Instagram"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-600 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Malique on LinkedIn"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-600 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Operating Hours
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <div className="text-sm text-slate-400">
                  <div>Mon – Sat: 7:00 AM – 7:00 PM</div>
                  <div>Sunday: 10:00 AM – 7:00 PM</div>
                  <div>Elelenwo Sunday: 12:00 PM – 7:00 PM</div>
                </div>
              </li>
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center h-10 px-6 rounded-lg bg-amber-600 text-white text-sm font-medium hover:bg-amber-700 transition-colors"
              >
                Request a Quote
              </Link>
              <Link
                href="/order"
                className="inline-flex items-center justify-center h-10 px-6 rounded-lg border border-slate-700 text-slate-300 text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Order Gas Now
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col items-center gap-5 text-center">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Malique Oil and Gas Limited. All
            rights reserved.
          </p>

          {/* Developer credit */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
            <span className="text-base font-bold text-slate-300">
              Designed &amp; Developed by
            </span>
            <a
              href="https://blackboxtech.online"
              target="_blank"
              rel="noopener noreferrer"
              title="Black-Box Tech — info@blackboxtech.online"
              className="flex items-center gap-3 text-2xl font-extrabold text-white hover:text-amber-400 transition-colors"
            >
              <img
                src="/blackbox-tech.jpg"
                alt="Black-Box Tech logo"
                className="w-11 h-11 rounded-full ring-2 ring-slate-700 shadow-lg"
              />
              Black-Box Tech
            </a>
            <span className="text-slate-600 text-lg">&bull;</span>
            <a
              href="mailto:info@blackboxtech.online"
              className="text-sm font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              info@blackboxtech.online
            </a>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
