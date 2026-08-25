"use client";

import { useEffect, useState } from "react";
import { wrapAnnouncementHtml } from "@/lib/announcements/htmlTemplate";

export function AnnouncementPreview({ bodyHtml, videoUrl }: { bodyHtml: string; videoUrl: string | null }) {
  // Debounced so the iframe isn't fully reloading on every keystroke.
  const [debounced, setDebounced] = useState(bodyHtml);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(bodyHtml), 300);
    return () => clearTimeout(t);
  }, [bodyHtml]);

  return (
    <div>
      <p className="text-xs font-semibold text-muted mb-1.5">Live preview</p>
      <div className="rounded-2xl border border-muted-faint/30 bg-[#e9e5dc] p-5">
        <div
          className="mx-auto w-full max-w-[380px] overflow-hidden rounded-[26px] shadow-lg"
          style={{ aspectRatio: "9 / 16" }}
        >
          {/* allow-same-origin only, no allow-scripts — the founder is the
              only author, but the preview doesn't need to execute anything
              beyond CSS/markup to be useful, so no reason to grant more. */}
          <iframe
            key={videoUrl ?? ""}
            srcDoc={wrapAnnouncementHtml(debounced, videoUrl)}
            sandbox="allow-same-origin"
            className="h-full w-full border-0 bg-white"
            title="Announcement preview"
          />
        </div>
      </div>
    </div>
  );
}
