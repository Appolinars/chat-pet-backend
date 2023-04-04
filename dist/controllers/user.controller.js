"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.updateUser = exports.logout = exports.refresh = exports.login = exports.registerUser = void 0;
const user_service_1 = require("../services/user.service");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cookiesAge = 30 * 24 * 60 * 60 * 1000; // 30 days
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, avatar } = req.body;
    const userData = yield user_service_1.userService.registration({ username, email, password, avatar });
    res.cookie('refreshToken', userData.refreshToken, {
        maxAge: cookiesAge,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    res.json(userData);
}));
exports.login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userData = yield user_service_1.userService.login({ email, password });
    res.cookie('refreshToken', userData.refreshToken, {
        maxAge: cookiesAge,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    res.json(userData);
}));
exports.refresh = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const userData = yield user_service_1.userService.refresh(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, {
        maxAge: cookiesAge,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    res.json(userData);
}));
exports.logout = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    yield user_service_1.userService.logout(refreshToken);
    res.clearCookie('refreshToken');
    res.json({ message: 'success' });
}));
exports.updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { username, avatar, email } = req.body;
    const updatedUser = yield user_service_1.userService.update(((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || '', { username, avatar, email });
    res.json(updatedUser);
}));
exports.getAllUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_service_1.userService.getAll();
    res.json(users);
}));
