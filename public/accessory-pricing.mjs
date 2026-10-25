import {discountedUsdPriceEtb} from './retail-pricing.mjs';
export function accessoryPriceEtb(kind,usd){
 const max=kind==='Sunglasses'?100:200;
 if(!['Bags','Watches','Sunglasses'].includes(kind)||typeof usd!=='number'||!Number.isFinite(usd)||usd<=0||usd>max||(kind==='Bags'&&usd<20))throw new RangeError('Source USD price is outside this category’s limits.');
 return discountedUsdPriceEtb(usd);
}
