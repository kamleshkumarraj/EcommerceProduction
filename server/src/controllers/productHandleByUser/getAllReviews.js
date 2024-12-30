import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { productsModel } from "../../models/products.model.js";

export const getAllReviews = asyncHandler(async (req , res , next) =>{
    const reviewsData = await productsModel.findById(req.params.id , {reviews : 1}).populate("reviews.reviewerId" , "firstname lastname avatar")
    console.log(reviewsData)
    if(!reviewsData) return next(new ErrorHandler("please send valid products Id"))
    const sendingData = reviewsData.reviews.map(({comment , rating , reviewerId}) => {
        return {
            name : (reviewerId?.firstname || "John ")+ " "+(reviewerId?.lastname || "Doe"),
            avatar : reviewerId?.avatar?.url,
            comment : comment,
            rating : rating
        }
    })
console.log(sendingData)
  
    
    
    
    res.status(200).json({
        success : true,
        message : "You get all reviews for this product successfully",
        data : sendingData
    })
    
})