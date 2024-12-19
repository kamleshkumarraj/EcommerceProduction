import { asyncHandler } from "../../errors/asynHandler.js";
import { shippingAddress } from "../../models/shippingAddress.model.js";

export const addAddress = asyncHandler(async (req , res , next) => {
    const {address , city , district , subDistrict , state , pinCode , country , phoneNumber} = req.body;

    await shippingAddress.create({userId : req.user.id , phoneNumber , address , city , district , subDistrict , state , pinCode , country })
    
    res.status(200).json({
        success : true,
        message : "Address added successfully"
    })

})