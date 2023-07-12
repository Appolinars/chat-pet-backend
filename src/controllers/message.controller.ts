import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { messageService } from '../services/message.service';

export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?.id || '';
  const { content, chatId } = req.body;

  const message = await messageService.send({ userId, chatId, content });
  res.json(message);
});

export const getAllMessages = asyncHandler(async (req: Request, res: Response) => {
  const chatId = req.params.id;
  const messages = await messageService.getAll(chatId);
  res.json(messages);
});

export const deleteMessage = asyncHandler(async (req: Request, res: Response) => {
  const { messageId } = req.body;

  const deletedId = await messageService.delete(messageId);
  res.json({ deletedId });
});
