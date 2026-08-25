"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminUser } from "@/lib/admin/api";

// One entry per section. Announcements is the only live one today — a
// future section (whatever "other things a founder manages" turns out to
// be) is one more object here, not a rewrite of this component.
const NAV_ITEMS = [{ href: "/admin/announcements", label: "Announcements", icon: Megaphone }];

export function AdminSidebar({ user, onLogout }: { user: AdminUser | null; onLogout: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-muted-faint/30 bg-cream flex flex-col">
      <div className="px-6 py-6">
        <p className="font-display text-lg font-bold text-ink">Fisness Admin</p>
        {user?.phone && <p className="text-xs text-muted mt-0.5">{user.phone}</p>}
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-teal text-white" : "text-ink hover:bg-teal/10"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-muted-faint/30">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:text-ink hover:bg-teal/10 transition-colors"
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </aside>
  );
}
