"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Flip to the dark brand navbar once the hero + marquee have scrolled past
  useEffect(() => {
    function onScroll() {
      const ticker = document.getElementById("ticker");
      // Turn dark when the marquee's bottom edge rises above the floating pill
      const anchorBottom = ticker
        ? ticker.getBoundingClientRect().bottom
        : window.innerHeight;
      setScrolled(anchorBottom < 96);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/hse", label: "HSE" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-4 md:top-6 left-1/2 z-50 w-[92%] max-w-6xl -translate-x-1/2 md:w-[80%]">
      {/* Pill bar */}
      <div
        className={`flex items-center justify-between gap-2 rounded-full border px-4 py-2 backdrop-blur-xl transition-all duration-500 md:px-5 ${
          scrolled
            ? "border-white/10 bg-navy-900/90 shadow-xl shadow-navy-900/30"
            : "border-slate-100 bg-white/90 shadow-xl shadow-navy-900/10"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="Malique Oil and Gas logo"
            className="w-9 h-9 rounded-full shadow-md group-hover:shadow-lg transition-shadow"
          />
          <div className="flex flex-col">
            <span
              className={`text-lg font-bold leading-tight transition-colors duration-500 ${
                scrolled ? "text-white" : "text-navy-900"
              }`}
            >
              Malique
            </span>
            <span
              className={`text-[10px] font-medium uppercase tracking-wider leading-none transition-colors duration-500 ${
                scrolled ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Oil &amp; Gas
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                scrolled
                  ? "text-slate-200 hover:bg-white/10 hover:text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-navy-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-2.5">
          <a
            href="tel:+2349031628721"
            className={`flex items-center gap-1.5 h-10 px-4 rounded-full border text-sm font-medium transition-colors ${
              scrolled
                ? "border-white/20 text-slate-200 hover:bg-white/10 hover:text-white"
                : "border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-navy-900"
            }`}
          >
            <Phone className="w-4 h-4" />
            Call Us
          </a>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-amber-600 text-sm font-medium text-white hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-600/25 active:scale-95 transition-all"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2.5 rounded-full transition-colors ${
            scrolled ? "hover:bg-white/10" : "hover:bg-slate-100"
          }`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className={`w-5 h-5 ${scrolled ? "text-white" : "text-slate-700"}`} />
          ) : (
            <Menu className={`w-5 h-5 ${scrolled ? "text-white" : "text-slate-700"}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu — detached rounded card below the pill */}
      {mobileOpen && (
        <div
          className={`lg:hidden mt-2.5 rounded-3xl border backdrop-blur-xl shadow-xl p-3 animate-fade-in transition-colors duration-500 ${
            scrolled
              ? "border-white/10 bg-navy-900/95 shadow-navy-900/30"
              : "border-slate-100 bg-white/95 shadow-navy-900/10"
          }`}
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-slate-200 hover:bg-white/10"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div
              className={`mt-2 pt-3 border-t flex flex-col gap-2 px-1 ${
                scrolled ? "border-white/10" : "border-slate-100"
              }`}
            >
              <a
                href="tel:+2349031628721"
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium ${
                  scrolled ? "text-slate-300" : "text-slate-600"
                }`}
              >
                <Phone className="w-4 h-4" />
                +234 903 162 8721
              </a>
              <Link
                href="/quote"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center h-11 rounded-full bg-amber-600 text-sm font-medium text-white hover:bg-amber-700 transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
