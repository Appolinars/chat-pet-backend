import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { ChatModel } from '../models/chat.model';
import { MessageModel } from '../models/message.model';

export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?.id;
  const { content, chatId } = req.body;

  const newMessage = {
    sender: userId,
    content: content,
    chat: chatId,
  };

  const createdMessage = await MessageModel.create(newMessage);
  const message = await createdMessage.populate('sender', 'username avatar');

  await ChatModel.findByIdAndUpdate(req.body.chatId, { latestMessage: message.id });

  res.json(message);
});

export const getAllMessages = asyncHandler(async (req: Request, res: Response) => {
  const { chatId } = req.body;
  const messages = await MessageModel.find({ chat: chatId })
    .populate('sender', 'username avatar')
  res.json(messages);
});
