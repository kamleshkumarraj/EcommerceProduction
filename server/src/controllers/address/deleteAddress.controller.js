import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler";
import { shippingAddress } from "../../models/shippingAddress.model";

export const deleteAddress = asyncHandler(async (req , res , next) => {
    const {addrId} = req.params 
    const addr = await shippingAddress.findById(addrId)
    if(!addr) return next(new ErrorHandler("Couldn't find shipping address" , 404))

    await shippingAddress.findByIdAndDelete(addrId)
    res.status(200).json({
        success : true,
        message : "Address deleted successfully"
    })
})