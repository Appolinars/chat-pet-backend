import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getAllMessages, sendMessage } from '../controllers/message.controller';

export const messageRoutes = (router: Router) => {
  router.post('/message/send', authMiddleware, sendMessage);
  router.get('/message/get', authMiddleware, getAllMessages);
};
