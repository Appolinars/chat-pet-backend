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
exports.userService = void 0;
const user_dto_1 = require("../dtos/user.dto");
const api_error_1 = require("../exceptions/api-error");
const user_model_1 = require("../models/user.model");
const token_service_1 = require("./token.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.userService = {
    registration({ username, email, password, avatar }) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDuplicate = yield user_model_1.UserModel.findOne({ email });
            if (isDuplicate) {
                throw api_error_1.ApiError.BadRequest('User already exists');
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 3);
            const user = yield user_model_1.UserModel.create({
                username,
                email,
                password: hashedPassword,
                avatar: avatar || null,
            });
            if (!user) {
                throw api_error_1.ApiError.BadRequest('Invalid user data');
            }
            const tokens = token_service_1.tokenService.generateTokens(user.id);
            yield token_service_1.tokenService.saveToken(user.id, tokens.refreshToken);
            const userDto = new user_dto_1.UserDto(user);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    },
    login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOne({ email });
            if (!user) {
                throw api_error_1.ApiError.BadRequest('Invalid credentials');
            }
            const isPassEquals = yield bcrypt_1.default.compare(password, user.password);
            if (!isPassEquals) {
                throw api_error_1.ApiError.BadRequest('Invalid credentials');
            }
            const tokens = token_service_1.tokenService.generateTokens(user.id);
            yield token_service_1.tokenService.saveToken(user.id, tokens.refreshToken);
            const userDto = new user_dto_1.UserDto(user);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    },
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
            const userData = token_service_1.tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = yield token_service_1.tokenService.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
            const user = yield user_model_1.UserModel.findById(userData.id);
            if (!user)
                throw api_error_1.ApiError.UnauthorizedError();
            const userDto = new user_dto_1.UserDto(user);
            const tokens = token_service_1.tokenService.generateTokens(user.id);
            yield token_service_1.tokenService.saveToken(user.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    },
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield token_service_1.tokenService.removeToken(refreshToken);
            return token;
        });
    },
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const duplicate = yield user_model_1.UserModel.findOne({ email: payload.email });
            // Allow updates to the original user
            if (duplicate && duplicate.id !== id) {
                throw api_error_1.ApiError.BadRequest('User already exists');
            }
            const updatedUser = yield user_model_1.UserModel.findByIdAndUpdate(id, payload, {
                new: true,
            });
            if (!updatedUser)
                throw api_error_1.ApiError.BadRequest('User not found');
            const userDto = new user_dto_1.UserDto(updatedUser);
            return userDto;
        });
    },
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.UserModel.find().select(['-password', '-email']);
            return users;
        });
    },
};
