import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { ordersModel } from "../../models/order.model.js";
import { productsModel } from "../../models/products.model.js";

export const createOrder = asyncHandler(async (req , res , next) =>{
    const {orderItems } = req.body
    req.body.user = req.user.id;
    const validateStock = async (product) =>{
        const orderedProduct = await productsModel.findById(product.productId);
        orderedProduct.quantity -= product.quantity;
        await orderedProduct.save({validateBeforeSave : false})
        
    }

    orderItems.forEach(async (order) => {
        validateStock(order)
    })
    
    

    const order = await ordersModel.create(req.body) 
   
    res.status(200).json({
        success : true,
        message : "Order created successfully",
        order
    })

})