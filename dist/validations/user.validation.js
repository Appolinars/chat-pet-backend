"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidationRules = exports.loginValidationRules = exports.registerValidationRules = void 0;
const express_validator_1 = require("express-validator");
const registerValidationRules = () => {
    return [
        (0, express_validator_1.body)('email').exists().isEmail().normalizeEmail().withMessage('Invalid email'),
        (0, express_validator_1.body)('username')
            .exists()
            .isString()
            .trim()
            .isLength({ min: 3, max: 30 })
            .withMessage('Username length must be 3-30 characters'),
        (0, express_validator_1.body)('password')
            .exists()
            .isString()
            .trim()
            .isLength({ min: 5, max: 40 })
            .withMessage('Password length must be 5-40 characters'),
    ];
};
exports.registerValidationRules = registerValidationRules;
const loginValidationRules = () => {
    return [
        (0, express_validator_1.body)('email').exists().isEmail().normalizeEmail().withMessage('Invalid email'),
        (0, express_validator_1.body)('password')
            .exists()
            .isString()
            .trim()
            .isLength({ min: 5 })
            .withMessage('Password length must be at least 5 characters'),
    ];
};
exports.loginValidationRules = loginValidationRules;
const updateValidationRules = () => {
    return [
        (0, express_validator_1.body)('email').optional().exists().isEmail().normalizeEmail().withMessage('Invalid email'),
        (0, express_validator_1.body)('username')
            .optional()
            .isString()
            .trim()
            .isLength({ min: 3, max: 30 })
            .withMessage('Username length must be 3-30 characters'),
    ];
};
exports.updateValidationRules = updateValidationRules;
