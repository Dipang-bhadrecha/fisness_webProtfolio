import type { Metadata } from "next";

import { AdminAuthProvider } from "@/lib/admin/AdminAuthContext";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Fisness Admin",
  // Kept out of search results — this is an internal tool, not a marketing page.
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}
