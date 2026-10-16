import Link from "next/link";
import {
  ArrowRight,
  Truck,
  Shield,
  Clock,
  MapPin,
  Star,
  Radio,
} from "lucide-react";
import { HeroBackdrop } from "./hero-backdrop";

const stats = [
  { icon: Truck, value: "30 min", label: "Average delivery" },
  { icon: MapPin, value: "2 Branches", label: "Igboh Etche & Elelenwo" },
  { icon: Shield, value: "NMDPRA", label: "Certified & compliant" },
  { icon: Radio, value: "24/7", label: "Dispatch & support" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden gradient-navy">
      {/* Cinematic branded backdrop */}
      <HeroBackdrop />

      {/* Flickering ember glow behind the headline */}
      <div className="animate-flicker pointer-events-none absolute left-[6%] top-[24%] h-[32rem] w-[32rem] rounded-full bg-amber-500/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-amber-600/10 blur-[100px]" />

      {/* Message */}
      <div className="container-custom relative flex flex-1 items-center pb-8 pt-32 md:pt-36">
        <div className="max-w-3xl">
          {/* Glass badge */}
          <div className="animate-slide-up mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-medium tracking-wide text-slate-200">
              Proudly serving Rivers State — Igboh Etche &amp; Elelenwo
            </span>
          </div>

          {/* Headline — lines rise out of masked containers */}
          <h1 className="mb-7 text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
            <span className="block overflow-hidden pb-1">
              <span className="animate-line-rise block">Fueling Homes.</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span
                className="animate-line-rise text-shimmer-amber block"
                style={{ animationDelay: "200ms" }}
              >
                Empowering Lives.
              </span>
            </span>
          </h1>

          {/* Emotional promise */}
          <p
            className="animate-slide-up mb-10 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl"
            style={{ animationDelay: "500ms" }}
          >
            Every warm meal, every laugh around the family table, every
            business that can&apos;t afford to stop — it all begins with a
            flame you can trust. Malique brings premium LPG and integrated
            energy services to your doorstep, safely.
          </p>

          {/* CTAs */}
          <div
            className="animate-slide-up mb-12 flex flex-col gap-4 sm:flex-row sm:items-center"
            style={{ animationDelay: "650ms" }}
          >
            <Link
              href="/order"
              className="shine inline-flex items-center justify-center gap-2 h-14 px-9 rounded-full bg-amber-600 text-white text-lg font-semibold hover:bg-amber-500 transition-all shadow-xl shadow-amber-600/30 active:scale-95"
            >
              Order Gas Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 h-14 px-9 rounded-full border border-white/20 bg-white/5 text-white text-lg font-medium backdrop-blur-md hover:bg-white/10 hover:border-white/40 transition-all"
            >
              Explore Our Services
            </Link>
          </div>

          {/* Social proof */}
          <div
            className="animate-slide-up flex flex-wrap items-center gap-3"
            style={{ animationDelay: "800ms" }}
          >
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-amber-500 fill-amber-500"
                />
              ))}
            </div>
            <p className="text-sm text-slate-400">
              Trusted by homes, hotels &amp; businesses across Rivers State
            </p>
          </div>
        </div>
      </div>

      {/* Glass stats bar */}
      <div className="container-custom relative pb-16 lg:pb-20">
        <div
          className="animate-slide-up grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl md:grid-cols-4"
          style={{ animationDelay: "950ms" }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex items-center gap-3.5 bg-navy-900/70 p-5 transition-colors duration-300 hover:bg-navy-900/40"
            >
              <div className="flex w-11 h-11 shrink-0 items-center justify-center rounded-full bg-amber-500/15 border border-amber-500/30 transition-transform duration-300 group-hover:scale-110">
                <stat.icon className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <div className="text-lg font-bold text-white leading-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
          Scroll to explore
        </span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/20 pt-1.5">
          <span className="animate-scrolldot h-2 w-1 rounded-full bg-amber-500" />
        </span>
      </div>
    </section>
  );
}
