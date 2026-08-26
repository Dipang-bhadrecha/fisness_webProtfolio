"use client";

import { cn } from "@/lib/utils";
import { PlatformAuditLogEntry } from "@/lib/admin/api";

const METHOD_BADGE: Record<string, string> = {
  GET: "bg-teal/10 dark:bg-teal/20 text-teal dark:text-teal-light",
  POST: "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  PATCH: "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400",
  DELETE: "bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400",
};

export function AuditLogTable({ items }: { items: PlatformAuditLogEntry[] }) {
  if (items.length === 0) {
    return <p className="text-muted dark:text-slate-400 text-sm">No activity yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-muted-faint/30 dark:border-slate-700 bg-white dark:bg-slate-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-muted-faint/30 dark:border-slate-700 text-left text-xs uppercase tracking-wide text-muted dark:text-slate-400">
            <th className="px-4 py-3 font-semibold">Time</th>
            <th className="px-4 py-3 font-semibold">User</th>
            <th className="px-4 py-3 font-semibold">Action</th>
            <th className="px-4 py-3 font-semibold">Resource</th>
            <th className="px-4 py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((e) => (
            <tr key={e.id} className="border-b border-muted-faint/20 dark:border-slate-700/60 last:border-0">
              <td className="px-4 py-3 text-muted dark:text-slate-400 whitespace-nowrap">{new Date(e.createdAt).toLocaleString()}</td>
              <td className="px-4 py-3 text-ink dark:text-slate-100">
                {e.user?.name ?? "—"} <span className="text-muted dark:text-slate-400">{e.user?.phone}</span>
              </td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "inline-flex rounded-md px-2 py-0.5 text-xs font-semibold",
                    METHOD_BADGE[e.method] ?? "bg-muted-faint/30 dark:bg-slate-700 text-muted dark:text-slate-400"
                  )}
                >
                  {e.method}
                </span>
                <span className="ml-2 text-muted dark:text-slate-400 font-mono text-xs">{e.path}</span>
              </td>
              <td className="px-4 py-3 text-ink dark:text-slate-100">{e.resource}</td>
              <td className="px-4 py-3 tabular-nums text-muted dark:text-slate-400">{e.statusCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
