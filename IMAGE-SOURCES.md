# Official brand catalog sources

All active products and photographs were replaced with data obtained directly from the following brand-owned storefronts on **25 October 2026**. No Chinese marketplace, Amazon listing, third-party demo image repository, or invented brand label is used in the active catalog.

| Brand | Official storefront | Catalog use |
|---|---|---|
| Reebok | https://www.reebok.com | Men’s footwear and men’s/women’s clothing |
| Nine West | https://ninewest.com | Women’s pumps, slingbacks and sandals |
| Steve Madden | https://www.stevemadden.com | Women’s boots/heels, bag, sunglasses and earrings |
| Lugz | https://lugz.com | Men’s sneakers/boots and women’s boots |
| ColourPop | https://colourpop.com | Eyeshadow palette, lip-liner trio and lip-gloss set |
| Herschel | https://herschel.com | Crossbody bag |
| Timex | https://timex.com | Digital watch |

These are US/Canadian brand storefront sources. This does not assert that the products were manufactured outside China. Brand names, model names, listed variants, photos and prices are traceable to the fetched store records. Brand source data does not verify the merchant’s own stock, a purchased item’s authenticity, image licensing permission, material quality, local delivery availability or customer-specific suitability.

## Prices and reviews

The audit in **CATALOG-SOURCES.json** records all 32 products, their source product and variant identifiers, exact source links, USD prices and converted ETB offers. The exchange-rate source is https://open.er-api.com/v6/latest/USD: 161.874143 ETB per USD, published 25 October 2026. Prices are rounded to whole birr and exclude shipping, tax, import and local delivery charges. Only variants marked available by the source at capture time and within 3,500–8,000 ETB are included; source availability is not local shop stock.

The site is static: these are dated snapshots, not real-time quotes. Refresh the source records and conversion before changing prices, and keep the audit and public catalog consistent. The app updates the displayed amount and size choices from the chosen color/size offer. Brand-store links are no longer exposed in the customer UI; the audit retains them for maintenance. European size labels map to the original source variant keys; SIZING.md documents exact brand charts and clearly marked approximations.

Review metadata is extracted from the product’s official structured-data aggregate rating. It is attributed to the brand store with its actual review count. Colorways without a checked score show no stars. Ratings are not independent testing or a guarantee of product quality. Known low-rated candidates were excluded rather than assigned better scores.

## Photos and color matching

The official storefronts serve product media from their Shopify CDN. The audit records **245 unique downloaded image URLs**, local paths, dimensions and SHA-256 hashes; the catalog references 248 photos because some source images are shared. The source CDN’s supported width parameter requests a 1000 px version. Files were downloaded with TLS verification, decoded and verified before use, and bundled locally under public/images/catalog/.

No offline cropping, recoloring, upscaling, or generated product pictures were used. For single-color source listings, up to five source views are retained. When a listing contains several colors, only explicit variant-featured images and matching manufacturer color-code angles are associated with that color. A color with only one verified photograph keeps that one photograph rather than borrowing another color’s angles. Separate official listings are grouped only when they represent the same model in different colors.

The previous GitHub-reference product photos and drawn illustrations were removed from the active website. Brand trademarks identify the pictured products; no official brand affiliation or authorized-dealer status is implied.
