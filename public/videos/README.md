Drop feature screen-recordings here, one per feature:

`login_flow.mp4`, `boats_screen.mp4`, `crew_screen.mp4`, `tali_session.mp4`,
`kharchi_screen.mp4`, `ledger_screen.mp4`, `season_pnl.mp4`, `offline_sync.mp4`.

Referenced via `mediaSrc: "/videos/<file>"` on the matching entry in
`src/data/features.ts`. Until a file exists, `FeatureCoverflow` shows a
tinted placeholder (icon + filename) instead.
