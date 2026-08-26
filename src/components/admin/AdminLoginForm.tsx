"use client";

import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import {
  adminLogin, adminSetupStart, adminSetupConfirm, adminTotpVerify,
} from "@/lib/admin/api";
import { useAdminAuth } from "@/lib/admin/AdminAuthContext";

const inputClass =
  "w-full rounded-xl border border-muted-faint/50 dark:border-slate-700 bg-transparent px-4 py-3 text-ink dark:text-slate-100 placeholder:text-muted-faint dark:placeholder:text-slate-500 focus:outline-none focus:border-teal";
const primaryBtnClass =
  "w-full rounded-xl bg-ink dark:bg-teal-light text-cream dark:text-slate-900 font-semibold py-3 hover:bg-teal dark:hover:bg-teal transition-colors disabled:opacity-50";

type Step = "credentials" | "setup" | "verify";

export function AdminLoginForm() {
  const { loginWithToken } = useAdminAuth();
  const [step, setStep] = useState<Step>("credentials");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [setupToken, setSetupToken] = useState<string | null>(null);
  const [pendingToken, setPendingToken] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [manualEntryKey, setManualEntryKey] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const result = await adminLogin(username, password);
      if ("setupRequired" in result) {
        setSetupToken(result.setupToken);
        setStep("setup");
      } else {
        setPendingToken(result.pendingToken);
        setStep("verify");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in");
    } finally {
      setBusy(false);
    }
  };

  // Fires once on entering the setup step — generates the QR the moment the
  // screen appears rather than making the founder press a second button.
  useEffect(() => {
    if (step !== "setup" || !setupToken || qrDataUrl) return;
    adminSetupStart(setupToken)
      .then((res) => {
        setQrDataUrl(res.qrDataUrl);
        setManualEntryKey(res.manualEntryKey);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not start TOTP setup"));
  }, [step, setupToken, qrDataUrl]);

  const handleSetupConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!setupToken) return;
    setError(null);
    setBusy(true);
    try {
      const { token } = await adminSetupConfirm(setupToken, code);
      loginWithToken(token, { username });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Incorrect code");
    } finally {
      setBusy(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingToken) return;
    setError(null);
    setBusy(true);
    try {
      const { token } = await adminTotpVerify(pendingToken, code);
      loginWithToken(token, { username });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Incorrect code");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-slate-900 px-4">
      <div className="w-full max-w-sm">
        <p className="font-display text-2xl font-bold text-ink dark:text-slate-100 mb-1">Fisness Admin</p>
        <p className="text-muted dark:text-slate-400 text-sm mb-8">Founder access only.</p>

        {step === "credentials" && (
          <form onSubmit={handleCredentials} className="space-y-4">
            <input
              type="text"
              required
              autoComplete="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputClass}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted dark:text-slate-400 hover:text-ink dark:hover:text-slate-100 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className={primaryBtnClass}
            >
              {busy ? "Checking…" : "Continue"}
            </button>
          </form>
        )}

        {step === "setup" && (
          <form onSubmit={handleSetupConfirm} className="space-y-4">
            <p className="text-sm text-muted dark:text-slate-400">
              Scan this with Google Authenticator (or any authenticator app), then enter the 6-digit code it shows.
            </p>
            {qrDataUrl ? (
              <div className="flex justify-center rounded-xl border border-muted-faint/50 dark:border-slate-700 bg-white p-4">
                <Image src={qrDataUrl} alt="TOTP setup QR code" width={200} height={200} unoptimized />
              </div>
            ) : (
              <p className="text-sm text-muted dark:text-slate-400">Generating QR code…</p>
            )}
            {manualEntryKey && (
              <p className="text-xs text-muted dark:text-slate-400 break-all">
                Can&apos;t scan? Enter this key manually: <span className="font-mono text-ink dark:text-slate-200">{manualEntryKey}</span>
              </p>
            )}
            <input
              type="text"
              required
              inputMode="numeric"
              placeholder="6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`${inputClass} tracking-widest`}
            />
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={busy || !qrDataUrl}
              className={primaryBtnClass}
            >
              {busy ? "Enabling…" : "Enable & sign in"}
            </button>
          </form>
        )}

        {step === "verify" && (
          <form onSubmit={handleVerify} className="space-y-4">
            <p className="text-sm text-muted dark:text-slate-400">Enter the 6-digit code from your authenticator app.</p>
            <input
              type="text"
              required
              inputMode="numeric"
              placeholder="6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`${inputClass} tracking-widest`}
              autoFocus
            />
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className={primaryBtnClass}
            >
              {busy ? "Verifying…" : "Verify & sign in"}
            </button>
            <button
              type="button"
              onClick={() => { setStep("credentials"); setCode(""); setError(null); }}
              className="w-full text-sm text-muted dark:text-slate-400 hover:text-ink dark:hover:text-slate-100 transition-colors"
            >
              Use a different account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
