import {discountedUsdPriceEtb} from './retail-pricing.mjs';
export function fragrancePriceEtb(usd){
 if(typeof usd!=='number'||!Number.isFinite(usd)||usd<=0||usd>=200)throw new RangeError('Fragrance source price must be greater than $0 and below $200 USD.');
 return discountedUsdPriceEtb(usd);
}
