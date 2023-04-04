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
exports.tokenService = void 0;
const token_model_1 = require("../models/token.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || '';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '';
exports.tokenService = {
    generateTokens(id) {
        const accessToken = jsonwebtoken_1.default.sign({ id }, JWT_ACCESS_SECRET, { expiresIn: '15m' });
        const refreshToken = jsonwebtoken_1.default.sign({ id }, JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return { accessToken, refreshToken };
    },
    saveToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield token_model_1.TokenModel.findOne({ user: userId });
            if (tokenData) {
                tokenData.refreshToken = refreshToken;
                return tokenData.save();
            }
            const token = yield token_model_1.TokenModel.create({ user: userId, refreshToken });
            return token;
        });
    },
    findToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield token_model_1.TokenModel.findOne({ refreshToken });
            return tokenData;
        });
    },
    validateAccessToken(token) {
        try {
            const userData = jsonwebtoken_1.default.verify(token, JWT_ACCESS_SECRET);
            return userData;
        }
        catch (e) {
            return null;
        }
    },
    validateRefreshToken(token) {
        try {
            const userData = jsonwebtoken_1.default.verify(token, JWT_REFRESH_SECRET);
            return userData;
        }
        catch (e) {
            return null;
        }
    },
    removeToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield token_model_1.TokenModel.deleteOne({ refreshToken });
            return tokenData;
        });
    },
};
