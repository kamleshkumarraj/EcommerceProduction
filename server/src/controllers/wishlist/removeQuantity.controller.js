import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import {wishlist} from '../../models/wishlist.model.js'

export const removeWishlistItems = asyncHandler(async (req , res , next) => {
    const {wishlistItemId} = req.params 

    const wishlistItem = await wishlist.findById(wishlistItemId)
    if(!wishlistItem) return next(new ErrorHandler("wishlist item not available !",404))

    await wishlist.findByIdAndDelete(wishlistItemId)

    res.status(200).json({
        success : true,
        message : "wishlist item deleted successfully"
    })
})