"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Announcement,
  AnnouncementInput,
  AnnouncementSeverity,
  AnnouncementType,
  createAnnouncement,
  updateAnnouncement,
} from "@/lib/admin/api";
import { AnnouncementPreview } from "./AnnouncementPreview";

const TYPES: AnnouncementType[] = ["WELCOME", "UPDATE", "NEWS"];
const SEVERITIES: AnnouncementSeverity[] = ["SOFT", "HARD"];

const inputClass =
  "w-full rounded-xl border border-muted-faint/50 px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-teal";

function toDatetimeLocal(iso: string | null | undefined): string {
  return iso ? iso.slice(0, 16) : "";
}

export function AnnouncementForm({ token, existing }: { token: string; existing?: Announcement }) {
  const router = useRouter();

  const [type, setType] = useState<AnnouncementType>(existing?.type ?? "NEWS");
  const [severity, setSeverity] = useState<AnnouncementSeverity | "">(existing?.severity ?? "");
  const [title, setTitle] = useState(existing?.title ?? "");
  const [summary, setSummary] = useState(existing?.summary ?? "");
  const [bodyHtml, setBodyHtml] = useState(existing?.bodyHtml ?? "");
  const [videoUrl, setVideoUrl] = useState(existing?.videoUrl ?? "");
  const [ctaLabel, setCtaLabel] = useState(existing?.ctaLabel ?? "");
  const [ctaUrl, setCtaUrl] = useState(existing?.ctaUrl ?? "");
  const [minAppVersion, setMinAppVersion] = useState(existing?.minAppVersion ?? "");
  const [startsAt, setStartsAt] = useState(toDatetimeLocal(existing?.startsAt));
  const [endsAt, setEndsAt] = useState(toDatetimeLocal(existing?.endsAt));
  const [priority, setPriority] = useState(existing?.priority ?? 0);
  const [isActive, setIsActive] = useState(existing?.isActive ?? true);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isUpdate = type === "UPDATE";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const payload: AnnouncementInput = {
      type,
      severity: isUpdate && severity ? severity : null,
      title,
      summary: summary || null,
      bodyHtml,
      videoUrl: videoUrl || null,
      ctaLabel: ctaLabel || null,
      ctaUrl: ctaUrl || null,
      minAppVersion: isUpdate && minAppVersion ? minAppVersion : null,
      startsAt: startsAt ? new Date(startsAt).toISOString() : null,
      endsAt: endsAt ? new Date(endsAt).toISOString() : null,
      priority: Number(priority),
      isActive,
    };

    try {
      if (existing) await updateAnnouncement(token, existing.id, payload);
      else await createAnnouncement(token, payload);
      router.push("/admin/announcements");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid items-start gap-8 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Type">
            <select value={type} onChange={(e) => setType(e.target.value as AnnouncementType)} className={inputClass}>
              {TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>
          {isUpdate && (
            <Field label="Severity">
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as AnnouncementSeverity)}
                required
                className={inputClass}
              >
                <option value="" disabled>Choose one</option>
                {SEVERITIES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
          )}
        </div>

        <Field label="Title (internal label, not shown to users)">
          <input value={title} onChange={(e) => setTitle(e.target.value)} required className={inputClass} />
        </Field>

        <Field label="Summary (feed teaser — NEWS only)">
          <input value={summary} onChange={(e) => setSummary(e.target.value)} className={inputClass} />
        </Field>

        <Field label="Body HTML">
          <textarea
            value={bodyHtml}
            onChange={(e) => setBodyHtml(e.target.value)}
            required
            rows={14}
            className={`${inputClass} font-mono text-xs leading-relaxed`}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Video URL">
            <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className={inputClass} />
          </Field>
          <Field label="CTA label">
            <input value={ctaLabel} onChange={(e) => setCtaLabel(e.target.value)} className={inputClass} />
          </Field>
        </div>

        <Field label="CTA URL">
          <input value={ctaUrl} onChange={(e) => setCtaUrl(e.target.value)} className={inputClass} />
        </Field>

        {isUpdate && (
          <Field label="Minimum app version (x.y.z)">
            <input
              value={minAppVersion}
              onChange={(e) => setMinAppVersion(e.target.value)}
              placeholder="1.3.0"
              required
              pattern="\d+\.\d+\.\d+"
              className={inputClass}
            />
          </Field>
        )}

        <div className="grid grid-cols-3 gap-4">
          <Field label="Starts at">
            <input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} className={inputClass} />
          </Field>
          <Field label="Ends at">
            <input type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} className={inputClass} />
          </Field>
          <Field label="Priority">
            <input
              type="number"
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
              className={inputClass}
            />
          </Field>
        </div>

        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          Active
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-ink px-6 py-3 font-semibold text-cream transition-colors hover:bg-teal disabled:opacity-50"
        >
          {saving ? "Saving…" : existing ? "Save changes" : "Create announcement"}
        </button>
      </form>

      <div className="lg:sticky lg:top-8">
        <AnnouncementPreview bodyHtml={bodyHtml} videoUrl={videoUrl || null} />
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted">{label}</span>
      {children}
    </label>
  );
}
