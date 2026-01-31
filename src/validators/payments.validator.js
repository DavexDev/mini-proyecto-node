import { body } from 'express-validator';

export const createPaymentValidator = [
  body('appointmentId')
    .isInt().withMessage('appointmentId must be an integer'),

  body('amount')
    .isFloat({ gt: 0 }).withMessage('amount must be greater than 0'),

  body('idempotencyKey')
    .notEmpty().withMessage('idempotencyKey is required')
];
