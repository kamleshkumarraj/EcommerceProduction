import { Router } from "express";

import { getTotalOrderByAdmin } from "../../controllers/orderHandleByAdmin/getTotalOrder.js";
import isLoggedIn from "../../middlewares/isLoggedIn.middleware.js";
import isAdmin from "../../middlewares/isAdmin.js";
import { getSingleOrderByAdmin } from "../../controllers/orderHandleByAdmin/getOrderOfAUser.js";
import { changeOrderStatus } from "../../controllers/orderHandleByAdmin/changeStatusOfOrder.js";

export const orderHAndleByAdminRoute = Router();

orderHAndleByAdminRoute.route('/all-orders').get(isLoggedIn,isAdmin,getTotalOrderByAdmin)
orderHAndleByAdminRoute.route('/single-order/:id').get(isLoggedIn , isAdmin , getSingleOrderByAdmin)
orderHAndleByAdminRoute.route('/change-status').get(isLoggedIn , isAdmin , changeOrderStatus)