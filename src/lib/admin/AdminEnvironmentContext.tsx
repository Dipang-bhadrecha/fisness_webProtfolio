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
 * The chosen env is applied to api.ts's `activeEnv` synchronously, from the
 * lazy useState initializer — never from an effect. Effects run bottom-up on
 * mount (children before parents), and AdminAuthProvider (a child of this
 * provider) fires its own token-check effect on mount; if that ran before
 * this context had told api.ts which environment to use, it could check the
 * stored token against the wrong backend. The initializer runs during this
 * component's own render, strictly before any child renders at all, so
 * there's no ordering race to worry about.
 */

import { createContext, useCallback, useContext, useState } from "react";
import { AdminEnv, getActiveAdminEnv, setActiveAdminEnv } from "./api";

const ENV_KEY = "fisness_admin_env";

interface AdminEnvironmentState {
  env: AdminEnv;
  setEnv: (env: AdminEnv) => void;
}

const AdminEnvironmentContext = createContext<AdminEnvironmentState | null>(null);

function readStoredEnv(): AdminEnv {
  if (typeof window === "undefined") return getActiveAdminEnv();
  return localStorage.getItem(ENV_KEY) === "live" ? "live" : "stage";
}

export function AdminEnvironmentProvider({ children }: { children: React.ReactNode }) {
  const [env, setEnvState] = useState<AdminEnv>(() => {
    const initial = readStoredEnv();
    setActiveAdminEnv(initial);
    return initial;
  });

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
