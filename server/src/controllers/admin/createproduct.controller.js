import { productsModel } from "../../models/products.model.js"
import ErrorHandler from "../../errors/errorHandler.js"
import { asyncHandler } from "../../errors/asynHandler.js"
import { removeFile, uploadMultipleFilesOnCloudinary } from "../../helper/helper.js";

const createProduct = asyncHandler(async (req , res , next) =>{
    const {thumbnail , images=[]} = req.files;
    
    if(!thumbnail) return next(new ErrorHandler("Please provide thumbnail image",400))
    if(images.length < 1) return next(new ErrorHandler("Please provide at least one image",400))

    const urlResult = await uploadMultipleFilesOnCloudinary([...thumbnail , ...images]);

    await removeFile([...thumbnail , ...images])
    req.body.thumbnail = {
        public_id : urlResult.results[0].public_id,
        url : urlResult.results[0].url
    }

    req.body.images = {
        images : urlResult.results.slice(1).map((image) => {
            return ({
                public_id : image.public_id,
                url : image.url
            })
        })
    }

    req.body.created_By = {user_Id : req.user.id}; 
    const product = await productsModel.create(req.body)
    if(!product){
        return next(new ErrorHandler("Products created failed",401))
    }
    res.status(200).json({
        success : true,
        message : "products created successfully",
        data : product
     })
       
   
   })
export default createProduct;