import { Router } from "express";
import isAdmin from "../../middlewares/isAdmin.js";
import isLoggedIn from "../../middlewares/isLoggedIn.middleware.js";
import { getAllUsers } from "../../controllers/admin/getAllUser.js";
import { getSingleUser } from "../../controllers/admin/getSingleUser.js";
import {deleteUser} from "../../controllers/admin/deleteUser.js";
import { changeRole } from "../../controllers/admin/changeRole.js";

export const adminHandleUserRoute = Router();

adminHandleUserRoute.route('/single-user').get(isLoggedIn, isAdmin , getSingleUser);

adminHandleUserRoute.route('/all-users').get(isLoggedIn , isAdmin , getAllUsers);

adminHandleUserRoute.route('/delete-user').get(isLoggedIn , isAdmin , deleteUser);

adminHandleUserRoute.route('/change-role').get(isLoggedIn , isAdmin , changeRole)
