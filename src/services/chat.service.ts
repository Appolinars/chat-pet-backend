import { ChatModel } from '../models/chat.model';

export const chatService = {
  async create(userId: string, partnerId: string) {
    const chatData = {
      isGroupChat: false,
      users: [userId, partnerId],
    };

    const createdChat = await ChatModel.create(chatData);
    const chat = await createdChat.populate('users', 'username avatar');

    return chat;
  },

  async getAll(userId: string) {
    const chats = await ChatModel.find({ users: { $elemMatch: { $eq: userId } } })
      .populate('users', 'username avatar')
      .populate('latestMessage')
      .sort({ updatedAt: -1 });
    return chats;
  },
};
