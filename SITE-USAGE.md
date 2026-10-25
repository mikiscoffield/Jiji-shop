# Render site usage

Run `npm run build` then `node scripts/asset-report.mjs` for the deployed file footprint. This counts publish-directory files only, not Git history, audit documents, a database, or persistent disks. Images are bundled locally; visiting galleries transfers additional images.

Render’s public pricing, checked 25 October 2026 at https://render.com/pricing, lists 5 GB outbound bandwidth per month on Hobby, then $0.15/GB. Your workspace dashboard is authoritative for your plan and current monthly usage; a public website cannot reveal those account totals. The static app does not store uploaded screenshots or customer delivery information on a server. Screenshots are sent directly through Telegram.

Live transfer measurements will be recorded after verifying deployment at https://jiji-shop.onrender.com/. File footprint is distinct from monthly bandwidth consumption. Caching and browsing patterns affect consumption.
