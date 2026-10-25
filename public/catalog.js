// Replace sample entries with real inventory and set sample: false only when ready to sell.
const photo = (id) => id;
window.catalog = [
 {id:'sneakers',name:'Everyday white sneakers',category:'Shoes',price:3200,images:['/images/sneaker-1.svg', '/images/sneaker-2.svg', '/images/sneaker-3.svg', '/images/sneaker-4.svg'].map(photo),sizes:['36','37','38','39','40','41'],colors:['White','Black'],sample:true,tag:'Everyday favorite'},
 {id:'dress',name:'The everyday light jacket',category:'Clothes',price:2850,images:['/images/jacket.jpg'].map(photo),sizes:['S','M','L','XL'],colors:['Cream','Green','Black'],sample:true,tag:'Style edit'},
 {id:'bag',name:'City days backpack',category:'Bags',price:2400,images:['/images/bag.jpg'].map(photo),sizes:[],colors:['Tan','Black'],sample:true,tag:'The finishing touch'},
 {id:'lip',name:'Soft matte lip collection',category:'Makeup',price:950,images:['/images/lip-1.svg'].map(photo),sizes:[],colors:['Rose','Nude','Berry'],sample:true,tag:'Beauty essential'},
 {id:'heels',name:'A little lift — classic heels',category:'Shoes',price:3600,images:['/images/heels-1.svg'].map(photo),sizes:['36','37','38','39','40'],colors:['Cream','Black'],sample:true,tag:'Occasion ready'},
 {id:'jewelry',name:'Golden hour statement ring',category:'Accessories',price:850,images:['/images/necklace.jpg'].map(photo),sizes:[],colors:['Silver'],sample:true,tag:'Little details'},
 {id:'shirt',name:'Relaxed everyday shirt',category:'Clothes',price:1800,images:['/images/shirt.jpg'].map(photo),sizes:['S','M','L','XL'],colors:['White','Blue'],sample:true,tag:'Wear on repeat'},
 {id:'makeup',name:'Your everyday beauty kit',category:'Makeup',price:2200,images:['/images/makeup-1.svg'].map(photo),sizes:[],colors:['Natural','Warm'],sample:true,tag:'Beauty essential'}
];
