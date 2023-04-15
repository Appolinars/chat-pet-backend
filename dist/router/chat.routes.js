"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRoutes = void 0;
const chat_controller_1 = require("../controllers/chat.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const chatRoutes = (router) => {
    router.post('/chat/create', auth_middleware_1.authMiddleware, chat_controller_1.createChat);
    router.get('/chat/getAll', auth_middleware_1.authMiddleware, chat_controller_1.getAllChats);
};
exports.chatRoutes = chatRoutes;
