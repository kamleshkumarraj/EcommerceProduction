import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { userModels } from "../../models/userRegistration.model.js";

export const changeRole = asyncHandler(async (req , res , next) => {
    const user = await userModels.findById(req.query.id);

    if(!user) return next(new ErrorHandler("User does not exist !",402))
    if(! req.query.role) return next(new ErrorHandler("Please specify the role for users !",402))
        
    user.roles = req.query.role;

    await user.save({validateBeforeSave : false})

    res.status(200).json({
        success : true,
        message : "Role changed successfully",
        user_id : user._id
    })
})