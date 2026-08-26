"use client";

/**
 * src/lib/admin/AdminAuthContext.tsx
 *
 * Session state for the admin dashboard: a JWT in localStorage (not cookies
 * / NextAuth — the backend is a plain Bearer-JWT REST API with no session
 * infrastructure at all, and this is a 1-2-person internal tool, so adding
 * one just for this client would be disproportionate). 12h expiry (server-
 * side, see ADMIN_JWT_EXPIRES_IN), bounds how long a stolen token stays
 * useful.
 *
 * This token comes from a completely separate login than the mobile app's
 * phone+OTP: username + password + TOTP (see api.ts's adminLogin /
 * adminSetupStart / adminSetupConfirm / adminTotpVerify). There is no
 * "valid login, wrong role" case anymore, unlike the old phone-OTP-derived
 * flow — every successful login through that pipeline already IS an admin,
 * so `status` has no `forbidden` state.
 */

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AdminSession, adminMe } from "./api";

const TOKEN_KEY = "fisness_admin_token";

type Status = "loading" | "authed" | "unauthed";

interface AdminAuthState {
  status: Status;
  token: string | null;
  user: AdminSession | null;
  loginWithToken: (token: string, user: AdminSession) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthState | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>("loading");
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminSession | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) {
      setStatus("unauthed");
      return;
    }
    adminMe(stored)
      .then((me) => {
        setToken(stored);
        setUser(me);
        setStatus("authed");
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setStatus("unauthed");
      });
  }, []);

  // The login form does the multi-step dance itself (password, then TOTP)
  // and only hands this context a token once the backend has already
  // returned a real `scope: 'admin-session'` session — this just persists it.
  const loginWithToken = useCallback((newToken: string, newUser: AdminSession) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
    setUser(newUser);
    setStatus("authed");
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    setStatus("unauthed");
  }, []);

  return (
    <AdminAuthContext.Provider value={{ status, token, user, loginWithToken, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthState {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
