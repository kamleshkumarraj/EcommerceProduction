import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { shippingAddress } from "../../models/shippingAddress.model.js";

export const updateSelectedAddressStatus = asyncHandler(async (req , res , next) => {
    const {prev , curr} = req.params;
    if(!prev || !curr) return next(new ErrorHandler("Please provide both prev and next address id" , 404))

    await shippingAddress.findByIdAndUpdate(prev , {selectStatus : false} , {runValidators : true})

    await shippingAddress.findByIdAndUpdate(curr , {selectStatus : true})

    res.status(200).json({
        success : true,
        message : "Selected address status updated successfully"
    })
})