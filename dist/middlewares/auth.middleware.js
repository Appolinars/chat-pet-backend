"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const api_error_1 = require("../exceptions/api-error");
const token_service_1 = require("../services/token.service");
const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization || req.headers.Authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
            return next(api_error_1.ApiError.UnauthorizedError('Headers are not provided'));
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(api_error_1.ApiError.UnauthorizedError('Token is not provided'));
        }
        const userData = token_service_1.tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(api_error_1.ApiError.UnauthorizedError('Invalid token'));
        }
        req.user = userData;
        next();
    }
    catch (e) {
        return next(api_error_1.ApiError.UnauthorizedError());
    }
};
exports.authMiddleware = authMiddleware;
