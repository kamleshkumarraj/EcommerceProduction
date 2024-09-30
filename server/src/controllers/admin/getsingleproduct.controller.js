import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { productsModel } from "../../models/products.model.js"

export const singleProduct = asyncHandler(async (req , res , next) =>{
    let product = await productsModel.findById(req.params.id);

    if(!product) {
      return next(new ErrorHandler("Product not found" ,405))
    }
    res.status(200).json({
        success : true,
        message : "products get successfully",
        product
    })
})