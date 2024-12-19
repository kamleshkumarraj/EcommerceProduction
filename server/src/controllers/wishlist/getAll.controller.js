import { asyncHandler } from "../../errors/asynHandler.js";
import { wishlist } from "../../models/wishlist.model.js";

export const getAllWishlistItems = asyncHandler(async (req , res , next) => {
    const userId = req.user._id 
    const wishlistItems = await wishlist.find({userId}).populate('productId' , 'title thumbnail category price quantity availabilityStatus rating _id')

    const transformData = wishlistItems.map(({productId , quantity , _id}) => {
        return {
            _id,
            title : productId.title,
            thumbnail : productId.thumbnail,
            category : productId.category,
            price : productId.price,
            quantity,
            availabilityStatus : productId.availabilityStatus,
            rating : productId.rating,
            productId : productId._id

        }
    })

    res.status(200).json({
        success : true,
        message : 'You get your all wishlist items successfully.',
        data : transformData,
        length : transformData.length
    })
})