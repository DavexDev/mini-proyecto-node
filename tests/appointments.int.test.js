import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../src/app.js';

test('POST /appointments should create appointment', async () => {
  const res = await request(app)
    .post('/appointments')
    .set('Authorization', 'Bearer fake_token')
    .send({
      petId: 1,
      vetId: 2,
      serviceId: 1,
      startTime: '2026-02-01T10:00',
      endTime: '2026-02-01T10:30'
    });

  expect(res.statusCode).toBe(403);

});
