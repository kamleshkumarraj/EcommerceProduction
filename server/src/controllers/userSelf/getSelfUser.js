import { asyncHandler } from "../../errors/asynHandler.js";
import { userModels } from "../../models/userRegistration.model.js";

export const getSelfUser = asyncHandler(async (req,res,next) =>{
    const user = await userModels.findById(req.user.id);

    res.status(200).json({
        success : true,
        message : "You get Successfully",
        user
    })
})