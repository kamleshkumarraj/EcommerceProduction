import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import {cart} from '../../models/cart.model.js'

export const removeCartItems = asyncHandler(async (req , res , next) => {
    const {cartItemId} = req.params 

    const cartItem = await cart.findById(cartItemId)
    if(!cartItem) return next(new ErrorHandler("Cart item not available !",404))

    await cart.findByIdAndDelete(cartItemId)

    res.status(200).json({
        success : true,
        message : "Cart item deleted successfully"
    })
})