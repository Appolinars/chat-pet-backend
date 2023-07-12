import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { deleteMessage, getAllMessages, sendMessage } from '../controllers/message.controller';

export const messageRoutes = (router: Router) => {
  router.post('/message/send', authMiddleware, sendMessage);
  router.get('/message/get/:id', authMiddleware, getAllMessages);
  router.delete('/message/delete', authMiddleware, deleteMessage);
};
