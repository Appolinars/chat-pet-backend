import { Schema, model } from 'mongoose';


const tokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
  __v: { type: Number, select: false },
});

export const TokenModel = model('Token', tokenSchema);