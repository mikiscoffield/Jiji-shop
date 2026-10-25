import test from 'node:test';
import assert from 'node:assert/strict';
import {fragrancePriceEtb} from '../public/fragrance-pricing.mjs';
test('fragrances use USD × 190 less 10%, rounded once to whole ETB',()=>{
 for(const [usd,etb] of [[60,10260],[65,11115],[119,20349],[155,26505],[190,32490],[199.99,34198]])assert.equal(fragrancePriceEtb(usd),etb);
});
test('the fragrance rule excludes $200 and higher prices and invalid amounts',()=>{
 for(const invalid of [0,-1,200,250,NaN,Infinity,'100'])assert.throws(()=>fragrancePriceEtb(invalid),RangeError);
});
