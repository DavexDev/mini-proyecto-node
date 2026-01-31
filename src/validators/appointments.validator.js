import { body } from 'express-validator';

export const createAppointmentValidator = [
  body('petId')
    .isInt().withMessage('petId must be an integer'),

  body('vetId')
    .isInt().withMessage('vetId must be an integer'),

  body('serviceId')
    .isInt().withMessage('serviceId must be an integer'),

  body('startTime')
    .notEmpty().withMessage('startTime is required')
    .isISO8601().withMessage('startTime must be a valid datetime'),

  body('endTime')
    .notEmpty().withMessage('endTime is required')
    .isISO8601().withMessage('endTime must be a valid datetime')
];
