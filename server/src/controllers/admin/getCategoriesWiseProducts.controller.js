import { asyncHandler } from "../../errors/asynHandler.js";
import { productsModel } from "../../models/products.model.js";

export const getCategoriesWiseTotalProducts = asyncHandler(async (req , res , next) => {
    const productsData = await productsModel.aggregate([
        {
            $group : {
                _id : "$category",
                value : { $sum : 1 },
                thumbnail : {$first : "$thumbnail"}
            }
        },
        {
            $project : {
                _id : 0,
                name : "$_id",
                value : 1,
                thumbnail : 1
            }
        }
    ])
    res.status(200).json({
        success : true,
        message : "Categories wise total products",
        data : productsData
    })
})