import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { QuoteForm } from "@/components/quote-form";
import { Phone, MessageCircle, Clock, BadgeCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Request a Quote — Malique Oil and Gas Ltd",
  description:
    "Request a quotation for LPG supply, engineering works, procurement, transportation and other Malique Oil and Gas Ltd services. Fast response via WhatsApp or email.",
};

const steps = [
  {
    icon: Clock,
    title: "Tell us what you need",
    description:
      "Fill the enquiry form with your service, location and details.",
  },
  {
    icon: MessageCircle,
    title: "We respond fast",
    description:
      "Our team reviews your request and prepares a professional quotation.",
  },
  {
    icon: BadgeCheck,
    title: "Approve & we deliver",
    description:
      "Confirm the quote and we mobilise — on time and to standard.",
  },
];

export default function QuotePage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          section="Quote"
          title="Request a Quote"
          description="Service enquiries and quotations for every division — one simple form, responded to personally."
        />

        <section className="section-padding">
          <div className="container-custom">
            <div data-reveal-group className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Left: How it works */}
              <div className="lg:col-span-1 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-6">
                    How It Works
                  </h2>
                  <div className="space-y-6">
                    {steps.map((step, index) => (
                      <div key={step.title} className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl gradient-amber flex items-center justify-center shrink-0 shadow-md">
                          <step.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-navy-900">
                            {index + 1}. {step.title}
                          </h3>
                          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl gradient-navy p-6 text-white">
                  <h3 className="font-bold mb-2">Prefer to talk?</h3>
                  <p className="text-sm text-slate-300 mb-4">
                    Call our business desk directly for urgent or large-scale
                    requests.
                  </p>
                  <a
                    href="tel:+2349031628721"
                    className="flex items-center gap-2 text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +234 903 162 8721
                  </a>
                  <a
                    href="https://wa.me/2349031628721"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-2 text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Right: Form */}
              <div className="lg:col-span-2">
                <QuoteForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
