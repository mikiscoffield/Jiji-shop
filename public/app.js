const categories = ['All shoes', 'Women', 'Men', 'Unisex'];
let category = 'All shoes', current = null, selection = {}, gallery = [], activeImage = 0;
const $ = selector => document.querySelector(selector);
const money = number => new Intl.NumberFormat('en-ET').format(number) + ' ETB';
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function colorButtons(product, context) {
 return product.colors.map(color=>`<button type="button" class="swatch ${context==='detail'?'detail-swatch':''}" data-${context==='card'?'card-color':'option'}="${context==='card'?product.id:'color'}" data-value="${escapeHTML(color)}" aria-label="${escapeHTML(color)}" aria-pressed="false" title="${escapeHTML(color)}"><span style="--swatch:${product.swatches[color]}"></span>${context==='detail'?escapeHTML(color):''}</button>`).join('');
}
function render(){
 $('#categories').innerHTML = categories.map(label=>`<button data-category="${label}" class="${label===category?'active':''}" aria-pressed="${label===category}">${label}</button>`).join('');
 const query = $('#search').value.trim().toLowerCase();
 const brand = $('#brand').value;
 const products = catalog.filter(product=>(category==='All shoes'||product.audience===category||(product.audience==='Unisex'&&category!=='Unisex'))&&(!brand||product.brand===brand)&&[product.name,product.category,product.brand,product.audience,...product.colors].join(' ').toLowerCase().includes(query));
 $('#products').innerHTML = products.map(product=>`<article class="product-card"><button class="product-open" data-product="${product.id}" aria-label="View ${escapeHTML(product.name)}"><div class="card-image"><img src="${product.images[0]}" alt="${escapeHTML(product.name)}" loading="lazy" width="600" height="600"><span class="product-label">${product.brand}</span><span class="card-arrow" aria-hidden="true"><svg class="arrow-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 19 19 5M5 5h14v14"/></svg></span>${product.colors.length>1?'<span class="photo-count">2 colors</span>':''}</div><div class="card-info"><span class="product-category">${product.audience} / ${product.category}</span><h3>${product.name}</h3><strong>${money(product.price)}</strong></div></button><div class="card-bottom"><div class="card-swatches" aria-label="${escapeHTML(product.name)} colors">${colorButtons(product,'card')}</div><span>${product.tag}</span></div></article>`).join('');
 $('#products').querySelectorAll('.card-swatches').forEach(group=>group.querySelector('.swatch').setAttribute('aria-pressed','true'));
 $('#empty').hidden = products.length>0;
 $('#result-count').textContent = `${products.length} ${products.length===1?'style':'styles'} to make your own`;
}
function setGallery(images,color){
 gallery=images; activeImage=0;
 $('#main-photo').src=gallery[0];
 $('#main-photo').alt=current.name+' — '+color;
 $('#current-color').textContent=color;
 $('.thumbnails').innerHTML=gallery.map((src,i)=>`<button data-image="${i}" aria-label="View ${escapeHTML(color)} photo ${i+1}" aria-pressed="${i===0}"><img src="${src}" alt=""></button>`).join('');
}
function openProduct(id,color){
 current=catalog.find(product=>product.id===id); selection={};
 $('#product-detail').innerHTML=`<div class="detail-grid"><div><div class="detail-image-wrap"><img id="main-photo" class="main-photo" alt=""></div><div class="gallery-caption"><span id="current-color"></span><span>Product photograph</span></div><div class="thumbnails"></div></div><div class="detail-copy"><span class="eyebrow">${current.brand} / ${current.audience}</span><h2>${current.name}</h2><div class="detail-price">${money(current.price)}</div><p class="muted">${current.description}</p><fieldset><legend>Choose your color</legend><div class="options color-options">${colorButtons(current,'detail')}</div></fieldset><fieldset><legend>Select size <span class="size-note">EU sizing</span></legend><div class="options">${current.sizes.map(size=>`<button type="button" data-option="size" data-value="${size}" aria-pressed="false">${size}</button>`).join('')}</div></fieldset><p class="availability-note">Please confirm your size, stock, and delivery cost with <a href="https://t.me/christianabe" target="_blank" rel="noopener noreferrer">@ChristianAbe</a> before paying.</p><p id="selection-error" class="error" role="alert"></p><button id="checkout" class="button full">Continue to payment <span aria-hidden="true"><svg class="arrow-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 19 19 5M5 5h14v14"/></svg></span></button><div class="detail-perks"><span>◉ Telebirr payment</span><span><svg class="arrow-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 19 19 5M5 5h14v14"/></svg> Telegram support</span></div></div></div>`;
 $('#product-dialog').showModal();
 const initialColor=color||current.colors[0];
 setGallery(current.variants[initialColor],initialColor);
 // Make the visible color and the order's selected color agree from the start.
 selection.color=initialColor;
 $('#product-detail').querySelectorAll('[data-option="color"]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.value===initialColor)));
}
function payment(){
 if(!selection.size||!selection.color){$('#selection-error').textContent='Please select your size to continue.';return;}
 $('#payment-detail').innerHTML=`<div class="payment-icon">◉</div><span class="eyebrow">YOUR NEXT FAVORITE PAIR</span><h2>Pay with Telebirr</h2><div class="order-summary"><strong>${current.name}</strong><span>EU ${selection.size} · ${selection.color}</span><b>${money(current.price)}</b></div><p class="availability-note">Confirm availability and any delivery cost with the seller before sending money. This amount is the shoe price.</p><p>Account holder: <strong>Lykun</strong></p><div class="phone"><strong>0953610009</strong><button id="copy-phone">Copy number</button></div><p class="muted">Check the recipient name in Telebirr before confirming. Payment is verified manually.</p><a class="button full" href="https://t.me/christianabe" target="_blank" rel="noopener noreferrer">Send screenshot on Telegram <svg class="arrow-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 19 19 5M5 5h14v14"/></svg></a><p class="muted">Attach your payment screenshot and include the shoe name, EU size, and color. Arrange delivery with @ChristianAbe. Opening Telegram does not submit an order or confirm payment.</p>`;
 $('#payment-dialog').showModal();
}
document.addEventListener('click',async event=>{
 const button=event.target.closest('button');if(!button)return;
 if(button.dataset.category){category=button.dataset.category;render();}
 if(button.dataset.product){const card=button.closest('.product-card');openProduct(button.dataset.product,card?.querySelector('.swatch[aria-pressed="true"]')?.dataset.value);}
 if(button.dataset.close)$('#'+button.dataset.close).close();
 if(button.dataset.cardColor){const product=catalog.find(item=>item.id===button.dataset.cardColor);const card=button.closest('.product-card');const image=card.querySelector('img');image.src=product.variants[button.dataset.value][0];image.alt=product.name+' — '+button.dataset.value;card.querySelectorAll('.swatch').forEach(swatch=>swatch.setAttribute('aria-pressed',String(swatch===button)));}
 if(button.dataset.image!==undefined){activeImage=Number(button.dataset.image);$('#main-photo').src=gallery[activeImage];$('.thumbnails').querySelectorAll('button').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));}
 if(button.dataset.option){selection[button.dataset.option]=button.dataset.value;if(button.dataset.option==='color')setGallery(current.variants[button.dataset.value],button.dataset.value);document.querySelectorAll(`[data-option="${button.dataset.option}"]`).forEach(item=>item.setAttribute('aria-pressed',String(item===button)));$('#selection-error').textContent='';}
 if(button.id==='checkout')payment();
 if(button.id==='copy-phone'){try{await navigator.clipboard.writeText('0953610009');$('#toast').textContent='Telebirr number copied';setTimeout(()=>$('#toast').textContent='',2500);}catch{button.textContent='Select the number above to copy';}}
});
$('#search').addEventListener('input',render);
$('#brand').addEventListener('change',render);
for(const dialog of document.querySelectorAll('dialog'))dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
window.Telegram?.WebApp?.ready();
window.Telegram?.WebApp?.expand();
render();
