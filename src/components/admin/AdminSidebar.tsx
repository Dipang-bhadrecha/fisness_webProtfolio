"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Anchor, Building2, LogOut, Megaphone, Moon, ScrollText, Sun, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminSession } from "@/lib/admin/api";
import { useAdminTheme } from "@/lib/admin/AdminThemeContext";

// One entry per section — new ones are just another object here, not a
// rewrite of this component.
const NAV_ITEMS = [
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/boats", label: "Boats", icon: Anchor },
  { href: "/admin/companies", label: "Companies", icon: Building2 },
  { href: "/admin/audit-log", label: "Audit Log", icon: ScrollText },
];

export function AdminSidebar({ user, onLogout }: { user: AdminSession | null; onLogout: () => void }) {
  const pathname = usePathname();
  const { theme, toggle } = useAdminTheme();

  return (
    <aside className="w-64 shrink-0 border-r border-muted-faint/30 dark:border-slate-800 bg-cream dark:bg-slate-900 flex flex-col">
      <div className="px-6 py-6">
        <p className="font-display text-lg font-bold text-ink dark:text-slate-100">Fisness Admin</p>
        {user?.username && <p className="text-xs text-muted dark:text-slate-400 mt-0.5">{user.username}</p>}
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
                active
                  ? "bg-teal text-white"
                  : "text-ink dark:text-slate-200 hover:bg-teal/10 dark:hover:bg-teal/20"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-muted-faint/30 dark:border-slate-800 space-y-1">
        <button
          onClick={toggle}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted dark:text-slate-400 hover:text-ink dark:hover:text-slate-100 hover:bg-teal/10 dark:hover:bg-teal/20 transition-colors"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted dark:text-slate-400 hover:text-ink dark:hover:text-slate-100 hover:bg-teal/10 dark:hover:bg-teal/20 transition-colors"
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </aside>
  );
}
