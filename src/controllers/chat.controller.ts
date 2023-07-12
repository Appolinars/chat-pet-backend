import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { chatService } from '../services/chat.service';

export const createChat = asyncHandler(async (req: Request, res: Response) => {
  const { partnerId } = req.body;
  const userId = req?.user?.id || '';

  const chat = await chatService.create(userId, partnerId);
  res.json(chat);
});

export const getChat = asyncHandler(async (req: Request, res: Response) => {
  const { chatId } = req.params;

  const chat = await chatService.getChat(chatId);
  res.json(chat);
});

export const getAllChats = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?.id || '';

  const chats = await chatService.getAll(userId);
  res.json(chats);
});
