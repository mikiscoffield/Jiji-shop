import test from 'node:test';
import assert from 'node:assert/strict';
import {accessoryPriceEtb} from '../public/accessory-pricing.mjs';
test('bags, watches and sunglasses use USD ×171 and their own inclusive price caps',()=>{
 assert.equal(accessoryPriceEtb('Bags',20),3420);assert.equal(accessoryPriceEtb('Bags',200),34200);
 assert.equal(accessoryPriceEtb('Watches',199),34029);assert.equal(accessoryPriceEtb('Watches',200),34200);
 assert.equal(accessoryPriceEtb('Sunglasses',75.12),12846);assert.equal(accessoryPriceEtb('Sunglasses',100),17100);
 for(const [kind,price] of [['Bags',19.99],['Bags',200.01],['Watches',200.01],['Sunglasses',100.01],['Invalid',20],['Watches',0]])assert.throws(()=>accessoryPriceEtb(kind,price),RangeError);
});
