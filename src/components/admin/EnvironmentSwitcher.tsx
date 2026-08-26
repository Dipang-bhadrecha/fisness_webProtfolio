"use client";

import { cn } from "@/lib/utils";
import { useAdminEnvironment } from "@/lib/admin/AdminEnvironmentContext";

// Sits above both the login form and the authed shell (AdminShell renders it
// unconditionally) — login itself is per-environment, so the founder has to
// be able to pick Stage/Live before signing in, not only after.
export function EnvironmentSwitcher() {
  const { env, setEnv } = useAdminEnvironment();
  const isLive = env === "live";

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 border-b px-4 py-2 text-xs font-semibold transition-colors",
        isLive
          ? "border-red-900/30 bg-red-600 text-white"
          : "border-muted-faint/30 dark:border-slate-800 bg-cream dark:bg-slate-900 text-muted dark:text-slate-400"
      )}
    >
      <span>{isLive ? "⚠ You are viewing LIVE production data" : "Viewing stage data"}</span>
      <div className="flex overflow-hidden rounded-lg border border-current/30">
        {(["stage", "live"] as const).map((option) => (
          <button
            key={option}
            onClick={() => setEnv(option)}
            className={cn(
              "px-3 py-1 uppercase tracking-wide transition-colors",
              env === option
                ? isLive
                  ? "bg-white text-red-600"
                  : "bg-teal text-white"
                : "hover:bg-current/10"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
