import test from 'node:test';
import assert from 'node:assert/strict';
import {faceCarePriceEtb} from '../public/face-care-pricing.mjs';
test('face care uses the same USD ×171 rule within its own price band',()=>{
 for(const [usd,etb] of [[11.70,2001],[17.54,2999],[18,3078],[22,3762],[38,6498],[54,9234],[69,11799],[116.95,19998]])assert.equal(faceCarePriceEtb(usd),etb);
 for(const usd of [117,0,-1,NaN,'20'])assert.throws(()=>faceCarePriceEtb(usd),RangeError);
});
