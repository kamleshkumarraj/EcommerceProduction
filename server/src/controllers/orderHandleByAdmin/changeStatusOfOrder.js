import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { ordersModel } from "../../models/order.model.js";

export const changeOrderStatus = asyncHandler(async (req , res , next) => {
   
    const order = await ordersModel.findById(req.query.id);

    if(!order) return next(new ErrorHandler("Please send valid order id !"))

    if(order.orderStatus == "Delivered") return next(new ErrorHandler("This order has already been delivered"))

    if(req.query.status == "Delivered") order.deliveredAt = Date.now();
    
    order.orderStatus = req.query.status;

    await order.save({validateBeforeSave : false})

    res.status(200).json({
        success : true,
        message : "Order status updated successfully"
    })

})