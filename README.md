# Jiji Shop

English-only dark static storefront for Ethiopia and Telegram Mini App @jijietbot. No cart, backend, analytics or customer-data storage. The 205 products are grouped into Shoes (30), Clothes (60), Fragrances (20), Face care (20), Bags (25) and Watches & Sunglasses (50: 25 each).

## Current curation

All 95 bags, watches, sunglasses and face-care listings were replaced in the latest revision. Bags span six established brands: Coach, Kate Spade, Michael Kors, Longchamp, Marc Jacobs and Tory Burch. Watches use Seiko, Citizen, Bulova, Tissot, Wenger, Fossil and Skagen. Sunglasses favor classic dark aviator, rectangle and business styles from Ferragamo, MCM, Roberto Cavalli, Karl Lagerfeld, Coach, Kate Spade, Michael Kors, Calvin Klein and Ralph Lauren. Sport wraps, transparent chunky frames and novelty colors were removed from this selection.

Face care uses CeraVe, La Roche-Posay, Bioderma and Avène, with cleansers, moisturizers, sun protection, serums, eye care and a facial mist. Products with different pack sizes or multi-item sets are labeled explicitly. The women’s edit is merchandising, not a claim that skincare formulas can only be used by women. Source listings, availability, package/variant IDs and photographs are documented in CATALOG-SOURCES.json, ACCESSORY-SOURCES.md and FACE-CARE-SOURCES.md.

The owner explicitly chose to keep the source USD caps: bags $20–$200, watches at most $200, sunglasses at most $100. These budgets support premium alternatives, not genuine Rolex watches priced in thousands. No Rolex listing or counterfeit price was substituted. Tissot’s selected PRX is actual Tissot; similarly named Mathey-Tissot products are not relabeled as Tissot.

## Uniform pricing — all six categories

**Every offer is source USD ×190 ×0.90 = USD ×171, rounded once to whole ETB.** The earlier men’s extra 15% reduction and women’s 6,000 ETB floor are removed. There are no category-specific markups or artificial minimums. Lower-priced known skincare is allowed; Face care retains its 20,000 ETB ceiling. Fragrances keep the owner’s strictly-below-$200 source cap. Bags/watches/sunglasses caps are inclusive.

public/retail-pricing.mjs is the shared calculation. Other pricing modules validate their category’s limits. USD quotes are normalized to cents. The few retained EUR shoe quotes are first converted to USD cents using the stored EUR-per-USD snapshot in audit.fx.USD_EUR, then priced at USD ×171. Original EUR amounts and source quotes are retained for traceability. The previous market USD/ETB snapshot is historical provenance, not the storefront price rule.

Source quotes are dated snapshots, not a live inventory/price integration. Exact selected color/package offers determine product, delivery and payment amounts. Changing color clears an unavailable size and switches the photo gallery to the actual source color. No source rating or review count is invented. Source records do not independently inspect physical inventory or establish dealer affiliation.

## Browse order and sizing

All finds cycles one item per nonempty category: Shoes → Clothes → Fragrances → Face care → Bags → Watches & Sunglasses, then repeats with each category’s next item. Exhausted categories are skipped. Brand, audience and search filters run before interleaving. No items are duplicated or omitted. Watches & Sunglasses itself alternates watch, sunglasses, watch, sunglasses for all 50 default items. Filtering may remove a type; unrelated products are not inserted to force alternation.

Shoes offer merchant EU sizes 38–44 for men and 35–42 for women in every color, all enabled. These are merchant offerings, not source retailer inventory. Source variant/SKU IDs are null for those merchant size options; original sourceOffers and priceReferences remain in the audit. Display EU numbers directly for sizeSystem EU. Clothing retains S/M/L/XL across all colors from the owner’s stock confirmation. SIZING.md explains the distinction. There is no claim of 95% population coverage or a fit guarantee.

## Checkout

Continue to delivery shows a one-second preparing state and one-second “Order details ready” notice. It does not claim persistent order storage. Delivery asks only for recipient name, Ethiopian mobile, city/town and optional instructions. Inputs stay in page memory, are escaped/validated, and are cleared on pagehide. No browser storage, backend submission or customer details in Telegram URLs. No order-copy button.

Delivery defaults to tomorrow in Africa/Addis_Ababa. A calendar allows tomorrow or later; Gregorian/Ethiopian date labels stay synchronized on delivery/payment. Editing keeps the date; a new product resets it. **Jiji covers all delivery fees** appears immediately below Change delivery date on both screens, including after edits. The receipt records 0 ETB delivery.

Category return text comes from public/checkout-policies.mjs. Fit-based 7-day refunds apply only to unused shoes/clothes. Fragrances have sealed/unused conditions and help for damaged/leaking/incorrect bottles. Face care uses unopened/unused hygiene conditions and support for damaged/expired/incorrect items. Bags/sunglasses require unused condition and original tags/case/packaging. Watches mention faulty arrival; the merchant handles refunds/replacements manually.

Payment shows the exact selected photo/ETB amount. Telebirr **0953610009**, holder **Lykun**, with number copying. Bold instructions direct customers to pay and use the screenshot button to contact https://t.me/christianabe. No automatic payment verification or message sending. The larger confirmation text describes a manual Telegram reply.

The homepage has a text-only hero followed directly by Amazon-to-Ethiopia import help. The import button and “Talk to Jiji Admin” button open the same Telegram account. There is no homepage shoe feature, shoe-price banner or independent-shop footer paragraph. No external store links appear in customer-facing UI.

## Development, validation and deployment

Node.js 24; no app dependencies. `npm run dev` starts port 3000 (or PORT). `npm test` runs 33 checks. `npm run build` copies public to dist; `npm run measure` reports published file/image bytes. Keep the existing checkout; create a worktree only if requested. Restart the development server in future tasks.

Render: free Static Site, repository mikiscoffield/Jiji-shop, branch main, empty Root Directory, Build Command `npm run build`, Publish Directory `dist`. render.yaml describes the service. Verify actual live file hashes at https://jiji-shop.onrender.com/ after a push; CDN caching can briefly retain older files. SITE-USAGE.md distinguishes file footprint from account bandwidth totals.

BotFather: /setmenubutton → @jijietbot → Open shop → the Render HTTPS URL. Never put a bot token in public files. Telegram SDK readiness/expansion is optional; ordinary browser use also works.
