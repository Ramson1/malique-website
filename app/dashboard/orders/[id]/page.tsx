"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Phone,
  MapPin,
  Package,
  RefreshCw,
  CreditCard,
  ExternalLink,
  Bike,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api/client";
import { Skeleton, SkeletonList } from "@/components/skeleton";
import { FLW_PUBLIC_KEY, collectFlutterwavePayment } from "@/lib/flutterwave";
import { orderFollowupWhatsAppUrl } from "@/lib/whatsapp";
import {
  formatNaira,
  formatDate,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  ORDER_STATUSES,
  type OrderStatus,
} from "@/lib/format";

interface OrderDetail {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: string;
  paymentMethod?: string | null;
  subtotal: string | number;
  deliveryFee: string | number;
  discount: string | number;
  totalAmount: string | number;
  createdAt: string;
  deliveredAt?: string | null;
  notes?: string | null;
  branch?: { id: string; name: string; address?: string };
  items: {
    id: string;
    sizeKg: string | number;
    quantity: number;
    unitPrice: string | number;
    totalPrice: string | number;
    product?: { name: string; category: string } | null;
  }[];
  delivery?: {
    deliveryAddress: string;
    deliveryLat?: number | null;
    deliveryLng?: number | null;
    status?: string;
    rider?: { fullName: string; phone?: string | null } | null;
  } | null;
  payments?: { id: string; transactionRef?: string | null; status: string }[];
}

