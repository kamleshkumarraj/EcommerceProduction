import mongoose from "mongoose";
import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { ordersModel } from "../../models/order.model.js";

export const getSingleOrder = asyncHandler(async (req , res , next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
    return next(new ErrorHandler("Please send valid order id : ",402))

    const order = await ordersModel.findById(req.params.id).populate("user","firstname email")

    if(!order) return next(new ErrorHandler("Please send valid order id : ",402))

    res.status(200).json({
        success : true,
        message : "You get your order successfully",
        data : order
    })

})