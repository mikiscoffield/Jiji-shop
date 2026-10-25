const translations = {
 topline:'ትንሽ ዘይቤ። ትንሽ ውበት። ብዙ የሚወዱት።',ethiopia:'ለእርስዎ ዕለታዊ ኑሮ፣ ኢትዮጵያ',eyebrow:'ዕለታዊ ውበትዎን ያድሱ',headline:'ምርጥ እቃዎች።<br>ምርጥ ዘይቤ።<br><em>ለእርስዎ።</em>',intro:'አዳዲስ ልብሶች፣ የውበት እቃዎች እና የሚወዷቸው ትናንሽ ነገሮች። የሚቀጥለውን ምርጫዎን ያግኙ።',explore:'ምርቶችን ይመልከቱ',curated:'በጥንቃቄ የተመረጡ።',little:'የዘይቤ ምርጫ',everyday:'በየቀኑ ውብ ይሁኑ።',selected:'በጥንቃቄ የተመረጡ',telebirr:'በቴሌብር ይክፈሉ',telegram:'እርዳታ በቴሌግራም',discover:'የሚወዱትን ያግኙ',collection:'የምርት ስብስብ',collectionNote:'ለእርስዎ የሚሆን ልዩ ምርጫ።',sampleNotice:'የማሳያ ስብስብ · ፎቶዎችና ዋጋዎች ለማሳያ ብቻ ናቸው። እነዚህን ምርቶች አሁን ማዘዝ አይቻልም።',picked:'ለእርስዎ የተመረጡ',empty:'ምርት አልተገኘም። ሌላ ፍለጋ ወይም ምድብ ይሞክሩ።',here:'እኛ እዚህ ነን',helpTitle:'የሚወዱትን ለማግኘት እርዳታ ይፈልጋሉ?',helpText:'ስለ ዘይቤ፣ መጠን ወይም አዲስ ምርቶች ይጠይቁ።',chat:'በቴሌግራም ያነጋግሩን',footer:'በየቀኑ ለእርስዎ።'
};
const original = new Map([...document.querySelectorAll('[data-i18n]')].map(el=>[el,el.innerHTML]));
const categories = ['All finds','Shoes','Clothes','Makeup','Bags','Accessories'];
const amCategories = ['ሁሉም','ጫማዎች','ልብሶች','መዋቢያዎች','ቦርሳዎች','ጌጣጌጦች'];
let lang='en', category='All finds', current=null, activeImage=0, selection={};
const $ = s=>document.querySelector(s);
const t = (en,am)=>lang==='am'?am:en;
const money = n=>new Intl.NumberFormat(lang==='am'?'am-ET':'en-ET').format(n)+' '+t('ETB','ብር');
const name = p=>lang==='am'?p.am:p.name;
const colorNames={White:'ነጭ',Black:'ጥቁር',Cream:'ክሬም',Green:'አረንጓዴ',Tan:'ቡናማ',Rose:'ሮዝ',Nude:'ኑድ',Berry:'ቤሪ',Gold:'ወርቃማ',Silver:'ብር',Blue:'ሰማያዊ',Natural:'ተፈጥሯዊ',Warm:'ዋርም'};
function render(){
 $('#categories').innerHTML=categories.map((c,i)=>`<button data-category="${c}" class="${c===category?'active':''}" aria-pressed="${c===category}">${lang==='am'?amCategories[i]:c}</button>`).join('');
 const q=$('#search').value.trim().toLowerCase();
 const products=catalog.filter(p=>(category==='All finds'||p.category===category)&&[p.name,p.am,p.category].join(' ').toLowerCase().includes(q));
 $('#products').innerHTML=products.map(p=>`<button class="product-card" data-product="${p.id}"><div class="card-image"><img src="${p.images[0]}" alt="${name(p)} — ${t('illustrative sample photo','የማሳያ ፎቶ')}" loading="lazy"><span class="sample-badge">${t('SAMPLE','ማሳያ')}</span><span class="card-arrow">→</span><span class="photo-count">▧ ${p.images.length}</span></div><div class="card-info"><span class="product-category">${lang==='am'?amCategories[categories.indexOf(p.category)]:p.category}</span><h3>${name(p)}</h3><strong>${money(p.price)}</strong><span class="card-tag">${t(p.tag,'የተመረጠ ምርት')}</span></div></button>`).join('');
 $('#empty').hidden=products.length>0;
 $('#result-count').textContent=t(`${products.length} finds to fall for`,`${products.length} ምርቶች`);
}
function options(key,values,label){return values.length?`<fieldset><legend>${label}</legend><div class="options">${values.map(v=>`<button type="button" data-option="${key}" data-value="${v}" aria-pressed="false">${key==='color'&&lang==='am'?colorNames[v]||v:v}</button>`).join('')}</div></fieldset>`:'';}
function openProduct(id){
 current=catalog.find(p=>p.id===id); selection={}; activeImage=0;
 const p=current;
 $('#product-detail').innerHTML=`<div class="detail-grid"><div><img id="main-photo" class="main-photo" src="${p.images[0]}" alt="${name(p)}"><div class="thumbnails">${p.images.map((src,i)=>`<button data-image="${i}" aria-label="${t('View photo','ፎቶ ይመልከቱ')} ${i+1}" aria-pressed="${i===0}"><img src="${src}" alt=""></button>`).join('')}</div><p class="muted">${t('Sample photos illustrate style; they may show different products.','ፎቶዎቹ ዘይቤውን ለማሳየት ብቻ ናቸው፤ የተለያዩ ምርቶችን ሊያሳዩ ይችላሉ።')}</p></div><div class="detail-copy"><span class="eyebrow">${t('THE STYLE EDIT · SAMPLE','የዘይቤ ምርጫ · ማሳያ')}</span><h2>${name(p)}</h2><div class="detail-price">${money(p.price)}</div><p class="muted">${t('Your new everyday favorite. Choose your details to explore the checkout preview.','አዲሱ ዕለታዊ ምርጫዎ። የክፍያ ማሳያውን ለማየት ምርጫዎን ያድርጉ።')}</p>${options('size',p.sizes,t('Select size','መጠን ይምረጡ'))}${options('color',p.colors,t('Select color','ቀለም ይምረጡ'))}<p id="selection-error" class="error" role="alert"></p><button id="checkout" class="button full">${t(p.sample?'Preview payment':'Pay now',p.sample?'የክፍያ ማሳያ':'አሁን ይክፈሉ')} →</button><p class="muted">${t('No cart. One favorite at a time. Delivery is arranged directly on Telegram.','ያለ ጋሪ፣ አንድ ምርት በአንድ ጊዜ። የማድረስ ዝግጅት በቴሌግራም ይደረጋል።')}</p></div></div>`;
 $('#product-dialog').showModal();
}
function payment(){
 const p=current;
 if((p.sizes.length&&!selection.size)||(p.colors.length&&!selection.color)){$('#selection-error').textContent=t('Please choose your size and color where available.','እባክዎ ያለውን መጠን እና ቀለም ይምረጡ።');return;}
 $('#payment-detail').innerHTML=`<div class="payment-icon">◉</div><span class="eyebrow">TELEBIRR</span><h2>${t(p.sample?'Payment preview':'Pay with Telebirr',p.sample?'የክፍያ ማሳያ':'በቴሌብር ይክፈሉ')}</h2><div class="order-summary"><strong>${name(p)}</strong><span>${Object.values(selection).join(' · ')}</span><b>${money(p.price)}</b></div>${p.sample?`<p class="preview-note">${t('Sample item — do not send money. This is a preview only.','የማሳያ ምርት — ገንዘብ አይላኩ። ይህ ለማሳያ ብቻ ነው።')}</p>`:''}<p>${t('Telebirr recipient','የቴሌብር ተቀባይ')}: <strong>Lykun</strong></p><div class="phone"><strong>0953610009</strong><button id="copy-phone">${t('Copy','ቅዳ')}</button></div><p class="muted">${t('Check the recipient name in Telebirr before confirming. Payment is verified manually.','ከማረጋገጥዎ በፊት በቴሌብር የተቀባዩን ስም ያረጋግጡ። ክፍያው በሰው ይረጋገጣል።')}</p><a class="button full" href="https://t.me/christianabe" target="_blank" rel="noopener noreferrer">${t('Send screenshot on Telegram','የክፍያ ማስረጃ በቴሌግራም ይላኩ')} →</a><p class="muted">${t('Attach your screenshot yourself and include the product, size and color. Arrange delivery with @ChristianAbe. Opening Telegram does not confirm payment.','የክፍያ ማስረጃዎን ያያይዙ፣ ምርቱን፣ መጠኑን እና ቀለሙን ይጻፉ። ስለ ማድረስ ከ @ChristianAbe ጋር ይነጋገሩ። ቴሌግራምን መክፈት ክፍያ አያረጋግጥም።')}</p>`;
 $('#payment-dialog').showModal();
}
document.addEventListener('click',async e=>{
 const button=e.target.closest('button'); if(!button)return;
 if(button.dataset.category){category=button.dataset.category;render();}
 if(button.dataset.product)openProduct(button.dataset.product);
 if(button.dataset.close)$('#'+button.dataset.close).close();
 if(button.dataset.image!==undefined){activeImage=Number(button.dataset.image);$('#main-photo').src=current.images[activeImage];document.querySelectorAll('[data-image]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}
 if(button.dataset.option){selection[button.dataset.option]=button.dataset.value;document.querySelectorAll(`[data-option="${button.dataset.option}"]`).forEach(b=>b.setAttribute('aria-pressed',String(b===button)));$('#selection-error').textContent='';}
 if(button.id==='checkout')payment();
 if(button.id==='copy-phone'){
  try{await navigator.clipboard.writeText('0953610009');$('#toast').textContent=t('Telebirr number copied','የቴሌብር ቁጥር ተቀድቷል');setTimeout(()=>$('#toast').textContent='',2500);}catch{button.textContent=t('Select and copy the number above','ከላይ ያለውን ቁጥር ይቅዱ');}
 }
});
$('#search').addEventListener('input',render);
$('#language').addEventListener('click',()=>{lang=lang==='en'?'am':'en';document.documentElement.lang=lang;original.forEach((html,el)=>el.innerHTML=lang==='am'?translations[el.dataset.i18n]||html:html);$('#language').textContent=lang==='am'?'English ⇄':'አማርኛ ⇄';$('#language').setAttribute('aria-label',lang==='am'?'Switch to English':'Switch to Amharic');$('#search').placeholder=t('Find something you love…','የሚወዱትን ይፈልጉ…');$('#search').setAttribute('aria-label',t('Search products','ምርቶችን ይፈልጉ'));render();});
for(const dialog of document.querySelectorAll('dialog'))dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
window.Telegram?.WebApp?.ready();
window.Telegram?.WebApp?.expand();
render();
