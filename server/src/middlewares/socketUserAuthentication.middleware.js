import ErrorHandler from "../errors/errorHandler.js"
import jwt from "jsonwebtoken"
import { userModels } from "../models/userRegistration.model.js";

export const socketUserAuthentication = async (error , socket , next) => {
    try {
        if (error) {
          return next(new ErrorHandler(error, 500));
        } else {
          const { tocken } = socket.request.cookies;
          if (!tocken){
            socket.user = 'unKnown';
            return next();
          }
            
          const decodedTocken = await jwt.verify(tocken, process.env.JWT_SECRET)
          const user = await userModels.findById(decodedTocken.id);
    
          socket.user = user;
          return next();
        }
      } catch (error) {
        return next(new ErrorHandler(error, 401));
      }
}