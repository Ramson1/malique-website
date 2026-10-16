import { Smartphone, UserCheck, Truck, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    step: "01",
    title: "Place Your Order",
    description:
      "Order online through our website or call your nearest branch. Choose your cylinder size and delivery address.",
    color: "bg-amber-500",
  },
  {
    icon: UserCheck,
    step: "02",
    title: "We Prepare Your Gas",
    description:
      "Our trained staff fills your cylinder to the exact weight, verified on calibrated scales. Safety checked every time.",
    color: "bg-blue-500",
  },
  {
    icon: Truck,
    step: "03",
    title: "Fast Delivery",
    description:
      "Our dispatch rider picks up your filled cylinder and delivers it to your doorstep. Track your delivery in real-time.",
    color: "bg-green-500",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Pay & Enjoy",
    description:
      "Pay online when you order, or pay on delivery via cash, POS, or bank transfer. Empty cylinder collected on delivery.",
    color: "bg-purple-500",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-slate-50">
      <div className="container-custom">
        {/* Section Header */}
        <div data-reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Gas Delivery in 4 Simple Steps
          </h2>
          <p className="text-lg text-slate-600">
            Getting your cooking gas delivered has never been easier. Here&apos;s
            how it works from order to delivery.
          </p>
        </div>

        {/* Steps */}
        <div data-reveal-group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-slate-200" />
              )}

              <div className="relative bg-white rounded-2xl border border-slate-200 p-6 text-center hover:shadow-lg transition-all duration-300">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center shadow-md">
                  {step.step}
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl ${step.color} bg-opacity-10 flex items-center justify-center mx-auto mb-5`}
                >
                  <step.icon className={`w-8 h-8 ${step.color.replace("bg-", "text-")}`} />
                </div>

                <h3 className="text-lg font-bold text-navy-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div data-reveal className="text-center mt-12">
          <a
            href="/order"
            className="shine inline-flex items-center gap-2 h-14 px-8 rounded-xl bg-amber-600 text-white text-lg font-semibold hover:bg-amber-700 transition-all shadow-lg shadow-amber-600/25 hover:scale-105 active:scale-95"
          >
            Start Your Order
          </a>
        </div>
      </div>
    </section>
  );
}
