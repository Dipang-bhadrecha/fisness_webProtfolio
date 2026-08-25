import Link from "next/link";
import { Megaphone } from "lucide-react";

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink mb-6">Dashboard</h1>
      <Link
        href="/admin/announcements"
        className="flex items-center gap-4 rounded-2xl border border-muted-faint/30 bg-white p-6 max-w-sm hover:border-teal transition-colors"
      >
        <div className="rounded-xl bg-teal/10 p-3">
          <Megaphone className="text-teal" size={22} />
        </div>
        <div>
          <p className="font-semibold text-ink">Announcements</p>
          <p className="text-sm text-muted">Welcome, update and news banners</p>
        </div>
      </Link>
    </div>
  );
}
