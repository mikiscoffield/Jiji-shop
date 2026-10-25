// A chosen delivery day is a calendar date, independent of the device timezone.
export function formatDeliveryDate(iso) {
 if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) throw new RangeError('Choose a valid delivery date.');
 const date = new Date(iso + 'T12:00:00Z');
 if (Number.isNaN(date.getTime()) || date.toISOString().slice(0,10) !== iso) throw new RangeError('Choose a valid delivery date.');
 const options = { timeZone:'UTC', year:'numeric', month:'long', day:'numeric' };
 const gregorian = new Intl.DateTimeFormat('en-GB',options).format(date);
 const parts = new Intl.DateTimeFormat('en-GB-u-ca-ethiopic',options).formatToParts(date);
 const ethiopian = ['day','month','year'].map(type=>parts.find(part=>part.type===type).value).join(' ');
 return { iso, gregorian, ethiopian };
}
export function getDeliveryDates(now = new Date()) {
 const parts = new Intl.DateTimeFormat('en-CA',{
  timeZone:'Africa/Addis_Ababa',year:'numeric',month:'2-digit',day:'2-digit'
 }).formatToParts(now);
 const value = type=>Number(parts.find(part=>part.type===type).value);
 const tomorrow = new Date(Date.UTC(value('year'),value('month')-1,value('day')+1,12));
 return formatDeliveryDate(tomorrow.toISOString().slice(0,10));
}
export function isAllowedDeliveryDate(iso, now = new Date()) {
 try { return formatDeliveryDate(iso).iso >= getDeliveryDates(now).iso; }
 catch { return false; }
}
