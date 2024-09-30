import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { productsModel } from "../../models/products.model.js";

export const getAllReviews = asyncHandler(async (req , res , next) =>{
    const product = await productsModel.findById(req.query.id)

    if(!product) return next(new ErrorHandler("please send valid products Id"))

    res.status(200).json({
        success : true,
        message : "You get all reviews for this product successfully",
        data : product.reviews
    })
    
})