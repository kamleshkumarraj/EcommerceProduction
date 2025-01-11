import { asyncHandler } from '../../errors/asynHandler.js';
import ErrorHandler from '../../errors/errorHandler.js';
import { userModels } from '../../models/userRegistration.model.js';
import fs from 'fs';
import cloudinary from 'cloudinary';
//controllers for user registrations
export const registrationContoller = asyncHandler(async (req, res, next) => {
  //registration process.
  //step 1 : check user is alredy registered or not. that is alredy verified from userSchema.
  const { firstname, lastname, email, password, username, middlename } =
    req.body;
  const avatar = { public_id: '', url: '' };
  if(!req.file) return next(new ErrorHandler('file is required', 400));
  try {
    const response = await cloudinary.uploader.upload(req.file.path);
    avatar.public_id = response.public_id;
    avatar.url = response.secure_url;
    fs.unlink(req.file.path, (err) => {
      if (err) return next(new ErrorHandler('file deleted failed.', 402));
    });
  } catch (err) {
    fs.unlink(req.file.path, (err) => {
      if (err) return next(new ErrorHandler('file uploaded failed.', 402));
    });
    return next(new ErrorHandler('file upload failed ', 402));
  }
  const userData = {
    firstname,
    lastname,
    email,
    password,
    username,
    avatar,
    middlename,
  };
  const user = await userModels.create(userData);

  res.status(200).json({
    success: true,
    message: 'User registered successfully',
    data : user,
  });
});
