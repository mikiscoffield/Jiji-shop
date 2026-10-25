# Jiji Shop

A mobile-first, English-language storefront for Ethiopia, ready to serve as a Telegram Mini App. Plain HTML, CSS and JavaScript; no runtime dependencies, cart, database, analytics, or customer information storage.

## Local development

Use Node.js 24 (the version verified during setup).

```sh
npm run dev
```

The development server uses port 3000, or the `PORT` environment variable. `npm run build` copies the website to `dist/` for static hosting. No dependency installation is needed.

## Catalog and payment

Edit `public/catalog.js` to replace the sample products, prices, images, sizes and colors. Each product supports an arbitrary number of photos. Current images are bundled sample photographs (from the MIT-licensed Fake Store API repository) and original SVG illustrations, not inventory photos. See public/images/FAKESTORE-LICENSE.txt. All current products have `sample: true`; their payment screen warns visitors not to send money. Set this to false only for verified real inventory. Replace the collection-wide sample notice in `public/index.html` when launching real inventory; sample badges should also be adapted if mixing sample and live items.

The payment screen shows the public receiving number **0953610009**, holder **Lykun**, and links to **https://t.me/christianabe**. Payments are confirmed manually by the seller. There is no Telebirr API integration and no automatic screenshot upload or order submission. Customers choose a size/color, open payment instructions, and manually send the screenshot and product details on Telegram. Delivery is arranged there; the site does not collect addresses or phone numbers.

Product selections live only in memory. The site does not use localStorage, cookies, or a database. Telegram receives normal web requests; this is not a claim that third-party services keep no logs.

## Deploy on Render (free static site)

1. Push this project to your GitHub repository `mikiscoffield/Jiji-shop`.
2. In Render, choose **New → Static Site** and connect that repository.
3. Select the branch containing these files. Leave Root Directory empty.
4. Set Build Command to `npm run build` and Publish Directory to `dist`.
5. Deploy using Render's free static site option. A paid web service is not required. A custom domain is optional and may cost money through its registrar.
6. Open the generated HTTPS URL and test categories, photo thumbnails, sizes/colors, the number copy button, and the Telegram contact link on a phone.

`render.yaml` also describes the static site for Blueprint deployment. Deployment and a live Render URL have not been created automatically. Do not enable real payments until inventory, price, recipient and delivery arrangements have been confirmed.

## Connect @jijietbot

After deployment, open the official **@BotFather** in Telegram. Use `/setmenubutton`, choose `@jijietbot`, enter a button title such as **Open shop**, and paste the Render HTTPS URL. BotFather's `/mybots` configuration can also set the bot's main Mini App if desired. Do not put a bot token in this static site or share it in chat. Open the menu button in Telegram to verify the app. The page uses Telegram's official Web App SDK to signal readiness and expand the view, with a regular-browser fallback.

## Cloud environment

Use the existing `/workspace/Jiji-shop` checkout. Each cloud task is already isolated; do not create a worktree unless requested. Dependencies and generated files can persist in snapshots, but the development server must be restarted with `npm run dev`. This repository's current branch may be `work`; deploy whichever branch you push the project to.

Color-specific galleries: add a `variants` object to a product, keyed by its color labels, with arrays of matching image paths. Choosing a color resets the gallery to that variant. Use actual variant photographs, not CSS recoloring. Amazon replacement inventory is pending network access and listing verification; existing sample inventory has not been replaced with invented ratings.
