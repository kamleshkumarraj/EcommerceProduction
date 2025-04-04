import { asyncHandler } from "../../errors/asynHandler.js";
import { productsModel } from "../../models/products.model.js";

export const getAllProductsImages = asyncHandler(async (req, res, next) => {
    const products = await productsModel.find();

    const productsImages = products.map((product) => product?.images[0]?.url || product.images[0])

    res.status(200).json({
        success: true,
        message: 'You get your all products images successfully.',
        data: productsImages,
    })
})