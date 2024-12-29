import { asyncHandler } from "../errors/asynHandler.js";

export const logData = asyncHandler(async (req , res , next) => {
    console.log(req.body)
    next();
})