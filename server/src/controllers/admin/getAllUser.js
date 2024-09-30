import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { userModels } from "../../models/userRegistration.model.js";

export const getAllUsers = asyncHandler(async (req, res, next) =>{
    const users = await userModels.find();

    if(!users) return next(new ErrorHandler("Doesn't exist any users !",404))
    
    res.status(200).json({
        success : true,
        message : "Get all users Successfully",
        users
    })
})

