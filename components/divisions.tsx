import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DIVISIONS as divisions } from "@/lib/divisions";

export function Divisions() {
  return (
    <section id="divisions" className="section-padding bg-slate-50">
      <div className="container-custom">
        {/* Section Header */}
        <div data-reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-4">
            What We Do
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Integrated Energy, Infrastructure &amp; Business Solutions
          </h2>
          <p className="text-lg text-slate-600">
            Malique Oil and Gas Ltd delivers professional services across a
            growing portfolio of industries — serving clients, contractors and
            strategic partners nationwide.
          </p>
        </div>

        {/* Division Cards */}
        <div data-reveal-group className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {divisions.map((division) => (
            <div
              key={division.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl gradient-amber flex items-center justify-center mb-4 shadow-md">
                <division.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">
                {division.name}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {division.description}
              </p>
            </div>
          ))}

          {/* CTA Card */}
          <div className="rounded-2xl gradient-navy p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Want to work with us?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Request a quotation or explore our full service capabilities.
              </p>
            </div>
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-500 hover:text-amber-400 transition-colors"
            >
              Explore Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
