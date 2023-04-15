"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, trim: true },
    chat: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Chat' },
    read: {
        type: Boolean,
        default: false,
    },
    __v: { type: Number, select: false },
}, { timestamps: true });
exports.MessageModel = (0, mongoose_1.model)('Message', messageSchema);
