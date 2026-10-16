"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Global scroll-reveal engine.
 * Watches every [data-reveal] element and every child of a
 * [data-reveal-group] container, adding .reveal-visible when they
 * enter the viewport. Group children are staggered automatically
 * (80ms apart) via the --reveal-delay CSS custom property.
 * Re-scans on route changes so newly rendered pages animate too.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const revealed = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || revealed.has(entry.target)) continue;
          revealed.add(entry.target);

          if (entry.target.hasAttribute("data-reveal")) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }

          if (entry.target.hasAttribute("data-reveal-group")) {
            Array.from(entry.target.children).forEach((child, i) => {
              const delay = Math.min(i * 80, 640);
              (child as HTMLElement).style.setProperty(
                "--reveal-delay",
                `${delay}ms`
              );
              child.classList.add("reveal-visible");
              // Clean up the stagger delay so later transitions
              // (e.g. hover effects) stay instant
              window.setTimeout(
                () =>
                  (child as HTMLElement).style.removeProperty("--reveal-delay"),
                1400 + delay
              );
            });
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe on the next frame so the new route is fully committed
    const raf = requestAnimationFrame(() => {
      document
        .querySelectorAll("[data-reveal], [data-reveal-group]")
        .forEach((el) => observer.observe(el));
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
