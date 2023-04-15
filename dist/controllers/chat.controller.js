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
exports.getAllChats = exports.createChat = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const chat_model_1 = require("../models/chat.model");
exports.createChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { partnerId } = req.body;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
    const chatData = {
        isGroupChat: false,
        users: [userId, partnerId],
    };
    const createdChat = yield chat_model_1.ChatModel.create(chatData);
    const fullChat = yield createdChat.populate('users', 'username avatar');
    res.json(fullChat);
}));
exports.getAllChats = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id;
    const chats = yield chat_model_1.ChatModel.find({ users: { $elemMatch: { $eq: userId } } })
        .populate('users', 'username avatar')
        .populate('latestMessage')
        .sort({ updatedAt: -1 });
    res.json(chats);
}));