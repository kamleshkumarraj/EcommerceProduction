import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { ordersModel } from "../../models/order.model.js";
import { productsModel } from "../../models/products.model.js";

export const createOrder = asyncHandler(async (req , res , next) =>{
    const {shippingInfo, orderItems , itemsPrice , shippingPrice , taxPrice , totalPrice , paymentInfo} = req.body

    const validateStock = async (product) =>{
        const orderedProduct = await productsModel.findById(product.productId);
        orderedProduct.stock -= product.quantity;
        await orderedProduct.save({validateBeforeSave : false})
        
    }

    orderItems.forEach(async (order) => {
        validateStock(order)
    })
    
    

    const order = await ordersModel.create({shippingInfo , user : req.user.id , orderItems , itemsPrice , shippingPrice , taxPrice , totalPrice , paidAt : Date.now() , paymentInfo}) 
   
    res.status(200).json({
        success : true,
        message : "Order created successfully",
        order
    })

})