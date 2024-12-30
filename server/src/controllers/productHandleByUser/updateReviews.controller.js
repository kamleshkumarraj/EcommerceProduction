import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { productsModel } from "../../models/products.model.js";

export const updateAndSetReviews = asyncHandler(async (req , res , next) =>{

    const {comment , rating } = req.body;
    const productId = req.query.id

    const product = await productsModel.findById(productId)

    if(!product) return next(new ErrorHandler("Please enter valid productId",402));
    // new review that is given by user and save them in reviews array.
    const review = {
        reviewerId : req.user.id,
        rating : Number(rating),
        comment,
    
    }

    //method for checking this user is already reviewed or not.
    const isReviewed = async () =>{
        return product.reviews.find((rev) => rev.reviewerId == req.user.id);
    }
    // if user alredy reviewed then we only changed rating and comment.
    if(await isReviewed()){
        product.reviews.find((rev) => {
            if(rev.reviewerId == req.user.id){
                rev.rating = Number(rating);
                rev.comment = comment;
            }
        })
    }
    else{
        product.reviews.push(review);
    }
    // then we find average rating of the products;
    let temp = 0
    product.reviews.forEach((rev) =>{
        temp += rev.rating;
    })

    product.rating = temp/product.reviews.length;

    await product.save({validateBeforeSave : false})

    res.status(200).json({
        success : true,
        message : "Successfully giving reviews",
        product
    })

})