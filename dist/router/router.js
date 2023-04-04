"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
const user_routes_1 = require("./user.routes");
exports.appRouter = (0, express_1.Router)();
(0, user_routes_1.userRoutes)(exports.appRouter);
