import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { ordersModel } from "../../models/order.model.js";

export const getTotalOrderByAdmin = asyncHandler(async (req , res , next) => {
    const totalOrders = await ordersModel.find();
    if(!totalOrders) return next(new ErrorHandler("No any order found !",404))

    res.status(200).json({
        success : true,
        message : "You get all orders successfully",
        totalOrders,
        length : totalOrders.length
    })
})