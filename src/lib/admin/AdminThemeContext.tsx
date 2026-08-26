"use client";

/**
 * src/lib/admin/AdminThemeContext.tsx
 *
 * Light/dark for /admin only. Applies a `dark` class to a wrapper div in
 * admin/layout.tsx (not <html> — that element is shared with the marketing
 * site's root layout) so Tailwind's class-based dark mode
 * (tailwind.config.ts's `darkMode: "class"`) only ever activates inside the
 * admin tree. Persisted in localStorage, separate key from the auth token so
 * clearing one never clears the other; falls back to the OS preference only
 * on the very first visit, before any explicit choice has been saved.
 */

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const THEME_KEY = "fisness_admin_theme";

type Theme = "light" | "dark";

interface AdminThemeState {
  theme: Theme;
  toggle: () => void;
}

const AdminThemeContext = createContext<AdminThemeState | null>(null);

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      return next;
    });
  }, []);

  return (
    <AdminThemeContext.Provider value={{ theme, toggle }}>
      {/* Background is a plain JS-conditional class, not `dark:bg-*` — this
          div is the one carrying the `dark` class itself, and Tailwind's
          class-strategy dark mode matches `.dark <descendant>`, never the
          element bearing `.dark` against its own `dark:` utility. Everything
          nested inside (sidebar, main content) is a real descendant, so
          their own `dark:` utilities work as expected; only this one
          self-referencing case needs the explicit branch instead. */}
      <div className={`${theme} min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-cream"}`}>{children}</div>
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme(): AdminThemeState {
  const ctx = useContext(AdminThemeContext);
  if (!ctx) throw new Error("useAdminTheme must be used within AdminThemeProvider");
  return ctx;
}
