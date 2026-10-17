"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Package,
  Truck,
  User,
  LogOut,
  Clock,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api/client";
import { SkeletonText, SkeletonStatGrid, SkeletonList } from "@/components/skeleton";
import {
  formatNaira,
  formatDate,
  timeAgo,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  type OrderStatus,
} from "@/lib/format";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  orderCount: number;
  totalSpent: number | string;
  loyaltyPoints: number;
}

interface RecentOrder {
  id: string;
  status: OrderStatus;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [recent, setRecent] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user: authUser, logout } = useAuth();

  useEffect(() => {
    async function loadProfile() {
      if (!authUser) {
        router.push("/login?redirect=/dashboard");
        return;
      }

      try {
        const profile = await api.get<UserProfile>('/customers/profile');
        setUser(profile);
      } catch {
        // Fallback to auth user data
        setUser({
          fullName: authUser.fullName || "Customer",
          email: authUser.email || "",
          phone: authUser.phone || "",
          orderCount: 0,
          totalSpent: 0,
          loyaltyPoints: 0,
        });
      }
      try {
        const res = await api.get<{ data: RecentOrder[] }>('/orders?limit=10');
        setRecent(res.data ?? []);
      } catch {
        setRecent([]);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [authUser, router]);

  async function handleLogout() {
    await logout();
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
          <SkeletonText lines={2} className="w-56" />
          <SkeletonStatGrid count={3} />
          <SkeletonList rows={3} />
        </div>
      </div>
    );
  }

  const activeOrder = recent.find(
    (o) => o.status !== "delivered" && o.status !== "cancelled"
  );
  const latestOrder = recent[0];
  const trackHref = activeOrder
    ? `/dashboard/orders/${activeOrder.id}`
    : "/dashboard/orders";

  const navItems = [
    { icon: Package, label: "My Orders", href: "/dashboard/orders", desc: "View order history" },
    { icon: Truck, label: "Track Delivery", href: trackHref, desc: activeOrder ? "Active delivery" : "No active delivery" },
    { icon: MapPin, label: "Addresses", href: "/addresses", desc: "Manage delivery addresses" },
    { icon: User, label: "Profile", href: "/profile", desc: "Account settings" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Malique Oil and Gas logo" className="w-8 h-8 rounded-full" />
            <span className="text-base font-bold text-navy-900">Malique</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome Card */}
        <div className="rounded-2xl gradient-navy p-6 md:p-8 text-white mb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h1 className="text-2xl font-bold mb-1">
              Welcome back, {user?.fullName?.split(" ")[0]}
            </h1>
            <p className="text-slate-400 text-sm mb-6">
              Here&apos;s your account overview
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold">{user?.orderCount || 0}</div>
                <div className="text-xs text-slate-400">Orders</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold">
                  {user?.totalSpent ? formatNaira(user.totalSpent) : "₦0"}
                </div>
                <div className="text-xs text-slate-400">Total Spent</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold">{user?.loyaltyPoints || 0}</div>
                <div className="text-xs text-slate-400">Loyalty Pts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-all group"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-navy-900 text-sm">{item.label}</div>
                <div className="text-xs text-slate-500">{item.desc}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>

        {/* Order Again CTA */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
          <h3 className="text-lg font-bold text-navy-900 mb-2">Need a refill?</h3>
          <p className="text-sm text-slate-600 mb-4">
            {latestOrder
              ? "Re-order your usual in one tap, or build a fresh order."
              : "Order now and get it delivered to your doorstep"}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={latestOrder ? `/order?repeat=${latestOrder.id}` : "/order"}
              className="inline-flex items-center justify-center h-11 px-8 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition-colors"
            >
              {latestOrder ? "Re-Order Your Last Order" : "Order Gas Now"}
            </Link>
            {!latestOrder && (
              <Link
                href="/order"
                className="inline-flex items-center justify-center h-11 px-8 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Browse Products
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
