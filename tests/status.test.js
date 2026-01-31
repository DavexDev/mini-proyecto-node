import { jest } from '@jest/globals';
import { canTransition } from '../src/utils/status.js';

test('CLIENT can cancel appointment', () => {
  expect(canTransition('CLIENT', 'REQUESTED', 'CANCELLED')).toBe(true);
});

test('CLIENT cannot confirm appointment', () => {
  expect(canTransition('CLIENT', 'REQUESTED', 'CONFIRMED')).toBe(false);
});

test('VET can confirm appointment', () => {
  expect(canTransition('VET', 'REQUESTED', 'CONFIRMED')).toBe(true);
});
