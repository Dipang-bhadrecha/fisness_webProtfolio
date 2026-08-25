"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAdminAuth } from "@/lib/admin/AdminAuthContext";
import { Announcement, listAllAnnouncements } from "@/lib/admin/api";
import { AnnouncementForm } from "@/components/admin/AnnouncementForm";

export default function EditAnnouncementPage() {
  const { token } = useAdminAuth();
  const params = useParams<{ id: string }>();
  // No GET /:id route exists on the backend — the list this admin tool deals
  // with is small and capped, so finding the row in the full list (already
  // needed for the table screen) is simpler than adding a single-item route.
  const [item, setItem] = useState<Announcement | null | undefined>(undefined);

  useEffect(() => {
    if (!token) return;
    listAllAnnouncements(token).then((all) => {
      setItem(all.find((a) => a.id === params.id) ?? null);
    });
  }, [token, params.id]);

  if (item === undefined) return <p className="text-sm text-muted">Loading…</p>;
  if (item === null) return <p className="text-sm text-red-600">Announcement not found.</p>;
  if (!token) return null;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink mb-6">Edit announcement</h1>
      <AnnouncementForm token={token} existing={item} />
    </div>
  );
}
