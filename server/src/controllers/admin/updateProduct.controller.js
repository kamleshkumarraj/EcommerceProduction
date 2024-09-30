import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { productsModel } from "../../models/products.model.js"

export const updateProducts = asyncHandler(async (req , res , next) =>{
    let product = await productsModel.findById(req.params.id);

    if(product){
        product = await productsModel.findByIdAndUpdate(req.params.id, req.body , {
            new : true,
            runValidators : true,
            useFindAndModify : false 
        })
       return res.status(200).json({
            success : true,
            message : "Product updated successfully",
            product
        })
    }
    return next(new ErrorHandler("Products not found" , 402))
})