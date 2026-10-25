const categories = ['All finds','Shoes','Clothes','Makeup','Bags','Accessories'];
let category='All finds', current=null, activeImage=0, selection={};
const $ = s=>document.querySelector(s);
const money = n=>new Intl.NumberFormat('en-ET').format(n)+' ETB';
const name = p=>p.name;
function render(){
 $('#categories').innerHTML=categories.map((c,i)=>`<button data-category="${c}" class="${c===category?'active':''}" aria-pressed="${c===category}">${c}</button>`).join('');
 const q=$('#search').value.trim().toLowerCase();
 const products=catalog.filter(p=>(category==='All finds'||p.category===category)&&[p.name,p.category].join(' ').toLowerCase().includes(q));
 $('#products').innerHTML=products.map(p=>`<button class="product-card" data-product="${p.id}"><div class="card-image"><img src="${p.images[0]}" alt="${name(p)} — ${'illustrative sample photo'}" loading="lazy"><span class="sample-badge">${'SAMPLE'}</span><span class="card-arrow">→</span><span class="photo-count">▧ ${p.images.length}</span></div><div class="card-info"><span class="product-category">${p.category}</span><h3>${name(p)}</h3><strong>${money(p.price)}</strong><span class="card-tag">${p.tag}</span></div></button>`).join('');
 $('#empty').hidden=products.length>0;
 $('#result-count').textContent=`${products.length} finds to fall for`;
}
function options(key,values,label){return values.length?`<fieldset><legend>${label}</legend><div class="options">${values.map(v=>`<button type="button" data-option="${key}" data-value="${v}" aria-pressed="false">${v}</button>`).join('')}</div></fieldset>`:'';}
function openProduct(id){
 current=catalog.find(p=>p.id===id); selection={}; activeImage=0;
 const p=current;
 $('#product-detail').innerHTML=`<div class="detail-grid"><div><img id="main-photo" class="main-photo" src="${p.images[0]}" alt="${name(p)}"><div class="thumbnails">${p.images.map((src,i)=>`<button data-image="${i}" aria-label="${'View photo'} ${i+1}" aria-pressed="${i===0}"><img src="${src}" alt=""></button>`).join('')}</div><p class="muted">${'Sample photos illustrate style; they may show different products.'}</p></div><div class="detail-copy"><span class="eyebrow">${'THE STYLE EDIT · SAMPLE'}</span><h2>${name(p)}</h2><div class="detail-price">${money(p.price)}</div><p class="muted">${'Your new everyday favorite. Choose your details to explore the checkout preview.'}</p>${options('size',p.sizes,'Select size')}${options('color',p.colors,'Select color')}<p id="selection-error" class="error" role="alert"></p><button id="checkout" class="button full">${(p.sample?'Preview payment':'Pay now')} →</button><p class="muted">${'No cart. One favorite at a time. Delivery is arranged directly on Telegram.'}</p></div></div>`;
 $('#product-dialog').showModal();
}
function showColorPhotos(color){
 const images=current.variants?.[color];
 if(!images?.length)return;
 activeImage=0;
 $('#main-photo').src=images[0];
 $('#main-photo').alt=current.name+' — '+color;
 $('.thumbnails').innerHTML=images.map((src,i)=>`<button data-image="${i}" aria-label="View ${color} photo ${i+1}" aria-pressed="${i===0}"><img src="${src}" alt=""></button>`).join('');
}
function payment(){
 const p=current;
 if((p.sizes.length&&!selection.size)||(p.colors.length&&!selection.color)){$('#selection-error').textContent='Please choose your size and color where available.';return;}
 $('#payment-detail').innerHTML=`<div class="payment-icon">◉</div><span class="eyebrow">TELEBIRR</span><h2>${(p.sample?'Payment preview':'Pay with Telebirr')}</h2><div class="order-summary"><strong>${name(p)}</strong><span>${Object.values(selection).join(' · ')}</span><b>${money(p.price)}</b></div>${p.sample?`<p class="preview-note">${'Sample item — do not send money. This is a preview only.'}</p>`:''}<p>${'Telebirr recipient'}: <strong>Lykun</strong></p><div class="phone"><strong>0953610009</strong><button id="copy-phone">${'Copy'}</button></div><p class="muted">${'Check the recipient name in Telebirr before confirming. Payment is verified manually.'}</p><a class="button full" href="https://t.me/christianabe" target="_blank" rel="noopener noreferrer">${'Send screenshot on Telegram'} →</a><p class="muted">${'Attach your screenshot yourself and include the product, size and color. Arrange delivery with @ChristianAbe. Opening Telegram does not confirm payment.'}</p>`;
 $('#payment-dialog').showModal();
}
document.addEventListener('click',async e=>{
 const button=e.target.closest('button'); if(!button)return;
 if(button.dataset.category){category=button.dataset.category;render();}
 if(button.dataset.product)openProduct(button.dataset.product);
 if(button.dataset.close)$('#'+button.dataset.close).close();
 if(button.dataset.image!==undefined){activeImage=Number(button.dataset.image);$('#main-photo').src=(current.variants?.[selection.color] || current.images)[activeImage];document.querySelectorAll('[data-image]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}
 if(button.dataset.option){selection[button.dataset.option]=button.dataset.value;if(button.dataset.option==='color')showColorPhotos(button.dataset.value);document.querySelectorAll(`[data-option="${button.dataset.option}"]`).forEach(b=>b.setAttribute('aria-pressed',String(b===button)));$('#selection-error').textContent='';}
 if(button.id==='checkout')payment();
 if(button.id==='copy-phone'){
  try{await navigator.clipboard.writeText('0953610009');$('#toast').textContent='Telebirr number copied';setTimeout(()=>$('#toast').textContent='',2500);}catch{button.textContent='Select and copy the number above';}
 }
});
$('#search').addEventListener('input',render);
for(const dialog of document.querySelectorAll('dialog'))dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
window.Telegram?.WebApp?.ready();
window.Telegram?.WebApp?.expand();
render();
