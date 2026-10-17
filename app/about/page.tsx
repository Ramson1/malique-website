import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { Target, Eye, HeartHandshake, Shield, Award, Users } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Malique Oil and Gas Ltd",
  description:
    "Malique Oil and Gas Ltd is a Nigerian company delivering integrated energy, infrastructure and commercial solutions across LPG and gas services, oil and gas operations, filling stations and gas plants, engineering and construction, real estate, borehole and water works, marine and dredging, transportation, procurement, import/export and training.",
};

const values = [
  {
    icon: Shield,
    name: "Integrity",
    description:
      "We build trust through transparent dealings, honest communication and consistent delivery on every commitment.",
  },
  {
    icon: Award,
    name: "Excellence",
    description:
      "Professional standards, certified processes and a relentless focus on quality define everything we do.",
  },
  {
    icon: HeartHandshake,
    name: "Partnership",
    description:
      "We grow with our clients, contractors and communities — creating shared value that lasts.",
  },
  {
    icon: Users,
    name: "People",
    description:
      "Our workforce and the communities we serve are at the centre of our operations and safety culture.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          section="About"
          title="About Malique Oil and Gas Ltd"
          description="A Nigerian company delivering professional services across energy, infrastructure and business solutions — built on credibility, safety and long-term value."
        />

        {/* Company Overview */}
        <section className="section-padding">
          <div className="container-custom">
            <div data-reveal-group className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-4">
                  Who We Are
                </span>
                <h2 className="text-3xl font-bold text-navy-900 mb-6">
                  Integrated Energy, Infrastructure &amp; Business Solutions
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Malique Oil and Gas Ltd is a Nigerian company delivering
                    integrated energy, infrastructure and commercial solutions.
                    Our objects span LPG, acetylene and methane gas sales and
                    plant services; oil and gas operations, petroleum product
                    supply and import/export; filling stations and gas plants;
                    engineering and construction; real estate and property
                    development; borehole drilling and water works; marine and
                    dredging services; transportation, haulage and fleet
                    operations; procurement, general contracts and general
                    trade; and training, human-resource and business support
                    services.
                  </p>
                  <p>
                    Headquartered in Rivers State with operational branches in
                    Igboh Etche (Etche LGA) and Elelenwo, Port Harcourt, we
                    serve households, businesses, contractors and strategic
                    partners with the same commitment to reliability and
                    safety.
                  </p>
                  <p>
                    Our integrated model means one trusted partner for energy
                    supply, infrastructure delivery and commercial contracting
                    — coordinated under professional management and rigorous
                    HSE standards.
                  </p>
                </div>
              </div>

              {/* Vision / Mission */}
              <div className="space-y-6">
                <div className="rounded-2xl gradient-navy p-8 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-600/20 flex items-center justify-center">
                      <Target className="w-5 h-5 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-bold">Our Mission</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    To deliver dependable energy, infrastructure and business
                    solutions that empower families, enterprises and
                    communities — with professionalism, safety and integrity
                    at every touchpoint.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-navy-900">
                      Our Vision
                    </h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    To be the most credible integrated energy and
                    infrastructure partner in Nigeria&apos;s downstream and
                    commercial sectors — recognised for quality, safety and
                    consistent delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="section-padding bg-slate-50">
          <div className="container-custom">
            <div data-reveal className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-4">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
                The Principles Behind Our Name
              </h2>
            </div>
            <div data-reveal-group className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div
                  key={value.name}
                  className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl gradient-amber flex items-center justify-center mb-4 shadow-md">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">
                    {value.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="rounded-3xl gradient-navy p-10 md:p-16 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Explore What We Can Do For You
              </h2>
              <p className="text-slate-300 max-w-xl mx-auto mb-8">
                From LPG delivery to engineering contracts and procurement —
                discover our full service portfolio.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors"
                >
                  Our Services
                </Link>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 h-12 px-8 rounded-xl border border-slate-500 text-white font-medium hover:bg-white/5 transition-colors"
                >
                  Request a Quote
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
