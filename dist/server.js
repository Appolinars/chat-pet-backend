"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const mongodb_1 = require("./config/mongodb");
const errors_middleware_1 = require("./middlewares/errors.middleware");
const notFound_middleware_1 = require("./middlewares/notFound.middleware");
const router_1 = require("./router/router");
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, mongodb_1.connectDB)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use('/api', router_1.appRouter);
app.use(errors_middleware_1.errorHandler);
app.use(notFound_middleware_1.notFoundHandler);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
