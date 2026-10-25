# Jiji Shop

English-only dark storefront for Ethiopia and Telegram Mini App @jijietbot. Prices are in ETB. No cart, database, analytics or server-side customer-data storage. All six departments remain: Shoes, Clothes, Fragrances, Face care, Bags and Accessories.

The catalog contains 135 products: 30 shoes (15 men’s and 15 women’s), 60 clothing styles (30 per audience), 20 fragrances, 20 face-care products, two bags and three accessories. Clothing styles alternate men/women. Women: 26 dresses or skirts (86.7%), two fashion tops, one tailored pant and one blazer. Men: nine jackets, eleven hoodies and ten pants styles. No clothing T-shirts remain. The owner confirms S/M/L/XL from their own stock; source retailer availability is recorded separately where captured.

## Development

Use Node.js 24. No app dependencies are required. Run `npm run dev` (port 3000 or PORT), `npm test`, `npm run build`, and `npm run measure`. The build copies public/ to dist/. Use the existing checkout; do not create a worktree unless requested. Restart the development server in future tasks.

## Catalog, sizing and prices

Edit public/catalog.js and keep CATALOG-SOURCES.json consistent. department controls the six departments; category describes the style; audience controls Men/Women/Unisex filters. Brand filters are scoped to the chosen department. Every color has its own original product photos, offers and source references. No external store links appear in the customer UI. Real checked source ratings are retained where available; no consumer reviews are fabricated.

Shoes stay within 4,000–10,000 ETB; only three models reach 9,500 ETB. Every color offers selectable merchant EU sizes **38–44 for men and 35–42 for women**, respecting the owner’s requested upper limits. These are the shop’s offered EU sizes, independent of a source retailer’s size inventory. public/shoe-sizing.mjs displays merchant EU numbers directly; it retains legacy brand conversion helpers for archived source references. Source SKU IDs are never invented for merchant sizes: sourceOffers and priceReferences in the audit retain original quotes, while merchant offers have null source variant/SKU IDs. Each color keeps one shop price across its EU sizes based on its prior lowest source-size quote. No population percentage or fit guarantee is claimed. SIZING.md explains the distinction.

Every men’s clothing offer is 15% below its converted base ETB price, rounded to the nearest birr. baseEtb and discountPercent preserve the calculation. Women’s clothes use premium merchant retail pricing: the maximum of the converted source price and a 6,000 ETB floor, within the existing 7,000 ETB ceiling. merchantPriceFloorEtb documents this. Original USD prices remain separate and unchanged; the public ETB price is the merchant’s retail price. Source snapshots are dated 25 October 2026, not live quotes. Source quotes do not establish import/tax costs. Customer delivery is free: Jiji covers all delivery fees.

Clothing sizes appear S, M, L, XL for every color. The owner’s stock determines clothing availability. For shoes, the selected merchant EU size and color offer supplies the checkout price. Selecting a color updates its photo gallery, size choices and price, clearing an unavailable previous selection. Size-free items use an empty size key.

## Checkout and communication

Continue to delivery shows a one-second preparing state, then a one-second “Order details ready” notice. It does not claim a persistent order was saved. Closing the item cancels the transition. Every product’s delivery checkout shows a category-specific return policy from public/checkout-policies.mjs. Fit-based 7-day refunds apply only to unused shoes and clothes. Fragrances have sealed/unused conditions and support for damaged, leaking or incorrect bottles. Face care uses unopened/unused hygiene conditions and support for damaged, expired or incorrect items. Bags and sunglasses have unused/original-packaging return conditions. Watches mention faulty-on-arrival items; jewelry requires unopened/unworn condition. Return/refund processing remains manual.

Delivery asks for recipient name, Ethiopian mobile number, city/town and optional instructions. No region, subcity, street or landmark fields. Inputs stay in page memory; there is no browser storage, server submission or Telegram URL containing customer details. Inputs are escaped and validated, and pagehide clears the checkout state. No order-copy button is present.

