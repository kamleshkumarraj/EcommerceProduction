import { Router } from 'express';
import createProduct from '../../controllers/admin/createproduct.controller.js';
import { updateProducts } from '../../controllers/admin/updateProduct.controller.js';
import { deleteProduct } from '../../controllers/admin/deleteproduct.controller.js';
import { singleProduct } from '../../controllers/admin/getsingleproduct.controller.js';
import { getAllProducts } from '../../controllers/admin/getallproducts.controller.js';
import isLoggedIn from '../../middlewares/isLoggedIn.middleware.js';
import isAdmin from '../../middlewares/isAdmin.js';
import { deleteReview } from '../../controllers/admin/deleteReview.js';
import { uploads } from '../../middlewares/fileUploads/userPhotoUploads.js';
import { getCategoriesWiseTotalProducts } from '../../controllers/admin/getCategoriesWiseProducts.controller.js';

export const productsAdminHandleRoute = Router();

productsAdminHandleRoute.route('/create-product').post(
  isLoggedIn,
  isAdmin,
  uploads.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 3 },
  ]),
  createProduct,
);
productsAdminHandleRoute.route("/get-categories-wise-products").get(isLoggedIn , isAdmin , getCategoriesWiseTotalProducts)

productsAdminHandleRoute
  .route('/:id')
  .put(isLoggedIn, isAdmin, updateProducts)
  .delete(isLoggedIn, isAdmin, deleteProduct)
  .get(singleProduct);

// productsAdminHandleRoute.route('/products-all').get(getAllProducts)
productsAdminHandleRoute.route('/').get(isLoggedIn , isAdmin , getAllProducts);

productsAdminHandleRoute
  .route('/delete-review')
  .delete(isLoggedIn, isAdmin, deleteReview);


