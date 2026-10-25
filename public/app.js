import {departments,interleaveDepartments} from './catalog-order.mjs';
import {deliveryFeeText,returnPolicyFor} from './checkout-policies.mjs';
import { getDeliveryDates, formatDeliveryDate, isAllowedDeliveryDate } from './delivery-date.mjs';
import { displaySize, sizeSystemText } from './shoe-sizing.mjs';
import { availableSizes, selectedOffer, priceRange, selectionIsAvailable } from './catalog-logic.mjs';
const categories = ['All finds', ...departments];
let category = 'All finds', current = null, selection = {}, gallery = [], activeImage = 0, deliveryDetails = null, deliveryTransition = 0, requestedDeliveryDate = null;
const $ = selector => document.querySelector(selector);
const money = number => new Intl.NumberFormat('en-ET').format(number) + ' ETB';
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function priceText(product, color = null, size = '') {
 const offer=color?selectedOffer(product,color,size):null;
 if(offer)return money(offer.etb);
 const range=priceRange(product,color);
 return (range.min!==range.max?'From ':'')+money(range.min);
}
function currentPrice(){return selectedOffer(current,selection.color,selection.size)?.etb ?? priceRange(current,selection.color).min;}
function selectionLabel(){return (selection.size?(current.department==='Shoes'?'EU':'Size')+' '+displaySize(current,selection.size)+' · ':'')+selection.color;}
function sizeButtons(){
 return availableSizes(current,selection.color).map(size=>`<button type="button" data-option="size" data-value="${escapeHTML(size)}" aria-pressed="${selection.size===size}">${escapeHTML(displaySize(current,size))}</button>`).join('');
}
function refreshDetails({updateSizes=true}={}){
 const sizes=$('#size-options');
 if(sizes&&updateSizes)sizes.innerHTML=sizeButtons();
 $('.detail-price').textContent=priceText(current,selection.color,selection.size);
 const rating=current.ratings[selection.color];
 $('#source-info').innerHTML=rating?`<span class="brand-rating">★ ${rating.value.toFixed(1)} / 5 <span>(${rating.count.toLocaleString('en')} published reviews)</span></span>`:'';
}
function packageProduct(product){return ['Fragrances','Face care'].includes(product.department);}
function colorButtons(product, context) {
 return product.colors.map(color=>`<button type="button" class="swatch ${context==='detail'?'detail-swatch':''} ${packageProduct(product)?'bottle-choice':''}" data-${context==='card'?'card-color':'option'}="${context==='card'?product.id:'color'}" data-value="${escapeHTML(color)}" aria-label="${escapeHTML(color)}" aria-pressed="false" title="${escapeHTML(color)}">${packageProduct(product)?'':`<span style="--swatch:${product.swatches[color]}"></span>`}${context==='detail'?escapeHTML(color):packageProduct(product)?escapeHTML(color.split(' · ')[0]):''}</button>`).join('');
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
 let products = scoped.filter(product=>(!brand||product.brand===brand)&&[product.name,product.category,product.brand,product.audience,...product.colors].join(' ').toLowerCase().includes(query));
 if(category==='All finds')products=interleaveDepartments(products);
 $('#products').innerHTML = products.map(product=>`<article class="product-card"><button class="product-open" data-product="${product.id}" aria-label="View ${escapeHTML(product.name)}"><div class="card-image"><img src="${product.images[0]}" alt="${escapeHTML(product.name)}" loading="lazy" width="600" height="600"><span class="product-label">${escapeHTML(product.brand)}</span><span class="card-arrow" aria-hidden="true"><svg class="arrow-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 19 19 5M5 5h14v14"/></svg></span>${product.colors.length>1?`<span class="photo-count">${product.colors.length} ${packageProduct(product)?'sizes':'colors'}</span>`:''}</div><div class="card-info"><span class="product-category">${escapeHTML(product.audience)} / ${escapeHTML(product.category)}</span><h3>${escapeHTML(product.name)}</h3><strong class="card-price">${priceText(product)}</strong></div></button><div class="card-bottom"><div class="card-swatches" aria-label="${escapeHTML(product.name)} ${packageProduct(product)?'sizes':'colors'}">${colorButtons(product,'card')}</div><span>${escapeHTML(product.tag)}</span></div></article>`).join('');
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
 current=catalog.find(product=>product.id===id); selection={}; deliveryDetails=null; requestedDeliveryDate=getDeliveryDates().iso;
 $('#product-detail').innerHTML=`<div class="detail-grid"><div><div class="detail-image-wrap"><img id="main-photo" class="main-photo" alt=""></div><div class="gallery-caption"><span id="current-color"></span><span>Product photograph</span></div><div class="thumbnails"></div></div><div class="detail-copy"><span class="eyebrow">${escapeHTML(current.brand)} / ${escapeHTML(current.audience)}</span><h2>${escapeHTML(current.name)}</h2><div class="detail-price">${priceText(current)}</div><div id="source-info" class="source-info"></div><p class="muted">${escapeHTML(current.description)}</p><fieldset><legend>${current.department==='Fragrances'?'Choose your bottle':current.department==='Face care'?'Choose your product size':'Choose your color'}</legend><div class="options color-options">${colorButtons(current,'detail')}</div></fieldset>${current.sizes.length?`<fieldset><legend>Select size <span class="size-note">${escapeHTML(sizeSystemText(current))}</span></legend><div id="size-options" class="options"></div></fieldset>`:''}<p id="selection-error" class="error" role="alert"></p><button id="checkout" class="button full">Continue to delivery <span aria-hidden="true"><svg class="arrow-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 19 19 5M5 5h14v14"/></svg></span></button><div class="detail-perks"><span>◉ Telebirr payment</span><span><svg class="arrow-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 19 19 5M5 5h14v14"/></svg> Telegram support</span></div></div></div>`;
 $('#product-dialog').showModal();
 const initialColor=color||current.colors[0];
 setGallery(current.variants[initialColor],initialColor);
 // Make the visible color and the order's selected color agree from the start.
 selection.color=initialColor;
 refreshDetails();
 $('#product-detail').querySelectorAll('[data-option="color"]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.value===initialColor)));
}
const deliveryFields = [
 {key:'name',label:'Recipient full name',placeholder:'Full name',required:true,max:100},
 {key:'phone',label:'Phone number',placeholder:'09… / 07… / +251…',required:true,max:30,type:'tel'},
 {key:'city',label:'City / town',placeholder:'Your city or town',required:true,max:80},
 {key:'notes',label:'Delivery instructions',placeholder:'Optional — delivery preferences or directions',max:400,multiline:true}
];
function deliveryDateDetails(){
 const tomorrow=getDeliveryDates();
 if(!requestedDeliveryDate || !isAllowedDeliveryDate(requestedDeliveryDate))requestedDeliveryDate=tomorrow.iso;
 return formatDeliveryDate(requestedDeliveryDate);
}
function deliverySchedule(){
 const dates=deliveryDateDetails();
 const tomorrow=getDeliveryDates();
 return `<div class="delivery-schedule"><strong>${dates.iso===tomorrow.iso?'Delivery will be tomorrow':'Your delivery date'}</strong><span><b>Gregorian:</b> <time datetime="${dates.iso}">${dates.gregorian}</time></span><span><b>Ethiopian:</b> ${dates.ethiopian}</span><button type="button" class="change-delivery-date" data-change-date>Change delivery date</button><span class="delivery-fee-note">${deliveryFeeText}</span><label class="date-editor" hidden>Choose tomorrow or a later date<input type="date" class="delivery-date-input" data-delivery-date min="${tomorrow.iso}" value="${dates.iso}" aria-label="Choose delivery date"></label></div>`;
}
function refreshDeliverySchedules(){
 document.querySelectorAll('.delivery-schedule').forEach(element=>{element.outerHTML=deliverySchedule();});
 if($('#order-text')&&deliveryDetails)$('#order-text').textContent=orderText();
}
const pause = milliseconds => new Promise(resolve=>setTimeout(resolve,milliseconds));
async function beginDelivery(){
 if(!selectionIsAvailable(current,selection)){$('#selection-error').textContent='Please select your size to continue.';return;}
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
function returnNotice(){
 const policy=returnPolicyFor(current);
 return `<div class="return-notice"><span class="return-notice-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m8 4-5 5 5 5M3 9h11a6 6 0 0 1 0 12h-3"/></svg></span><div><strong>${escapeHTML(policy.title)}</strong><p>${escapeHTML(policy.body)}</p></div></div>`;
}

function delivery(){
 if(!selectionIsAvailable(current,selection)){$('#selection-error').textContent='Please select your size to continue.';return;}
 $('#delivery-detail').innerHTML=`<span class="eyebrow">YOUR ORDER · DELIVERY DETAILS</span><h2>Where should it go?</h2><p class="muted">${escapeHTML(current.name)} · ${escapeHTML(selectionLabel())} · ${money(currentPrice())}</p>${returnNotice()}${deliverySchedule()}<form id="delivery-form" method="dialog" autocomplete="off"><div class="delivery-fields">${deliveryFields.map(field=>`<label class="delivery-field ${field.multiline?'wide':''}" for="delivery-${field.key}"><span>${field.label}${field.required?' <span aria-hidden="true">*</span>':' <span class="optional">(optional)</span>'}</span>${field.multiline?`<textarea id="delivery-${field.key}" name="${field.key}" rows="3" maxlength="${field.max}" placeholder="${field.placeholder}" autocomplete="off">${escapeHTML(deliveryDetails?.[field.key]||'')}</textarea>`:`<input id="delivery-${field.key}" name="${field.key}" type="${field.type||'text'}" ${field.required?'required':''} maxlength="${field.max}" placeholder="${field.placeholder}" value="${escapeHTML(deliveryDetails?.[field.key]||'')}" autocomplete="off">`}</label>`).join('')}</div><div class="delivery-actions"><button type="button" class="back-button" data-close="delivery-dialog">Back to item</button><button type="submit" class="button">Continue to Telebirr →</button></div></form>`;
 $('#delivery-dialog').showModal();
 $('#delivery-name').focus();
}
function orderText(){
 return ['JIJI SHOP ORDER',current.name,...(selection.size?[(current.department==='Shoes'?'EU size: ':'Size: ')+displaySize(current,selection.size)]:[]),(current.department==='Fragrances'?'Bottle: ':current.department==='Face care'?'Product option: ':'Color: ')+selection.color,'Item price: '+money(currentPrice()),'Delivery date: '+deliveryDateDetails().iso, 'Gregorian date: '+deliveryDateDetails().gregorian, 'Ethiopian date: '+deliveryDateDetails().ethiopian, 'Delivery fee: covered by Jiji (0 ETB)','', 'DELIVERY DETAILS',...deliveryFields.filter(field=>deliveryDetails[field.key]).map(field=>field.label+': '+deliveryDetails[field.key])].join('\n');
}
function payment(){
 if(!deliveryDetails){delivery();return;}
 $('#payment-detail').innerHTML=`<div class="payment-icon">◉</div><span class="eyebrow">YOUR ORDER · PAYMENT</span><h2>Pay with Telebirr</h2><div class="order-summary"><strong>${escapeHTML(current.name)}</strong><span>${escapeHTML(selectionLabel())}</span><img class="payment-product-photo" src="${current.variants[selection.color][0]}" alt="${escapeHTML(current.name+' — '+selection.color)}" width="300" height="260"><b>${money(currentPrice())}</b></div>${deliverySchedule()}<details class="delivery-review"><summary>Review your order & delivery</summary><pre id="order-text" tabindex="0"></pre></details><button id="edit-delivery" class="edit-delivery">Edit delivery details</button><p>Account holder: <strong>Lykun</strong></p><div class="phone"><strong>0953610009</strong><button id="copy-phone">Copy number</button></div><p class="payment-instructions">Pay to this Telebirr number, then send your payment screenshot using the button below.</p><a class="button full" href="https://t.me/christianabe" target="_blank" rel="noopener noreferrer">Send your payment screenshot →</a><p class="payment-confirmation-note">We will contact you on Telegram and confirm the payment.</p>`;
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
 const dateInput=$('#delivery-dialog [data-delivery-date]');
 if(dateInput && !isAllowedDeliveryDate(dateInput.value)){
  dateInput.closest('.date-editor').hidden=false;
  dateInput.setCustomValidity('Choose tomorrow or a later delivery date.');
  dateInput.reportValidity();
  return;
 }
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
 if(button.dataset.cardColor){const product=catalog.find(item=>item.id===button.dataset.cardColor);const card=button.closest('.product-card');const image=card.querySelector('img');image.src=product.variants[button.dataset.value][0];image.alt=product.name+' — '+button.dataset.value;card.querySelector('.card-price').textContent=priceText(product,button.dataset.value);card.querySelectorAll('.swatch').forEach(swatch=>swatch.setAttribute('aria-pressed',String(swatch===button)));}
 if(button.dataset.image!==undefined){activeImage=Number(button.dataset.image);$('#main-photo').src=gallery[activeImage];$('.thumbnails').querySelectorAll('button').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));}
 if(button.dataset.option){
  selection[button.dataset.option]=button.dataset.value;
  if(button.dataset.option==='color'){
   if(!availableSizes(current,selection.color).includes(selection.size))delete selection.size;
   setGallery(current.variants[selection.color],selection.color);
  }
  refreshDetails({updateSizes:button.dataset.option==='color'});
  document.querySelectorAll(`[data-option="${button.dataset.option}"]`).forEach(item=>item.setAttribute('aria-pressed',String(item.dataset.value===button.dataset.value)));
  $('#selection-error').textContent='';
 }
 if(button.hasAttribute('data-change-date')){
  const editor=button.closest('.delivery-schedule').querySelector('.date-editor');
  editor.hidden=false;
  const input=editor.querySelector('input');
  input.focus();
  try{if(input.showPicker)input.showPicker();}catch{}
 }
 if(button.id==='checkout')await beginDelivery();
 if(button.id==='edit-delivery'){$('#payment-dialog').close();delivery();}
 if(button.id==='copy-phone'){try{await navigator.clipboard.writeText('0953610009');$('#toast').textContent='Telebirr number copied';setTimeout(()=>$('#toast').textContent='',2500);}catch{button.textContent='Select the number above to copy';}}
});
document.addEventListener('change',event=>{
 if(!event.target.matches('[data-delivery-date]'))return;
 const input=event.target;
 input.setCustomValidity('');
 if(!isAllowedDeliveryDate(input.value)){
  input.setCustomValidity('Choose tomorrow or a later delivery date.');
  input.reportValidity();
  return;
 }
 requestedDeliveryDate=input.value;
 const activeDialog=input.closest('dialog');
 refreshDeliverySchedules();
 activeDialog?.querySelector('[data-change-date]')?.focus();
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
 requestedDeliveryDate=null;
 selection={};
 for(const dialog of document.querySelectorAll('dialog'))if(dialog.open)dialog.close();
 $('#delivery-detail').replaceChildren();
 $('#payment-detail').replaceChildren();
 $('#toast').textContent='';
});
