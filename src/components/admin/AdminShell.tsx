"use client";

import { useAdminAuth } from "@/lib/admin/AdminAuthContext";
import { AdminLoginForm } from "./AdminLoginForm";
import { AdminSidebar } from "./AdminSidebar";
import { EnvironmentSwitcher } from "./EnvironmentSwitcher";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { status, user, logout } = useAdminAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <EnvironmentSwitcher />
      {status === "loading" ? (
        <div className="flex flex-1 items-center justify-center text-muted dark:text-slate-400 text-sm">
          Loading…
        </div>
      ) : status === "unauthed" ? (
        <AdminLoginForm />
      ) : (
        <div className="flex flex-1">
          <AdminSidebar user={user} onLogout={logout} />
          <main className="flex-1 p-8 bg-cream dark:bg-slate-900">{children}</main>
        </div>
      )}
    </div>
  );
}
