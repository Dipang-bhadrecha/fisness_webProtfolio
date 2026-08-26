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
 *
 * Keyed off AdminEnvironmentContext's `env`: stage and live are two separate
 * fisness_backend deployments with two separate ADMIN_JWT_SECRETs, so a
 * token from one is meaningless to the other. Flipping the Stage/Live switch
 * re-runs the token check below against whichever token (if any) is stored
 * for that environment — it does not carry the current session over.
 */

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AdminSession, adminMe } from "./api";
import { useAdminEnvironment } from "./AdminEnvironmentContext";

const tokenKeyFor = (env: string) => `fisness_admin_token_${env}`;

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
  const { env } = useAdminEnvironment();
  const [status, setStatus] = useState<Status>("loading");
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminSession | null>(null);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    const stored = localStorage.getItem(tokenKeyFor(env));
    if (!stored) {
      setToken(null);
      setUser(null);
      setStatus("unauthed");
      return;
    }
    adminMe(stored)
      .then((me) => {
        if (cancelled) return;
        setToken(stored);
        setUser(me);
        setStatus("authed");
      })
      .catch(() => {
        if (cancelled) return;
        localStorage.removeItem(tokenKeyFor(env));
        setToken(null);
        setUser(null);
        setStatus("unauthed");
      });

    return () => {
      cancelled = true;
    };
  }, [env]);

  // The login form does the multi-step dance itself (password, then TOTP)
  // and only hands this context a token once the backend has already
  // returned a real `scope: 'admin-session'` session — this just persists it.
  const loginWithToken = useCallback((newToken: string, newUser: AdminSession) => {
    localStorage.setItem(tokenKeyFor(env), newToken);
    setToken(newToken);
    setUser(newUser);
    setStatus("authed");
  }, [env]);

  const logout = useCallback(() => {
    localStorage.removeItem(tokenKeyFor(env));
    setToken(null);
    setUser(null);
    setStatus("unauthed");
  }, [env]);

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
