"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useAdminAuth } from "@/lib/admin/AdminAuthContext";
import { GRANT_STATUSES, Paginated, PlatformManagerGrant, listManagerGrants } from "@/lib/admin/api";
import { ManagersTable } from "@/components/admin/ManagersTable";

const LIMIT = 25;

const STATUS_OPTIONS: Record<string, string> = {
  ACTIVE: "Active",
  PENDING_CLAIM: "Pending",
  REVOKED: "Revoked",
};

const selectClass =
  "rounded-xl border border-muted-faint/50 dark:border-slate-700 bg-transparent px-3 py-2.5 text-sm text-ink dark:text-slate-100 focus:outline-none focus:border-teal";

export default function ManagersPage() {
  const { token } = useAdminAuth();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<Paginated<PlatformManagerGrant> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!token) return;
    listManagerGrants(token, { search: search || undefined, status: status || undefined, page, limit: LIMIT })
      .then(setResult)
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load manager access"));
  }, [token, search, status, page]);

  useEffect(() => {
    const t = setTimeout(() => setPage(1), 300);
    return () => clearTimeout(t);
  }, [search, status]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-ink dark:text-slate-100">Manager Access</h1>
        <div className="flex flex-wrap items-center gap-3">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass}>
            <option value="">All statuses</option>
            {GRANT_STATUSES.map((s) => (
              <option key={s} value={s}>{STATUS_OPTIONS[s]}</option>
            ))}
          </select>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-slate-400" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search manager or owner phone / name…"
              className="w-72 rounded-xl border border-muted-faint/50 dark:border-slate-700 bg-transparent py-2.5 pl-9 pr-3.5 text-sm text-ink dark:text-slate-100 focus:outline-none focus:border-teal"
            />
          </div>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {!result ? (
        <p className="text-sm text-muted dark:text-slate-400">Loading…</p>
      ) : (
        <>
          <ManagersTable items={result.data} />

          <div className="mt-4 flex items-center justify-between text-sm text-muted dark:text-slate-400">
            <p>{result.total.toLocaleString()} grants total</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="flex items-center gap-1 rounded-lg border border-muted-faint/50 dark:border-slate-700 px-3 py-1.5 disabled:opacity-40"
              >
                <ChevronLeft size={14} /> Prev
              </button>
              <span>Page {result.page} of {Math.max(1, result.totalPages)}</span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!result.hasMore}
                className="flex items-center gap-1 rounded-lg border border-muted-faint/50 dark:border-slate-700 px-3 py-1.5 disabled:opacity-40"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
