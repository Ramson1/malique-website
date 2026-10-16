"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, Package, Wrench, ArrowRight } from "lucide-react";

const products = [
  {
    key: "refill",
    icon: Flame,
    title: "Gas Cylinder Refill",
    description:
      "Bring your empty cylinder or order a refill for delivery. Available in 3kg, 5kg, 6kg, 12.5kg, 25kg, and 50kg sizes.",
    sizes: ["3 kg", "5 kg", "6 kg", "12.5 kg", "25 kg", "50 kg"],
    popular: "12.5 kg",
    cta: "Order Refill",
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
  },
  {
    key: "new",
    icon: Package,
    title: "New Cylinder Purchase",
    description:
      "Brand new LPG cylinders in all standard sizes. Comes pre-filled and ready to use with your cooker.",
    sizes: ["3 kg", "5 kg", "6 kg", "12.5 kg", "25 kg", "50 kg"],
    popular: "12.5 kg",
    cta: "Buy Cylinder",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    key: "accessories",
    icon: Wrench,
    title: "Accessories & Parts",
    description:
      "Gas hoses, regulators, clips, cylinder racks, and other accessories. Everything you need for safe gas usage.",
    sizes: ["Hoses", "Regulators", "Clips", "Racks"],
    popular: null,
    cta: "Browse Accessories",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
  },
];

function itemHref(productKey: string, size: string) {
  if (productKey === "accessories") {
    return `/order?product=accessories&item=${encodeURIComponent(size)}`;
  }
  const kg = size.replace(/\s*kg$/i, "").trim();
  return `/order?product=${productKey}&kg=${encodeURIComponent(kg)}`;
}

export function Products() {
  const router = useRouter();

  return (
    <section id="products" className="section-padding bg-slate-50">
      <div className="container-custom">
        {/* Section Header */}
        <div data-reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-4">
            Our Products
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Everything You Need for Cooking Gas
          </h2>
          <p className="text-lg text-slate-600">
            From cylinder refills to brand new cylinders and accessories — we
            have it all, delivered to your doorstep.
          </p>
        </div>

        {/* Product Cards */}
        <div data-reveal-group className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.title}
              onClick={() => router.push(`/order?product=${product.key}`)}
              className={`cursor-pointer rounded-2xl border p-8 ${product.color} hover:shadow-lg transition-all duration-300 group`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6`}
              >
                <product.icon className={`w-6 h-6 ${product.iconColor}`} />
              </div>

              <h3 className="text-xl font-bold text-navy-900 mb-3">
                <Link
                  href={`/order?product=${product.key}`}
                  onClick={(e) => e.stopPropagation()}
                  className="hover:text-amber-600 transition-colors"
                >
                  {product.title}
                </Link>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Sizes — each one jumps straight into the order with that item */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.sizes.map((size) => (
                  <Link
                    key={size}
                    href={itemHref(product.key, size)}
                    onClick={(e) => e.stopPropagation()}
                    title={`Order ${size} — Malique Oil and Gas`}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      size === product.popular
                        ? "bg-amber-600 text-white hover:bg-amber-700"
                        : "bg-white text-slate-700 border border-slate-200 hover:border-amber-500 hover:text-amber-600"
                    }`}
                  >
                    {size}
                    {size === product.popular && " ★"}
                  </Link>
                ))}
              </div>

              <Link
                href={`/order?product=${product.key}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 group-hover:text-amber-600 transition-colors"
              >
                {product.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
