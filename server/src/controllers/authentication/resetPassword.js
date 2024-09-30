import { asyncHandler } from "../../errors/asynHandler.js";
import crypto from 'crypto'
import { userModels } from "../../models/userRegistration.model.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { storetokenAndGetJWT } from "../../utils/storeJWTincookie.js";

export const resetPassword = asyncHandler(async (req, res, next) =>{
    const resetPasswordTocken = crypto.createHash('sha256').update(req.params.tocken).digest('hex');

    const user = await userModels.findOne({resetPasswordTocken , resetPasswordExpiry : {$gt : Date.now()}})

    if(!user){
        return next(new ErrorHandler("Your reset password tocken is expire or invalid",400))
    }

    if(req.body.password != req.body.consfirmPassword){
        return next(new ErrorHandler("Password does't match" , 400))
    }
    

    user.password = req.body.password;

    await user.save({validateBeforeSave : true})

    storetokenAndGetJWT(res,user,200)

    user.resetPasswordExpiry = undefined;
    user.resetPasswordTocken = undefined;
    await user.save({validateBeforeSave : true})
})