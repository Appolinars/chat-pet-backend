import { IUser } from '../models/user.model';
import { IAvatar } from '../types/user';

export class UserDto {
  _id: string;
  username: string;
  email: string;
  avatar: IAvatar | null;

  constructor(model: IUser) {
    this._id = model._id;
    this.username = model.username;
    this.email = model.email;
    this.avatar = model.avatar;
  }
}
