import {discountedUsdPriceEtb} from './retail-pricing.mjs';
export function faceCarePriceEtb(usd){
 const etb=discountedUsdPriceEtb(usd);
 if(etb<3000||etb>20000)throw new RangeError('Face care prices must be within 3,000–20,000 ETB.');
 return etb;
}
