import { Router } from "express";
import { updateAndSetReviews } from "../../controllers/productHandleByUser/updateReviews.controller.js";
import isLoggedIn from "../../middlewares/isLoggedIn.middleware.js";
import { getAllReviews } from "../../controllers/productHandleByUser/getAllReviews.js";

export const productHandleByUser = Router();


productHandleByUser.route('/give-reviews').put(isLoggedIn,updateAndSetReviews)

productHandleByUser.route('/all-reviews').get(isLoggedIn , getAllReviews)