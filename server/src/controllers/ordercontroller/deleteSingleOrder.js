import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { ordersModel } from "../../models/order.model.js";
import { productsModel } from "../../models/products.model.js";

export const deleteSingleOrder = asyncHandler(async (req , res , next) => {

    const deletedOrder = await ordersModel.findById(req.params.id)

    if(!deletedOrder) return next(new ErrorHandler("please send valid order id",402))

    if(deletedOrder.orderStatus == 'Delivered') return next(new ErrorHandler("Product already delivered",403))

    const updateProducts = async (deletedOrder) =>{ 
        const product = await productsModel.findById(deletedOrder.productId)
        product.stock += Number(deletedOrder.quantity);

        await product.save({validateBeforeSave : false})
    } 

     deletedOrder.orderItems.forEach(async (order) => {
        await updateProducts(order)
    
    })

    await ordersModel.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success : true,
        message : "You deleted product successfully"
    })
})