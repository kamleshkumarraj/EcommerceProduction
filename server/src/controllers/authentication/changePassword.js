import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { userModels } from "../../models/userRegistration.model.js";
import { storetokenAndGetJWT } from "../../utils/storeJWTincookie.js";

export const changePassword = asyncHandler(async (req, res , next) =>{
  
    const user = await userModels.findOne({email : req.user.email}).select("+password")
    const {oldPassword, newPassword , confirmPassword} = req.body;

   if(!oldPassword || !newPassword || !confirmPassword){
    return next(new ErrorHandler("Please enter all required fileds",400))
   }

    if(newPassword != confirmPassword){
        return next(new ErrorHandler("New password and confirm password is mismatched",400))
    }
    if(! await user.passwordCompare(oldPassword)){
        return next(new ErrorHandler("Please enter valid old password !",400))
    }
    user.password = req.body.newPassword;

    await user.save({validateBeforeSave : true})

    storetokenAndGetJWT(res,user,200);
})