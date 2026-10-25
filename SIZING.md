# Store shoe sizes

The owner requested all common sizes selectable for every color, capped at EU 44 for men and EU 42 for women. The shop now offers **EU 38–44 for men** and **EU 35–42 for women**, all enabled for every shoe/color. There is no verified claim of 95% population coverage. All clothing colors retain S, M, L and XL from the owner’s earlier stock confirmation.

Products with sizeSystem EU use these EU numbers directly. Their buttons, delivery summary and payment review display the same number; no US conversion is applied. Merchant sizes are separate from source retailer availability. A merchant size’s offer does not assert a matching external SKU: sourceVariantID and sourceSKU are null. The audit retains original sourceOffers (original US size/variant IDs) and a per-color priceReferences quote. The color’s shop price stays the same across all offered EU sizes. This records the merchant’s requested offering, not independent verification of physical inventory or fit.

## Archived source conversions

public/shoe-sizing.mjs and public/size-charts.mjs preserve legacy source conversions for maintenance. SIZE-CHART-SOURCES.json records retailer-chart context. Nine West women’s examples: US 7.5 → EU 38, 8 → 38.5, 8.5 → 39, 9 → 40. The source is the brand’s product-page Size Chart and https://ninewest.com/pages/size-guide.

Steve Madden women’s conversions were read from the embedded Women’s Size Conversions table at https://www.stevemadden.com/products/distortion-gold-glitter. Ranges are preserved in the legacy helper: US 6 → EU 36–37, 8 → 38–39, 9.5 → 40. Nike, Jordan, Adidas and Reebok charts were read from Sneakersnstuff product size tables. Legacy source sizes outside verified tables remain explicitly approximate. Those helpers do not reinterpret the newly offered merchant EU numbers.

Maintainer source links do not appear in the customer storefront.
