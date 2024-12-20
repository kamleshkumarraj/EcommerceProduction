import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { shippingAddress } from "../../models/shippingAddress.model.js";

export const updateSelectedAddressStatus = asyncHandler(async (req , res , next) => {
    const {prev , next} = req.params;
    if(!prev._id || !next._id) return next(new ErrorHandler("Please provide both prev and next address id" , 404))

    await shippingAddress.findByIdAndUpdate(prev._id , {selectStatus : false} , {runValidators : true})

    await shippingAddress.findByIdAndUpdate(next._id , {selectStatus : true})

    res.status(200).json({
        success : true,
        message : "Selected address status updated successfully"
    })
})