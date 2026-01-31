import { jest } from '@jest/globals';
import { isOverlapping } from '../src/utils/overlap.js';

test('should detect overlapping appointments', () => {
  const existing = {
    startTime: '2026-02-01T10:00',
    endTime: '2026-02-01T10:30'
  };

  const incoming = {
    startTime: '2026-02-01T10:15',
    endTime: '2026-02-01T10:45'
  };

  expect(isOverlapping(existing, incoming)).toBe(true);
});

test('should allow non-overlapping appointments', () => {
  const existing = {
    startTime: '2026-02-01T10:00',
    endTime: '2026-02-01T10:30'
  };

  const incoming = {
    startTime: '2026-02-01T10:30',
    endTime: '2026-02-01T11:00'
  };

  expect(isOverlapping(existing, incoming)).toBe(false);
});
