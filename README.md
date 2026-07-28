# raeen-site

Official website for [Raeen](https://github.com/Whoisraeen/Raeen), the clean-room
open-source PS5 emulator written in Rust.

- **Downloads** — fetched live from the Raeen GitHub Releases API in the browser;
  publishing a release updates the site with zero deploys.
- **Compatibility** — searchable database of 629 real PS5 title IDs (269 titles),
  with statuses backed only by recorded emulator runs (`data/status-overrides.json`).
- **Static export** — `next build` emits `out/`; deployed to GitHub Pages by
  `.github/workflows/deploy.yml`.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
```

## Update compatibility data

1. Edit `data/status-overrides.json` — one entry per *recorded* run (never guess a status).
2. `node scripts/build-titles.mjs` regenerates `data/titles.json`.
3. Commit both.

Title-ID metadata originates from the public
[`1jtp8sobiu/ps5-pkg`](https://github.com/1jtp8sobiu/ps5-pkg) `PS5_TITLE_ID.tsv`
(factual title/region data), plus Minecraft's PS5 title ID from public trackers.

## Deploy notes

`NEXT_PUBLIC_BASE_PATH=/raeen-site` is set in the workflow for GitHub Pages
project hosting. Unset it (or change it) for a custom domain.

Raeen and this site are not affiliated with Sony Interactive Entertainment.
"PS5" and "PlayStation" are trademarks of Sony Interactive Entertainment Inc.
