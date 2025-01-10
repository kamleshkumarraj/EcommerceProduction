import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { ordersModel } from "../../models/order.model.js";

export const getTotalOrderByAdmin = asyncHandler(async (req , res , next) => {
    const totalOrders = await ordersModel.find().populate("user" , 'firstname lastname avatar');
    if(!totalOrders) return next(new ErrorHandler("No any order found !",404))

    const transformData = totalOrders.map((order) => ({
        ...order,
        user : {
            _id : order.user._id,
            fullname : order.user.firstname + " " + order.user.lastname,
            avatar : order.user.avatar
        }
    }))

    res.status(200).json({
        success : true,
        message : "You get all orders successfully",
        data : {
            orders : totalOrders,
            ordersLength : totalOrders.length
        }
    })
})