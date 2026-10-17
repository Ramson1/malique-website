import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { BRANCHES, TEL } from "@/lib/company";

const branches = BRANCHES;

export function Branches() {
  return (
    <section id="branches" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div data-reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-4">
            Our Branches
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Find Us Near You
          </h2>
          <p className="text-lg text-slate-600">
            Two locations across Rivers State for convenient access. Visit any
            branch or order online for home delivery.
          </p>
        </div>

        {/* Branch Cards */}
        <div data-reveal-group className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {branches.map((branch) => (
            <div
              key={branch.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Branch Name */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-lg font-bold text-navy-900">
                  {branch.name} Branch
                </h3>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-600">{branch.address}</span>
                </div>
                {branch.phones.map((phone) => (
                  <div key={phone} className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <a
                      href={TEL(phone)}
                      className="text-sm text-slate-600 hover:text-amber-600 transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-sm text-slate-600">{branch.hours}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Directions
                </a>
                <a
                  href={TEL(branch.phones[0])}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 rounded-lg bg-navy-900 text-xs font-medium text-white hover:bg-navy-800 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Branch
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
