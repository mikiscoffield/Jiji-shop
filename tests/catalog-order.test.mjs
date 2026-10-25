import test from 'node:test';
import assert from 'node:assert/strict';
import {interleaveDepartments,departments} from '../public/catalog-order.mjs';
test('All finds cycles one item per category while preserving within-category order',()=>{
 const products=departments.flatMap((department)=>[0,1].map(n=>({id:department+n,department})));
 const output=interleaveDepartments(products);
 assert.deepEqual(output.map(p=>p.department),[...departments,...departments]);
 assert.deepEqual(output.slice(0,6).map(p=>p.id),departments.map(k=>k+'0'));
 assert.equal(new Set(output.map(p=>p.id)).size,products.length);
});
test('uneven and filtered categories drain without omissions or blank placeholders',()=>{
 const items=[{id:'s1',department:'Shoes'},{id:'s2',department:'Shoes'},{id:'c1',department:'Clothes'},{id:'w1',department:'Watches & Sunglasses'},{id:'w2',department:'Watches & Sunglasses'},{id:'w3',department:'Watches & Sunglasses'}];
 assert.deepEqual(interleaveDepartments(items).map(p=>p.id),['s1','c1','w1','s2','w2','w3']);
 assert.deepEqual(interleaveDepartments([]),[]);
 assert.deepEqual(interleaveDepartments(items.filter(p=>p.department==='Shoes')).map(p=>p.id),['s1','s2']);
});
