import test from 'node:test';
import assert from 'node:assert/strict';
import { displaySize, sizeSystemText } from '../public/shoe-sizing.mjs';
import { selectedOffer } from '../public/catalog-logic.mjs';

test('European labels use the brand chart while preserving the original priced SKU',()=>{
 const shoe={department:'Shoes',brand:'Nine West',audience:'Women',offers:{Black:{'8.5':{etb:6473,sourceVariantID:'original-sku'}}}};
 assert.equal(displaySize(shoe,'8.5'),'39');
 assert.equal(sizeSystemText(shoe),'EU sizing');
 assert.equal(selectedOffer(shoe,'Black','8.5').sourceVariantID,'original-sku');
 assert.equal(selectedOffer(shoe,'Black','39'),null);
});
test('a manufacturer-provided size range is kept rather than inventing a single size',()=>{
 const shoe={department:'Shoes',brand:'Steve Madden',audience:'Women'};
 assert.equal(displaySize(shoe,'6'),'36–37');
 assert.equal(displaySize(shoe,'9.5'),'40');
});
test('fallback European conversions are marked approximate and retain width',()=>{
 const shoe={department:'Shoes',brand:'Lugz',audience:'Men'};
 assert.equal(displaySize(shoe,'8'),'41');
 assert.equal(displaySize(shoe,'8 Wide'),'41 Wide');
 assert.equal(sizeSystemText(shoe),'EU sizing (approx.)');
});
test('letter-based clothing sizes remain unchanged',()=>{
 const shirt={department:'Clothes',brand:'Reebok',audience:'Men'};
 assert.equal(displaySize(shirt,'M'),'M');
 assert.equal(sizeSystemText(shirt),'Clothing size');
});
