import { Router } from 'express';
import {
  createBlog,
  deleteProductsBlog,
  getAllBlogsDetailsCategoriesWise,
  getAllProductsBlog,
  getCategoryBlogs,
  getMyCreatedProductBlogs,
  getSingleProductsBlog,
} from '../../controllers/blog/productsBlog.controller.js';
import isLoggedIn from '../../middlewares/isLoggedIn.middleware.js';
import { uploads } from '../../middlewares/fileUploads/userPhotoUploads.js';
import { blogCreationValidation, validateFunc } from '../../validators/validation.js';

export const productsBlogRouter = Router();

productsBlogRouter.route('/get-all').get(getAllProductsBlog);
productsBlogRouter
  .route('/get/categories-wise')
  .get(getAllBlogsDetailsCategoriesWise);
productsBlogRouter.route('/single/:id').get(getSingleProductsBlog);
productsBlogRouter.route('/get-category/:category').get(getCategoryBlogs);

productsBlogRouter.use(isLoggedIn);


productsBlogRouter.route('/create').post(
  uploads.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 3 },
  ]),
  blogCreationValidation(),
  validateFunc,
  createBlog,
);

productsBlogRouter.route('/get-my-created-blog').get(getMyCreatedProductBlogs);

productsBlogRouter.route('/delete/:blogId').delete(deleteProductsBlog);
