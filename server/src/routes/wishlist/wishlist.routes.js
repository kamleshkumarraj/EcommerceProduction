import {Router} from 'express'
import isLoggedIn from '../../middlewares/isLoggedIn.middleware.js';
import { addWishlistItem } from '../../controllers/wishlist/createWishlist.controller.js';
import { removeWishlistItems } from '../../controllers/wishlist/removeQuantity.controller.js';
import { updateWishlistQty } from '../../controllers/wishlist/updateQuantity.controller.js';
import { getAllWishlistItems } from '../../controllers/wishlist/getAll.controller.js';

export const wishlistHandlingRoute = Router();

wishlistHandlingRoute.use(isLoggedIn)
wishlistHandlingRoute.route('/add/:productId').post(addWishlistItem)
wishlistHandlingRoute.route('/remove/:wishlistId').delete(removeWishlistItems)
wishlistHandlingRoute.route('/update/:wishlistId').patch(updateWishlistQty)
wishlistHandlingRoute.route('/get').get(getAllWishlistItems)
