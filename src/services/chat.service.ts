import { ChatModel } from '../models/chat.model';

const usersPopulateSelect = 'username avatar';

export const chatService = {
  async create(userId: string, partnerId: string) {
    const existingChat = await ChatModel.findOne({
      users: { $all: [userId, partnerId] },
      isGroupChat: false,
    });

    if (existingChat) {
      return existingChat;
    }

    const chatData = {
      isGroupChat: false,
      users: [userId, partnerId],
    };

    const createdChat = await ChatModel.create(chatData);
    const chat = await createdChat.populate('users', usersPopulateSelect);

    return chat;
  },

  async getChat(chatId: string) {
    const chat = await ChatModel.findById(chatId)
      .populate('users', usersPopulateSelect)
      .populate({
        path: 'latestMessage',
        populate: { path: 'sender', select: usersPopulateSelect },
      });
    return chat;
  },

  async getAll(userId: string) {
    const chats = await ChatModel.find({ users: { $elemMatch: { $eq: userId } } })
      .populate('users', usersPopulateSelect)
      .populate({
        path: 'latestMessage',
        populate: { path: 'sender', select: usersPopulateSelect },
      })
      .sort({ updatedAt: -1 });
    return chats;
  },
};
