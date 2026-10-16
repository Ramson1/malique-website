import { Shield, Award, Clock, ThumbsUp, Flame, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "NMDPRA Certified",
    description:
      "Fully licensed and compliant with all Nigerian Midstream and Downstream Petroleum Regulatory Authority standards.",
  },
  {
    icon: Award,
    title: "Accurate Filling",
    description:
      "Every cylinder is weighed on calibrated electronic scales. What you pay for is exactly what you get — no shortfilling.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description:
      "Average delivery time of 30 minutes within our delivery zones. Track your rider in real-time.",
  },
  {
    icon: ThumbsUp,
    title: "Transparent Pricing",
    description:
      "Same fair prices across all branches. No hidden charges. See exactly what you're paying before you order.",
  },
  {
    icon: Flame,
    title: "Quality Assured",
    description:
      "Premium LPG sourced from certified suppliers. Every batch meets SON standards for purity and safety.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description:
      "Dedicated support team ready to help. Loyalty rewards for repeat customers. Your satisfaction is our priority.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div data-reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-4">
            Why Malique
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Trusted by Thousands of Homes
          </h2>
          <p className="text-lg text-slate-600">
            We don&apos;t just deliver gas — we deliver peace of mind. Here&apos;s
            why families and businesses across Rivers State choose Malique.
          </p>
        </div>

        {/* Features Grid */}
        <div data-reveal-group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 p-6 rounded-2xl hover:bg-slate-50 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <feature.icon className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-navy-900 mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
