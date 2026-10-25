export const departments=['Shoes','Clothes','Fragrances','Face care','Bags','Watches & Sunglasses'];
// Stable round-robin: one item per nonempty category, then repeat without duplicates.
export function interleaveDepartments(products,order=departments){
 const keys=[...new Set([...order,...products.map(p=>p.department)])];
 const groups=new Map(keys.map(k=>[k,[]]));
 for(const product of products)groups.get(product.department).push(product);
 const result=[];const max=Math.max(0,...[...groups.values()].map(g=>g.length));
 for(let i=0;i<max;i++)for(const key of keys){const product=groups.get(key)[i];if(product)result.push(product);}
 return result;
}
