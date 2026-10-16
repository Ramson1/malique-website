import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import {
  Flame,
  Factory,
  Building2,
  HardHat,
  Truck,
  Package,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — Malique Oil and Gas Ltd",
  description:
    "Oil and gas operations, LPG sales and plant services, property development, engineering and construction, transportation and haulage, procurement, general contracts and workforce development.",
};

const services = [
  {
    icon: Flame,
    name: "Oil & Gas Operations",
    summary:
      "Professional support services for upstream and midstream operations, delivered with certified safety standards.",
    capabilities: [
      "Operational support and supervision",
      "Equipment supply and installation",
      "Site logistics and mobilisation",
      "Maintenance and turnaround support",
    ],
  },
  {
    icon: Factory,
    name: "LPG Sales & Plant Services",
    summary:
      "Cooking gas refills, cylinder sales and gas plant services for households, businesses and bulk buyers.",
    capabilities: [
      "3kg – 50kg cylinder refills",
      "New cylinder sales and exchange",
      "Commercial and industrial bulk supply",
      "Plant filling and cylinder testing services",
      "Fast doorstep delivery in Rivers State",
    ],
  },
  {
    icon: Building2,
    name: "Property Development & Real Estate",
    summary:
      "Residential and commercial property development, management and strategic land investment.",
    capabilities: [
      "Estate and housing development",
      "Property management and leasing",
      "Land acquisition and title verification",
      "Facility maintenance services",
    ],
  },
  {
    icon: HardHat,
    name: "Engineering & Construction",
    summary:
      "Civil, mechanical and industrial engineering construction for energy and commercial clients.",
    capabilities: [
      "Building and civil works",
      "Mechanical pipeline fabrication and installation",
      "Industrial plant construction and repairs",
      "Project supervision and management",
    ],
  },
  {
    icon: Truck,
    name: "Transportation & Haulage",
    summary:
      "Dependable movement of energy products, equipment and commercial cargo across Nigeria.",
    capabilities: [
      "LPG and petroleum product distribution",
      "Heavy equipment haulage",
      "Bulk and inter-state freight",
      "Dedicated fleet contract hire",
    ],
  },
  {
    icon: Package,
    name: "Procurement & General Contracts",
    summary:
      "End-to-end sourcing, supply and contract delivery for corporate, industrial and government clients.",
    capabilities: [
      "Commodity and equipment procurement",
      "Vendor management and tendering support",
      "Supply contracts and framework agreements",
      "General enterprise and maintenance contracts",
    ],
  },
  {
    icon: GraduationCap,
    name: "Workforce Development",
    summary:
      "Training, placement and capacity building for the energy and industrial workforce of tomorrow.",
    capabilities: [
      "Safety and technical training programmes",
      "Skilled labour placement",
      "Corporate capacity building",
      "Internship and mentorship schemes",
    ],
  },
];

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
