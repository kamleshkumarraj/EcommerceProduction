import { asyncHandler } from "../../errors/asynHandler.js"
import ErrorHandler from "../../errors/errorHandler.js"
import { productsModel } from "../../models/products.model.js"

export const deleteProduct = asyncHandler(async (req, res , next) =>{
    let product = await productsModel.findById(req.params.id)

    if(!product){
      return next(new ErrorHandler("Product not found",402))
    }
   await productsModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success : true,
        message : "products deleted Successfully"
    })
})