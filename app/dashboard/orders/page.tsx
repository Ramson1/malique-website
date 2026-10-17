"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, Clock } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api/client";
import { Skeleton, SkeletonList } from "@/components/skeleton";
import {
  formatNaira,
  formatDate,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  type OrderStatus,
} from "@/lib/format";

interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: string | number;
  paymentStatus: string;
  createdAt: string;
  items: { product?: { name: string } | null; sizeKg: string | number; quantity: number }[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchOrders() {
      if (!user) {
        router.push("/login?redirect=/dashboard/orders");
        return;
      }

      try {
        const res = await api.get<{ data: Order[] }>('/orders');
        setOrders(res.data ?? []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <Skeleton className="mb-6 h-7 w-40" />
          <SkeletonList rows={5} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </Link>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Malique Oil and Gas logo" className="w-8 h-8 rounded-full" />
            <span className="text-base font-bold text-navy-900">My Orders</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-slate-400" />
            </div>
            <h2 className="text-lg font-bold text-navy-900 mb-2">No orders yet</h2>
            <p className="text-sm text-slate-500 mb-6">
              Place your first order and track it here
            </p>
            <Link
              href="/order"
              className="inline-flex items-center justify-center h-11 px-8 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition-colors"
            >
              Place Your First Order
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-slate-200 bg-white p-5 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-sm font-mono font-bold text-navy-900">
                      {order.orderNumber}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {formatDate(order.createdAt)}
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      ORDER_STATUS_COLORS[order.status as OrderStatus]
                    }`}
                  >
                    {ORDER_STATUS_LABELS[order.status as OrderStatus]}
                  </span>
                </div>

                <div className="text-sm text-slate-600 mb-3">
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.product?.name ?? "Item"} ({Number(item.sizeKg)}kg) x{item.quantity}
                      {i < order.items.length - 1 ? " · " : ""}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-lg font-bold text-navy-900">
                    {formatNaira(order.totalAmount)}
                  </span>
                  <Link
                    href={`/dashboard/orders/${order.id}`}
                    className="text-sm font-medium text-amber-600 hover:text-amber-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
