# Downloads

Installers linked from the website. Served as `/downloads/<file>`.

## FishToken Manager (Windows)

The `/fishtoken` page links to `FishToken-Manager-Setup-<version>.exe` here.

1. In `fisness_fishCut/fishCut-desktop`, bump `version` in `src-tauri/tauri.conf.json`,
   then tag and push (`git tag v0.1.1 && git push origin v0.1.1`). The
   "Build FishToken Manager (Windows)" workflow attaches
   `FishToken-Manager-Setup-<version>.exe` to the GitHub Release.
2. Download it from the Releases page (the repo is private) and put it in this folder.
3. Update `desktopInstaller` and `desktopVersion` in `src/data/fishtoken.ts`.
