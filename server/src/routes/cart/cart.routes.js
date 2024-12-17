import {Router} from 'express'
import { getAllCartItems } from '../../controllers/cart/getAllCartItems.controller.js'
import { addCartItem } from '../../controllers/cart/createCart.controller.js'
import { removeCartItems } from '../../controllers/cart/removeFromCart.controller.js'
import { increaseCartQty } from '../../controllers/cart/increaseQty.controller.js'
import { decreaseCartQty } from '../../controllers/cart/decreaseCartQty.controller.js'
import isLoggedIn from '../../middlewares/isLoggedIn.middleware.js'

export const cartRouter = Router()
cartRouter.use(isLoggedIn)
cartRouter.route('/get/:userId').get(getAllCartItems)
cartRouter.route('/add/:productId').post(addCartItem)
cartRouter.route('/remove/:cartItemId').delete(removeCartItems)
cartRouter.route('/increase/:cartItemId').patch(increaseCartQty)
cartRouter.route('/decrease/:cartItemId').patch(decreaseCartQty)