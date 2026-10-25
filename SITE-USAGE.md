# Render site usage

## Current premium-theme revision

The current build contains **55,535,279 bytes (55.54 MB)** across 678 files. Images account for **54,952,434 bytes (54.95 MB)** across 662 files. Previous transfer measurements below describe the earlier 42-product catalog, not the current 205-product catalog. Monthly account usage is not publicly accessible.

## Previous deployment benchmark

Run `npm run build` then `node scripts/asset-report.mjs` for the deployed file footprint. This counts publish-directory files only, not Git history, audit documents, a database, or persistent disks. Images are bundled locally; visiting galleries transfers additional images.

Render’s public pricing, checked 25 October 2026 at https://render.com/pricing, lists 5 GB outbound bandwidth per month on Hobby, then $0.15/GB. Your workspace dashboard is authoritative for your plan and current monthly usage; a public website cannot reveal those account totals. The static app does not store uploaded screenshots or customer delivery information on a server. Screenshots are sent directly through Telegram.

Measured deployment footprint: **22,587,304 bytes (22.59 MB)** across 266 published files. Images: **22,357,734 bytes (22.36 MB)** across 257 files.

On 25 October 2026, the published catalog.js matched commit e04a59d byte-for-byte and /index.html matched the new build. A 390 × 844 cold mobile benchmark requested approximately **0.382 MB** initially and **2.964 MB** after scrolling through all 42 product cards. Opening color galleries transfers more. LIVE-TRANSFER.json records every measured asset. Chromium identified request paths locally; curl fetched their live Render equivalents with compression and verified TLS. These totals count response bodies only, exclude the externally hosted Telegram SDK, and are a benchmark rather than your account’s monthly billing meter. Some unchanged-path scripts were still serving their previous cached versions during the benchmark; matchesBuild flags record this. Render advertises a five-minute shared-cache lifetime.

The full photo collection is not downloaded on the homepage: lazy-loaded thumbnails and on-demand galleries keep initial transfers smaller. File footprint is distinct from monthly bandwidth consumption. Caching and browsing patterns affect consumption.
