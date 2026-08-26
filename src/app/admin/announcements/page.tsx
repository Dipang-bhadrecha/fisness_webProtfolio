"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useAdminAuth } from "@/lib/admin/AdminAuthContext";
import { Announcement, listAllAnnouncements } from "@/lib/admin/api";
import { AnnouncementTable } from "@/components/admin/AnnouncementTable";

export default function AnnouncementsPage() {
  const { token } = useAdminAuth();
  const [items, setItems] = useState<Announcement[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!token) return;
    listAllAnnouncements(token)
      .then(setItems)
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load"));
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink dark:text-slate-100">Announcements</h1>
        <Link
          href="/admin/announcements/new"
          className="inline-flex items-center gap-2 rounded-xl bg-ink dark:bg-teal-light px-4 py-2.5 text-sm font-semibold text-cream dark:text-slate-900 transition-colors hover:bg-teal dark:hover:bg-teal"
        >
          <Plus size={16} />
          New announcement
        </Link>
      </div>

      {error && <p className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {!items ? (
        <p className="text-sm text-muted dark:text-slate-400">Loading…</p>
      ) : (
        <AnnouncementTable items={items} token={token!} onChanged={load} />
      )}
    </div>
  );
}
