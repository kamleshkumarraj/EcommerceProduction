import { Router } from 'express';
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getCategoryBlog,
  getMyBlogs
} from '../../controllers/blog/blog.controller.js';
import { uploads } from '../../middlewares/fileUploads/userPhotoUploads.js';
import isLoggedIn from '../../middlewares/isLoggedIn.middleware.js';
import {
  blogCreationValidation,
  validateFunc,
} from '../../validators/validation.js';

export const blogRouter = Router();

blogRouter.route('/get-all').get(getAllBlogs);

blogRouter.use(isLoggedIn);

blogRouter.route('/create').post(
  uploads.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 3 },
  ]),
  blogCreationValidation(),
  validateFunc,
  createBlog,
);

blogRouter.route('/my-blog').get(getMyBlogs);

blogRouter.route('/delete/:blogId').delete(deleteBlog);

blogRouter.route('/get/:category').get(getCategoryBlog)
