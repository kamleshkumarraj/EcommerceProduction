import { Router } from 'express';
import { registrationContoller } from '../../controllers/authentication/userRegistration.controller.js';
import userLogin from '../../controllers/authentication/userLogin.controller.js';
import loggedOut from '../../controllers/authentication/userLoggedout.js';
import isLoggedIn from '../../middlewares/isLoggedIn.middleware.js';
import { forgotPassword } from '../../controllers/authentication/forgotPassword.js';
import { resetPassword } from '../../controllers/authentication/resetPassword.js';
import { changePassword } from '../../controllers/authentication/changePassword.js';
import { directLogin } from '../../controllers/authentication/directLogin.js';
import multer from 'multer';
import { avatarUpload } from '../../middlewares/fileUploads/userPhotoUploads.js';

export const authenticationRoute = Router();

authenticationRoute
  .route('/register')
  .post(avatarUpload, registrationContoller);
authenticationRoute.route('/login').post(userLogin);
authenticationRoute.route('/logout').get(loggedOut);
authenticationRoute.route('/forgot-password').post(forgotPassword);
authenticationRoute.route('/reset-password/:tocken').post(resetPassword);
authenticationRoute.route('/change-password').put(isLoggedIn, changePassword);
authenticationRoute.route('/direct-login').get(isLoggedIn, directLogin);
