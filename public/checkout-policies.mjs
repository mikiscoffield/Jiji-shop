export const deliveryFeeText='Jiji covers all delivery fees.';
export function returnPolicyFor(product){
 const {department,category=''}=product;
 if(department==='Shoes'||department==='Clothes')return {title:'Does not fit? Get a refund within 7 days.',body:'If your item does not fit, return it within 7 days of delivery for a refund. The item must be unused.'};
 if(department==='Fragrances')return {title:'Fragrance returns',body:'Keep the fragrance sealed and unused for returns. If the bottle arrives damaged, leaking or different from your order, contact Jiji within 7 days for a refund or replacement.'};
 if(department==='Face care')return {title:category+' returns',body:'For hygiene, keep the product unopened and unused for returns. If it arrives damaged, expired or different from your order, contact Jiji within 7 days for a refund or replacement.'};
 if(department==='Bags')return {title:'Bag returns',body:'Return an unused bag within 7 days of delivery, with its tags and packaging, for a refund. If it arrives damaged or different from your order, contact Jiji for help.'};
 if(['Accessories','Watches & Sunglasses'].includes(department)&&/jewelry|earrings/i.test(category))return {title:'Jewelry returns',body:'For hygiene, jewelry must be unopened and unworn for returns. If it arrives damaged or different from your order, contact Jiji within 7 days for a refund or replacement.'};
 if(['Accessories','Watches & Sunglasses'].includes(department)&&/watch/i.test(category))return {title:'Watch returns',body:'Keep the watch unworn, with its original packaging, for returns within 7 days. If it arrives damaged, not working or different from your order, contact Jiji for a refund or replacement.'};
 if(['Accessories','Watches & Sunglasses'].includes(department)&&/sunglasses/i.test(category))return {title:'Sunglasses returns',body:'Return unused sunglasses within 7 days, with their case and packaging, for a refund. If they arrive damaged or different from your order, contact Jiji for help.'};
 return {title:'7-day returns',body:'Keep the item unused, with its packaging. If it arrives damaged or different from your order, contact Jiji within 7 days for a refund or replacement.'};
}
