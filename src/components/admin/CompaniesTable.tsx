"use client";

import { cn } from "@/lib/utils";
import { PlatformCompany } from "@/lib/admin/api";

export function CompaniesTable({ items }: { items: PlatformCompany[] }) {
  if (items.length === 0) {
    return <p className="text-muted dark:text-slate-400 text-sm">No companies match.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-muted-faint/30 dark:border-slate-700 bg-white dark:bg-slate-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-muted-faint/30 dark:border-slate-700 text-left text-xs uppercase tracking-wide text-muted dark:text-slate-400">
            <th className="px-4 py-3 font-semibold">Company</th>
            <th className="px-4 py-3 font-semibold">Owner</th>
            <th className="px-4 py-3 font-semibold">Boats</th>
            <th className="px-4 py-3 font-semibold">Talis</th>
            <th className="px-4 py-3 font-semibold">Created</th>
            <th className="px-4 py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={c.id} className="border-b border-muted-faint/20 dark:border-slate-700/60 last:border-0">
              <td className="px-4 py-3 text-ink dark:text-slate-100 font-medium">
                {c.name}
                {c.nameGujarati && (
                  <span className="ml-2 text-xs text-muted dark:text-slate-400">{c.nameGujarati}</span>
                )}
              </td>
              <td className="px-4 py-3 text-ink dark:text-slate-100">
                {c.owner?.name ?? "—"}
                {c.owner?.phone && (
                  <span className="block text-xs text-muted dark:text-slate-400 tabular-nums">{c.owner.phone}</span>
                )}
              </td>
              <td className="px-4 py-3 text-muted dark:text-slate-400 tabular-nums">{c._count.registeredBoats}</td>
              <td className="px-4 py-3 text-muted dark:text-slate-400 tabular-nums">{c._count.sessions}</td>
              <td className="px-4 py-3 text-muted dark:text-slate-400">{new Date(c.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "inline-flex rounded-md px-2 py-0.5 text-xs font-semibold",
                    c.isActive
                      ? "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                      : "bg-muted-faint/30 dark:bg-slate-700 text-muted dark:text-slate-400"
                  )}
                >
                  {c.isActive ? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
