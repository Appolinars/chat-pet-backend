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
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatService = void 0;
const chat_model_1 = require("../models/chat.model");
exports.chatService = {
    create(userId, partnerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatData = {
                isGroupChat: false,
                users: [userId, partnerId],
            };
            const createdChat = yield chat_model_1.ChatModel.create(chatData);
            const chat = yield createdChat.populate('users', 'username avatar');
            return chat;
        });
    },
    getAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chats = yield chat_model_1.ChatModel.find({ users: { $elemMatch: { $eq: userId } } })
                .populate('users', 'username avatar')
                .populate('latestMessage')
                .sort({ updatedAt: -1 });
            return chats;
        });
    },
};
