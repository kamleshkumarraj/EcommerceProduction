import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { cart } from "../../models/cart.model.js";

export const removeMultipleCartItems = asyncHandler(async (req , res , next) => {
    const deletableItems = req.body || [];
    console.log(deletableItems)
    if(deletableItems.length < 1) return next(new ErrorHandler("Please provide item for deleting the products !" , 404))

    await cart.deleteMany({ _id: { $in : deletableItems } })
    res.status(200).json({ 
        success : true,
        message: "Items deleted successfully !" 
    })
})