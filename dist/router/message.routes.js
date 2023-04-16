"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRoutes = void 0;
const auth_middleware_1 = require("../middlewares/auth.middleware");
const message_controller_1 = require("../controllers/message.controller");
const messageRoutes = (router) => {
    router.post('/message/send', auth_middleware_1.authMiddleware, message_controller_1.sendMessage);
    router.get('/message/get', auth_middleware_1.authMiddleware, message_controller_1.getAllMessages);
};
exports.messageRoutes = messageRoutes;
