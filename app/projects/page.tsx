import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { Flame, MapPin, BadgeCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects & Capability Showcase — Malique Oil and Gas Ltd",
  description:
    "A showcase of Malique Oil and Gas Ltd capabilities across LPG distribution, engineering construction, real estate, procurement and transportation projects in Rivers State and beyond.",
};

const stats = [
  { value: "7", label: "Service Divisions" },
  { value: "2", label: "Operational Branches" },
  { value: "24/7", label: "Dispatch & Support" },
  { value: "100%", label: "Safety-Focused Delivery" },
];

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          section="Projects"
          title="Projects & Capability Showcase"
          description="Delivered and ongoing work across our divisions — a demonstration of what Malique brings to every engagement."
        />

        {/* Stats */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="container-custom">
            <div data-reveal-group className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-amber bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Gallery */}
        <section className="section-padding">
          <div className="container-custom">
            <div data-reveal className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-4">
                Capability Showcase
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
                Where We Work
              </h2>
              <p className="text-lg text-slate-600">
                Representative engagements across our service portfolio.
                Detailed references available on request.
              </p>
            </div>

            <div data-reveal-group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link
                  key={project.title}
                  href={`/projects/${project.slug}`}
                  className="group block rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="gradient-navy h-32 flex items-center justify-center relative">
                    <project.icon className="w-12 h-12 text-amber-500" />
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-xs font-medium text-white border border-white/20">
                      <BadgeCheck className="w-3 h-3 text-amber-500" />
                      {project.status}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-lg font-bold text-navy-900 group-hover:text-amber-600 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      {project.location}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 group-hover:gap-2.5 transition-all">
                      View Project Details
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-slate-50">
          <div data-reveal className="container-custom text-center">
            <Flame className="w-10 h-10 text-amber-600 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
              Have a Project in Mind?
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto mb-8">
              From quotation to completion, we bring the same discipline to
              every project — big or small.
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
                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl border border-slate-300 text-navy-900 font-medium hover:bg-slate-100 transition-colors"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
