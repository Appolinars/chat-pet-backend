import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import cloudinary from '../config/cloudinary';
import { ApiError } from '../exceptions/api-error';

export const uploadFile = asyncHandler(async (req: Request, res: Response) => {
  if (req.fileValidationError) {
    throw ApiError.BadRequest(req.fileValidationError);
  }
  if (!req.file) {
    throw ApiError.BadResponse('Invalid request.');
  }
  const result = await cloudinary.uploader.upload(req.file.path, { folder: 'chat-app' });

  if (!result) {
    throw ApiError.BadResponse('Upload error. Please try again later.');
  }

  const uploadedFile = {
    id: result.public_id,
    url: result.url,
  };

  res.status(200).json(uploadedFile);
});

export const deleteFile = asyncHandler(async (req: Request, res: Response) => {
  const fileId = req.body.public_id;
  if (!fileId) {
    throw ApiError.BadRequest('Invalid file id');
  }

  const result = await cloudinary.uploader.destroy(req.body.public_id);

  if (result?.result === 'not found') {
    throw ApiError.BadRequest('Image not found');
  }

  if (result?.result === 'ok') {
    res.json({
      message: 'success',
    });
  } else {
    res.json(result);
  }
});
