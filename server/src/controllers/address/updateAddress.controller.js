import { asyncHandler } from "../../errors/asynHandler.js";
import { shippingAddress } from "../../models/shippingAddress.model.js";

export const updateAddress = asyncHandler(async (req , res , next) => {
    const addr = req.body 
    const {addrId} = req.params 

    await shippingAddress.findByIdAndUpdate(addrId , addr , {runValidators : true , new : true})

    res.status(200).json({
        success : true,
        message : "Address updated successfully"
    })
})