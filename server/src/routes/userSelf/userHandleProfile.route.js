import { Router } from "express";
import isLoggedIn from "../../middlewares/isLoggedIn.middleware.js";
import { getSelfUser } from "../../controllers/userSelf/getSelfUser.js";
import { updateProfle } from "../../controllers/userSelf/updateUser.js";

export const handleUserProfileRoute = Router()

handleUserProfileRoute.get('/me',isLoggedIn , getSelfUser)

handleUserProfileRoute.put('/update-profile',isLoggedIn , updateProfle)