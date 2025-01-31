import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { userModels } from "../../models/userRegistration.model.js";
import { storetokenAndGetJWT } from "../../utils/storeJWTincookie.js";

const userLogin = asyncHandler(async (req , res , next) =>{
    const {email , password, username} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("please enter email and password" , 401));
    }
    const user = await userModels.findOne({$or : [{email : email} , {username : username}]}).select("+password")
    if(!user){
       return next(new ErrorHandler("Invalid email or password" , 402))
    }
    
    
    if(! await user.passwordCompare(password)){
      return next(new ErrorHandler("Invalid email or password" , 402))
    }
    console.log("user login caliing ...")
    storetokenAndGetJWT(res , user );
})

export default userLogin;