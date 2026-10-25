import {discountedUsdPriceEtb} from './retail-pricing.mjs';
export function faceCarePriceEtb(usd){
 const etb=discountedUsdPriceEtb(usd);
 if(etb<=0||etb>20000)throw new RangeError('Face care prices must be positive and no higher than 20,000 ETB.');
 return etb;
}
