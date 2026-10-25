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
