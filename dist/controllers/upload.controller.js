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
exports.deleteFile = exports.uploadFile = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const api_error_1 = require("../exceptions/api-error");
exports.uploadFile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.fileValidationError) {
        throw api_error_1.ApiError.BadRequest(req.fileValidationError);
    }
    if (!req.file) {
        throw api_error_1.ApiError.BadResponse('Invalid request.');
    }
    const result = yield cloudinary_1.default.uploader.upload(req.file.path, { folder: 'chat-app' });
    if (!result) {
        throw api_error_1.ApiError.BadResponse('Upload error. Please try again later.');
    }
    const uploadedFile = {
        id: result.public_id,
        url: result.url,
    };
    res.status(200).json(uploadedFile);
}));
exports.deleteFile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileId = req.body.public_id;
    if (!fileId) {
        throw api_error_1.ApiError.BadRequest('Invalid file id');
    }
    const result = yield cloudinary_1.default.uploader.destroy(req.body.public_id);
    if ((result === null || result === void 0 ? void 0 : result.result) === 'not found') {
        throw api_error_1.ApiError.BadRequest('Image not found');
    }
    if ((result === null || result === void 0 ? void 0 : result.result) === 'ok') {
        res.json({
            message: 'success',
        });
    }
    else {
        res.json(result);
    }
}));
