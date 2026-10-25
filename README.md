# Jiji Shop

An English-only static storefront for Ethiopia and Telegram Mini Apps. All five departments are retained: **Shoes, Clothes, Makeup, Bags, Accessories**. The catalog now contains 32 source-traceable branded products: 20 shoes (10 men’s and 10 women’s, interleaved), four clothing styles, three makeup products, two bags and three accessories. Brands: Reebok, Nine West, Steve Madden, Lugz, ColourPop, Herschel and Timex. Women’s footwear includes four boot styles and six heels. Photos and product data come directly from the brands’ US/Canadian storefronts, not Chinese marketplaces or third-party demo repositories. This describes the source websites, not the manufacturing country.

No cart, database, analytics or customer data storage. Delivery details are entered before payment and held temporarily in page memory. Customers share their contact and delivery details directly in Telegram; the website does not send them automatically.

## Run and build

Use Node.js 24. No dependency installation is needed.

```sh
npm run dev
npm run build
```

The development server uses port 3000 (or PORT); the build copies public/ to dist/. Use the existing checkout. Each cloud task is isolated, so do not create a worktree unless requested. Restart the development server in future tasks.

## Catalog and filters

Edit public/catalog.js. `department` controls the five product categories; `category` describes a style within a department; `audience` is Men, Women or Unisex. Audience and brand filters work within the selected department. Switching departments resets the brand filter so a shoe brand cannot hide bags or beauty products.

Products declare actual brand model names, color-specific image galleries, `offers` indexed by color and size, and a `sizeLabel`. **Footwear uses the source US men’s/women’s sizes**, not an invented EU conversion. Only variants that were available in the fetched brand-store snapshot and fit the price range are offered; this is not confirmation of the seller’s Ethiopian inventory. Changing color updates both available sizes and price. An unavailable previous size is cleared. The exact selected color/size offer supplies the amount at payment. Size-free products use an empty size key.

`CATALOG-SOURCES.json` records each official source URL, source product/variant IDs, source USD price, converted ETB price, review score/count where available, image URLs, file hashes and capture date. Prices were checked on **25 October 2026** and converted at **1 USD = 161.874143 ETB**, using https://open.er-api.com/v6/latest/USD (published 25 October 2026). Amounts are rounded to the nearest whole birr. All current offers fall within 3,500–8,000 ETB. No shipping, tax, import charge or local delivery fee is included. Prices are static dated snapshots; they do not auto-refresh or establish a guaranteed supplier quote. Recheck sourcing and seller stock before taking payment.

`public/catalog-logic.mjs` centralizes size availability, exact offer selection and price ranges. Cards show “From” only where the listed offers have different prices. Details link to the original brand listing; after choosing a size, that link selects the exact source variant. Review stars are shown only for a colorway with a verified aggregate rating in that source page’s structured data. Review counts remain visible; missing ratings are omitted.

There are **245 locally bundled brand images** (248 catalog references because a few images are shared). Galleries contain real matching colors and angles, up to five photos per color. Multi-color image association uses source variant image IDs and manufacturer color image codes. Unrelated angles and simulated recoloring are not used. All obsolete placeholder/demo images were removed. IMAGE-SOURCES.md describes provenance and the limits of photo-based verification.

## Delivery and payment

After selecting a product's size/color, the customer must complete delivery details before opening Telebirr instructions:

- Required: recipient name, Ethiopian mobile number, and city/town.
- Optional: delivery instructions. Region, sub-city, street address and landmark fields are removed.
- Ethiopian numbers beginning with 09, 07, +2519, +2517, 002519 or 002517 are accepted; spaces, parentheses and hyphens are normalized.

The form uses no network submission, database, localStorage or sessionStorage. Browser autocomplete is disabled. Inputs are validated, trimmed, and displayed as escaped text. Delivery state stays in memory until a different product is opened or the page is left/reloaded; the pagehide handler clears delivery/payment content. This does not control platform-level browser or operating-system behavior.

After a valid item selection, **Continue to delivery** is disabled for one second and shows a preparing state. A brief **Order details ready** message then appears for one second before opening the form. It deliberately does not claim an order was saved: the static site has no persistent order system. Closing the product or dismissing the notice cancels the transition. Editing existing delivery details opens the form immediately.

Both delivery and payment screens show **Delivery will be tomorrow**, followed by the Gregorian and Ethiopian dates in English. `public/delivery-date.mjs` calculates tomorrow from Ethiopia's local date (Africa/Addis_Ababa), independent of the device timezone, and formats the Ethiopian calendar through Intl. The dates update when the relevant screen opens. `npm test` covers normal dates, Ethiopian midnight, Gregorian leap/year boundaries, and Ethiopian leap-year New Year.

The payment screen reviews the chosen item, size, color, ETB amount and delivery information, and lets the customer edit delivery details. There is no order-copy button. Customers send their screenshot and item/contact details directly to https://t.me/christianabe. The website sends no contact details or address in Telegram URLs. The separate Telebirr number-copy button remains.

Telebirr receiving number: **0953610009**, holder **Lykun**. Delivery cost must be confirmed separately. The number copy button requires a secure context and falls back to manual-copy guidance. Payment verification is manual. Opening Telegram does not submit an order, attach an image, or verify payment. There is no Telebirr API integration.

## Deploy to Render

Connect mikiscoffield/Jiji-shop under **New → Static Site**, select **main**, leave Root Directory empty, set Build Command to `npm run build` and Publish Directory to `dist`. Deploy as a free static site. render.yaml also describes the static service. Pushes can trigger Render auto-deploy when enabled; confirm actual deployment status in Render.

## Connect Telegram

In official @BotFather, use /setmenubutton, choose @jijietbot, name the button Open shop, and paste the Render HTTPS URL. Do not put a bot token in the static site. The optional Telegram SDK signals readiness and expands the app; browsing also works without it. Verify in Telegram after deployment.

## Verification

`npm test` runs nine checks covering exact color/size prices, unavailable-size rejection, size-free products, minimum footwear counts and retained departments, source offer consistency, image hashes, and Gregorian/Ethiopian date boundaries. `npm run build` produces the Render static output.

Browser checks verified all 32 products and all 245 image URLs, all five departments, brand/audience/search filters, matching color photos and galleries, US size labels, color-dependent sizes and prices, exact selected-variant source links and payment totals, one-second loading/notice timing, the reduced delivery form, both calendar dates, the large screenshot-only instruction, retained number copying, size-free makeup checkout, no storage or browser errors, and responsive layouts from 320–1440 px. A GitHub push does not establish that Render or Telegram in-app deployment succeeded; verify the actual live URL separately.
