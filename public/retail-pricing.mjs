// Merchant instruction: source USD ×190, deduct 10%, round once to whole birr.
export function discountedUsdPriceEtb(usd){
 if(typeof usd!=='number'||!Number.isFinite(usd)||usd<=0)throw new RangeError('A positive USD source price is required.');
 return Math.round(Math.round(usd*100)*171/100);
}
