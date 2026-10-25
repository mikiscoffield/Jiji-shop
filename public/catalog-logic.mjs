export function availableSizes(product, color) {
 return Object.keys(product.offers[color] || {}).filter(Boolean).sort((a,b)=>a.localeCompare(b,'en',{numeric:true}));
}
export function selectedOffer(product, color, size = '') {
 return product.offers[color]?.[size || ''] || null;
}
export function priceRange(product, color = null) {
 const colors = color ? [color] : product.colors;
 const amounts = colors.flatMap(key=>Object.values(product.offers[key] || {}).map(offer=>offer.etb));
 return { min: Math.min(...amounts), max: Math.max(...amounts) };
}
export function selectionIsAvailable(product, selection) {
 return Boolean(selectedOffer(product, selection.color, selection.size));
}
