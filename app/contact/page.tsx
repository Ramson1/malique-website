import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us — Malique Oil and Gas Ltd",
  description:
    "Contact Malique Oil and Gas Ltd — branches at Igboh Etche, Etche LGA and Elelenwo, Port Harcourt, Rivers State. Call, WhatsApp, email or visit us.",
};

const branchLocations = [
  {
    name: "Branch 1 — Igboh Etche",
    address:
      "Plot 3, Okoche New Layout, Edegelem, Igboh Etche, Etche LGA, Rivers State, Nigeria",
    query: "Okoche New Layout, Igboh Etche, Etche LGA, Rivers State, Nigeria",
  },
  {
    name: "Branch 2 — Elelenwo",
    address: "Off Odani Road, Elelenwo, Port-Harcourt, Rivers State, Nigeria",
    query: "Odani Road, Elelenwo, Port Harcourt, Rivers State, Nigeria",
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          section="Contact"
          title="Get in Touch"
          description="Call, WhatsApp, email or visit either of our Rivers State branches — our team responds quickly."
        />

        {/* Contact Cards */}
        <section className="section-padding">
          <div className="container-custom">
            <div data-reveal-group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl gradient-amber flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-navy-900 mb-1">Call Us</h3>
                <a
                  href="tel:+2349031628721"
                  className="block text-sm text-slate-600 hover:text-amber-600 transition-colors"
                >
                  Igboh Etche · +234 903 162 8721
                </a>
                <a
                  href="tel:+2349155977415"
                  className="block text-sm text-slate-600 hover:text-amber-600 transition-colors"
                >
                  Igboh Etche · +234 915 597 7415
                </a>
                <a
                  href="tel:+2349030568003"
                  className="block text-sm text-slate-600 hover:text-amber-600 transition-colors"
                >
                  Elelenwo · +234 903 056 8003
                </a>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center mx-auto mb-4 shadow-md">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-navy-900 mb-1">WhatsApp</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Chat with our sales desk
                </p>
                <a
                  href="https://wa.me/2349031628721?text=Hello%20Malique%20Oil%20and%20Gas%2C%20I%20would%20like%20to%20make%20an%20enquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#25D366] hover:underline"
                >
                  Start a chat
                </a>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl gradient-amber flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-navy-900 mb-1">Email</h3>
                <a
                  href="mailto:maliqueoilandgasltd@gmail.com"
                  className="text-sm text-slate-600 hover:text-amber-600 transition-colors break-all"
                >
                  maliqueoilandgasltd@gmail.com
                </a>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl gradient-amber flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-navy-900 mb-1">Opening Hours</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Mon–Sat: 7AM–7PM
                  <br />
                  Sun: 10AM–7PM
                  <br />
                  Elelenwo Sun: 12PM–7PM
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div data-reveal className="text-center max-w-2xl mx-auto mb-12 mt-4">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-4">
                Send a Message
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
                Drop us a line
              </h2>
              <p className="mt-3 text-slate-600">
                Fill in the form below and our team will get back to you.
              </p>
            </div>

            <div data-reveal className="max-w-3xl mx-auto mb-16">
              <ContactForm />
            </div>

            {/* Branch Maps */}
            <div data-reveal className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-4">
                Find Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
                Our Branch Locations
              </h2>
            </div>

            <div data-reveal-group className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {branchLocations.map((branch) => (
                <div
                  key={branch.name}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-2">
                      <MapPin className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <h3 className="text-lg font-bold text-navy-900">
                          {branch.name}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                          {branch.address}
                        </p>
                      </div>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.query)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      Get directions on Google Maps →
                    </a>
                  </div>
                  <iframe
                    title={branch.name}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(branch.query)}&z=14&output=embed`}
                    className="w-full h-64 border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
