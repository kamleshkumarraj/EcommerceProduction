import { asyncHandler } from '../../errors/asynHandler.js';

export const directLogin = asyncHandler(async (req, res, next) => {
  
  
  res.status(200).json({
    success: true,
    message: 'User logged in successfully',
    data: req.user,
  });
});
