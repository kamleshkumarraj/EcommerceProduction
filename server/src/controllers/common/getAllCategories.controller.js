import { asyncHandler } from "../../errors/asynHandler.js";
import { productsModel } from "../../models/products.model.js";

export const getAllCategories = asyncHandler(async (req , res , next) => {
    const productsList = await productsModel.find();
    const categoryList = [];
    productsList.forEach((products) => {
        let flag = true;
        categoryList.forEach(({name}) => {
            if(name == products.category){
                flag = false;
                return;
            }
        })
        if(flag) categoryList.push({name : products.category , image : products.thumbnail})
    })

    res.status(200).json({
        success : true,
        message : "You get all categories successfully",
        data : categoryList
    })
})