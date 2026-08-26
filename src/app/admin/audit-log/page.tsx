"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAdminAuth } from "@/lib/admin/AdminAuthContext";
import { Paginated, PlatformAuditLogEntry, listAuditLog } from "@/lib/admin/api";
import { AuditLogTable } from "@/components/admin/AuditLogTable";

const LIMIT = 50;

export default function AuditLogPage() {
  const { token } = useAdminAuth();
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<Paginated<PlatformAuditLogEntry> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!token) return;
    listAuditLog(token, { page, limit: LIMIT })
      .then(setResult)
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load audit log"));
  }, [token, page]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink dark:text-slate-100 mb-6">Audit Log</h1>

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
