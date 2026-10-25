# European size display

The storefront shows European shoe-size labels. It retains each original source size as an internal option key so the existing source variant, availability, and price stay attached to the same product. It does not invent additional sizes or change source inventory. Clothing keeps its letter sizes.

`public/shoe-sizing.mjs` handles the display only. `public/catalog-logic.mjs` still selects the original source offer. Payment and the order review show the European label, never the internal US option key.

## Brand charts

Nine West women's conversions were read from the product page's Size Chart (also linked by the brand under https://ninewest.com/pages/size-guide). Examples: source 7.5 → EU 38, 8 → EU 38.5, 8.5 → EU 39, 9 → EU 40.

Steve Madden women's conversions were read from the embedded Women's Size Conversions table on https://www.stevemadden.com/products/distortion-gold-glitter. Its ranges are preserved: source 6 → EU 36–37, 8 → EU 38–39, 9.5 → EU 40. Do not silently replace a brand-provided range with an exact single size.

These source URLs are maintainer references only and are not linked from the customer-facing shop.

## Approximate conversions

A manufacturer-specific European chart was not verified for the current Reebok and Lugz products. Reebok's US guide publishes US sizes and foot measurements; the European chart routes checked were unavailable. The Lugz chart routes checked did not provide a European table.

For these products the UI explicitly says **EU sizing (approx.)**. The current general display conversion is source men's numeric size + 33 and source women's numeric size + 31. Wide labels are retained. This is an estimate, not an official manufacturer conversion or fit guarantee. Replace these estimates with verified model/brand charts when available; do not present them as exact. Source offer keys and source variant IDs remain unchanged.
