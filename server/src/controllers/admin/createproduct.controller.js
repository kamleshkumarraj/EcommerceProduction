import { productsModel } from "../../models/products.model.js"
import ErrorHandler from "../../errors/errorHandler.js"
import { asyncHandler } from "../../errors/asynHandler.js"

const createProduct = asyncHandler(async (req , res , next) =>{
    req.body.created_By = {user_Id : req.user.id}; 
    const product = await productsModel.create(req.body)
    if(!product){
        return next(new ErrorHandler("Products created fialed",401))
    }
    res.status(200).json({
        success : true,
        message : "products created successfully",
        product
     })
       
   
   })
export default createProduct;