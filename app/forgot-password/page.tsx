"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import { api } from "@/lib/api/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/forgot-password", { email });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-navy relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-600 rounded-full blur-3xl" />
        </div>
        <div className="relative text-center">
          <img src="/logo.png" alt="Malique Oil and Gas logo" className="w-16 h-16 rounded-full mx-auto mb-6 shadow-lg" />
          <h2 className="text-3xl font-bold text-white mb-3">
            Reset Your Password
          </h2>
          <p className="text-slate-400 max-w-sm">
            Enter your email address and we&apos;ll send you a link to reset your
            password.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <img src="/logo.png" alt="Malique Oil and Gas logo" className="w-9 h-9 rounded-full" />
            <span className="text-lg font-bold text-navy-900">Malique</span>
          </div>

          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-navy-900 mb-2">
                Check Your Email
              </h1>
              <p className="text-sm text-slate-500 mb-8">
                We&apos;ve sent a password reset link to <strong>{email}</strong>.
                Please check your inbox and follow the instructions.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center h-11 px-8 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition-colors"
              >
                Back to Sign In
              </Link>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setSuccess(false);
                    setEmail("");
                  }}
                  className="text-sm text-slate-500 hover:text-navy-900 transition-colors"
                >
                  Didn&apos;t receive the email? Try again
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-navy-900 mb-2">
                Forgot Password?
              </h1>
              <p className="text-sm text-slate-500 mb-8">
                No worries, we&apos;ll send you reset instructions.
              </p>

              {error && (
                <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="text-sm text-slate-500 hover:text-navy-900 transition-colors inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
