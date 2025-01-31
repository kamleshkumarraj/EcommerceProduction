import { Router } from "express";
import { createBlog, getAllBlogsDetailsCategoriesWise, getAllProductsBlog } from "../../controllers/blog/productsBlog.controller";

const productsBlogRouter = Router();

productsBlogRouter.route('/get-all').get(getAllProductsBlog);
productsBlogRouter.route('/get/categories-wise').get(getAllBlogsDetailsCategoriesWise);
productsBlogRouter.route('/single/:id').get(getSingleBlog)


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

productsBlogRouter.route('/my-blog').get(getMyBlogs);

productsBlogRouter.route('/get-my-created-blog').get(getMyCreatedBlog);

productsBlogRouter.route('/delete/:blogId').delete(deleteBlog);