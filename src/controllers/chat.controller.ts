import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { ChatModel } from '../models/chat.model';

export const createChat = asyncHandler(async (req: Request, res: Response) => {
  const { partnerId } = req.body;
  const userId = req?.user?.id;

  const chatData = {
    isGroupChat: false,
    users: [userId, partnerId],
  };

  const createdChat = await ChatModel.create(chatData);
  const fullChat = await createdChat.populate('users', 'username avatar');
  res.json(fullChat);
});

export const getAllChats = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?.id;

  const chats = await ChatModel.find({ users: { $elemMatch: { $eq: userId } } })
    .populate('users', 'username avatar')
    .populate('latestMessage')
    .sort({ updatedAt: -1 });

  res.json(chats);
});
