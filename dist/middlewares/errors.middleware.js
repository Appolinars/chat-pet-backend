"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const api_error_1 = require("../exceptions/api-error");
const types_1 = require("../types");
const errorHandler = (err, req, res, next) => {
    if (err instanceof api_error_1.ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(types_1.httpCodes.SERVER_ERROR).json({ message: 'Unexpected server error' });
};
exports.errorHandler = errorHandler;
