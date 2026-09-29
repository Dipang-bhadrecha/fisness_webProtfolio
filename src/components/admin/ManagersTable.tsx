"use client";

import { cn } from "@/lib/utils";
import { GrantStatus, PlatformManagerGrant } from "@/lib/admin/api";

const STATUS_LABEL: Record<GrantStatus, string> = {
  ACTIVE: "Active",
  PENDING_CLAIM: "Pending",
  REVOKED: "Revoked",
};

const STATUS_CLASS: Record<GrantStatus, string> = {
  ACTIVE: "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  PENDING_CLAIM: "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400",
  REVOKED: "bg-muted-faint/30 dark:bg-slate-700 text-muted dark:text-slate-400",
};

// Which side(s) of the owner's business the grant reaches.
function reach(g: PlatformManagerGrant): string {
  const parts: string[] = [];
  if (g.appliesToBoat) parts.push("Boats");
  if (g.appliesToCompany) parts.push(g.companies.length ? g.companies.join(", ") : "All companies");
  return parts.length ? parts.join(" · ") : "—";
}

export function ManagersTable({ items }: { items: PlatformManagerGrant[] }) {
  if (items.length === 0) {
    return <p className="text-muted dark:text-slate-400 text-sm">No manager access matches.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-muted-faint/30 dark:border-slate-700 bg-white dark:bg-slate-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-muted-faint/30 dark:border-slate-700 text-left text-xs uppercase tracking-wide text-muted dark:text-slate-400">
            <th className="px-4 py-3 font-semibold">Manager</th>
            <th className="px-4 py-3 font-semibold">Granted by (owner)</th>
            <th className="px-4 py-3 font-semibold">Reaches</th>
            <th className="px-4 py-3 font-semibold">Permissions</th>
            <th className="px-4 py-3 font-semibold">Granted</th>
            <th className="px-4 py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((g) => (
            <tr key={g.id} className="border-b border-muted-faint/20 dark:border-slate-700/60 last:border-0">
              <td className="px-4 py-3 text-ink dark:text-slate-100 font-medium">
                <span className="tabular-nums">{g.managerPhone}</span>
                <span className="block text-xs font-normal text-muted dark:text-slate-400">
                  {g.managerName ?? g.manager?.name ?? "—"}
                </span>
              </td>
              <td className="px-4 py-3 text-ink dark:text-slate-100">
                {g.owner?.name ?? "—"}
                {g.owner?.phone && (
                  <span className="block text-xs text-muted dark:text-slate-400 tabular-nums">{g.owner.phone}</span>
                )}
              </td>
              <td className="px-4 py-3 text-muted dark:text-slate-400">{reach(g)}</td>
              <td className="px-4 py-3 text-muted dark:text-slate-400 tabular-nums">{g._count.permissions}</td>
              <td className="px-4 py-3 text-muted dark:text-slate-400">
                {new Date(g.createdAt).toLocaleDateString()}
                {g.claimedAt && (
                  <span className="block text-xs">claimed {new Date(g.claimedAt).toLocaleDateString()}</span>
                )}
              </td>
              <td className="px-4 py-3">
                <span className={cn("inline-flex rounded-md px-2 py-0.5 text-xs font-semibold", STATUS_CLASS[g.status])}>
                  {STATUS_LABEL[g.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
