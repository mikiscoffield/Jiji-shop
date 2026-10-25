# Jiji Shop

An English-only, mobile-first shoe storefront for Ethiopia and Telegram Mini Apps. Twelve men's, women's and unisex styles with 14 locally bundled photographic assets, Nike/Adidas/New Balance filters, search, EU size selection, and ETB prices from 3,500 to 6,000. No cart, database, analytics, customer address collection, or browser storage.

## Run and build

Use Node.js 24. There are no package dependencies to install.

```sh
npm run dev
npm run build
```

The server uses port 3000 (or PORT). The build copies public/ to dist/. Use the existing checkout; cloud tasks are already isolated, so do not create a worktree unless explicitly requested. Running servers must restart in future tasks.

## Catalog

Edit public/catalog.js. Each product declares a brand, audience, descriptive name, ETB shop price, sizes, and a `variants` object mapping color labels to matching image arrays. Only offer colors with real matching product photos; do not use CSS filters to invent colors. The White/Mint Nike Course style currently has two photographic color variants. Other styles offer their single photographed color. Click a color swatch on its card or in its details to switch the image. Selecting a color resets its gallery, and checkout uses the selected EU size/color. More real angles can be added to each variant's image array.

The old placeholder catalog and drawn shoe illustrations have been removed. Source notes and limitations are in IMAGE-SOURCES.md. Product model names, supplier USD prices, star ratings, inventory, authenticity, and availability were not independently verified. No Amazon or review claims are displayed. Confirm real stock, exact sizes, product sourcing and image permissions before accepting money. Brand names refer to pictured designs, not affiliation. Prices are the requested ETB shop prices, not verified supplier quotes.

## Payment

Customers select their EU size and pictured color, confirm stock/delivery with @ChristianAbe, view Telebirr instructions, and send their payment screenshot manually. The public receiving number is 0953610009, account holder Lykun. The number copy button works in HTTPS/secure contexts and gives manual-copy guidance if clipboard access is denied. Payment verification and delivery arrangements are handled by the seller on https://t.me/christianabe. Opening Telegram does not submit an order, attach a screenshot, or confirm payment. There is no Telebirr API integration.

## Render free static hosting

Connect mikiscoffield/Jiji-shop in Render under New → Static Site. Select main, leave Root Directory empty, set Build Command to `npm run build` and Publish Directory to `dist`, and deploy. render.yaml also describes this static service. This requires no paid web server. GitHub pushes can trigger auto-deploy if enabled. Deployment status must be checked on Render; pushing code does not prove a deployment succeeded.

## Telegram

In the official @BotFather, send /setmenubutton, choose @jijietbot, enter Open shop as the button title, and paste the Render HTTPS URL. Do not put a bot token in this static site. Test the menu in Telegram after deployment. The optional Telegram SDK signals readiness and expands the view. Browsing also works without it.

## Verify

Check all product images load on desktop and phone; search/filter by audience and brand; switch the Nike Course White/Mint swatches on both its card and detail dialog; verify EU size is required; verify checkout carries the selected color, size and ETB amount; check copy and Telegram links. No real payment is needed for testing. The UI and build were checked locally; a live Render URL and Telegram in-app flow require separate validation.
