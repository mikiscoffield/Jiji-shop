// ETB shop prices, not converted or verified Amazon prices. Source notes: IMAGE-SOURCES.md.
// Sizes are order selections; customers must confirm availability with the seller.
const shoeImage = file => '/images/shoes/' + file;
const additionalProducts = [
 {
  "id": "black-trainer",
  "name": "Nike Trainer — Black & White",
  "brand": "Nike",
  "department": "Shoes",
  "category": "Training",
  "audience": "Women",
  "price": 4800,
  "tag": "The dark-tone edit",
  "description": "A dark mesh upper, contrasting white Swoosh, and sculpted sole. A clean black-and-white sport-inspired look.",
  "sizes": [
   "36",
   "37",
   "38",
   "39",
   "40",
   "41"
  ],
  "variants": {
   "Black / White": [
    "/images/shoes/shoe4.svg"
   ]
  },
  "swatches": {
   "Black / White": "#262626"
  }
 },
 {
  "id": "air-multi",
  "name": "Nike Air — White & Teal",
  "brand": "Nike",
  "department": "Shoes",
  "category": "Lifestyle",
  "audience": "Unisex",
  "price": 5700,
  "tag": "New to the collection",
  "description": "White panels, teal accents, and orange details bring color to a chunky street-inspired profile.",
  "sizes": [
   "37",
   "38",
   "39",
   "40",
   "41",
   "42",
   "43",
   "44",
   "45"
  ],
  "variants": {
   "White / Teal": [
    "/images/shoes/shoe5.svg"
   ]
  },
  "swatches": {
   "White / Teal": "#c9d6d0"
  }
 },
 {
  "id": "dark-low",
  "name": "Nike Low — Dark Olive",
  "brand": "Nike",
  "department": "Shoes",
  "category": "Lifestyle",
  "audience": "Unisex",
  "price": 4900,
  "tag": "New to the collection",
  "description": "Deep olive tones, a dark Swoosh, and a gum-colored outsole. A low-profile style for a muted rotation.",
  "sizes": [
   "37",
   "38",
   "39",
   "40",
   "41",
   "42",
   "43",
   "44",
   "45"
  ],
  "variants": {
   "Dark Olive": [
    "/images/shoes/shoe6.svg"
   ]
  },
  "swatches": {
   "Dark Olive": "#38392f"
  }
 },
 {
  "id": "knit-night",
  "name": "Knit Runner — Black & Purple",
  "brand": "Style edit",
  "department": "Shoes",
  "category": "Running",
  "audience": "Women",
  "price": 4400,
  "tag": "The dark-tone edit",
  "description": "A dark knit design with purple details and a warm gradient sole. A bold finish to a simple outfit.",
  "sizes": [
   "36",
   "37",
   "38",
   "39",
   "40",
   "41"
  ],
  "variants": {
   "Black / Purple": [
    "/images/shoes/shoe8.svg"
   ]
  },
  "swatches": {
   "Black / Purple": "#332640"
  }
 },
 {
  "id": "utility-black",
  "name": "Utility High — Black & Yellow",
  "brand": "Style edit",
  "department": "Shoes",
  "category": "Outdoor",
  "audience": "Unisex",
  "price": 5900,
  "tag": "The dark-tone edit",
  "description": "A technical high-top profile with dark panels and yellow detailing. Ask the seller about the exact intended use and fit.",
  "sizes": [
   "37",
   "38",
   "39",
   "40",
   "41",
   "42",
   "43",
   "44",
   "45"
  ],
  "variants": {
   "Black / Yellow": [
    "/images/shoes/sports-2.jpg"
   ]
  },
  "swatches": {
   "Black / Yellow": "#1c2020"
  }
 },
 {
  "id": "nike-high",
  "name": "Nike High — Black & Grey",
  "brand": "Nike",
  "department": "Shoes",
  "category": "High tops",
  "audience": "Unisex",
  "price": 5600,
  "tag": "The dark-tone edit",
  "description": "A high-top silhouette with black panels, a grey sole, and contrasting Swoosh. A striking addition to a dark wardrobe.",
  "sizes": [
   "37",
   "38",
   "39",
   "40",
   "41",
   "42",
   "43",
   "44",
   "45"
  ],
  "variants": {
   "Black / Grey": [
    "/images/shoes/sports-3.jpg"
   ]
  },
  "swatches": {
   "Black / Grey": "#25272a"
  }
 },
 {
  "id": "cycle-black",
  "name": "Sport Closure — Black & Yellow",
  "brand": "Style edit",
  "department": "Shoes",
  "category": "Sport",
  "audience": "Unisex",
  "price": 5200,
  "tag": "The dark-tone edit",
  "description": "A low-cut technical sport shoe with a closure strap and yellow accents. Confirm suitability for your sport with the seller.",
  "sizes": [
   "37",
   "38",
   "39",
   "40",
   "41",
   "42",
   "43",
   "44",
   "45"
  ],
  "variants": {
   "Black / Yellow": [
    "/images/shoes/sports-4.jpg"
   ]
  },
  "swatches": {
   "Black / Yellow": "#25282a"
  }
 },
 {
  "id": "formal-burgundy",
  "name": "Lace-up Formal — Burgundy & Black",
  "brand": "Style edit",
  "department": "Shoes",
  "category": "Formal",
  "audience": "Men",
  "price": 4300,
  "tag": "The dark-tone edit",
  "description": "A polished lace-up silhouette with a pointed profile and contrasting burgundy panels. Two photographic views of the same design.",
  "sizes": [
   "37",
   "38",
   "39",
   "40",
   "41",
   "42",
   "43",
   "44",
   "45"
  ],
  "variants": {
   "Burgundy / Black": [
    "/images/shoes/shoe-1.jpg",
    "/images/shoes/shoe-1_1.jpg"
   ]
  },
  "swatches": {
   "Burgundy / Black": "#342126"
  }
 },
 {
  "id": "black-ankle",
  "name": "Ankle Lace-up — Black",
  "brand": "Style edit",
  "department": "Shoes",
  "category": "Formal",
  "audience": "Men",
  "price": 4500,
  "tag": "The dark-tone edit",
  "description": "An understated black ankle-high lace-up with a smooth finish and streamlined shape.",
  "sizes": [
   "37",
   "38",
   "39",
   "40",
   "41",
   "42",
   "43",
   "44",
   "45"
  ],
  "variants": {
   "Black": [
    "/images/shoes/shoe-3.jpg"
   ]
  },
  "swatches": {
   "Black": "#171b1d"
  }
 },
 {
  "id": "brown-boot",
  "name": "Lace-up Boot — Brown",
  "brand": "Style edit",
  "department": "Shoes",
  "category": "Boots",
  "audience": "Men",
  "price": 5800,
  "tag": "New to the collection",
  "description": "A brown lace-up boot with metal eyelets and a contrasting rugged sole. Two photographic views of the same design.",
  "sizes": [
   "37",
   "38",
   "39",
   "40",
   "41",
   "42",
   "43",
   "44",
   "45"
  ],
  "variants": {
   "Brown": [
    "/images/shoes/shoe-4.jpg",
    "/images/shoes/shoe-5.jpg"
   ]
  },
  "swatches": {
   "Brown": "#684c39"
  }
 },
 {
  "id": "dress",
  "name": "The Everyday Light Jacket",
  "brand": "Style edit",
  "department": "Clothes",
  "category": "Clothes",
  "audience": "Women",
  "price": 2850,
  "tag": "The everyday edit",
  "description": "A lightweight navy jacket with a relaxed shape and contrasting lining.",
  "sizes": [
   "S",
   "M",
   "L",
   "XL"
  ],
  "variants": {
   "Navy": [
    "/images/lifestyle/jacket.jpg"
   ]
  },
  "swatches": {
   "Navy": "#223449"
  }
 },
 {
  "id": "shirt",
  "name": "Relaxed Everyday Shirt",
  "brand": "Style edit",
  "department": "Clothes",
  "category": "Clothes",
  "audience": "Women",
  "price": 1800,
  "tag": "The everyday edit",
  "description": "A relaxed purple V-neck tee with a printed design. Easy style for your everyday.",
  "sizes": [
   "S",
   "M",
   "L",
   "XL"
  ],
  "variants": {
   "Purple": [
    "/images/lifestyle/shirt.jpg"
   ]
  },
  "swatches": {
   "Purple": "#773c74"
  }
 },
 {
  "id": "bag",
  "name": "City Days Backpack — Navy",
  "brand": "Style edit",
  "department": "Bags",
  "category": "Bags",
  "audience": "Unisex",
  "price": 2400,
  "tag": "The everyday edit",
  "description": "A practical navy backpack with contrasting straps and a classic everyday silhouette.",
  "sizes": [],
  "variants": {
   "Navy": [
    "/images/lifestyle/bag.jpg"
   ]
  },
  "swatches": {
   "Navy": "#243447"
  }
 },
 {
  "id": "jewelry",
  "name": "Statement Ring — Silver",
  "brand": "Style edit",
  "department": "Accessories",
  "category": "Accessories",
  "audience": "Women",
  "price": 850,
  "tag": "The everyday edit",
  "description": "A silver-tone statement ring with a bright central stone. Confirm ring sizing with the seller.",
  "sizes": [],
  "variants": {
   "Silver": [
    "/images/lifestyle/necklace.jpg"
   ]
  },
  "swatches": {
   "Silver": "#b7bdc3"
  }
 },
 {
  "id": "beauty-cleanser",
  "name": "Gentle Beauty Cleanser",
  "brand": "Style edit",
  "department": "Makeup",
  "category": "Makeup",
  "audience": "Women",
  "price": 950,
  "tag": "The everyday edit",
  "description": "A beauty cleanser for your daily routine. Confirm ingredients, skin suitability, and bottle size with the seller before ordering.",
  "sizes": [],
  "variants": {
   "As pictured": [
    "/images/lifestyle/beauty-1.jpg"
   ]
  },
  "swatches": {
   "As pictured": "#e9dbcd"
  }
 },
 {
  "id": "beauty-serum",
  "name": "Daily Skincare Essential",
  "brand": "Style edit",
  "department": "Makeup",
  "category": "Makeup",
  "audience": "Women",
  "price": 2200,
  "tag": "The everyday edit",
  "description": "A bottled skincare essential for your beauty routine. Ask the seller for the exact product, ingredients, and volume.",
  "sizes": [],
  "variants": {
   "As pictured": [
    "/images/lifestyle/beauty-2.jpg"
   ]
  },
  "swatches": {
   "As pictured": "#dcc9ac"
  }
 }
];
window.catalog = [
 {id:'course',name:'Nike Course — White & Mint',brand:'Nike',category:'Sneakers',audience:'Unisex',price:4800,tag:'Two colorways',description:'A clean, low-cut silhouette with a sculpted sole. Choose crisp white or fresh mint — the photo shows your selected color.',sizes:['36','37','38','39','40','41','42','43','44'],variants:{White:[shoeImage('sports-1.jpg')],Mint:[shoeImage('sports-5.jpg')]},swatches:{White:'#f5f4ed',Mint:'#a5ded1'}},
 {id:'turquoise',name:'Nike Trail — Turquoise',brand:'Nike',category:'Running',audience:'Unisex',price:4500,tag:'Color in motion',description:'Turquoise mesh, an orange outsole, and a bold black Swoosh. A standout look for your everyday rotation.',sizes:['37','38','39','40','41','42','43','44'],variants:{Turquoise:[shoeImage('product-1.jpg')]},swatches:{Turquoise:'#2a9eb0'}},
 {id:'rose',name:'Nike Air — Pink',brand:'Nike',category:'Sneakers',audience:'Women',price:4200,tag:'A brighter everyday',description:'A vibrant pink silhouette with a contrasting silver Swoosh. Made for outfits that deserve a little color.',sizes:['36','37','38','39','40','41'],variants:{Pink:[shoeImage('product-7.jpg')]},swatches:{Pink:'#d42d9b'}},
 {id:'wheat',name:'Nike Low — Wheat',brand:'Nike',category:'Lifestyle',audience:'Men',price:5500,tag:'Earth-tone essential',description:'Warm wheat tones, a dark textile collar, and a white sole. An easy-to-style addition to a casual wardrobe.',sizes:['39','40','41','42','43','44','45'],variants:{Wheat:[shoeImage('big-shoe2.png')]},swatches:{Wheat:'#b98147'}},
 {id:'lime',name:'Nike Sport — Volt',brand:'Nike',category:'Running',audience:'Unisex',price:4600,tag:'Make an entrance',description:'Electric lime with geometric texture and a black Swoosh. A vivid sport-inspired silhouette.',sizes:['37','38','39','40','41','42','43','44'],variants:{Volt:[shoeImage('product-5.jpg')]},swatches:{Volt:'#bded37'}},
 {id:'coral',name:'Nike Knit — White & Orange',brand:'Nike',category:'Running',audience:'Women',price:4900,tag:'Fresh perspective',description:'A light knit look with warm orange accents and a sculpted white sole. A fresh take on your daily sneakers.',sizes:['36','37','38','39','40','41'],variants:{'White / Orange':[shoeImage('product-4.jpg')]},swatches:{'White / Orange':'#ff874f'}},
 {id:'navy',name:'Nike Run — Navy & Volt',brand:'Nike',category:'Running',audience:'Men',price:4700,tag:'The sport edit',description:'Deep navy with a bright lime sole and contrasting Swoosh. A bold athletic look from every angle.',sizes:['39','40','41','42','43','44','45'],variants:{'Navy / Volt':[shoeImage('product-2.jpg')]},swatches:{'Navy / Volt':'#273946'}},
 {id:'red-air',name:'Nike Air — All Red',brand:'Nike',category:'Sneakers',audience:'Unisex',price:5200,tag:'One color. Big energy.',description:'Tonal red from the laces to the sole, with a recognizable visible-air silhouette. The statement piece in your rotation.',sizes:['37','38','39','40','41','42','43','44'],variants:{Red:[shoeImage('product-3.jpg')]},swatches:{Red:'#c52335'}},
 {id:'blue',name:'Nike Everyday — Blue',brand:'Nike',category:'Sneakers',audience:'Women',price:3500,tag:'Everyday color',description:'A bright blue upper and clean white sole. A simple, colorful silhouette to pair with everyday outfits.',sizes:['36','37','38','39','40','41'],variants:{Blue:[shoeImage('product-8.jpg')]},swatches:{Blue:'#049cd0'}},
 {id:'red-white',name:'Nike Street — Red & White',brand:'Nike',category:'Lifestyle',audience:'Unisex',price:5000,tag:'Street-style favorite',description:'Bright red panels meet a contrasting white midsole. A distinctive street-inspired profile.',sizes:['37','38','39','40','41','42','43','44'],variants:{'Red / White':[shoeImage('product-6.jpg')]},swatches:{'Red / White':'#e42a31'}},
 {id:'outdoor',name:'Adidas Outdoor — Blue & Black',brand:'Adidas',category:'Outdoor',audience:'Men',price:5800,tag:'Take the scenic route',description:'Blue and black panels, a rugged profile, and a contrasting white sole. An outdoor-inspired look.',sizes:['39','40','41','42','43','44','45'],variants:{'Blue / Black':[shoeImage('big-shoe3.png')]},swatches:{'Blue / Black':'#1474c2'}},
 {id:'olive',name:'New Balance Low — Olive',brand:'New Balance',category:'Lifestyle',audience:'Unisex',price:6000,tag:'Quietly distinctive',description:'An olive low-top profile with the signature N detail and a contrasting sole. Muted tones, strong everyday style.',sizes:['37','38','39','40','41','42','43','44','45'],variants:{Olive:[shoeImage('shoe7.svg')]},swatches:{Olive:'#6d6f5b'}}
, ...additionalProducts].map(product=>({department:"Shoes",...product,colors:Object.keys(product.variants),images:Object.values(product.variants).flat()}));
