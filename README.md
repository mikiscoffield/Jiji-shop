# Jiji Shop

An English-only static storefront for Ethiopia and Telegram Mini Apps. Categories: **Shoes, Clothes, Makeup, Bags, Accessories**. There are 28 products, including 22 shoe styles. The 10 latest shoe additions include six mainly black styles, plus dark olive, burgundy/black, white/teal and brown options. Shoe prices remain 3,500–6,000 ETB. Other departments retain their own ETB prices.

No cart, database, analytics or customer data storage. Delivery details are entered before payment and held temporarily in page memory. They reach the seller only when the customer explicitly copies and pastes the order into Telegram.

## Run and build

Use Node.js 24. No dependency installation is needed.

```sh
npm run dev
npm run build
```

The development server uses port 3000 (or PORT); the build copies public/ to dist/. Use the existing checkout. Each cloud task is isolated, so do not create a worktree unless requested. Restart the development server in future tasks.

## Catalog and filters

Edit public/catalog.js. `department` controls the five product categories; `category` describes a style within a department; `audience` is Men, Women or Unisex. Audience and brand filters work within the selected department. Switching departments resets the brand filter so a shoe brand cannot hide bags or beauty products.

Products declare ETB shop prices, sizes, and `variants` mapping color labels to arrays of matching image paths. Add actual photographs of a color or angle; do not simulate product colors with filters. White/Mint on Nike Course switches between real photographs of the same design. Other products show only their photographed color. Formal burgundy lace-ups and brown boots include two photographic views. Shoes use EU sizes, clothing uses letter sizes, and beauty/bags/accessories can have no size selection.

IMAGE-SOURCES.md documents the 32 bundled photographic assets and limitations. Product titles are descriptive, not verified manufacturer model names. Supplier USD prices, reviews, inventory and authenticity were not independently verified. Confirm actual stock, sizes, sourcing and usage permissions before accepting payments; no supplier or rating claims are displayed.

## Delivery and payment

After selecting a product's size/color, the customer must complete delivery details before opening Telebirr instructions:

- Required: recipient name, Ethiopian mobile number, region, city/town, sub-city/woreda/area, street/house/building address.
- Optional: nearby landmark and delivery instructions.
- Ethiopian numbers beginning with 09, 07, +2519, +2517, 002519 or 002517 are accepted; spaces, parentheses and hyphens are normalized.

The form uses no network submission, database, localStorage or sessionStorage. Browser autocomplete is disabled. Inputs are validated, trimmed, and displayed as escaped text. Delivery state stays in memory until a different product is opened or the page is left/reloaded; the pagehide handler clears delivery/payment content. This does not control platform-level browser or operating-system behavior.

The payment screen reviews the chosen product, size, color and ETB amount, lets customers edit delivery information, and provides **Copy order & delivery details**. Customers paste those details into https://t.me/christianabe and attach their payment screenshot. Clipboard access happens only on a copy-button click. If blocked, the order text is selectable for manual copying. Addresses are not included in Telegram URLs.

Telebirr receiving number: **0953610009**, holder **Lykun**. Delivery cost must be confirmed separately. The number copy button requires a secure context and falls back to manual-copy guidance. Payment verification is manual. Opening Telegram does not submit an order, attach an image, or verify payment. There is no Telebirr API integration.

## Deploy to Render

Connect mikiscoffield/Jiji-shop under **New → Static Site**, select **main**, leave Root Directory empty, set Build Command to `npm run build` and Publish Directory to `dist`. Deploy as a free static site. render.yaml also describes the static service. Pushes can trigger Render auto-deploy when enabled; confirm actual deployment status in Render.

## Connect Telegram

In official @BotFather, use /setmenubutton, choose @jijietbot, name the button Open shop, and paste the Render HTTPS URL. Do not put a bot token in the static site. The optional Telegram SDK signals readiness and expands the app; browsing also works without it. Verify in Telegram after deployment.

## Verification

Local browser checks exercised all five departments and all 28 products' image paths, audience/brand/search filtering, White/Mint photo switching, shoe/clothing size selection and sizeless beauty checkout, required delivery fields, invalid/valid Ethiopian numbers, edit/review/copy flow, safe display of markup-like input, no delivery data in network URLs or browser storage, no delivery persistence after reload, and layouts at 320–1440 px. Build and syntax checks also passed. A live Render deployment and Telegram app flow require their own checks.
