import { asyncHandler } from "../../errors/asynHandler.js";
import { userModels } from "../../models/userRegistration.model.js";

export const updateProfle = asyncHandler(async (req , res , next) => {
    const {firstname , lastname , email , username , avatar} = req.body;

    const users = {
        firstname,
        lastname,
        email,
        username,
        avatar
    }

    await userModels.findByIdAndUpdate(req.user.id , users ,{
        new : true,
        runValidators : true,
        useFindAndModify : false
    })

    const newUser = await userModels.findById(req.user.id);
    res.status(200).json({
        success : true,
        message : "Profile updated successfully",
        newUser
    })
})