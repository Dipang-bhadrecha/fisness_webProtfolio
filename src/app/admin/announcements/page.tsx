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
        <h1 className="font-display text-2xl font-bold text-ink">Announcements</h1>
        <Link
          href="/admin/announcements/new"
          className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-teal"
        >
          <Plus size={16} />
          New announcement
        </Link>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {!items ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : (
        <AnnouncementTable items={items} token={token!} onChanged={load} />
      )}
    </div>
  );
}
