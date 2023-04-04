import { userService } from '../services/user.service';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

const cookiesAge = 30 * 24 * 60 * 60 * 1000; // 30 days

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password, avatar } = req.body;
  const userData = await userService.registration({ username, email, password, avatar });

  res.cookie('refreshToken', userData.refreshToken, {
    maxAge: cookiesAge,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res.json(userData);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userData = await userService.login({ email, password });

  res.cookie('refreshToken', userData.refreshToken, {
    maxAge: cookiesAge,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res.json(userData);
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const userData = await userService.refresh(refreshToken);
  res.cookie('refreshToken', userData.refreshToken, {
    maxAge: cookiesAge,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res.json(userData);
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  await userService.logout(refreshToken);
  res.clearCookie('refreshToken');
  res.json({ message: 'success' });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { username, avatar, email } = req.body;
  const updatedUser = await userService.update(req.user?.id || '', { username, avatar, email });

  res.json(updatedUser);
});

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.getAll();
  res.json(users);
});
