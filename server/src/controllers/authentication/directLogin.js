import { asyncHandler } from '../../errors/asynHandler.js';

export const directLogin = asyncHandler(async (req, res, next) => {
  const tocken = req.query.tocken;
  const option = {
    expires: new Date(Date.now() + process.env.TOCKEN_EXPIRY * 60 * 60 * 1000),
    httpOnly: true,
    path: '/',
  };
  res.status(200).cookie('tocken', tocken, option).json({
    success: true,
    message: 'User logged in successfully',
    user: req.user,
  });
});
