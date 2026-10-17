"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Loader2,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api/client";
import { Skeleton, SkeletonList } from "@/components/skeleton";

interface Address {
  id: string;
  label: string;
  address: string;
  city: string;
  state: string;
  is_default: boolean;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    label: "",
    address: "",
    city: "",
    state: "",
    is_default: false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    async function loadAddresses() {
      if (!user) {
        router.push("/login?redirect=/dashboard/addresses");
        return;
      }

      try {
        const data = await api.get<Address[]>("/customers/addresses");
        setAddresses(data);
      } catch {
        setError("Failed to load addresses");
      } finally {
        setLoading(false);
      }
    }

    loadAddresses();
  }, [user, router]);

  function resetForm() {
    setFormData({
      label: "",
      address: "",
      city: "",
      state: "",
      is_default: false,
    });
    setShowForm(false);
    setEditingId(null);
  }

  function handleEdit(address: Address) {
    setFormData({
      label: address.label,
      address: address.address,
      city: address.city,
      state: address.state,
      is_default: address.is_default,
    });
    setEditingId(address.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (editingId) {
        const updated = await api.patch<Address>(
          `/customers/addresses/${editingId}`,
          formData
        );
        setAddresses(addresses.map((a) => (a.id === editingId ? updated : a)));
        setSuccess("Address updated successfully");
      } else {
        const created = await api.post<Address>(
          "/customers/addresses",
          formData
        );
        setAddresses([...addresses, created]);
        setSuccess("Address added successfully");
      }
      resetForm();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save address");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this address?")) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await api.delete(`/customers/addresses/${id}`);
      setAddresses(addresses.filter((a) => a.id !== id));
      setSuccess("Address deleted successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete address");
    }
  }

  async function handleSetDefault(id: string) {
    setError("");
    setSuccess("");

    try {
      const updated = await api.patch<Address>(
        `/customers/addresses/${id}/default`,
        {}
      );
      setAddresses(
        addresses.map((a) => ({
          ...a,
          is_default: a.id === id,
        }))
      );
      setSuccess("Default address updated");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to set default address"
      );
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Skeleton className="mb-8 h-8 w-48" />
        <SkeletonList rows={3} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 mb-1">
            My Addresses
          </h1>
          <p className="text-sm text-slate-500">
            Manage your delivery addresses
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 text-white text-sm font-medium hover:bg-amber-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Address
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          {success}
        </div>
      )}

      {/* Address Form */}
      {showForm && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-navy-900">
              {editingId ? "Edit Address" : "New Address"}
            </h2>
            <button
              onClick={resetForm}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="label"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Address Label (e.g., Home, Office)
              </label>
              <input
                id="label"
                type="text"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                placeholder="Home"
                required
                className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Street Address
              </label>
              <textarea
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="123 Main Street, Apartment 4B"
                required
                rows={3}
                className="flex w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  placeholder="Port Harcourt"
                  required
                  className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  State
                </label>
                <input
                  id="state"
                  type="text"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  placeholder="Rivers State"
                  required
                  className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="is_default"
                type="checkbox"
                checked={formData.is_default}
                onChange={(e) =>
                  setFormData({ ...formData, is_default: e.target.checked })
                }
                className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
              <label
                htmlFor="is_default"
                className="text-sm font-medium text-slate-700"
              >
                Set as default address
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 h-11 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : editingId ? (
                  "Update Address"
                ) : (
                  "Add Address"
                )}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 h-11 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Address List */}
      {addresses.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-lg font-bold text-navy-900 mb-2">
            No addresses yet
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Add a delivery address to get started
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Your First Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`rounded-xl border bg-white p-5 transition-all ${
                address.is_default
                  ? "border-amber-300 ring-2 ring-amber-100"
                  : "border-slate-200 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  <h3 className="font-semibold text-navy-900">
                    {address.label}
                  </h3>
                  {address.is_default && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                      Default
                    </span>
                  )}
                </div>
              </div>

              <div className="text-sm text-slate-600 mb-4">
                <div>{address.address}</div>
                <div>
                  {address.city}, {address.state}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                {!address.is_default && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => handleEdit(address)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