The default delivery day is tomorrow in Africa/Addis_Ababa. Both delivery and payment show “Jiji covers all delivery fees.” immediately below Change delivery date; date edits retain this note. The order receipt records a 0 ETB delivery fee. Change delivery date opens a calendar for tomorrow or later. Gregorian and Ethiopian dates stay synchronized on delivery/payment screens. Editing keeps the day; opening another item resets it.

Payment shows the selected-color photo above the exact ETB price, Telebirr **0953610009**, holder **Lykun**, and a number-copy button. Bold 22 px instructions ask customers to pay this number and send the screenshot using the button below. The Telegram button goes to https://t.me/christianabe; larger text says the seller will contact them on Telegram to confirm payment. This is manual payment verification, not an API integration.

The homepage contains a prominent Amazon-to-Ethiopia import request section for any product. Its button opens https://t.me/christianabe so customers can send the Amazon product link themselves. The footer’s former independent-shop paragraph is removed.

## Deploy

Render: New → Static Site, repository mikiscoffield/Jiji-shop, branch main, empty Root Directory, Build Command `npm run build`, Publish Directory `dist`. render.yaml describes the static service. Pushes trigger deployment when auto-deploy is enabled; verify actual live files at https://jiji-shop.onrender.com/. CDN caching can briefly retain the preceding version.

BotFather: /setmenubutton → @jijietbot → Open shop → the Render HTTPS URL. Never put a bot token in public files. The Telegram SDK signals readiness and expands the Mini App; ordinary browser use also works.

## Validation and usage

`npm test` runs 28 checks including catalog/source-photo hashes, exact prices and discount calculations, clothing counts/size coverage, no T-shirts, the women’s dress/skirt proportion, European labels and calendar boundaries. Browser checks cover galleries, import CTA, universal refund notice, delivery/payment and mobile layout. See IMAGE-SOURCES.md for provenance and SITE-USAGE.md for storage/transfer distinctions. Public site measurements cannot reveal the workspace’s actual monthly Render billing totals.

## Fragrances and homepage

Fragrances appears immediately after Clothes. There are 20 full-bottle products from recognized designer and niche brands. Every selected USD source quote is below $200. Fragrance ETB prices follow the owner’s exact rule: **USD ×190, less 10% = USD ×171**, rounded once to a whole birr. This overrides the earlier market-rate fragrance conversion and does not alter other departments’ price rules. The new prices range from 10,260 to 32,490 ETB. FRAGRANCE-SOURCES.md lists all bottles, concentrations, USD prices and resulting ETB amounts. Samples, decants, testers and refill-only offers are excluded. Actual published retailer ratings appear only where checked; there is no invented ranking or rating. Bottle photos can represent multiple volumes; the selected ml amount is explicit. Source prices/availability are dated snapshots. Clothing and the other non-shoe/non-fragrance departments are unchanged, including available S/M/L/XL for all clothing colors.

The homepage introduction is text only: the shoe picture, “A fresh point of view” feature and hero note are removed. Amazon-to-Ethiopia is the next section directly after Explore the collection. The benefits no longer show the shoe price range. The help button reads “Talk to Jiji Admin” and still opens the same Telegram account.

## Face care

Face care replaces Makeup, with 20 official-brand products: four sunscreens, four cleansers, four moisturizers, four serums, two toners and two eye-care products. Sixteen are in the women’s edit and four are unisex; audience labels describe merchandising, not women-only formulas. Sources are Naturium, EltaMD, Supergoop!, Beauty of Joseon, Skinfix, First Aid Beauty, cocokind and DRMTLGY.

Every SKU price is checked in USD and priced with the same merchant rule as fragrances: USD ×190 ×0.90 = USD ×171, rounded once at the end, constrained to 3,000–20,000 ETB. The selected prices are 3,078–11,799 ETB. Shared math lives in public/retail-pricing.mjs; public/face-care-pricing.mjs enforces the face-care band. FACE-CARE-SOURCES.md records source prices and selected package sizes. Exact package labels are used where supplied; default-title source units are labeled standard containers without inventing a volume. Photos are original manufacturer images. No efficacy guarantees or fabricated ratings are added. Other catalog departments are unchanged.
