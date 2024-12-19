import { asyncHandler } from "../../errors/asynHandler.js";
import { shippingAddress } from "../../models/shippingAddress.model.js";

export const getMyAddress = asyncHandler(async (req , res , next) => {
    const myAddr = await shippingAddress.find({userId : req.user.id})
    
    res.status(200).json({
        success : true,
        message : "You get all shipping address successfully",
        data : myAddr
    })
})