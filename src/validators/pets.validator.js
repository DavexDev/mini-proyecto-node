import { body } from 'express-validator';

export const createPetValidator = [
  body('name').notEmpty().withMessage('name is required'),
  body('species').notEmpty().withMessage('species is required'),
  body('breed').optional().isString(),
  body('birthDate').optional().isISO8601()
];
