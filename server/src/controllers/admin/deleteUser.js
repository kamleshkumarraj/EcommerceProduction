import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { userModels } from "../../models/userRegistration.model.js";

export const deleteUser = asyncHandler(async (req, res ,next) =>{
    const user = await userModels.findById(req.query.id);
    if(!user){
        return next(new ErrorHandler("User does not exist!",402))
    }
    await userModels.findByIdAndDelete(req.query.id)

    res.status(200).json({
        success : true,
        message : "User deleted successfully !",
    })
})