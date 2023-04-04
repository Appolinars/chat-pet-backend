import {
  getAllUsers,
  login,
  logout,
  refresh,
  registerUser,
  updateUser,
} from '../controllers/user.controller';
import {
  validateBody,
} from '../validations';
import {
  loginValidationRules,
  registerValidationRules,
  updateValidationRules,
} from '../validations/user.validation';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { multerUploader } from '../config/multer';
import { deleteFile, uploadFile } from '../controllers/upload.controller';

export const userRoutes = (router: Router) => {
  router.post('/user/register', registerValidationRules(), validateBody, registerUser);
  router.post('/user/login', loginValidationRules(), validateBody, login);
  router.get('/user/refresh', refresh);
  router.post('/user/logout', logout);
  
  router.patch('/user/update', authMiddleware, updateValidationRules(), validateBody, updateUser);
  
  router.get('/user/getAll', authMiddleware, getAllUsers);
  
  router.post('/file/upload', multerUploader.single('image'), uploadFile);
  router.delete('/file/delete', deleteFile);
};
