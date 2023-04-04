"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const api_error_1 = require("../exceptions/api-error");
const express_validator_1 = require("express-validator");
const validateBody = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    return next(api_error_1.ApiError.BadRequest('Validation failed', errors.array()));
};
exports.validateBody = validateBody;
