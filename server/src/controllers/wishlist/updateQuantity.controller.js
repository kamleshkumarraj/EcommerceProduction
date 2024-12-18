import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { cart } from "../../models/cart.model.js";

export const increaseCartQty = asyncHandler(async (req , res , next) => {
    const {cartItemId} = req.params 
    const {operation} = req.query
    const cartItem = await cart.findById(cartItemId);

    if(!cartItem) return next(new ErrorHandler("Please provide valid cart id ",404))

    if(operation === "increase"){
        cartItem.quantity = cartItem.quantity + 1;
        await cartItem.save();
    }else if(operation == 'decrease'){
        cartItem.quantity = cartItem.quantity - 1;
        if(cartItem.quantity == 0) {
            await cart.findByIdAndDelete(cartItem)
        }else{
            await cartItem.save();
        }
    }else{
        return next(new ErrorHandler("Please provide valid operation ",400))
    }

    res.status(200).json({
        success : true,
        message : "Cart quantity increased successfully",
    })
})