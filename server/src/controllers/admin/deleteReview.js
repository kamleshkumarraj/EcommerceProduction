import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { productsModel } from "../../models/products.model.js";

export const deleteReview = asyncHandler(async (req , res , next) =>{
    console.log("running")
    const {productId , userId} = req.body;
    if(!productId || !userId) return next(new ErrorHandler("Please send productId and userId"),404)

    const product = await productsModel.findById(productId)
    if(!product) return next(new ErrorHandler("Please send valid productId"),404)
    const remainReview = await product.reviews.filter((review) => review.user != userId)

    product.reviews = remainReview;

    let temp = 0;
    product.reviews.forEach((review) => {
        temp += review.rating;
    })

    product.rating = temp/product.reviews.length;

    await product.save({validateBeforeSave : false})

    res.status(200).json({
        success : true,
        message : "Review deleted successfully",
        product
    })
 })