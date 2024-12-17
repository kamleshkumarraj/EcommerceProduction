import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { cart } from "../../models/cart.model.js";
import { productsModel } from "../../models/products.model.js";

export const addCartItem = asyncHandler(async (req , res , next) => {
    const {productId} = req.params

    const products = await productsModel.findById(productId);

    if(products.availabilityStatus != 'available' && products.quantity >= 1) return next(new ErrorHandler("Products out of stock !",404))

   const cartItems = await cart.create({userId : req.user.id , productId})

   res.status(201).json({
    success : true,
    message : "Product added in cart list successfully"
   })
})