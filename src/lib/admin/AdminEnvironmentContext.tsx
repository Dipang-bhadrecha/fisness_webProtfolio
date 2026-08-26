"use client";

/**
 * src/lib/admin/AdminEnvironmentContext.tsx
 *
 * Stage / Live switch for the whole /admin dashboard. Both backends run
 * against the same RDS instance but are two separate fisness_backend
 * deployments with two separate ADMIN_JWT_SECRETs — so this isn't just a
 * different base URL, it's a different login. AdminAuthContext keys its
 * stored token off `env` for exactly that reason: switching here can drop
 * you back to the login form if you've never signed into that side before.
 *
 * Always renders "stage" on the very first pass, server and client alike,
 * and only reads the real choice out of localStorage in an effect after
 * mount — same pattern AdminThemeContext uses for light/dark. Reading
 * localStorage in a lazy useState initializer looks tempting (it runs before
 * any child renders, so it seems to dodge the child-effects-fire-first
 * ordering problem below) but it does NOT dodge hydration: that initializer
 * still runs during Next's server render (where there is no localStorage,
 * so it'd fall back to "stage") *and* again during the client's first
 * render pass before hydration reconciles — which on a returning "live"
 * visitor disagrees with the server's "stage" output and throws a hydration
 * mismatch. An effect is the only point guaranteed to run client-only,
 * after the first paint is already reconciled.
 *
 * One consequence: AdminAuthProvider (a child of this provider) fires its
 * own token-check effect on mount too, and child effects fire before a
 * parent's own effect. So on a returning "live" visitor there's a brief
 * instant where AdminAuthProvider checks the "stage" token (since `env` is
 * still the default) before this provider's effect corrects it to "live",
 * which re-renders AdminAuthProvider with the right env and re-fires its
 * effect correctly. Harmless — worst case is one wasted "stage" check — and
 * the same flash-then-correct trade AdminThemeContext already makes for
 * theme.
 */

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AdminEnv, setActiveAdminEnv } from "./api";

const ENV_KEY = "fisness_admin_env";

interface AdminEnvironmentState {
  env: AdminEnv;
  setEnv: (env: AdminEnv) => void;
}

const AdminEnvironmentContext = createContext<AdminEnvironmentState | null>(null);

export function AdminEnvironmentProvider({ children }: { children: React.ReactNode }) {
  const [env, setEnvState] = useState<AdminEnv>("stage");

  useEffect(() => {
    const stored = localStorage.getItem(ENV_KEY);
    if (stored === "live") {
      setActiveAdminEnv("live");
      setEnvState("live");
    }
  }, []);

  const setEnv = useCallback((next: AdminEnv) => {
    localStorage.setItem(ENV_KEY, next);
    setActiveAdminEnv(next);
    setEnvState(next);
  }, []);

  return (
    <AdminEnvironmentContext.Provider value={{ env, setEnv }}>
      {children}
    </AdminEnvironmentContext.Provider>
  );
}

export function useAdminEnvironment(): AdminEnvironmentState {
  const ctx = useContext(AdminEnvironmentContext);
  if (!ctx) throw new Error("useAdminEnvironment must be used within AdminEnvironmentProvider");
  return ctx;
}
