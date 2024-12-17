import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler";
import { cart } from "../../models/cart.model";

export const increaseCartQty = asyncHandler(async (req , res , next) => {
    const {cartItemId} = req.params 
    const cartItem = await cart.findById(cartItemId);

    if(!cartItem) return next(new ErrorHandler("Please provide valid cart id ",404))

    cartItem.quantity = cartItem.quantity + 1;
    await cartItem.save();

    res.status(200).json({
        success : true,
        message : "Cart quantity increased successfully",
    })
})