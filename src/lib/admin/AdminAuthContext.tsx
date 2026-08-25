"use client";

/**
 * src/lib/admin/AdminAuthContext.tsx
 *
 * Session state for the admin dashboard: a JWT in localStorage (not cookies
 * / NextAuth — the backend is a plain Bearer-JWT REST API with no session
 * infrastructure at all, and this is a 1-2-person internal tool behind a
 * phone+OTP gate that already exists server-side, so adding one just for
 * this client would be disproportionate). 7-day expiry, same as the mobile
 * app's own token lifetime, bounds how long a stolen token stays useful.
 *
 * `verify-otp`'s response doesn't carry `isAdmin` (it's a hand-picked shape,
 * not a spread of the user row), so login is genuinely two calls: verify the
 * OTP to get a token, then call `getMe` to find out whether this account is
 * actually an admin. A token is only ever persisted once that check passes.
 */

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AdminUser, getMe, verifyOtp } from "./api";

const TOKEN_KEY = "fisness_admin_token";

type Status = "loading" | "authed" | "unauthed" | "forbidden";

interface AdminAuthState {
  status: Status;
  token: string | null;
  user: AdminUser | null;
  login: (phone: string, code: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthState | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>("loading");
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) {
      setStatus("unauthed");
      return;
    }
    getMe(stored)
      .then((me) => {
        if (me.isAdmin) {
          setToken(stored);
          setUser(me);
          setStatus("authed");
        } else {
          localStorage.removeItem(TOKEN_KEY);
          setStatus("forbidden");
        }
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setStatus("unauthed");
      });
  }, []);

  const login = useCallback(async (phone: string, code: string) => {
    const { token: newToken } = await verifyOtp(phone, code);
    const me = await getMe(newToken);
    if (!me.isAdmin) {
      setStatus("forbidden");
      throw new Error("This account does not have admin access.");
    }
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
    setUser(me);
    setStatus("authed");
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    setStatus("unauthed");
  }, []);

  return (
    <AdminAuthContext.Provider value={{ status, token, user, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthState {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
