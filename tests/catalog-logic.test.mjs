import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { availableSizes, selectedOffer, priceRange, selectionIsAvailable } from '../public/catalog-logic.mjs';

const example = { colors:['Black','Blue'], offers:{
 Black:{'7':{etb:5000},'8':{etb:5500}}, Blue:{'8':{etb:6000},'9':{etb:6500}}
}};
test('a chosen color and size determine the exact price, without an unavailable-size fallback',()=>{
 assert.deepEqual(availableSizes(example,'Blue'),['8','9']);
 assert.equal(selectedOffer(example,'Black','8').etb,5500);
 assert.equal(selectedOffer(example,'Blue','8').etb,6000);
 assert.equal(selectedOffer(example,'Blue','7'),null);
 assert.equal(selectionIsAvailable(example,{color:'Blue',size:'7'}),false);
 assert.equal(selectionIsAvailable(example,{color:'Black'}),false);
});
test('price ranges describe all offers or only the selected color',()=>{
 assert.deepEqual(priceRange(example),{min:5000,max:6500});
 assert.deepEqual(priceRange(example,'Black'),{min:5000,max:5500});
});
test('one-size products can proceed without inventing a size',()=>{
 const palette={colors:['As pictured'],offers:{'As pictured':{'':{etb:4000}}}};
 assert.deepEqual(availableSizes(palette,'As pictured'),[]);
 assert.equal(selectionIsAvailable(palette,{color:'As pictured'}),true);
});
const context={window:{}};
vm.runInNewContext(fs.readFileSync(new URL('../public/catalog.js',import.meta.url),'utf8'),context);
const catalog=JSON.parse(JSON.stringify(context.window.catalog));
const audit=JSON.parse(fs.readFileSync(new URL('../CATALOG-SOURCES.json',import.meta.url),'utf8'));
test('all categories and at least fifteen men’s and fifteen women’s shoes have traceable branded offers',()=>{
 for(const department of ['Shoes','Clothes','Makeup','Bags','Accessories'])assert.ok(catalog.some(p=>p.department===department));
 for(const audience of ['Men','Women'])assert.ok(catalog.filter(p=>p.department==='Shoes'&&p.audience===audience).length>=15);
 assert.equal(new Set(catalog.map(p=>p.id)).size,catalog.length);
 for(const p of catalog){
  const record=audit.products.find(r=>r.id===p.id);assert.ok(record,p.id);
  assert.equal(record.brand,p.brand);assert.notEqual(p.brand,'Style edit');
  for(const color of p.colors){
   assert.ok(p.variants[color].length>0,p.id+' '+color);
   assert.ok(p.swatches[color]);
   for(const [size,offer] of Object.entries(p.offers[color])){
    assert.ok(offer.etb>=(p.department==='Shoes'?4000:p.department==='Clothes'?2500:3500)&&offer.etb<=(p.department==='Shoes'?10000:p.department==='Clothes'?7000:8000));
    const amount=offer.amount ?? offer.usd;
    const rate=offer.currency?audit.fx.etbPerCurrency[offer.currency]:audit.fx.USD_ETB;
    assert.equal(offer.etb,Math.round(amount*rate));
    assert.equal(offer.sourceURL.startsWith(record.sourceHost+'/products/'),true);
    assert.equal(new URL(offer.sourceURL).searchParams.get('variant'),offer.sourceVariantID);
    assert.deepEqual(offer,record.offers[color][size]);
   }
  }
 }
});
test('every catalog photograph matches the recorded downloaded brand image',()=>{
 const records=new Map(audit.images.map(image=>[image.local,image]));
 for(const image of new Set(catalog.flatMap(p=>p.images))){
  const record=records.get(image);assert.ok(record,image);
  assert.equal(new URL(record.sourceURL).hostname,'cdn.shopify.com');
  assert.ok(record.width>=450&&record.height>=450);
  const bytes=fs.readFileSync(new URL('../public'+image,import.meta.url));
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),record.sha256,image);
 }
});

test('only a few shoe models reach the upper price band',()=>{
 const high=catalog.filter(p=>p.department==='Shoes'&&Object.values(p.offers).some(sizes=>Object.values(sizes).some(offer=>offer.etb>=9500)));
 assert.ok(high.length<=3,high.map(p=>p.id).join(', '));
});

// The clothing expansion must retain the requested price and size contract for every color.
test('clothing includes thirty styles per audience and all four sizes for every color',()=>{
 for(const audience of ['Men','Women'])assert.equal(catalog.filter(p=>p.department==='Clothes'&&p.audience===audience).length,30);
 for(const product of catalog.filter(p=>p.department==='Clothes')){
  assert.deepEqual(product.sizes,['S','M','L','XL']);
  for(const color of product.colors)assert.deepEqual(availableSizes(product,color),['S','M','L','XL']);
 }
});
