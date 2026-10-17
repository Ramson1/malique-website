import { Flame } from "lucide-react";
import { DIVISION_NAMES as divisions } from "@/lib/divisions";

/** Infinite marquee of everything Malique does — pauses on hover. */
export function Ticker() {
  const items = [...divisions, ...divisions];
  return (
    <div id="ticker" className="marquee-wrap overflow-hidden border-y border-amber-700/50 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 py-3.5">
      <div className="animate-marquee flex w-max items-center">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-5 whitespace-nowrap px-6 text-xs font-extrabold uppercase tracking-[0.22em] text-navy-900"
          >
            {item}
            <Flame className="w-3.5 h-3.5 shrink-0 text-navy-800" />
          </span>
        ))}
      </div>
    </div>
  );
}
