"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
const types_1 = require("../types");
class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static UnauthorizedError(message = 'Not authorized') {
        return new ApiError(types_1.httpCodes.UNAUTHORIZED, message);
    }
    static BadRequest(message, errors = []) {
        return new ApiError(types_1.httpCodes.BAD_REQUEST, message, errors);
    }
    static BadResponse(message) {
        return new ApiError(types_1.httpCodes.SERVER_ERROR, message);
    }
}
exports.ApiError = ApiError;
