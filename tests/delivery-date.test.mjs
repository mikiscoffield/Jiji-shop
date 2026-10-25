import test from 'node:test';
import assert from 'node:assert/strict';
import { getDeliveryDates } from '../public/delivery-date.mjs';

test('tomorrow is displayed in Gregorian and Ethiopian calendars', () => {
 assert.deepEqual(getDeliveryDates(new Date('2026-10-25T12:00:00Z')), {
  iso: '2026-10-26', gregorian: '26 October 2026', ethiopian: '16 Tekemt 2019'
 });
});
test('Ethiopian midnight is used even when the device date is still yesterday', () => {
 assert.equal(getDeliveryDates(new Date('2026-10-25T20:59:59Z')).iso, '2026-10-26');
 assert.equal(getDeliveryDates(new Date('2026-10-25T21:00:00Z')).iso, '2026-10-27');
});
test('Gregorian leap day and year rollover', () => {
 assert.equal(getDeliveryDates(new Date('2024-02-28T12:00:00Z')).gregorian, '29 February 2024');
 assert.equal(getDeliveryDates(new Date('2026-12-31T12:00:00Z')).gregorian, '1 January 2027');
});
test('Ethiopian leap-year New Year rolls over on September 12', () => {
 assert.equal(getDeliveryDates(new Date('2027-09-10T12:00:00Z')).ethiopian, '6 Pagumen 2019');
 assert.equal(getDeliveryDates(new Date('2027-09-11T12:00:00Z')).ethiopian, '1 Meskerem 2020');
});

test('a customer-selected day keeps both calendars synchronized', async () => {
 const { formatDeliveryDate } = await import('../public/delivery-date.mjs');
 assert.deepEqual(formatDeliveryDate('2026-11-02'), {
  iso:'2026-11-02', gregorian:'2 November 2026', ethiopian:'23 Tekemt 2019'
 });
});
test('invalid dates and dates earlier than tomorrow are rejected', async () => {
 const { formatDeliveryDate, isAllowedDeliveryDate } = await import('../public/delivery-date.mjs');
 for(const invalid of ['2026-02-30','2026-13-01','02/11/2026',''])assert.throws(()=>formatDeliveryDate(invalid),RangeError);
 const now=new Date('2026-10-25T12:00:00Z');
 assert.equal(isAllowedDeliveryDate('2026-10-25',now),false);
 assert.equal(isAllowedDeliveryDate('2026-10-26',now),true);
 assert.equal(isAllowedDeliveryDate('2026-11-02',now),true);
});
