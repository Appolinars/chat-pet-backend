import { Router } from 'express';
import { createChat, getAllChats } from '../controllers/chat.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export const chatRoutes = (router: Router) => {
  router.post('/chat/create', authMiddleware, createChat);
  router.get('/chat/getAll', authMiddleware, getAllChats);
};
