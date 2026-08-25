/**
 * src/lib/announcements/htmlTemplate.ts
 *
 * PORTED from fisness/components/announcements/htmlTemplate.ts — see
 * bannerStyles.ts's header for why this is a duplicate, not a shared package.
 *
 * Wraps a developer-authored announcement body in the fixed banner
 * stylesheet before rendering — here, into the admin dashboard's live
 * preview iframe; in the app, into the WebView.
 */

import { BANNER_CONTENT_CSS, BANNER_FONTS_LINK } from "./bannerStyles";

const PLAY_ICON_SVG =
  '<svg width="19" height="19" viewBox="0 0 24 24" fill="#0d2536"><path d="M8 5v14l11-7z"/></svg>';

function escapeAttr(v: string): string {
  return v.replace(/"/g, "&quot;");
}

export function wrapAnnouncementHtml(bodyHtml: string, videoUrl?: string | null): string {
  const video = videoUrl
    ? `<a class="vid" href="${escapeAttr(videoUrl)}"><div class="play">${PLAY_ICON_SVG}</div><span class="lbl">Watch what's new</span></a>`
    : "";

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<link href="${BANNER_FONTS_LINK}" rel="stylesheet" />
<style>${BANNER_CONTENT_CSS}</style>
</head>
<body>
${bodyHtml}
${video}
</body>
</html>`;
}
