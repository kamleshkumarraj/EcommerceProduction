import { Router } from 'express';
import createProduct from '../../controllers/admin/createproduct.controller.js';
import { updateProducts } from '../../controllers/admin/updateProduct.controller.js';
import { deleteProduct } from '../../controllers/admin/deleteproduct.controller.js';
import { singleProduct } from '../../controllers/admin/getsingleproduct.controller.js';
import { getAllProducts } from '../../controllers/admin/getallproducts.controller.js';
import isLoggedIn from '../../middlewares/isLoggedIn.middleware.js';
import isAdmin from '../../middlewares/isAdmin.js';
import { deleteReview } from '../../controllers/admin/deleteReview.js';

export const productsAdminHandleRoute = Router();

productsAdminHandleRoute.route('/create-product').post(isLoggedIn ,isAdmin,createProduct);

productsAdminHandleRoute.route('/:id').put(isLoggedIn,isAdmin,updateProducts).delete(isLoggedIn,isAdmin,deleteProduct).get(singleProduct)

// productsAdminHandleRoute.route('/products-all').get(getAllProducts)
productsAdminHandleRoute.route('/').get(getAllProducts)

productsAdminHandleRoute.route('/delete-review').delete(isLoggedIn , isAdmin , deleteReview)