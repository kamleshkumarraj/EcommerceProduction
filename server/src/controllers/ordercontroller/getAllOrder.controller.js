import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { ordersModel } from "../../models/order.model.js";

export const getAllOrders = asyncHandler(async (req , res , next) =>{
    const orders = await ordersModel.find({user : req.user.id});

    if(!orders) return next(new ErrorHandler("You have no any orders records !",403))

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success : true,
        message : "You get all orders successfully .",
        orders,
        totalAmount
    })
})