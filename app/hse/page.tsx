import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import {
  ShieldCheck,
  HardHat,
  Flame,
  LifeBuoy,
  ClipboardCheck,
  Users,
  FileCheck2,
  TriangleAlert,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Health, Safety & Environment (HSE) — Malique Oil and Gas Ltd",
  description:
    "Malique Oil and Gas Ltd operates under a rigorous HSE framework — safety first, environmental responsibility and full regulatory compliance across LPG, construction and energy operations.",
};

const pillars = [
  {
    icon: ShieldCheck,
    name: "Safety First",
    description:
      "No deadline or delivery is worth an injury. Safety checks, PPE and safe-handling procedures are mandatory at every branch and site.",
  },
  {
    icon: FileCheck2,
    name: "Regulatory Compliance",
    description:
      "We align operations with Nigerian downstream and industrial safety regulations, including LPG handling and plant service standards.",
  },
  {
    icon: Users,
    name: "Training & Competence",
    description:
      "Riders, fillers and site personnel receive recurring safety training — cylinder handling, leak response, loading and driving discipline.",
  },
  {
    icon: LifeBuoy,
    name: "Emergency Preparedness",
    description:
      "Documented response plans for gas leaks, fire incidents and transport emergencies, with drilled procedures and clear escalation lines.",
  },
  {
    icon: Flame,
    name: "Product Integrity",
    description:
      "Cylinders are inspected, tested and certified fit before filling. Leak testing and pressure checks are part of every delivery.",
  },
  {
    icon: ClipboardCheck,
    name: "Environmental Responsibility",
    description:
      "Controlled handling of gas and waste, spill prevention measures and responsible operations in every community we serve.",
  },
];

const safetyRules = [
  "Always transport cylinders upright, with the valve cap secured.",
  "Never store cylinders near heat sources, open flames or in enclosed rooms.",
  "Check connections with soapy water after every replacement — never use a flame.",
  "Only use certified regulators and hoses supplied by approved vendors.",
  "Report leaks immediately by phone — do not switch electrical devices.",
  "Keep children away from cylinder handling and storage areas.",
];

export default function HSEPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          section="HSE"
          title="Health, Safety & Environment"
          description="Our HSE policy protects our people, our customers and the communities where we operate."
        />

        {/* Policy Statement */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="rounded-2xl border-l-4 border-amber-600 bg-slate-50 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <HardHat className="w-6 h-6 text-amber-600" />
                <h2 className="text-2xl font-bold text-navy-900">
                  HSE Policy Statement
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Malique Oil and Gas Ltd is committed to conducting all
                operations in a manner that protects the health and safety of
                our employees, customers, partners and the environment. We
                believe every incident is preventable, and we hold ourselves
                to zero-harm expectations across LPG distribution, plant
                services, construction sites and transport operations.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Management provides the resources, training and equipment
                required for safe work, and every employee and contractor has
                the authority — and the duty — to stop any activity they
                believe to be unsafe.
              </p>
            </div>
          </div>
        </section>

        {/* HSE Pillars */}
        <section className="section-padding bg-slate-50">
          <div className="container-custom">
            <div data-reveal className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-4">
                Our Framework
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
                Six Pillars of Our HSE System
              </h2>
            </div>
            <div data-reveal-group className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillars.map((pillar) => (
                <div
                  key={pillar.name}
                  className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl gradient-amber flex items-center justify-center mb-4 shadow-md">
                    <pillar.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">
                    {pillar.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Safety Guidelines */}
        <section className="section-padding">
          <div className="container-custom">
            <div data-reveal-group className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-4">
                  Safe Gas Handling
                </span>
                <h2 className="text-3xl font-bold text-navy-900 mb-4">
                  Safety Rules for Every Home &amp; Business
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  LPG is safe when handled correctly. These are the rules we
                  follow ourselves — and the ones we ask every customer to
                  respect.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <TriangleAlert className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg font-bold text-navy-900">
                    Essential Guidelines
                  </h3>
                </div>
                <ul className="space-y-4">
                  {safetyRules.map((rule) => (
                    <li key={rule} className="flex items-start gap-3">
                      <ShieldCheck className="w-4 h-4 text-amber-600 mt-1 shrink-0" />
                      <span className="text-sm text-slate-600 leading-relaxed">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Band */}
        <section className="py-12 gradient-navy">
          <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <LifeBuoy className="w-8 h-8 text-amber-500 shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-white">
                  Suspect a leak or need emergency support?
                </h3>
                <p className="text-sm text-slate-300">
                  Move to fresh air, avoid flames or switches, and call us
                  immediately.
                </p>
              </div>
            </div>
            <a
              href="tel:+2349031628721"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors shrink-0"
            >
              Call +234 903 162 8721
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
