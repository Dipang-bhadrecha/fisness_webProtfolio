"use client";

import { useState } from "react";
import { requestOtp } from "@/lib/admin/api";
import { useAdminAuth } from "@/lib/admin/AdminAuthContext";

const inputClass =
  "w-full rounded-xl border border-muted-faint/50 px-4 py-3 text-ink focus:outline-none focus:border-teal";

export function AdminLoginForm({ forbidden }: { forbidden: boolean }) {
  const { login } = useAdminAuth();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await requestOtp(phone);
      setStep("otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send the code");
    } finally {
      setBusy(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(phone, code);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not verify the code");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm">
        <p className="font-display text-2xl font-bold text-ink mb-1">Fisness Admin</p>
        <p className="text-muted text-sm mb-8">Founder / admin access only.</p>

        {forbidden && (
          <p className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            That account signed in fine, but it doesn&apos;t have admin access.
          </p>
        )}

        {step === "phone" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input
              type="tel"
              required
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-xl bg-ink text-cream font-semibold py-3 hover:bg-teal transition-colors disabled:opacity-50"
            >
              {busy ? "Sending…" : "Send code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <p className="text-sm text-muted">Code sent to {phone}</p>
            <input
              type="text"
              required
              inputMode="numeric"
              placeholder="6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`${inputClass} tracking-widest`}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-xl bg-ink text-cream font-semibold py-3 hover:bg-teal transition-colors disabled:opacity-50"
            >
              {busy ? "Verifying…" : "Verify & sign in"}
            </button>
            <button
              type="button"
              onClick={() => setStep("phone")}
              className="w-full text-sm text-muted hover:text-ink transition-colors"
            >
              Use a different number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
