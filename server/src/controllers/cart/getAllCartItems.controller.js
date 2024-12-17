import { asyncHandler } from "../../errors/asynHandler.js";
import { cart } from "../../models/cart.model.js";

export const getAllCartItems = asyncHandler(async (req , res , next) => {
    const {userId} = req.params 
    const cartItems = await cart.find({userId}).populate('productId' , 'title thumbnail category price quantity availabilityStatus')

    const transformData = cartItems.map(({title , thumbnail , category , price , quantity , availabilityStatus}) => {
        return {
            title,
            thumbnail,
            category,
            price,
            quantity,
            availabilityStatus
        }
    })

    res.status(200).json({
        success : true,
        message : 'You get your all cart items successfully.',
        data : transformData
    })
})