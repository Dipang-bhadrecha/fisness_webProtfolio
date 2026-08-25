"use client";

import { useAdminAuth } from "@/lib/admin/AdminAuthContext";
import { AdminLoginForm } from "./AdminLoginForm";
import { AdminSidebar } from "./AdminSidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { status, user, logout } = useAdminAuth();

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center text-muted text-sm">Loading…</div>;
  }

  if (status === "unauthed" || status === "forbidden") {
    return <AdminLoginForm forbidden={status === "forbidden"} />;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar user={user} onLogout={logout} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
