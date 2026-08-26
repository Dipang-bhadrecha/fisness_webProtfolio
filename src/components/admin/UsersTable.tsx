"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PlatformUser, setUserActive } from "@/lib/admin/api";

export function UsersTable({
  items,
  token,
  onChanged,
}: {
  items: PlatformUser[];
  token: string;
  onChanged: () => void;
}) {
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async (user: PlatformUser) => {
    const verb = user.isActive ? "Deactivate" : "Reactivate";
    if (!confirm(`${verb} ${user.phone}?`)) return;
    setError(null);
    setPendingId(user.id);
    try {
      await setUserActive(token, user.id, !user.isActive);
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update user");
    } finally {
      setPendingId(null);
    }
  };

  if (items.length === 0) {
    return <p className="text-muted dark:text-slate-400 text-sm">No users match.</p>;
  }

  return (
    <div>
      {error && <p className="text-sm text-red-600 dark:text-red-400 mb-3">{error}</p>}
      <div className="overflow-x-auto rounded-2xl border border-muted-faint/30 dark:border-slate-700 bg-white dark:bg-slate-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-muted-faint/30 dark:border-slate-700 text-left text-xs uppercase tracking-wide text-muted dark:text-slate-400">
              <th className="px-4 py-3 font-semibold">Phone</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Owner type</th>
              <th className="px-4 py-3 font-semibold">Joined</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {items.map((u) => (
              <tr key={u.id} className="border-b border-muted-faint/20 dark:border-slate-700/60 last:border-0">
                <td className="px-4 py-3 text-ink dark:text-slate-100 font-medium tabular-nums">
                  {u.phone}
                  {u.isAdmin && (
                    <span className="ml-2 inline-flex rounded-md bg-teal/10 dark:bg-teal/20 px-2 py-0.5 text-xs font-semibold text-teal dark:text-teal-light">
                      Admin
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-ink dark:text-slate-100">{u.name ?? "—"}</td>
                <td className="px-4 py-3 text-muted dark:text-slate-400">{u.ownerType ?? "—"}</td>
                <td className="px-4 py-3 text-muted dark:text-slate-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-md px-2 py-0.5 text-xs font-semibold",
                      u.isActive
                        ? "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                        : "bg-muted-faint/30 dark:bg-slate-700 text-muted dark:text-slate-400"
                    )}
                  >
                    {u.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleToggle(u)}
                      disabled={pendingId === u.id}
                      className="text-xs font-semibold text-muted dark:text-slate-400 hover:text-teal dark:hover:text-teal-light transition-colors disabled:opacity-40"
                    >
                      {u.isActive ? "Deactivate" : "Reactivate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
