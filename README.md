# Jiji Shop

English-only dark storefront for Ethiopia and Telegram Mini App @jijietbot. Prices are in ETB. No cart, database, analytics or server-side customer-data storage. All five departments remain: Shoes, Clothes, Makeup, Bags and Accessories.

The catalog contains 98 products: 30 shoes (15 men’s and 15 women’s), 60 clothing styles (30 per audience), three makeup products, two bags and three accessories. Clothing styles alternate men/women. Women: 26 dresses or skirts (86.7%), two fashion tops, one tailored pant and one blazer. Men: nine jackets, eleven hoodies and ten pants styles. No clothing T-shirts remain. The owner confirms S/M/L/XL from their own stock; source retailer availability is recorded separately where captured.

## Development

Use Node.js 24. No app dependencies are required. Run `npm run dev` (port 3000 or PORT), `npm test`, `npm run build`, and `npm run measure`. The build copies public/ to dist/. Use the existing checkout; do not create a worktree unless requested. Restart the development server in future tasks.

## Catalog, sizing and prices

Edit public/catalog.js and keep CATALOG-SOURCES.json consistent. department controls the five departments; category describes the style; audience controls Men/Women/Unisex filters. Brand filters are scoped to the chosen department. Every color has its own original product photos, offers and source references. No external store links appear in the customer UI. Real checked source ratings are retained where available; no consumer reviews are fabricated.

Shoes stay within 4,000–10,000 ETB; only three models reach 9,500 ETB. European labels map to original source SKU size keys through public/shoe-sizing.mjs and public/size-charts.mjs. SIZING.md and SIZE-CHART-SOURCES.json document conversion charts and clearly marked approximations. All whole EU sizes 35–47 are visible; unavailable source sizes are disabled. Do not invent source stock or exact size conversions.

Every men’s clothing offer is 15% below its converted base ETB price, rounded to the nearest birr. baseEtb and discountPercent preserve the calculation. Women’s clothes use premium merchant retail pricing: the maximum of the converted source price and a 6,000 ETB floor, within the existing 7,000 ETB ceiling. merchantPriceFloorEtb documents this. Original USD prices remain separate and unchanged; the public ETB price is the merchant’s retail price. Source snapshots are dated 25 October 2026, not live quotes. Import, shipping, tax and delivery costs are not implied by a source price.

Clothing sizes appear S, M, L, XL for every color. The owner’s stock determines clothing availability. For shoes, exact selected color/size offers supply checkout prices. Selecting a color updates its photo gallery, size choices and price, clearing an unavailable previous selection. Size-free items use an empty size key.

## Checkout and communication

Continue to delivery shows a one-second preparing state, then a one-second “Order details ready” notice. It does not claim a persistent order was saved. Closing the item cancels the transition. Every product’s delivery checkout prominently shows the requested fit-refund policy: “Does not fit? Get a refund within 7 days. If your item does not fit, return it within 7 days of delivery for a refund. The item must be unused.” The seller handles returns/refunds manually.

Delivery asks for recipient name, Ethiopian mobile number, city/town and optional instructions. No region, subcity, street or landmark fields. Inputs stay in page memory; there is no browser storage, server submission or Telegram URL containing customer details. Inputs are escaped and validated, and pagehide clears the checkout state. No order-copy button is present.

The default delivery day is tomorrow in Africa/Addis_Ababa. Change delivery date opens a calendar for tomorrow or later. Gregorian and Ethiopian dates stay synchronized on delivery/payment screens. Editing keeps the day; opening another item resets it.

Payment shows the selected-color photo above the exact ETB price, Telebirr **0953610009**, holder **Lykun**, and a number-copy button. Bold 22 px instructions ask customers to pay this number and send the screenshot using the button below. The Telegram button goes to https://t.me/christianabe; larger text says the seller will contact them on Telegram to confirm payment. This is manual payment verification, not an API integration.

The homepage contains a prominent Amazon-to-Ethiopia import request section for any product. Its button opens https://t.me/christianabe so customers can send the Amazon product link themselves. The footer’s former independent-shop paragraph is removed.

## Deploy

Render: New → Static Site, repository mikiscoffield/Jiji-shop, branch main, empty Root Directory, Build Command `npm run build`, Publish Directory `dist`. render.yaml describes the static service. Pushes trigger deployment when auto-deploy is enabled; verify actual live files at https://jiji-shop.onrender.com/. CDN caching can briefly retain the preceding version.

BotFather: /setmenubutton → @jijietbot → Open shop → the Render HTTPS URL. Never put a bot token in public files. The Telegram SDK signals readiness and expands the Mini App; ordinary browser use also works.

## Validation and usage

`npm test` runs 19 checks including catalog/source-photo hashes, exact prices and discount calculations, clothing counts/size coverage, no T-shirts, the women’s dress/skirt proportion, European labels and calendar boundaries. Browser checks cover galleries, import CTA, universal refund notice, delivery/payment and mobile layout. See IMAGE-SOURCES.md for provenance and SITE-USAGE.md for storage/transfer distinctions. Public site measurements cannot reveal the workspace’s actual monthly Render billing totals.
