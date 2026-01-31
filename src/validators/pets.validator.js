import { body, param } from 'express-validator';

export const createPetValidator = [
  body('name')
    .notEmpty().withMessage('name is required')
    .isLength({ min: 2 }).withMessage('name must be at least 2 characters'),

  body('species')
    .notEmpty().withMessage('species is required'),

  body('ownerId')
    .isInt().withMessage('ownerId must be a valid integer')
];

export const petIdParamValidator = [
  param('id')
    .isInt().withMessage('petId must be a valid integer')
];
