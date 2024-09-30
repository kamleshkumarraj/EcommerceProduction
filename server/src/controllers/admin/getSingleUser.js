import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { userModels } from "../../models/userRegistration.model.js";

export const getSingleUser = asyncHandler(async (req,res,next) =>{
    const user_id = req.query.id;
    const user = await userModels.findById(user_id);

    if(!user) return next(new ErrorHandler("User doesn't exists",400))

    res.status(200).json({
        success : true,
        message : "User get successfully ",
        user
    })
})