import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { wishlist } from "../../models/wishlist.model.js";

export const updateWishlistQty = asyncHandler(async (req , res , next) => {
    const {wishlistId} = req.params 
    const {operation} = req.query
    const wishlistItem = await wishlist.findById(wishlistId);

    if(!wishlistItem) return next(new ErrorHandler("Please provide valid wishlist id ",404))

    if(operation === "increase"){
        wishlistItem.quantity = wishlistItem.quantity + 1;
        await wishlistItem.save();
    }else if(operation == 'decrease'){
        wishlistItem.quantity = wishlistItem.quantity - 1;
        if(wishlistItem.quantity == 0) {
            await wishlist.findByIdAndDelete(wishlistItem)
        }else{
            await wishlistItem.save();
        }
    }else{
        return next(new ErrorHandler("Please provide valid operation ",400))
    }

    res.status(200).json({
        success : true,
        message : `wishlist quantity ${operation} successfully`,
    })
})