// Use Ethiopia's calendar day, independently of the customer's device timezone.
export function getDeliveryDates(now = new Date()) {
 const parts = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Africa/Addis_Ababa', year: 'numeric', month: '2-digit', day: '2-digit'
 }).formatToParts(now);
 const value = type => Number(parts.find(part => part.type === type).value);
 const tomorrow = new Date(Date.UTC(value('year'), value('month') - 1, value('day') + 1, 12));
 const options = { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' };
 const gregorian = new Intl.DateTimeFormat('en-GB', options).format(tomorrow);
 const ethiopianParts = new Intl.DateTimeFormat('en-GB-u-ca-ethiopic', options).formatToParts(tomorrow);
 const ethiopian = ['day', 'month', 'year'].map(type => ethiopianParts.find(part => part.type === type).value).join(' ');
 return { iso: tomorrow.toISOString().slice(0, 10), gregorian, ethiopian };
}
