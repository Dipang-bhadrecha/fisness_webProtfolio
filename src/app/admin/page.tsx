"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Megaphone, ScrollText, Users } from "lucide-react";
import { useAdminAuth } from "@/lib/admin/AdminAuthContext";
import { AdminOverview, getOverview } from "@/lib/admin/api";

const SECTIONS = [
  { href: "/admin/announcements", label: "Announcements", sub: "Welcome, update and news banners", icon: Megaphone },
  { href: "/admin/users", label: "Users", sub: "Search accounts, activate or deactivate", icon: Users },
  { href: "/admin/audit-log", label: "Audit Log", sub: "Every write across the platform", icon: ScrollText },
];

const STATS: { key: keyof AdminOverview; label: string }[] = [
  { key: "users", label: "Users" },
  { key: "boats", label: "Boats" },
  { key: "companies", label: "Companies" },
  { key: "sessions", label: "Talis" },
];

export default function AdminHomePage() {
  const { token } = useAdminAuth();
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    getOverview(token)
      .then(setOverview)
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load overview"));
  }, [token]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink dark:text-slate-100 mb-6">Dashboard</h1>

      {error && <p className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.key} className="rounded-2xl border border-muted-faint/30 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted dark:text-slate-400">{stat.label}</p>
            <p className="mt-2 font-display text-3xl font-bold text-ink dark:text-slate-100 tabular-nums">
              {overview ? overview[stat.key].toLocaleString() : "—"}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="flex items-center gap-4 rounded-2xl border border-muted-faint/30 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hover:border-teal dark:hover:border-teal transition-colors"
            >
              <div className="rounded-xl bg-teal/10 dark:bg-teal/20 p-3">
                <Icon className="text-teal dark:text-teal-light" size={22} />
              </div>
              <div>
                <p className="font-semibold text-ink dark:text-slate-100">{section.label}</p>
                <p className="text-sm text-muted dark:text-slate-400">{section.sub}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
