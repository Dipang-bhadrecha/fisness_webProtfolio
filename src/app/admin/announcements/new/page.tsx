"use client";

import { useAdminAuth } from "@/lib/admin/AdminAuthContext";
import { AnnouncementForm } from "@/components/admin/AnnouncementForm";

export default function NewAnnouncementPage() {
  const { token } = useAdminAuth();
  if (!token) return null;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink mb-6">New announcement</h1>
      <AnnouncementForm token={token} />
    </div>
  );
}
