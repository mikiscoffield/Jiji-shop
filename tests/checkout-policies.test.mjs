import test from 'node:test';
import assert from 'node:assert/strict';
import {returnPolicyFor,deliveryFeeText} from '../public/checkout-policies.mjs';
test('fit-based returns apply only to shoes and clothes',()=>{
 for(const department of ['Shoes','Clothes'])assert.match(returnPolicyFor({department}).body,/does not fit/);
 for(const [department,category] of [['Fragrances','Eau de Parfum'],['Face care','Sunscreen'],['Face care','Cleanser'],['Bags','Crossbody'],['Watches & Sunglasses','Watches'],['Watches & Sunglasses','Sunglasses'],['Accessories','Jewelry']]){
  const policy=returnPolicyFor({department,category});assert.doesNotMatch(policy.title+' '+policy.body,/does not fit|right size/i);assert.match(policy.body,/7 days/);
 }
});
test('returns distinguish hygiene, leaks, faulty watches and unused bags',()=>{
 assert.match(returnPolicyFor({department:'Fragrances'}).body,/sealed.*unused/);assert.match(returnPolicyFor({department:'Fragrances'}).body,/leaking/);
 assert.match(returnPolicyFor({department:'Face care',category:'Moisturizer'}).body,/expired/);
 assert.match(returnPolicyFor({department:'Accessories',category:'Jewelry'}).body,/unopened and unworn/);
 assert.match(returnPolicyFor({department:'Watches & Sunglasses',category:'Watches'}).body,/not working/);
 assert.match(returnPolicyFor({department:'Bags'}).body,/tags and packaging/);
 assert.equal(deliveryFeeText,'Jiji covers all delivery fees.');
});
