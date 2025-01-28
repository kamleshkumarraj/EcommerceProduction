import { Router } from "express";
import { getAllCategories } from "../../controllers/common/getAllCategories.controller.js";
import { getAllFeaturesProducts } from "../../controllers/common/getAllFeaturesProducts.controller.js";
import { getAllProducts } from "../../controllers/admin/getallproducts.controller.js";
import { getAllProductsImages } from "../../controllers/common/products.controller.js";

export const commonRouter = Router();

commonRouter.route('/get-categories').get(getAllCategories)
commonRouter.route('/featured-products').get(getAllFeaturesProducts)
commonRouter.route('/all-products').get(getAllProducts)
commonRouter.route('/get-products-images').get(getAllProductsImages)