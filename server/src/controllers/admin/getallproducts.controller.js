import { asyncHandler } from "../../errors/asynHandler.js";
import { productsModel } from "../../models/products.model.js";
export const getAllProducts = asyncHandler(async (req , res , next) =>{
    
    //logic for getting from apifeatures class and apply all feature.
    // const apiFeatres = new apiFetures(productsModel.find() , req.query).queryUpdater_search()
    // .queryUpdater_filter()
    // .pagination(10) 
    // const products = await apiFeatres.query; // calling the apiFeatures.query means apiFeatures.query holds productModel.find()method with modification; 
    const products  = await productsModel.find()
    if(!products){
       return next("Product not available" , 401)
    }
    res.status(200).json({
        success : true,
        message : "You get all products successfully",
        data : {
            products ,
            productsLength : products.length
        }
    })
})