const FINAL_STATUSES: OrderStatus[] = ["delivered", "cancelled"];

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const orderId = params.id;
  const { user } = useAuth();

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  // Set only when a Flutterwave payment succeeds during THIS visit; triggers
  // the one-shot WhatsApp follow-up jump (never on plain page loads).
  const [justPaid, setJustPaid] = useState<{ reference: string } | null>(null);
  const waRedirectedRef = useRef(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchOrder = useCallback(async () => {
    try {
      const data = await api.get<OrderDetail>(`/orders/${orderId}`);
      setOrder(data);
      setNotFound(false);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (!user) return;
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Poll while the order is still moving; stop on final states.
  useEffect(() => {
    if (pollRef.current) clearInterval(pollRef.current);
    if (order && !FINAL_STATUSES.includes(order.status)) {
      pollRef.current = setInterval(() => fetchOrder(), 20000);
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [order, fetchOrder]);

  async function completePayment() {
    if (!order || !FLW_PUBLIC_KEY) return;
    setPaying(true);
    setError("");
    try {
      const init = await api.post<{ reference: string }>(
        "/payments/init",
        { orderId: order.id }
      );
      const res = await collectFlutterwavePayment({
        amount: Number(order.totalAmount),
        txRef: init.reference,
        email: user?.email ?? "",
        name: user?.fullName,
        phone: user?.phone,
        orderNumber: order.orderNumber,
      });
      if (res?.status === "successful") {
        try {
          await api.post("/payments/verify", { reference: init.reference });
        } catch {
          // Webhook settles it server-side; refresh shows the truth.
        }
        fetchOrder();
        setJustPaid({ reference: init.reference });
      } else if (res?.status) {
        setError("Payment was not completed — you can try again below.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start the payment.");
    } finally {
      setPaying(false);
    }
  }

  function paidFollowupUrl(reference: string) {
    if (!order) return "";
    return orderFollowupWhatsAppUrl({
      orderNumber: order.orderNumber,
      reference,
      items: order.items.map((i) => ({
        name: i.product?.name ?? "Item",
        sizeKg: i.sizeKg,
        quantity: i.quantity,
        lineTotal: i.totalPrice,
      })),
      subtotal: order.subtotal,
      deliveryFee: order.deliveryFee,
      total: order.totalAmount,
      customer: {
        name: user?.fullName,
        phone: user?.phone,
        email: user?.email,
      },
      deliveryAddress: order.delivery?.deliveryAddress ?? null,
      branchName: order.branch?.name ?? null,
    });
  }

  // Confirmation stays on screen for a beat, then the client is routed to the
  // company WhatsApp with the order + full details for instant follow-up.
  useEffect(() => {
    if (!justPaid || !order || waRedirectedRef.current) return;
    const url = paidFollowupUrl(justPaid.reference);
    const t = setTimeout(() => {
      waRedirectedRef.current = true;
      window.location.href = url;
    }, 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [justPaid, order]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-8 space-y-4">
          <Skeleton className="h-7 w-44" />
          <Skeleton className="mb-4 h-4 w-64" />
          <SkeletonList rows={1} />
          <SkeletonList rows={3} />
        </div>
      </div>
    );
  }

  if (notFound || !order) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center">
          <Package className="w-10 h-10 text-slate-300 mx-auto mb-4" />
          <h1 className="text-lg font-bold text-navy-900 mb-2">Order not found</h1>
          <p className="text-sm text-slate-500 mb-6">
            This order doesn&apos;t exist or belongs to another account.
          </p>
          <Link
            href="/dashboard/orders"
            className="inline-flex items-center justify-center h-10 px-6 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition-colors"
          >
            Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  const stepIndex = ORDER_STATUSES.indexOf(order.status);
  const needsPayment =
    order.paymentMethod === "online" &&
    order.paymentStatus !== "paid" &&
    order.status !== "cancelled";

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link
            href="/dashboard/orders"
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </Link>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Malique Oil and Gas logo" className="w-8 h-8 rounded-full" />
            <span className="text-base font-bold text-navy-900">Order {order.orderNumber}</span>
          </div>
          <span
            className={`ml-auto px-2.5 py-1 rounded-full text-xs font-medium ${
              ORDER_STATUS_COLORS[order.status] ?? "bg-slate-100 text-slate-600"
            }`}
          >
            {ORDER_STATUS_LABELS[order.status] ?? order.status}
          </span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {searchParams.get("verify") === "1" && (
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50 text-sm text-blue-800 max-w-2xl">
            Payment received — we&apos;re confirming it with Flutterwave now. This
            page updates automatically.
          </div>
        )}
        {justPaid && (
          <div className="p-4 rounded-xl border border-green-200 bg-green-50 text-sm text-green-800 max-w-2xl">
            Payment confirmed — opening WhatsApp so our team can follow up on
            your order right away.{" "}
            <a
              href={paidFollowupUrl(justPaid.reference)}
              className="font-semibold underline"
            >
              Open WhatsApp now
            </a>
          </div>
        )}
        {error && (
          <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-sm text-red-700 max-w-2xl">
            {error}
          </div>
        )}

        {/* Status stepper */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-semibold text-navy-900">Progress</h2>
            {!FINAL_STATUSES.includes(order.status) && (
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                <RefreshCw className="w-3 h-3" /> auto-refresh 20s
              </span>
            )}
          </div>
          {order.status === "cancelled" ? (
            <p className="text-sm text-red-600 mt-2">
              This order was cancelled{order.notes ? ` — ${order.notes}` : ""}.
            </p>
          ) : (
            <div className="mt-4">
              <div className="flex items-center">
                {ORDER_STATUSES.filter((s) => s !== "cancelled").map((s, i, arr) => (
                  <div key={s} className={`flex items-center ${i < arr.length - 1 ? "flex-1" : ""}`}>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        i <= stepIndex
                          ? "bg-green-500 text-white"
                          : "bg-slate-200 text-slate-400"
                      }`}
                    >
                      {i <= stepIndex ? <Check className="w-3 h-3" /> : i + 1}
                    </div>
                    {i < arr.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-1 ${i < stepIndex ? "bg-green-500" : "bg-slate-200"}`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-slate-500">
                {ORDER_STATUSES.filter((s) => s !== "cancelled").map((s) => (
                  <span key={s} className="w-16 text-center leading-tight">
                    {ORDER_STATUS_LABELS[s]}
                  </span>
                ))}
              </div>
            </div>
          )}
          {order.deliveredAt && (
            <p className="mt-3 text-xs text-slate-500">
              Delivered on {formatDate(order.deliveredAt)}
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Delivery panel */}
          <div className="p-5 rounded-xl border border-slate-200 bg-white">
            <h2 className="text-sm font-semibold text-navy-900 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" /> Delivery
            </h2>
            {order.delivery ? (
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-slate-600">{order.delivery.deliveryAddress}</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    from {order.branch?.name} · rider status:{" "}
                    {order.delivery.status?.replace("_", " ") ?? "awaiting dispatch"}
                  </div>
                </div>
                {order.delivery.rider && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                    <div className="w-9 h-9 rounded-full bg-navy-900 flex items-center justify-center">
                      <Bike className="w-4 h-4 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-navy-900">
                        {order.delivery.rider.fullName}
                      </div>
                      <div className="text-xs text-slate-500">Your rider</div>
                    </div>
                    {order.delivery.rider.phone && (
                      <a
                        href={`tel:${order.delivery.rider.phone}`}
                        className="inline-flex items-center gap-1 h-8 px-3 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-100"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call
                      </a>
                    )}
                  </div>
                )}
                {order.delivery.deliveryLat != null && order.delivery.deliveryLng != null && (
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${order.delivery.deliveryLat},${order.delivery.deliveryLng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:text-amber-700"
                  >
                    <ExternalLink className="w-4 h-4" /> View drop-off on Google Maps
                  </a>
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                This is a pickup/self-collect order from {order.branch?.name}.
              </p>
            )}
          </div>

          {/* Payment panel */}
          <div className="p-5 rounded-xl border border-slate-200 bg-white">
            <h2 className="text-sm font-semibold text-navy-900 mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-600" /> Payment
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Method</span>
                <span className="font-medium text-navy-900">
                  {order.paymentMethod === "online"
                    ? "Flutterwave Online"
                    : order.paymentMethod === "transfer"
                    ? "Bank Transfer"
                    : order.paymentMethod === "pos"
                    ? "POS at doorstep"
                    : "Cash on delivery"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    order.paymentStatus === "paid"
                      ? "bg-green-100 text-green-800"
                      : order.paymentStatus === "refunded"
                      ? "bg-slate-100 text-slate-600"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
              {order.payments && order.payments.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Gateway record</span>
                  <span className="font-mono text-xs text-slate-600">
                    {order.payments[order.payments.length - 1].status}
                  </span>
                </div>
              )}
            </div>
            {needsPayment && FLW_PUBLIC_KEY && (
              <button
                onClick={completePayment}
                disabled={paying}
                className="mt-4 w-full h-10 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                {paying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Starting...
                  </>
                ) : (
                  "Complete Payment"
                )}
              </button>
            )}
            {needsPayment && !FLW_PUBLIC_KEY && (
              <p className="mt-3 text-xs text-slate-400">
                Online checkout is being configured — your order is still active.
              </p>
            )}
          </div>
        </div>

        {/* Items + totals */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white">
          <h2 className="text-sm font-semibold text-navy-900 mb-4">Items</h2>
          <div className="space-y-2 text-sm">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-slate-600">
                  {item.product?.name ?? "Item"} ({Number(item.sizeKg)}kg) x{item.quantity}
                </span>
                <span className="font-medium text-navy-900">
                  {formatNaira(item.totalPrice)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 mt-3 pt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal</span>
              <span>{formatNaira(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Delivery</span>
              <span>{formatNaira(order.deliveryFee)}</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-1 border-t border-slate-100">
              <span>Total</span>
              <span className="text-amber-600">{formatNaira(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/order?repeat=${order.id}`}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-navy-900 text-white text-sm font-semibold hover:bg-navy-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Re-Order
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center h-11 px-6 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
