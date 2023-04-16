import { UserDto } from '../dtos/user.dto';
import { IMessage } from '../models/message.model';

interface IAuthPayload {
  username?: string;
  email: string;
  password: string;
  avatar?: string;
}

interface IUpdatePayload {
  username?: string;
  avatar?: string;
  email?: string;
}

interface IUserResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}

export interface IUserService {
  registration({ username, email, password, avatar }: IAuthPayload): Promise<IUserResponse>;
  login({ email, password }: IAuthPayload): Promise<IUserResponse>;
  refresh(refreshToken: string): Promise<IUserResponse>;
  logout(refreshToken: string): Promise<unknown>;
  update(id: string, { username, email, avatar }: IUpdatePayload): Promise<UserDto>;
  getAll(): Promise<UserDto[]>;
}

interface IMessagePayload {
  chatId: string;
  userId: string;
  content: string;
}

export interface IMessageService {
  getAll(chatId: string): Promise<IMessage[]>;
  send({ chatId, userId, content }: IMessagePayload): Promise<IMessage>;
}
