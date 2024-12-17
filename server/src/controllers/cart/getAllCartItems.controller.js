import { asyncHandler } from "../../errors/asynHandler.js";
import { cart } from "../../models/cart.model.js";

export const getAllCartItems = asyncHandler(async (req , res , next) => {
    const {userId} = req.params 
    const cartItems = await cart.find({userId}).populate('productId' , 'title thumbnail category price quantity availabilityStatus rating')

    const transformData = cartItems.map(({productId , quantity}) => {
        return {
            title : productId.title,
            thumbnail : productId.thumbnail,
            category : productId.category,
            price : productId.price,
            quantity,
            availabilityStatus : productId.availabilityStatus,
            rating : productId.rating
        }
    })

    res.status(200).json({
        success : true,
        message : 'You get your all cart items successfully.',
        data : transformData,
        length : transformData.length
    })
})