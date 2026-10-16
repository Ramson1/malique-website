import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export function CTA() {
  return (
    <section className="section-padding gradient-navy relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-amber-600 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative text-center">
        <h2 data-reveal className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Running Low on Gas?
          <br />
          <span className="text-gradient-amber">Order Now, We&apos;ll Be Right There</span>
        </h2>
        <p data-reveal className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
          Don&apos;t let an empty cylinder interrupt your cooking. Place your order
          online and get fast delivery to your doorstep.
        </p>

        <div data-reveal className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/order"
            className="shine inline-flex items-center gap-2 h-14 px-8 rounded-xl bg-amber-600 text-white text-lg font-semibold hover:bg-amber-700 transition-all shadow-lg shadow-amber-600/25 hover:scale-105 active:scale-95"
          >
            Order Online
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="tel:+2349031628721"
            className="inline-flex items-center gap-2 h-14 px-8 rounded-xl border border-slate-600 text-white text-lg font-medium hover:bg-white/5 hover:scale-105 active:scale-95 transition-all"
          >
            <Phone className="w-5 h-5" />
            Call to Order
          </a>
        </div>
      </div>
    </section>
  );
}
