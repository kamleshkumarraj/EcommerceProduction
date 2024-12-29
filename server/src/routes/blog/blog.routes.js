import { Router } from 'express';
import {
  createBlog,
  createComment,
  createReactions,
  deleteBlog,
  getAllActionBlog,
  getAllBlogs,
  getCommentsForABlog,
  getMyBlogs,
  replyBlogComment,
} from '../../controllers/blog/blog.controller.js';
import { uploads } from '../../middlewares/fileUploads/userPhotoUploads.js';
import isLoggedIn from '../../middlewares/isLoggedIn.middleware.js';
import {
  blogCreationValidation,
  validateFunc,
} from '../../validators/validation.js';

export const blogRouter = Router();

blogRouter.use(isLoggedIn);

blogRouter.route('/create').post(
//   uploads.fields([
//     { name: 'thumbnail', maxCount: 1 },
//     { name: 'images', maxCount: 10 },
//   ]),
//   blogCreationValidation(),
//   validateFunc,
  createBlog,
);

blogRouter.route('/create/comment/:blogId').post(createComment);

blogRouter.route('/my-blog').get(getMyBlogs);

blogRouter.route('/get-all').get(getAllBlogs);

blogRouter.route('/get-all-comments/:blogId').get(getCommentsForABlog);

blogRouter.route('/reply/:commentId').patch(replyBlogComment);

blogRouter.route('/create-reactions/:blogId').patch(createReactions);

blogRouter.route('/get-all-reactions/:blogId').get(getAllActionBlog);

blogRouter.route('/delete/:blogId').delete(deleteBlog);
