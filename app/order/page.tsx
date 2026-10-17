"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MapPin,
  ShoppingCart,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  LocateFixed,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api/client";
import { Skeleton, SkeletonProductGrid } from "@/components/skeleton";

interface Branch {
  id: string;
  name: string;
  address: string;
  city?: string;
  latitude?: number | null;
  longitude?: number | null;
  deliveryRadiusKm?: string | number;
}

interface CatalogOption {
  sizeKg: number;
  price: number;
}

interface CatalogProduct {
  id: string;
  name: string;
  category: string; // refill | new_cylinder | accessory
  description?: string | null;
  imageUrl?: string | null;
  options: CatalogOption[];
}

interface CartItem {
  productId: string;
  productName: string;
  sizeKg: number;
  quantity: number;
  unitPrice: number;
  isRefill: boolean;
}

const STEPS = ["Select Branch", "Choose Products", "Delivery Details", "Payment", "Confirm"] as const;

// Maps ?product= keys from the website product cards to catalog categories
const PRODUCT_KEY_TO_CATEGORY: Record<string, string> = {
  refill: "refill",
  new: "new_cylinder",
  accessories: "accessory",
};

const CATEGORY_TITLES: Record<string, string> = {
  refill: "Cylinder Refills",
  new_cylinder: "New Cylinders",
  accessory: "Accessories",
};

const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Preview only — the server always recomputes the authoritative fee.
function previewDeliveryFee(
  branch: Branch | undefined,
  lat: number | null,
  lng: number | null
): { fee: number | null; error?: string; note?: string } {
  if (!branch) return { fee: null };
  const bLat = Number(branch.latitude);
  const bLng = Number(branch.longitude);
  if (!Number.isFinite(bLat) || !Number.isFinite(bLng) || !bLat || !bLng) {
    return { fee: 1500, note: "Flat delivery fee for this branch" };
  }
  if (lat == null || lng == null) {
    return { fee: null, note: "Drop your location pin (or continue) to see the exact zone fee" };
  }
  const km = haversineKm(bLat, bLng, lat, lng);
  const radius = Number(branch.deliveryRadiusKm ?? 25) || 25;
  if (km > radius) {
    return { fee: null, error: `Your pin is ~${km.toFixed(1)}km away — outside this branch's ${radius}km service area` };
  }
  const fee = km <= 10 ? 1000 : km <= 25 ? 2500 : 3500;
  return { fee, note: `~${km.toFixed(1)}km from the branch` };
}

function loadPaystackScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject();
    if (window.PaystackPop) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(
      "script[src='https://js.paystack.co/v1/inline.js']"
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject());
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.body.appendChild(script);
  });
}

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

