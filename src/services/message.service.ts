import { ChatModel } from '../models/chat.model';
import { MessageModel } from '../models/message.model';
import { IMessageService } from '../types/servicesTypes';

export const messageService: IMessageService = {
  async getAll(chatId: string) {
    const messages = await MessageModel.find({ chat: chatId }).populate(
      'sender',
      'username avatar'
    );

    return messages;
  },

  async send({ chatId, userId, content }) {
    const newMessage = {
      sender: userId,
      content: content,
      chat: chatId,
    };

    const createdMessage = await MessageModel.create(newMessage);
    const message = await createdMessage.populate('sender', 'username avatar');

    await ChatModel.findByIdAndUpdate(chatId, { latestMessage: message.id });

    return message;
  },

  async delete(messageId: string) {
    const deletedMessage = await MessageModel.findByIdAndDelete(messageId);

    return deletedMessage?.id;
  },
};
