import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { shippingAddress } from "../../models/shippingAddress.model.js";

export const updateAddress = asyncHandler(async (req , res , next) => {
    const addr = req.body 
    const {addrId} = req.params 
    const address = await shippingAddress.findById(addrId)
    if(!address) return next(new ErrorHandler("Address not found !",404))
    await shippingAddress.findByIdAndUpdate(addrId , addr , {runValidators : true , new : true , useFindAndModify : false})

    res.status(200).json({
        success : true,
        message : "Address updated successfully"
    })
})