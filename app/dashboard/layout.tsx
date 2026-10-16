"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  MapPin,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api/client";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Package, label: "My Orders", href: "/dashboard/orders" },
  { icon: MapPin, label: "My Addresses", href: "/dashboard/addresses" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { user: authUser, logout } = useAuth();

  useEffect(() => {
    async function loadProfile() {
      if (!authUser) {
        router.push("/login?redirect=/dashboard");
        return;
      }

      try {
        const profile = await api.get<UserProfile>("/customers/profile");
        setUser(profile);
      } catch {
        setUser({
          fullName: authUser.fullName || "Customer",
          email: authUser.email || "",
          phone: authUser.phone || "",
        });
      }
    }

    loadProfile();
  }, [authUser, router]);

  async function handleLogout() {
    await logout();
    router.push("/");
    router.refresh();
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      className={`${
        mobile ? "w-full" : "hidden lg:flex"
      } flex-col h-full bg-white border-r border-slate-200`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center gap-2 px-6 border-b border-slate-200">
        <img src="/logo.png" alt="Malique Oil and Gas logo" className="w-8 h-8 rounded-full" />
        <div className="flex flex-col">
          <span className="text-base font-bold text-navy-900 leading-tight">
            Malique
          </span>
          <span className="text-[9px] font-medium text-slate-500 uppercase tracking-wider leading-none">
            Oil & Gas
          </span>
        </div>
        {mobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-700" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => mobile && setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : "text-slate-600 hover:bg-slate-50 hover:text-navy-900"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full gradient-navy flex items-center justify-center text-white text-sm font-semibold">
            {user ? getInitials(user.fullName) : "..."}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-navy-900 truncate">
              {user?.fullName || "Loading..."}
            </div>
            <div className="text-xs text-slate-500 truncate">
              {user?.email || ""}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:pl-64">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-slate-200 h-16 flex items-center px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
          <div className="ml-4 flex items-center gap-2">
            <img src="/logo.png" alt="Malique Oil and Gas logo" className="w-8 h-8 rounded-full" />
            <span className="text-base font-bold text-navy-900">Malique</span>
          </div>
        </header>

        {/* Page Content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
