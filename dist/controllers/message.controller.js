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
exports.getAllMessages = exports.sendMessage = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const chat_model_1 = require("../models/chat.model");
const message_model_1 = require("../models/message.model");
exports.sendMessage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { content, chatId } = req.body;
    const newMessage = {
        sender: userId,
        content: content,
        chat: chatId,
    };
    const createdMessage = yield message_model_1.MessageModel.create(newMessage);
    const message = yield createdMessage.populate('sender', 'username avatar');
    yield chat_model_1.ChatModel.findByIdAndUpdate(req.body.chatId, { latestMessage: message.id });
    res.json(message);
}));
exports.getAllMessages = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.body;
    const messages = yield message_model_1.MessageModel.find({ chat: chatId })
        .populate('sender', 'username avatar');
    res.json(messages);
}));
