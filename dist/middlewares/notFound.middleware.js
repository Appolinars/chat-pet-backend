"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const types_1 = require("../types");
const notFoundHandler = (req, res) => {
    return res.status(types_1.httpCodes.NOT_FOUND).json({
        message: 'Route not found',
    });
};
exports.notFoundHandler = notFoundHandler;
