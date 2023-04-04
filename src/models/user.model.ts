import { Schema, model } from 'mongoose';
import { IAvatar } from '../types/user';

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar: IAvatar | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Please add a username'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    avatar: {
      type: Object,
      required: false,
      default: null,
    },
    __v: { type: Number, select: false },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<IUser>('User', userSchema);
