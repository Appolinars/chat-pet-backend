import { UserDto } from '../dtos/user.dto';
import { ApiError } from '../exceptions/api-error';
import { UserModel } from '../models/user.model';
import { IUserService } from '../types/servicesTypes';
import { tokenService } from './token.service';
import bcrypt from 'bcrypt';

export const userService: IUserService = {
  async registration({ username, email, password, avatar }) {
    const isDuplicate = await UserModel.findOne({ email });
    if (isDuplicate) {
      throw ApiError.BadRequest('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      avatar: avatar || null,
    });

    if (!user) {
      throw ApiError.BadRequest('Invalid user data');
    }

    const tokens = tokenService.generateTokens(user.id);
    await tokenService.saveToken(user.id, tokens.refreshToken);

    const userDto = new UserDto(user);
    return {
      ...tokens,
      user: userDto,
    };
  },

  async login({ email, password }) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest('Invalid credentials');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Invalid credentials');
    }

    const tokens = tokenService.generateTokens(user.id);
    await tokenService.saveToken(user.id, tokens.refreshToken);

    const userDto = new UserDto(user);
    return {
      ...tokens,
      user: userDto,
    };
  },

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);

    if (!user) throw ApiError.UnauthorizedError();

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens(user.id);
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  },

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  },

  async update(id, payload) {
    const duplicate = await UserModel.findOne({ email: payload.email });
    // Allow updates to the original user
    if (duplicate && duplicate.id !== id) {
      throw ApiError.BadRequest('User already exists');
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (!updatedUser) throw ApiError.BadRequest('User not found');

    const userDto = new UserDto(updatedUser);
    return userDto;
  },

  async getAll() {
    const users = await UserModel.find().select(['-password']);
    return users;
  },
};
