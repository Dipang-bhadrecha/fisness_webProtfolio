"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useAdminAuth } from "@/lib/admin/AdminAuthContext";
import { AUDIT_METHODS, AUDIT_RESOURCES, Paginated, PlatformAuditLogEntry, listAuditLog } from "@/lib/admin/api";
import { AuditLogTable } from "@/components/admin/AuditLogTable";

const LIMIT = 50;

const selectClass =
  "rounded-xl border border-muted-faint/50 dark:border-slate-700 bg-transparent px-3 py-2.5 text-sm text-ink dark:text-slate-100 focus:outline-none focus:border-teal";

export default function AuditLogPage() {
  const { token } = useAdminAuth();
  const [phone, setPhone] = useState("");
  const [resource, setResource] = useState("");
  const [method, setMethod] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<Paginated<PlatformAuditLogEntry> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!token) return;
    listAuditLog(token, {
      page,
      limit: LIMIT,
      phone: phone || undefined,
      resource: resource || undefined,
      method: method || undefined,
    })
      .then(setResult)
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load audit log"));
  }, [token, page, phone, resource, method]);

  // Debounce the phone text input; dropdown changes reset the page immediately.
  useEffect(() => {
    const t = setTimeout(() => setPage(1), 300);
    return () => clearTimeout(t);
  }, [phone]);

  useEffect(() => {
    setPage(1);
  }, [resource, method]);

  useEffect(() => {
    load();
  }, [load]);

  const hasFilters = phone || resource || method;
  const clearFilters = () => {
    setPhone("");
    setResource("");
    setMethod("");
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-ink dark:text-slate-100">Audit Log</h1>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-slate-400" size={16} />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Filter by phone…"
              className="w-48 rounded-xl border border-muted-faint/50 dark:border-slate-700 bg-transparent py-2.5 pl-9 pr-3.5 text-sm text-ink dark:text-slate-100 focus:outline-none focus:border-teal"
            />
          </div>

          <select value={resource} onChange={(e) => setResource(e.target.value)} className={selectClass}>
            <option value="">All resources</option>
            {AUDIT_RESOURCES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          <select value={method} onChange={(e) => setMethod(e.target.value)} className={selectClass}>
            <option value="">All methods</option>
            {AUDIT_METHODS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-xs font-semibold text-muted dark:text-slate-400 hover:text-teal dark:hover:text-teal-light transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {!result ? (
        <p className="text-sm text-muted dark:text-slate-400">Loading…</p>
      ) : (
        <>
          <AuditLogTable items={result.data} />

          <div className="mt-4 flex items-center justify-between text-sm text-muted dark:text-slate-400">
            <p>{result.total.toLocaleString()} entries total</p>
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
