// Merchant's explicit pricing rule: USD × 190, less 10%, rounded once to whole birr.
export function fragrancePriceEtb(usd) {
 if(typeof usd!=='number'||!Number.isFinite(usd)||usd<=0||usd>=200)throw new RangeError('Fragrance source price must be greater than $0 and below $200 USD.');
 const cents=Math.round(usd*100);
 return Math.round(cents*171/100);
}
