"use client";

import Link from "next/link";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Announcement, deleteAnnouncement } from "@/lib/admin/api";

const TYPE_BADGE: Record<string, string> = {
  WELCOME: "bg-teal/10 text-teal",
  UPDATE: "bg-amber-100 text-amber-700",
  NEWS: "bg-emerald-100 text-emerald-700",
};

export function AnnouncementTable({
  items,
  token,
  onChanged,
}: {
  items: Announcement[];
  token: string;
  onChanged: () => void;
}) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    setError(null);
    setDeletingId(id);
    try {
      await deleteAnnouncement(token, id);
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete");
    } finally {
      setDeletingId(null);
    }
  };

  if (items.length === 0) {
    return <p className="text-muted text-sm">No announcements yet.</p>;
  }

  return (
    <div>
      {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
      <div className="overflow-x-auto rounded-2xl border border-muted-faint/30 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-muted-faint/30 text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Priority</th>
              <th className="px-4 py-3 font-semibold">Updated</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={a.id} className="border-b border-muted-faint/20 last:border-0">
                <td className="px-4 py-3">
                  <span className={cn("inline-flex rounded-md px-2 py-0.5 text-xs font-semibold", TYPE_BADGE[a.type])}>
                    {a.type}
                    {a.severity ? ` · ${a.severity}` : ""}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink font-medium">{a.title}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-md px-2 py-0.5 text-xs font-semibold",
                      a.isActive ? "bg-emerald-100 text-emerald-700" : "bg-muted-faint/30 text-muted"
                    )}
                  >
                    {a.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted tabular-nums">{a.priority}</td>
                <td className="px-4 py-3 text-muted">{new Date(a.updatedAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/announcements/${a.id}/edit`} className="text-muted hover:text-teal transition-colors">
                      <Pencil size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(a.id, a.title)}
                      disabled={deletingId === a.id}
                      className="text-muted hover:text-red-600 transition-colors disabled:opacity-40"
                    >
                      <Trash2 size={16} />
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
