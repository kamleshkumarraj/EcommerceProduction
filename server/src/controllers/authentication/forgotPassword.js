import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { userModels } from "../../models/userRegistration.model.js";
import { sendMail } from "../../utils/sendMail.js";

export const  forgotPassword = asyncHandler(async (req, res, next) =>{
    const user = await userModels.findOne({email : req.body.email})

    if(!user){ 
        return next(new ErrorHandler("Users deosnot exist !"))
    }
    const resetTocken = user.generateResetPasswordTocken();
    await user.save({validateBeforeSave : true})

    const messageUrl = `${req.protocol}://${req.get('host')}/api/v2/reset-password/${resetTocken}`
    const message = `you reset your password on click this link below :  \n\n ${messageUrl} \n\n If you don't want to reset your password then ignore them.`

    try{
        await sendMail({
            email : user.email,subject : "Reset password for ecommerce website", message})

         res.status(200).json({
            success : true,
            message : "Reset pawword link is successfully sent"
        })
    }
    catch(err){
        user.resetPasswordTocken = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save({validateBeforeSave : true})

        return next(new ErrorHandler("password reset failed ! "+err,400))
    }
})