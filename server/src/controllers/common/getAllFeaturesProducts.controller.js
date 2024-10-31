import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { productsModel } from "../../models/products.model.js";

export const getAllFeaturesProducts = asyncHandler(async (req , res , next) => {

    const products = await productsModel.find({rating : {$gte : 4.5}});
    if(!products) return next(new ErrorHandler("Products not found !",403))
    
    res.status(200).json({
        success : true,
        message : "You get all products successfully",
        data : products
    })
})