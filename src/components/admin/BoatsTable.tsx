"use client";

import { cn } from "@/lib/utils";
import { PlatformBoat } from "@/lib/admin/api";

export function BoatsTable({ items }: { items: PlatformBoat[] }) {
  if (items.length === 0) {
    return <p className="text-muted dark:text-slate-400 text-sm">No boats match.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-muted-faint/30 dark:border-slate-700 bg-white dark:bg-slate-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-muted-faint/30 dark:border-slate-700 text-left text-xs uppercase tracking-wide text-muted dark:text-slate-400">
            <th className="px-4 py-3 font-semibold">Boat</th>
            <th className="px-4 py-3 font-semibold">Owner</th>
            <th className="px-4 py-3 font-semibold">Port</th>
            <th className="px-4 py-3 font-semibold">Talis</th>
            <th className="px-4 py-3 font-semibold">Created</th>
            <th className="px-4 py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((b) => (
            <tr key={b.id} className="border-b border-muted-faint/20 dark:border-slate-700/60 last:border-0">
              <td className="px-4 py-3 text-ink dark:text-slate-100 font-medium">
                {b.name}
                {b.registrationNumber && (
                  <span className="ml-2 text-xs text-muted dark:text-slate-400">{b.registrationNumber}</span>
                )}
              </td>
              <td className="px-4 py-3 text-ink dark:text-slate-100">
                {b.ownerName ?? b.owner?.name ?? "—"}
                {b.owner?.phone && (
                  <span className="block text-xs text-muted dark:text-slate-400 tabular-nums">{b.owner.phone}</span>
                )}
              </td>
              <td className="px-4 py-3 text-muted dark:text-slate-400">{b.portLocation ?? "—"}</td>
              <td className="px-4 py-3 text-muted dark:text-slate-400 tabular-nums">{b._count.sessions}</td>
              <td className="px-4 py-3 text-muted dark:text-slate-400">{new Date(b.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "inline-flex rounded-md px-2 py-0.5 text-xs font-semibold",
                    b.isActive
                      ? "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                      : "bg-muted-faint/30 dark:bg-slate-700 text-muted dark:text-slate-400"
                  )}
                >
                  {b.isActive ? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
