# Jiji Shop

An English-only static storefront for Ethiopia and Telegram Mini Apps. All five departments remain: **Shoes, Clothes, Makeup, Bags, Accessories**. There are 42 products: 30 shoes (15 men’s and 15 women’s, interleaved), four clothing styles, three makeup products, two bags and three accessories. Men’s shoe brands are Nike, Jordan, Adidas and Reebok. Women’s brands are Steve Madden, Nine West, Adidas and Reebok, including six boots, six heels, one flat sandal and two sneakers. Original product photos come from brands and established retailers; source websites and exact variants are recorded in CATALOG-SOURCES.json. All 12 non-shoe product records are unchanged.

The shop uses a charcoal/mint dark theme, including dialogs, inputs and the delivery-date calendar. Original product photography keeps its colors. No cart, database, analytics or customer data storage. Delivery details are entered before payment and held temporarily in page memory. Customers share their contact and delivery details directly in Telegram; the website does not send them automatically.

## Run and build

Use Node.js 24. No dependency installation is needed.

```sh
npm run dev
npm run build
```

The development server uses port 3000 (or PORT); the build copies public/ to dist/. Use the existing checkout. Each cloud task is isolated, so do not create a worktree unless requested. Restart the development server in future tasks.

## Catalog and filters

Edit public/catalog.js. `department` controls the five product categories; `category` describes a style within a department; `audience` is Men, Women or Unisex. Audience and brand filters work within the selected department. Switching departments resets the brand filter so a shoe brand cannot hide bags or beauty products.

Products declare actual brand model names, color-specific image galleries, `offers` indexed by color and size, and a `sizeLabel`. **Footwear displays European sizes** through public/shoe-sizing.mjs while retaining original source-size keys internally for exact pricing. Nine West and Steve Madden use their published charts; additional Nike, Jordan, Adidas and Reebok charts are in public/size-charts.mjs. Sizes outside verified tables are marked approximate. SIZING.md records the mappings and limitations. Only variants that were available in the fetched brand-store snapshot and fit the price range are offered; this is not confirmation of the seller’s Ethiopian inventory. Changing color updates both available sizes and price. An unavailable previous size is cleared. The exact selected color/size offer supplies the amount at payment. Size-free products use an empty size key.

`CATALOG-SOURCES.json` records each official source URL, source product/variant IDs, source USD price, converted ETB price, review score/count where available, image URLs, file hashes and capture date. Prices were checked on **25 October 2026** and converted at **1 USD = 161.874143 ETB**, using https://open.er-api.com/v6/latest/USD (published 25 October 2026). Amounts are rounded to the nearest whole birr. All current offers fall within 4,000–10,000 ETB for shoes (other categories retain their existing prices). No shipping, tax, import charge or local delivery fee is included. Prices are static dated snapshots; they do not auto-refresh or establish a guaranteed supplier quote. Recheck sourcing and seller stock before taking payment.

`public/catalog-logic.mjs` centralizes size availability, exact offer selection and price ranges. Cards show “From” only where the listed offers have different prices. Customer-facing brand/store links are removed. Source listing URLs and exact variant IDs remain in the maintainer audit only. Review stars are shown only for a colorway with a checked aggregate rating in the source structured data. Review counts remain visible; missing ratings are omitted.

There are **245 locally bundled brand images** (248 catalog references because a few images are shared). Galleries contain real matching colors and angles, up to five photos per color. Multi-color image association uses source variant image IDs and manufacturer color image codes. Unrelated angles and simulated recoloring are not used. All obsolete placeholder/demo images were removed. IMAGE-SOURCES.md describes provenance and the limits of photo-based verification.

## Delivery and payment

After selecting a product's size/color, the customer must complete delivery details before opening Telebirr instructions:

- Required: recipient name, Ethiopian mobile number, and city/town.
- Optional: delivery instructions. Region, sub-city, street address and landmark fields are removed.
- Ethiopian numbers beginning with 09, 07, +2519, +2517, 002519 or 002517 are accepted; spaces, parentheses and hyphens are normalized.

