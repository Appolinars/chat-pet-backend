"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUploader = void 0;
const multer_1 = __importDefault(require("multer"));
exports.multerUploader = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    fileFilter: function (req, file, callback) {
        const fileSize = parseInt(req.headers['content-length'] || '0');
        if (file.mimetype !== 'image/png' &&
            file.mimetype !== 'image/jpg' &&
            file.mimetype !== 'image/jpeg' &&
            file.mimetype !== 'image/webp') {
            req.fileValidationError = 'Invalid file format';
            return callback(null, false);
        }
        if (fileSize >= 3500000) {
            req.fileValidationError = 'File is too large. Max size is 3 MB.';
            return callback(null, false);
        }
        callback(null, true);
    },
});
