"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpCodes = void 0;
var httpCodes;
(function (httpCodes) {
    httpCodes[httpCodes["OK"] = 200] = "OK";
    httpCodes[httpCodes["NO_CONTENT"] = 204] = "NO_CONTENT";
    httpCodes[httpCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    httpCodes[httpCodes["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    httpCodes[httpCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
    httpCodes[httpCodes["SERVER_ERROR"] = 500] = "SERVER_ERROR";
})(httpCodes = exports.httpCodes || (exports.httpCodes = {}));
