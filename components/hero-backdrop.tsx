"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

const scenes = [
  {
    src: "/hero-station.png",
    caption: "Our filling station",
    location: "Igboh Etche, Etche LGA",
  },
  {
    src: "/hero-customer.png",
    caption: "Customers served daily",
    location: "Refills & cylinder exchange",
  },
  {
    src: "/hero-staff.png",
    caption: "Our trained team",
    location: "Safety-first operations",
  },
];

/**
 * Full-bleed cinematic hero backdrop — the branded scenes crossfade
 * with a slow Ken Burns zoom, washed with navy gradients so the
 * headline stays perfectly readable on top.
 */
export function HeroBackdrop() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((prev) => (prev + 1) % scenes.length),
      8000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Slideshow */}
      {scenes.map((scene, index) => (
        <div
          key={scene.src}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={scene.src}
            alt={scene.caption}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover ${
              index === active ? "animate-kenburns" : ""
            }`}
          />
        </div>
      ))}

      {/* Cinematic navy wash — dark on the left for text, revealing the photo on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-navy-900/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/10 to-navy-900/50" />

      {/* Floating live scene card */}
      <div className="absolute right-6 top-1/2 hidden w-56 -translate-y-1/2 lg:block">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-500">
            0{active + 1} / 0{scenes.length}
          </div>
          <div className="mb-1 text-sm font-bold text-white">
            {scenes[active].caption}
          </div>
          <div className="mb-4 flex items-center gap-1.5 text-xs font-medium text-white">
            <MapPin className="w-3 h-3 shrink-0 text-amber-500" />
            {scenes[active].location}
          </div>
          <div className="flex items-center gap-1.5">
            {scenes.map((scene, index) => (
              <button
                key={scene.src}
                onClick={() => setActive(index)}
                aria-label={`Show ${scene.caption}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === active
                    ? "w-7 bg-amber-500"
                    : "w-1.5 bg-white/25 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
