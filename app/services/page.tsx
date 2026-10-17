import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { DIVISIONS } from "@/lib/divisions";

export const metadata: Metadata = {
  title: "Services — Malique Oil and Gas Ltd",
  description:
    "Malique Oil and Gas Ltd delivers LPG and cooking gas, oil and gas operations, filling stations and gas plants, engineering and construction, real estate, borehole and water works, marine and dredging, transportation and haulage, procurement, import/export and training.",
};

const services = DIVISIONS.map((d) => ({
  icon: d.icon,
  name: d.name,
  summary: d.description,
  capabilities: d.capabilities,
}));

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          section="Services"
          title="Our Services & Capabilities"
          description="One trusted partner across energy, infrastructure and commercial solutions — professionally delivered under a single integrated standard."
        />

        {/* Services Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div data-reveal-group className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="rounded-2xl border border-slate-200 bg-white p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl gradient-amber flex items-center justify-center shrink-0 shadow-md">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-navy-900">
                        {service.name}
                      </h2>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        {service.summary}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2.5">
                    {service.capabilities.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                        <span className="text-sm text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-slate-50">
          <div className="container-custom">
            <div className="rounded-3xl gradient-navy p-10 md:p-16 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Need a Service Not Listed Here?
              </h2>
              <p className="text-slate-300 max-w-xl mx-auto mb-8">
                Tell us what your project requires — our team responds quickly
                with a professional quotation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 h-12 px-8 rounded-xl border border-slate-500 text-white font-medium hover:bg-white/5 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
