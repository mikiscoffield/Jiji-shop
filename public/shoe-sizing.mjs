// Brand conversion charts are recorded in SIZING.md. Original SKU sizes remain internal.
const brandCharts = {
 "Nine West": {
  "5": "35",
  "5.5": "36",
  "6": "36.5",
  "6.5": "37",
  "7": "37.5",
  "7.5": "38",
  "8": "38.5",
  "8.5": "39",
  "9": "40",
  "9.5": "40.5",
  "10": "41",
  "10.5": "41.5",
  "11": "42",
  "11.5": "43",
  "12": "44"
 },
 "Steve Madden": {
  "4": "35",
  "4.5": "35",
  "5": "35\u201336",
  "5.5": "36",
  "6": "36\u201337",
  "6.5": "37",
  "7": "37\u201338",
  "7.5": "38",
  "8": "38\u201339",
  "8.5": "39",
  "9": "39\u201340",
  "9.5": "40",
  "10": "40\u201341",
  "10.5": "41",
  "11": "41\u201342",
  "11.5": "42",
  "12": "42\u201343",
  "13": "43",
  "14": "43\u201344"
 }
};
export function displaySize(product, sourceSize) {
 if(product.department!=='Shoes')return sourceSize;
 const wide=/ Wide$/.test(sourceSize);
 const base=sourceSize.replace(/ Wide$/,'');
 const chart=product.audience==='Women'?brandCharts[product.brand]:null;
 const mapped=chart?.[base];
 // When a brand publishes no EU chart, show an explicitly approximate conversion.
 // This changes display only; the original offer/SKU and its price are preserved.
 const approximate=Number(base)+(product.audience==='Women'?31:33);
 const label=mapped ?? (Number.isFinite(approximate)?String(approximate):base);
 return label+(wide?' Wide':'');
}
export function sizeSystemText(product) {
 if(product.department!=='Shoes')return 'Clothing size';
 return product.audience==='Women'&&brandCharts[product.brand]?'EU sizing':'EU sizing (approx.)';
}
