import { getDeliveryDates } from './delivery-date.mjs';
const categories = ['All finds', 'Shoes', 'Clothes', 'Makeup', 'Bags', 'Accessories'];
let category = 'All finds', current = null, selection = {}, gallery = [], activeImage = 0, deliveryDetails = null, deliveryTransition = 0;
const $ = selector => document.querySelector(selector);
const money = number => new Intl.NumberFormat('en-ET').format(number) + ' ETB';
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function colorButtons(product, context) {
 return product.colors.map(color=>`<button type="button" class="swatch ${context==='detail'?'detail-swatch':''}" data-${context==='card'?'card-color':'option'}="${context==='card'?product.id:'color'}" data-value="${escapeHTML(color)}" aria-label="${escapeHTML(color)}" aria-pressed="false" title="${escapeHTML(color)}"><span style="--swatch:${product.swatches[color]}"></span>${context==='detail'?escapeHTML(color):''}</button>`).join('');
}
function render(){
 $('#categories').innerHTML = categories.map(label=>`<button data-category="${label}" class="${label===category?'active':''}" aria-pressed="${label===category}">${label}</button>`).join('');
 const query = $('#search').value.trim().toLowerCase();
 const audience = $('#audience').value;
 const scoped = catalog.filter(product=>(category==='All finds'||product.department===category)&&(!audience||product.audience===audience||(product.audience==='Unisex'&&audience!=='Unisex')));
 const previousBrand = $('#brand').value;
 $('#brand').innerHTML='<option value="">All brands</option>'+[...new Set(scoped.map(product=>product.brand))].sort().map(brand=>`<option>${escapeHTML(brand)}</option>`).join('');
 if([...$('#brand').options].some(option=>option.value===previousBrand))$('#brand').value=previousBrand;
 const brand = $('#brand').value;
 const products = scoped.filter(product=>(!brand||product.brand===brand)&&[product.name,product.category,product.brand,product.audience,...product.colors].join(' ').toLowerCase().includes(query));
 $('#products').innerHTML = products.map(product=>`<article class="product-card"><button class="product-open" data-product="${product.id}" aria-label="View ${escapeHTML(product.name)}"><div class="card-image"><img src="${product.images[0]}" alt="${escapeHTML(product.name)}" loading="lazy" width="600" height="600"><span class="product-label">${product.brand}</span><span class="card-arrow" aria-hidden="true"><svg class="arrow-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 19 19 5M5 5h14v14"/></svg></span>${product.colors.length>1?`<span class="photo-count">${product.colors.length} colors</span>`:''}</div><div class="card-info"><span class="product-category">${product.audience} / ${product.category}</span><h3>${product.name}</h3><strong>${money(product.price)}</strong></div></button><div class="card-bottom"><div class="card-swatches" aria-label="${escapeHTML(product.name)} colors">${colorButtons(product,'card')}</div><span>${product.tag}</span></div></article>`).join('');
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
 current=catalog.find(product=>product.id===id); selection={}; deliveryDetails=null;
 $('#product-detail').innerHTML=`<div class="detail-grid"><div><div class="detail-image-wrap"><img id="main-photo" class="main-photo" alt=""></div><div class="gallery-caption"><span id="current-color"></span><span>Product photograph</span></div><div class="thumbnails"></div></div><div class="detail-copy"><span class="eyebrow">${current.brand} / ${current.audience}</span><h2>${current.name}</h2><div class="detail-price">${money(current.price)}</div><p class="muted">${current.description}</p><fieldset><legend>Choose your color</legend><div class="options color-options">${colorButtons(current,'detail')}</div></fieldset>${current.sizes.length?`<fieldset><legend>Select size <span class="size-note">${current.department==='Shoes'?'EU sizing':'Clothing size'}</span></legend><div class="options">${current.sizes.map(size=>`<button type="button" data-option="size" data-value="${size}" aria-pressed="false">${size}</button>`).join('')}</div></fieldset>`:''}<p class="availability-note">Please confirm availability, your selection, and delivery cost with <a href="https://t.me/christianabe" target="_blank" rel="noopener noreferrer">@ChristianAbe</a> before paying.</p><p id="selection-error" class="error" role="alert"></p><button id="checkout" class="button full">Continue to delivery <span aria-hidden="true"><svg class="arrow-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 19 19 5M5 5h14v14"/></svg></span></button><div class="detail-perks"><span>◉ Telebirr payment</span><span><svg class="arrow-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 19 19 5M5 5h14v14"/></svg> Telegram support</span></div></div></div>`;
 $('#product-dialog').showModal();
 const initialColor=color||current.colors[0];
 setGallery(current.variants[initialColor],initialColor);
 // Make the visible color and the order's selected color agree from the start.
 selection.color=initialColor;
 $('#product-detail').querySelectorAll('[data-option="color"]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.value===initialColor)));
}
const deliveryFields = [
 {key:'name',label:'Recipient full name',placeholder:'Full name',required:true,max:100},
 {key:'phone',label:'Phone number',placeholder:'09… / 07… / +251…',required:true,max:30,type:'tel'},
 {key:'city',label:'City / town',placeholder:'Your city or town',required:true,max:80},
 {key:'notes',label:'Delivery instructions',placeholder:'Optional — delivery preferences or directions',max:400,multiline:true}
];
function deliverySchedule(){
 const dates=getDeliveryDates();
 return `<div class="delivery-schedule"><strong>Delivery will be tomorrow</strong><span><b>Gregorian:</b> <time datetime="${dates.iso}">${dates.gregorian}</time></span><span><b>Ethiopian:</b> ${dates.ethiopian}</span></div>`;
}
const pause = milliseconds => new Promise(resolve=>setTimeout(resolve,milliseconds));
async function beginDelivery(){
 if(current.sizes.length&&!selection.size){$('#selection-error').textContent='Please select your size to continue.';return;}
 const button=$('#checkout');
 if(button.disabled)return;
 const original=button.innerHTML;
 const token=++deliveryTransition;
 const product=current;
 button.disabled=true;
 button.setAttribute('aria-busy','true');
 button.textContent='Preparing delivery…';
 try{
  await pause(1000);
  if(token!==deliveryTransition||current!==product||!$('#product-dialog').open)return;
  $('#transition-dialog').showModal();
  await pause(1000);
  if(token!==deliveryTransition||current!==product||!$('#product-dialog').open||!$('#transition-dialog').open)return;
  $('#transition-dialog').close();
  delivery();
 }finally{
  button.disabled=false;
  button.removeAttribute('aria-busy');
  button.innerHTML=original;
 }
}
$('#transition-dialog').addEventListener('cancel',()=>{deliveryTransition++;});
$('#product-dialog').addEventListener('close',()=>{
 deliveryTransition++;
 if($('#transition-dialog').open)$('#transition-dialog').close();
});
function delivery(){
 if(current.sizes.length&&!selection.size){$('#selection-error').textContent='Please select your size to continue.';return;}
 $('#delivery-detail').innerHTML=`<span class="eyebrow">YOUR ORDER · DELIVERY DETAILS</span><h2>Where should it go?</h2><p class="muted">${escapeHTML(current.name)} · ${escapeHTML(selection.color)}${selection.size?' · '+escapeHTML(selection.size):''} · ${money(current.price)}</p>${deliverySchedule()}<form id="delivery-form" method="dialog" autocomplete="off"><div class="delivery-fields">${deliveryFields.map(field=>`<label class="delivery-field ${field.multiline?'wide':''}" for="delivery-${field.key}"><span>${field.label}${field.required?' <span aria-hidden="true">*</span>':' <span class="optional">(optional)</span>'}</span>${field.multiline?`<textarea id="delivery-${field.key}" name="${field.key}" rows="3" maxlength="${field.max}" placeholder="${field.placeholder}" autocomplete="off">${escapeHTML(deliveryDetails?.[field.key]||'')}</textarea>`:`<input id="delivery-${field.key}" name="${field.key}" type="${field.type||'text'}" ${field.required?'required':''} maxlength="${field.max}" placeholder="${field.placeholder}" value="${escapeHTML(deliveryDetails?.[field.key]||'')}" autocomplete="off">`}</label>`).join('')}</div><p class="delivery-privacy">These details stay only on this open page. They are not saved or sent automatically. Share your contact and delivery information directly with @ChristianAbe in Telegram when sending your payment screenshot.</p><div class="delivery-actions"><button type="button" class="back-button" data-close="delivery-dialog">Back to item</button><button type="submit" class="button">Continue to Telebirr →</button></div></form>`;
 $('#delivery-dialog').showModal();
 $('#delivery-name').focus();
}
function orderText(){
 return ['JIJI SHOP ORDER',current.name,...(selection.size?[(current.department==='Shoes'?'EU size: ':'Size: ')+selection.size]:[]),'Color: '+selection.color,'Item price: '+money(current.price),'Delivery: tomorrow', 'Gregorian date: '+getDeliveryDates().gregorian, 'Ethiopian date: '+getDeliveryDates().ethiopian, 'Delivery cost: confirm with seller','', 'DELIVERY DETAILS',...deliveryFields.filter(field=>deliveryDetails[field.key]).map(field=>field.label+': '+deliveryDetails[field.key])].join('\n');
}
function payment(){
 if(!deliveryDetails){delivery();return;}
 $('#payment-detail').innerHTML=`<div class="payment-icon">◉</div><span class="eyebrow">YOUR ORDER · PAYMENT</span><h2>Pay with Telebirr</h2><div class="order-summary"><strong>${escapeHTML(current.name)}</strong><span>${selection.size?(current.department==='Shoes'?'EU ':'')+escapeHTML(selection.size)+' · ':''}${escapeHTML(selection.color)}</span><b>${money(current.price)}</b></div>${deliverySchedule()}<details class="delivery-review"><summary>Review your order & delivery</summary><pre id="order-text" tabindex="0"></pre></details><button id="edit-delivery" class="edit-delivery">Edit delivery details</button><p class="availability-note">Confirm availability and any delivery cost with the seller before sending money. This amount is the item price.</p><p>Account holder: <strong>Lykun</strong></p><div class="phone"><strong>0953610009</strong><button id="copy-phone">Copy number</button></div><p class="muted">Check the recipient name in Telebirr before confirming. Payment is verified manually.</p><a class="button full" href="https://t.me/christianabe" target="_blank" rel="noopener noreferrer">Send screenshot on Telegram →</a><p class="payment-screenshot-note">Send your payment screenshot</p>`;
 $('#order-text').textContent=orderText();
 $('#payment-dialog').showModal();
}
document.addEventListener('input',event=>{
 if(event.target.closest('#delivery-form'))event.target.setCustomValidity('');
});
document.addEventListener('submit',event=>{
 if(event.target.id!=='delivery-form')return;
 event.preventDefault();
 const form=event.target;
 const values={};
 for(const field of deliveryFields){
  const input=form.elements.namedItem(field.key);
  input.setCustomValidity('');
  values[field.key]=input.value.trim();
  if(field.required&&!values[field.key])input.setCustomValidity('Please enter '+field.label.toLowerCase()+'.');
 }
 values.phone=values.phone.replace(/[\s()−-]/g,'');
 if(!/^(?:\+251|00251|0)[79]\d{8}$/.test(values.phone))form.elements.namedItem('phone').setCustomValidity('Enter an Ethiopian mobile number starting with 09, 07, or +251 followed by 9 or 7 and eight more digits.');
 if(!form.reportValidity())return;
 deliveryDetails=values;
 $('#delivery-dialog').close();
 payment();
});
document.addEventListener('click',async event=>{
 const button=event.target.closest('button');if(!button)return;
 if(button.dataset.category){category=button.dataset.category;$('#brand').value='';render();}
 if(button.dataset.product){const card=button.closest('.product-card');openProduct(button.dataset.product,card?.querySelector('.swatch[aria-pressed="true"]')?.dataset.value);}
 if(button.dataset.close)$('#'+button.dataset.close).close();
 if(button.dataset.cardColor){const product=catalog.find(item=>item.id===button.dataset.cardColor);const card=button.closest('.product-card');const image=card.querySelector('img');image.src=product.variants[button.dataset.value][0];image.alt=product.name+' — '+button.dataset.value;card.querySelectorAll('.swatch').forEach(swatch=>swatch.setAttribute('aria-pressed',String(swatch===button)));}
 if(button.dataset.image!==undefined){activeImage=Number(button.dataset.image);$('#main-photo').src=gallery[activeImage];$('.thumbnails').querySelectorAll('button').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));}
 if(button.dataset.option){selection[button.dataset.option]=button.dataset.value;if(button.dataset.option==='color')setGallery(current.variants[button.dataset.value],button.dataset.value);document.querySelectorAll(`[data-option="${button.dataset.option}"]`).forEach(item=>item.setAttribute('aria-pressed',String(item===button)));$('#selection-error').textContent='';}
 if(button.id==='checkout')await beginDelivery();
 if(button.id==='edit-delivery'){$('#payment-dialog').close();delivery();}
 if(button.id==='copy-phone'){try{await navigator.clipboard.writeText('0953610009');$('#toast').textContent='Telebirr number copied';setTimeout(()=>$('#toast').textContent='',2500);}catch{button.textContent='Select the number above to copy';}}
});
$('#search').addEventListener('input',render);
$('#brand').addEventListener('change',render);
$('#audience').addEventListener('change',render);
for(const dialog of document.querySelectorAll('dialog'))dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
window.Telegram?.WebApp?.ready();
window.Telegram?.WebApp?.expand();
render();

window.addEventListener('pagehide',()=>{
 deliveryTransition++;
 if($('#transition-dialog').open)$('#transition-dialog').close();
 deliveryDetails=null;
 selection={};
 for(const dialog of document.querySelectorAll('dialog'))if(dialog.open)dialog.close();
 $('#delivery-detail').replaceChildren();
 $('#payment-detail').replaceChildren();
 $('#toast').textContent='';
});
