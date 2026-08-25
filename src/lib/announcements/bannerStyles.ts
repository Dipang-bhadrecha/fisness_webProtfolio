/**
 * src/lib/announcements/bannerStyles.ts
 *
 * PORTED from fisness/components/announcements/bannerStyles.ts (the mobile
 * app repo). Zero React Native dependencies there, so this is a straight
 * copy — kept as a duplicate on purpose rather than a shared package, since
 * it's two small framework-agnostic files with exactly one consumer here
 * (the admin dashboard's live preview iframe). If the banner stylesheet
 * changes in the app, this file must be updated by hand to match — there is
 * no automated sync.
 *
 * The fixed class vocabulary an announcement's bodyHtml is authored against.
 * Deliberately excludes native-chrome-only classes (.phone/.screen/.status/
 * .home/.qa/.bcard/.scrim/.banner/.card/.nativeX/.cta/.btn/.hint) — those are
 * rebuilt as real RN views in the app, not part of what a banner's HTML uses.
 */

export const BANNER_FONTS_LINK =
  "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800&family=Noto+Sans+Gujarati:wght@500;600;700;800&display=swap";

export const BANNER_COLORS = {
  dark: "#0d2536",
  dark2: "#153347",
  teal: "#1a7a8a",
  tealDeep: "#106070",
  cream: "#faf6ec",
  line: "#e7ddc7",
  ink: "#22303d",
  ink2: "#6b7c8a",
  green: "#1e7e48",
  red: "#c0392b",
} as const;

export const BANNER_CONTENT_CSS = `
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
html,body{background:${BANNER_COLORS.cream};font-family:'Noto Sans',sans-serif}
.gj{font-family:'Noto Sans Gujarati','Noto Sans',sans-serif}
a{color:${BANNER_COLORS.tealDeep};text-decoration:none}

.hero{background:linear-gradient(155deg,#12617a,${BANNER_COLORS.dark} 85%);padding:26px 22px 24px;color:#fff;position:relative;overflow:hidden}
.hero::after{content:"";position:absolute;right:-40px;bottom:-60px;width:180px;height:180px;border-radius:180px;background:rgba(95,184,201,.14)}
.hero .kicker{font-size:10px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;color:#7fd0de}
.hero h1{font-size:25px;font-weight:800;line-height:1.28;letter-spacing:-.4px;margin-top:9px}
.hero h1 .en{display:block;font-size:14px;font-weight:600;color:#b9d8e0;letter-spacing:0;margin-top:6px;line-height:1.4}

.hardhero{background:linear-gradient(155deg,#8c2f22,#3d1710 85%)}
.hardhero .kicker{color:#f0b4a8}
.hardhero h1 .en{color:#e8bdb4}

.newshero{background:linear-gradient(155deg,#1c6b4a,#0d2b20 85%)}
.newshero .kicker{color:#8ad8b2}
.newshero h1 .en{color:#b4dcc7}

.body{padding:20px 22px 0}
.body p{font-size:13.5px;line-height:1.65;color:#4a5a67}
.body p+p{margin-top:11px}
.body p b{color:${BANNER_COLORS.ink}}

.trial{margin:18px 22px 0;background:#fff;border:1.5px solid ${BANNER_COLORS.line};border-radius:16px;padding:14px}
.trial .th{display:flex;align-items:center;gap:9px}
.trial .th b{font-size:13px;color:${BANNER_COLORS.ink};font-weight:800}
.trial .badge{margin-left:auto;font-size:9.5px;font-weight:800;color:#fff;background:${BANNER_COLORS.green};padding:3px 9px;border-radius:20px;text-transform:uppercase;letter-spacing:.4px}
.trial ul{list-style:none;margin-top:11px;display:flex;flex-direction:column;gap:8px}
.trial li{font-size:12.5px;color:#4a5a67;display:flex;gap:9px;align-items:flex-start;line-height:1.45}
.trial li svg{flex-shrink:0;margin-top:2px}

.sign{padding:18px 22px 22px;display:flex;align-items:center;gap:11px}
.sign i{width:38px;height:38px;border-radius:38px;background:linear-gradient(150deg,${BANNER_COLORS.teal},${BANNER_COLORS.dark});flex-shrink:0;display:block}
.sign .n{font-size:12.5px;font-weight:800;color:${BANNER_COLORS.ink}}
.sign .r{font-size:10.5px;color:${BANNER_COLORS.ink2};margin-top:1px}

.vid{margin:18px 22px 0;border-radius:16px;overflow:hidden;background:${BANNER_COLORS.dark};position:relative;height:158px;display:flex;align-items:center;justify-content:center}
.vid .play{width:52px;height:52px;border-radius:52px;background:rgba(255,255,255,.92);display:flex;align-items:center;justify-content:center}
.vid .lbl{position:absolute;left:12px;bottom:10px;font-size:10px;font-weight:700;color:#fff;background:rgba(0,0,0,.45);padding:3px 8px;border-radius:6px}

.whatsnew{margin:16px 22px 0;display:flex;flex-direction:column;gap:9px}
.wn{display:flex;gap:11px;align-items:flex-start}
.wn i{width:26px;height:26px;border-radius:9px;background:rgba(26,122,138,.12);flex-shrink:0;display:flex;align-items:center;justify-content:center}
.wn b{font-size:12.5px;color:${BANNER_COLORS.ink};font-weight:700;display:block}
.wn span{font-size:11.5px;color:${BANNER_COLORS.ink2};line-height:1.45;display:block;margin-top:1px}

.verrow{margin:16px 22px 0;background:#fff;border:1.5px solid ${BANNER_COLORS.line};border-radius:14px;padding:11px 13px;display:flex;align-items:center;gap:10px;font-variant-numeric:tabular-nums}
.verrow .v{font-size:12.5px;font-weight:800;color:${BANNER_COLORS.ink2}}
.verrow .v.new{color:${BANNER_COLORS.tealDeep}}
.verrow .arw{color:#b8ae97}
.verrow .sz{margin-left:auto;font-size:10.5px;color:${BANNER_COLORS.ink2};font-weight:600}

.lockrow{margin:18px 22px 0;background:#fdf0ed;border:1.5px solid #f2d3cb;border-radius:14px;padding:12px 13px;display:flex;gap:10px;align-items:flex-start}
.lockrow b{font-size:12px;color:#8c2f22;font-weight:800;display:block}
.lockrow span{font-size:11.5px;color:#a35a4c;line-height:1.45;display:block;margin-top:2px}

.schemebox{margin:18px 22px 0;background:#fff;border:1.5px solid ${BANNER_COLORS.line};border-radius:16px;overflow:hidden}
.schemebox .sh{padding:12px 14px;border-bottom:1.5px solid ${BANNER_COLORS.line};display:flex;align-items:center;gap:9px}
.schemebox .sh b{font-size:12.5px;color:${BANNER_COLORS.ink};font-weight:800}
.kv{display:flex;padding:10px 14px;font-size:12px;border-bottom:1px solid #f0ebde}
.kv:last-child{border-bottom:none}
.kv span{color:${BANNER_COLORS.ink2};width:104px;flex-shrink:0;font-weight:600}
.kv b{color:${BANNER_COLORS.ink};font-weight:700}
.kv b.hi{color:${BANNER_COLORS.green}}

img,video{max-width:100%}
`;