The on-screen privacy paragraph and availability-confirmation prompts have been removed as requested. Data handling is unchanged: the form uses no network submission, database, localStorage or sessionStorage. Browser autocomplete is disabled. Inputs are validated, trimmed, and displayed as escaped text. Delivery state stays in memory until a different product is opened or the page is left/reloaded; the pagehide handler clears delivery/payment content. This does not control platform-level browser or operating-system behavior.

After a valid item selection, **Continue to delivery** is disabled for one second and shows a preparing state. A brief **Order details ready** message then appears for one second before opening the form. It deliberately does not claim an order was saved: the static site has no persistent order system. Closing the product or dismissing the notice cancels the transition. Editing existing delivery details opens the form immediately.

Both delivery and payment default to **Delivery will be tomorrow**, with Gregorian and Ethiopian dates in English. **Change delivery date** opens a native calendar (or a focusable date input where showPicker is unsupported). Customers may choose tomorrow or any later date. Both calendar labels and the order review update together; the chosen day persists when editing delivery and resets for a different product. Invalid/past dates are rejected. public/delivery-date.mjs uses Ethiopia's local date for the default/minimum and formats a chosen ISO day in UTC to avoid device-timezone shifts. A page reload clears the selection.

The payment screen shows a photograph of the selected color above its exact ETB price, and reviews the European size, color, chosen delivery day and entered details. Customers can edit delivery or change the day there. There is no order-copy button. Customers send their screenshot and item/contact details directly to https://t.me/christianabe. The website sends no contact details or address in Telegram URLs. The separate Telebirr number-copy button remains. Below the screenshot button, larger text says “We will contact you on Telegram and confirm the payment.” This describes a manual seller reply, not automated messaging or payment verification.

Telebirr receiving number: **0953610009**, holder **Lykun**. Delivery cost must be confirmed separately. The number copy button requires a secure context and falls back to manual-copy guidance. Payment verification is manual. Opening Telegram does not submit an order, attach an image, or verify payment. There is no Telebirr API integration.

## Deploy to Render

Connect mikiscoffield/Jiji-shop under **New → Static Site**, select **main**, leave Root Directory empty, set Build Command to `npm run build` and Publish Directory to `dist`. Deploy as a free static site. render.yaml also describes the static service. Pushes can trigger Render auto-deploy when enabled; confirm actual deployment status in Render.

## Connect Telegram

In official @BotFather, use /setmenubutton, choose @jijietbot, name the button Open shop, and paste the Render HTTPS URL. Do not put a bot token in the static site. The optional Telegram SDK signals readiness and expands the app; browsing also works without it. Verify in Telegram after deployment.

## Verification

`npm test` runs 17 checks covering source offer/image integrity, exact prices, European display mappings without changing priced source SKUs, approximate-label marking, clothing sizes, calendar boundaries, customer-chosen dates and invalid/past date rejection. `npm run build` produces the Render static output.

Browser checks verified the dark theme and layouts from 320–1440 px, all 42 products retained, European labels in product/delivery/payment, no retailer links or removed copy, selected-color photo above the price, larger Telegram confirmation, tomorrow by default, date changes on delivery and payment with both calendars synchronized, editing/new-item resets, invalid dates blocked, no stale-order exceptions, number copying, no browser storage, and no JavaScript errors. Earlier category/color/price/source-image checks remain covered by the catalog tests and prior browser checks. A GitHub push does not establish a successful Render or Telegram deployment; verify the actual live URL separately.

## Shoe catalog update — 25 October 2026

The 30 shoes alternate 15 men’s and 15 women’s styles. Men: Nike, Jordan, Adidas and Reebok. Women: Steve Madden, Nine West, Adidas and Reebok, including six boots, six heels, flat sandals and two sneakers. All 12 non-shoe product records are unchanged. Shoes cost 4,000–10,000 ETB; only three models reach 9,500 ETB. USD/EUR source prices, variant availability, photos and actual published reviews are dated snapshots in CATALOG-SOURCES.json. No reviews are fabricated. See SITE-USAGE.md for deployment footprint and bandwidth limits.
