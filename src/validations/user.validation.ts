import { body } from 'express-validator';

export const registerValidationRules = () => {
  return [
    body('email').exists().isEmail().normalizeEmail().withMessage('Invalid email'),
    body('username')
      .exists()
      .isString()
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage('Username length must be 3-30 characters'),
    body('password')
      .exists()
      .isString()
      .trim()
      .isLength({ min: 5, max: 40 })
      .withMessage('Password length must be 5-40 characters'),
  ];
};

export const loginValidationRules = () => {
  return [
    body('email').exists().isEmail().normalizeEmail().withMessage('Invalid email'),
    body('password')
      .exists()
      .isString()
      .trim()
      .isLength({ min: 5 })
      .withMessage('Password length must be at least 5 characters'),
  ];
};

export const updateValidationRules = () => {
  return [
    body('email').optional().exists().isEmail().normalizeEmail().withMessage('Invalid email'),
    body('username')
      .optional()
      .isString()
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage('Username length must be 3-30 characters'),
  ];
};
