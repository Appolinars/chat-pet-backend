import { Schema, model, Document } from 'mongoose';

export interface IMessage extends Document {
  sender: string;
  content: string;
  chat: string;
  read: boolean;
}

const messageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, trim: true },
    chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
    read: {
      type: Boolean,
      default: false,
    },
    __v: { type: Number, select: false },
  },
  { timestamps: true }
);

export const MessageModel = model<IMessage>('Message', messageSchema);
