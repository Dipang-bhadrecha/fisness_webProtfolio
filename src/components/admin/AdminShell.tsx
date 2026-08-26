"use client";

import { useAdminAuth } from "@/lib/admin/AdminAuthContext";
import { AdminLoginForm } from "./AdminLoginForm";
import { AdminSidebar } from "./AdminSidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { status, user, logout } = useAdminAuth();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted dark:text-slate-400 text-sm">
        Loading…
      </div>
    );
  }

  if (status === "unauthed") {
    return <AdminLoginForm />;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar user={user} onLogout={logout} />
      <main className="flex-1 p-8 bg-cream dark:bg-slate-900">{children}</main>
    </div>
  );
}