function OrderWizard() {
  const [step, setStep] = useState(0);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [catalog, setCatalog] = useState<CatalogProduct[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryPhone, setDeliveryPhone] = useState("");
  const [deliveryLat, setDeliveryLat] = useState<number | null>(null);
  const [deliveryLng, setDeliveryLng] = useState<number | null>(null);
  const [locating, setLocating] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "pod">("pod");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const deepLinkHandled = useRef(false);
  const repeatHandled = useRef(false);

  // Pending deep-link / repeat selection applied once a branch + catalog exist
  const pendingAdd = useRef<{ category?: string; sizeKg?: number; itemKey?: string } | null>(null);
  const pendingRepeatItems = useRef<{ productId: string; sizeKg: number; quantity: number }[] | null>(null);

  useEffect(() => {
    api
      .get<Branch[]>("/branches")
      .then((data) => setBranches(Array.isArray(data) ? data : []))
      .catch(() => setError("Could not load branches. Please refresh."));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 3500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // Deep links from the website product cards: /order?product=refill&kg=12.5
  useEffect(() => {
    if (deepLinkHandled.current) return;
    const productKey = searchParams.get("product");
    if (!productKey) return;
    deepLinkHandled.current = true;
    const kgParam = searchParams.get("kg");
    const itemParam = searchParams.get("item");
    pendingAdd.current = {
      category: PRODUCT_KEY_TO_CATEGORY[productKey],
      sizeKg: kgParam ? Number(kgParam) : undefined,
      itemKey: itemParam || undefined,
    };
  }, [searchParams]);

  // Re-order: /order?repeat=<orderId> prefills branch + items from the order
  useEffect(() => {
    const repeatId = searchParams.get("repeat");
    if (!repeatId || repeatHandled.current) return;
    repeatHandled.current = true;
    if (!user) {
      window.location.href = `/login?redirect=/order%3Frepeat%3D${repeatId}`;
      return;
    }
    api
      .get<any>(`/orders/${repeatId}`)
      .then((order) => {
        setSelectedBranch(order.branchId);
        const addr = order.delivery?.deliveryAddress || order.deliveryAddress;
        if (addr) setDeliveryAddress(addr);
        pendingRepeatItems.current = (order.items || []).map((i: any) => ({
          productId: i.productId,
          sizeKg: Number(i.sizeKg),
          quantity: i.quantity,
        }));
        if (order.branchId) {
          api
            .get<CatalogProduct[]>(`/catalog?branchId=${order.branchId}`)
            .then((data) => {
              setCatalog(data);
              applyRepeat(data);
              setToast("Re-order loaded — confirm prices and details below.");
            })
            .catch(() => setCatalogLoading(false));
        }
      })
      .catch(() => setToast("Could not load that order for re-order."));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, user]);

  const applyRepeat = (items: CatalogProduct[]) => {
    const wanted = pendingRepeatItems.current;
    if (!wanted) return;
    pendingRepeatItems.current = null;
    const next: CartItem[] = [];
    for (const w of wanted) {
      const product = items.find((p) => p.id === w.productId);
      const option = product?.options.find((o) => Number(o.sizeKg) === w.sizeKg);
      if (product && option) {
        next.push({
          productId: product.id,
          productName: product.name,
          sizeKg: Number(option.sizeKg),
          quantity: w.quantity,
          unitPrice: Number(option.price),
          isRefill: product.category === "refill",
        });
      }
    }
    if (next.length) {
      setCart(next);
      setStep(1);
    }
  };

  const selectBranch = useCallback(
    (branchId: string) => {
      setSelectedBranch(branchId);
      setStep(1);
      setCatalogLoading(true);
      setCatalog([]);
      api
        .get<CatalogProduct[]>(`/catalog?branchId=${branchId}`)
        .then((data) => {
          setCatalog(data);
          applyPendingAdd(data);
        })
        .catch(() => setError("Could not load product prices."))
        .finally(() => setCatalogLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const applyPendingAdd = (items: CatalogProduct[]) => {
    const pending = pendingAdd.current;
    if (!pending) return;
    pendingAdd.current = null;
    let product: CatalogProduct | undefined;
    if (pending.itemKey) {
      product = items.find((p) => p.name.toLowerCase().includes(pending.itemKey!.toLowerCase()));
    }
    if (!product && pending.category) {
      product = items.find((p) => p.category === pending.category);
    }
    if (!product) return;
    const option =
      pending.sizeKg != null
        ? product.options.find((o) => String(o.sizeKg) === String(pending.sizeKg))
        : product.options[0];
    if (option) addToCart(product, Number(option.sizeKg), Number(option.price));
  };

  function addToCart(product: CatalogProduct, sizeKg: number, price: number) {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.productId === product.id && item.sizeKg === sizeKg
      );
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id && item.sizeKg === sizeKg
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          sizeKg,
          quantity: 1,
          unitPrice: price,
          isRefill: product.category === "refill",
        },
      ];
    });
  }

  function updateQuantity(productId: string, sizeKg: number, delta: number) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId && item.sizeKg === sizeKg
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      setToast("Geolocation is not supported on this browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setDeliveryLat(pos.coords.latitude);
        setDeliveryLng(pos.coords.longitude);
        setLocating(false);
        setToast("Location captured — delivery fee updated.");
      },
      () => {
        setLocating(false);
        setToast("Could not get your location. You can still order by address.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const activeBranch = branches.find((b) => b.id === selectedBranch);
  const feePreview = previewDeliveryFee(activeBranch, deliveryLat, deliveryLng);
  const deliveryFee = feePreview.fee ?? 1500; // estimate; server recomputes
  const total = subtotal + (feePreview.fee == null ? 0 : deliveryFee);

  async function placeOrder() {
    setLoading(true);
    setError("");
    try {
      if (!user) {
        window.location.href = `/login?redirect=/order${searchParams.toString() ? `%3F${searchParams.toString()}` : ""}`;
        return;
      }

      const orderData = {
        branchId: selectedBranch,
        orderType: "online",
        items: cart.map((item) => ({
          productId: item.productId,
          sizeKg: item.sizeKg,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          isRefill: item.isRefill,
        })),
        deliveryAddress,
        deliveryPhone,
        ...(deliveryLat != null ? { deliveryLat } : {}),
        ...(deliveryLng != null ? { deliveryLng } : {}),
        // "Pay on delivery" is cash/POS collected at the door; PaymentMethodType
        // has no "pod" value, so cash is the accurate persisted enum.
        paymentMethod: paymentMethod === "pod" ? "cash" : "online",
      };

      const order = await api.post<any>("/orders", orderData);
      setPlacedOrderId(order.id);

      if (paymentMethod === "online") {
        const init = await api.post<{ authorization_url: string; reference: string }>(
          "/payments/init",
          { orderId: order.id }
        );
        await loadPaystackScript();
        const popup = window.PaystackPop!.setup({
          key: PAYSTACK_PUBLIC_KEY,
          email: user.email,
          amount: Math.round(Number(order.totalAmount) * 100),
          ref: init.reference,
          callback: async () => {
            try {
              await api.post("/payments/verify", { reference: init.reference });
            } catch {
              // Webhook will settle it server-side; the tracking page shows status.
            }
            window.location.href = `/dashboard/orders/${order.id}`;
          },
        });
        popup.openIframe();
        setLoading(false);
        return; // stay on the wizard until the Paystack callback fires
      }

      setOrderPlaced(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not place your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-navy-900 mb-3">Order Placed!</h1>
          <p className="text-slate-600 mb-8">
            Your order has been received and is being processed. You&apos;ll receive
            a notification when it&apos;s confirmed.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href={placedOrderId ? `/dashboard/orders/${placedOrderId}` : "/dashboard/orders"}
              className="inline-flex items-center justify-center h-11 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition-colors"
            >
              Track Your Order
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center h-11 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const grouped = ["refill", "new_cylinder", "accessory"]
    .map((cat) => ({ category: cat, products: catalog.filter((p) => p.category === cat) }))
    .filter((g) => g.products.length > 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Malique Oil and Gas logo" className="w-8 h-8 rounded-full" />
            <span className="text-base font-bold text-navy-900">Malique</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ShoppingCart className="w-4 h-4" />
            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} items</span>
          </div>
        </div>
      </header>

      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-navy-900 text-white text-sm shadow-lg">
          {toast}
        </div>
      )}

      {/* Progress Steps */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2 shrink-0">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    i < step
                      ? "bg-green-500 text-white"
                      : i === step
                      ? "bg-amber-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:inline ${
                    i <= step ? "text-navy-900" : "text-slate-400"
                  }`}
                >
                  {s}
                </span>
                {i < STEPS.length - 1 && (
                  <div
                    className={`w-8 h-0.5 ${i < step ? "bg-green-500" : "bg-slate-200"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 flex items-start gap-2 p-4 rounded-xl border border-red-200 bg-red-50 text-sm text-red-700 max-w-lg">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 0: Select Branch */}
        {step === 0 && (
          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Select Your Branch</h2>
            <p className="text-sm text-slate-500 mb-6">
              Choose the branch closest to your delivery address.
            </p>
            {branches.length === 0 ? (
              <div aria-hidden className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-3">
                {branches.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => selectBranch(branch.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                      selectedBranch === branch.id
                        ? "border-amber-500 bg-amber-50 ring-2 ring-amber-500/20"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-navy-900 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-navy-900">{branch.name}</div>
                      <div className="text-sm text-slate-500">{branch.address}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 1: Choose Products */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Choose Products</h2>
            <p className="text-sm text-slate-500 mb-6">
              Live prices for {activeBranch?.name || "your branch"}.
            </p>

            {catalogLoading ? (
              <SkeletonProductGrid count={6} />
            ) : (
              grouped.map((group) => (
                <div key={group.category} className="mb-8">
                  <h3 className="text-lg font-semibold text-navy-900 mb-4">
                    {CATEGORY_TITLES[group.category] ?? group.category}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {group.products.map((product) =>
                      product.options.map((size) => {
                        const inCart = cart.find(
                          (c) => c.productId === product.id && c.sizeKg === Number(size.sizeKg)
                        );
                        return (
                          <div
                            key={`${product.id}-${size.sizeKg}`}
                            className="rounded-xl border border-slate-200 bg-white p-4"
                          >
                            <div className="text-center mb-3">
                              <div className="text-sm font-semibold text-navy-900 leading-tight">
                                {product.name}
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5">
                                {Number(size.sizeKg) > 0 ? `${size.sizeKg} kg` : "Accessory"}
                              </div>
                              <div className="mt-1 text-sm font-bold text-amber-600">
                                ₦{Number(size.price).toLocaleString()}
                              </div>
                              {product.category === "refill" && Number(size.sizeKg) > 0 && (
                                <div className="text-[11px] text-slate-400">
                                  ₦{Math.round(Number(size.price) / Number(size.sizeKg)).toLocaleString()}/kg
                                </div>
                              )}
                            </div>
                            {inCart ? (
                              <div className="flex items-center justify-between gap-2">
                                <button
                                  onClick={() =>
                                    updateQuantity(product.id, Number(size.sizeKg), -1)
                                  }
                                  className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-sm font-bold text-navy-900 w-6 text-center">
                                  {inCart.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(product.id, Number(size.sizeKg), 1)
                                  }
                                  className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center hover:bg-amber-700 transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() =>
                                  addToCart(product, Number(size.sizeKg), Number(size.price))
                                }
                                className="w-full h-8 rounded-lg bg-slate-100 text-sm font-medium text-navy-900 hover:bg-amber-600 hover:text-white transition-colors"
                              >
                                Add
                              </button>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              ))
            )}

            {/* Cart Summary */}
            {cart.length > 0 && (
              <div className="sticky bottom-4 mt-6 p-4 rounded-xl bg-navy-900 text-white shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                  </span>
                  <span className="text-lg font-bold">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="w-full h-10 rounded-lg bg-amber-600 text-sm font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(0)}
                className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-navy-900"
              >
                <ArrowLeft className="w-4 h-4" />
                Change Branch
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Delivery Details */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Delivery Details</h2>
            <p className="text-sm text-slate-500 mb-6">
              Where should we deliver your gas?
            </p>

            <div className="space-y-4 max-w-lg">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Delivery Address
                </label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter your full delivery address"
                  rows={3}
                  required
                  className="flex w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={deliveryPhone}
                  onChange={(e) => setDeliveryPhone(e.target.value)}
                  placeholder="0801 234 5678"
                  required
                  className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-navy-900">Drop-off location</div>
                    <div className="text-xs text-slate-500">
                      {deliveryLat != null
                        ? `Pinned: ${deliveryLat.toFixed(5)}, ${(deliveryLng ?? 0).toFixed(5)}`
                        : "Optional, but it locks your exact zone delivery fee."}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={useMyLocation}
                    disabled={locating}
                    className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-amber-600 text-amber-700 text-xs font-semibold hover:bg-amber-50 transition-colors disabled:opacity-50"
                  >
                    {locating ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <LocateFixed className="w-3.5 h-3.5" />
                    )}
                    Use my location
                  </button>
                </div>
                {(feePreview.note || feePreview.error) && (
                  <div
                    className={`mt-2 text-xs ${
                      feePreview.error ? "text-red-600 font-medium" : "text-slate-500"
                    }`}
                  >
                    {feePreview.error ?? feePreview.note}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-sm max-w-lg p-3 rounded-xl bg-slate-100">
                <span className="text-slate-600">Estimated delivery fee</span>
                <span className="font-semibold text-navy-900">
                  {feePreview.fee == null
                    ? "Calculated at checkout"
                    : `₦${feePreview.fee.toLocaleString()}`}
                </span>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-navy-900"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!deliveryAddress || !deliveryPhone}
                className="inline-flex items-center gap-1 h-10 px-6 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Payment Method</h2>
            <p className="text-sm text-slate-500 mb-6">
              How would you like to pay?
            </p>

            <div className="space-y-3 max-w-lg">
              <button
                onClick={() => setPaymentMethod("pod")}
                className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all w-full ${
                  paymentMethod === "pod"
                    ? "border-amber-500 bg-amber-50 ring-2 ring-amber-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  <span className="text-lg">💵</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-navy-900">Pay on Delivery</div>
                  <div className="text-xs text-slate-500">
                    Cash, POS, or Bank Transfer when rider arrives
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  if (!PAYSTACK_PUBLIC_KEY) {
                    setToast("Online card payment is not configured yet. Pay on delivery works now.");
                    return;
                  }
                  setPaymentMethod("online");
                }}
                className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all w-full ${
                  paymentMethod === "online"
                    ? "border-amber-500 bg-amber-50 ring-2 ring-amber-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                } ${!PAYSTACK_PUBLIC_KEY ? "opacity-60" : ""}`}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                  <span className="text-lg">💳</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-navy-900">Pay Online</div>
                  <div className="text-xs text-slate-500">
                    {PAYSTACK_PUBLIC_KEY
                      ? "Card, Bank Transfer, or USSD via Paystack"
                      : "Card checkout coming soon — configure Paystack"}
                  </div>
                </div>
              </button>
            </div>

            {/* Order Summary */}
            <div className="mt-8 p-4 rounded-xl border border-slate-200 bg-white max-w-lg">
              <h3 className="text-sm font-semibold text-navy-900 mb-3">Order Summary</h3>
              <div className="space-y-2 mb-3">
                {cart.map((item) => (
                  <div key={`${item.productId}-${item.sizeKg}`} className="flex justify-between text-sm">
                    <span className="text-slate-600">
                      {item.productName} ({item.sizeKg}kg) x{item.quantity}
                    </span>
                    <span className="font-medium text-navy-900">
                      ₦{(item.unitPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-100 pt-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="text-navy-900">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Delivery Fee</span>
                  <span className="text-navy-900">
                    {feePreview.fee == null ? "Zone-based" : `₦${deliveryFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-100">
                  <span className="text-navy-900">Total</span>
                  <span className="text-amber-600">
                    ₦{total.toLocaleString()}
                    {feePreview.fee == null && " +fee"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 pt-1">
                  Final prices and zone fee are confirmed by the server when you place the order.
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-navy-900"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-1 h-10 px-6 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition-colors"
              >
                Review Order
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Review & Confirm</h2>
            <p className="text-sm text-slate-500 mb-6">
              Please review your order before placing it.
            </p>

            <div className="space-y-4 max-w-lg">
              {/* Branch */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="text-xs font-medium text-slate-500 uppercase mb-1">Branch</div>
                <div className="text-sm font-semibold text-navy-900">
                  {activeBranch?.name}
                </div>
              </div>

              {/* Items */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="text-xs font-medium text-slate-500 uppercase mb-3">Items</div>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={`${item.productId}-${item.sizeKg}`} className="flex justify-between text-sm">
                      <span className="text-slate-700">
                        {item.productName} — {item.sizeKg}kg x{item.quantity}
                      </span>
                      <span className="font-medium">₦{(item.unitPrice * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="text-xs font-medium text-slate-500 uppercase mb-1">Deliver To</div>
                <div className="text-sm font-semibold text-navy-900">{deliveryAddress}</div>
                <div className="text-sm text-slate-500">{deliveryPhone}</div>
                {feePreview.error && (
                  <div className="mt-2 text-xs font-medium text-red-600">{feePreview.error}</div>
                )}
              </div>

              {/* Payment */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="text-xs font-medium text-slate-500 uppercase mb-1">Payment</div>
                <div className="text-sm font-semibold text-navy-900">
                  {paymentMethod === "pod" ? "Pay on Delivery" : "Online Payment (Paystack)"}
                </div>
              </div>

              {/* Total */}
              <div className="p-4 rounded-xl bg-navy-900 text-white">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-amber-500">
                    ₦{total.toLocaleString()}
                    {feePreview.fee == null && " +fee"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-navy-900"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={placeOrder}
                disabled={loading || cart.length === 0 || !selectedBranch}
                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-amber-600 text-white text-sm font-bold hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-600/25"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Place Order
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50">
          <div className="mx-auto max-w-3xl px-4 py-12">
            <Skeleton className="mb-2 h-8 w-56" />
            <Skeleton className="mb-8 h-4 w-72" />
            <SkeletonProductGrid count={6} />
          </div>
        </div>
      }
    >
      <OrderWizard />
    </Suspense>
  );
}
