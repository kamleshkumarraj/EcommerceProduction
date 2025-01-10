import { Router } from "express";

import { getTotalOrderByAdmin } from "../../controllers/orderHandleByAdmin/getTotalOrder.js";
import isLoggedIn from "../../middlewares/isLoggedIn.middleware.js";
import isAdmin from "../../middlewares/isAdmin.js";
import { getSingleOrderByAdmin } from "../../controllers/orderHandleByAdmin/getOrderOfAUser.js";
import { changeOrderStatus } from "../../controllers/orderHandleByAdmin/changeStatusOfOrder.js";
import { getTotalSales } from "../../controllers/admin/getTotalSales.controller.js";

export const orderHAndleByAdminRoute = Router();

orderHAndleByAdminRoute.route('/all-orders').get(isLoggedIn,isAdmin,getTotalOrderByAdmin)
orderHAndleByAdminRoute.route('/single-order/:id').get(isLoggedIn , isAdmin , getSingleOrderByAdmin)
orderHAndleByAdminRoute.route('/update-order-status').patch(isLoggedIn , isAdmin , changeOrderStatus)
orderHAndleByAdminRoute.route('/total-sales').get(isLoggedIn , isAdmin , getTotalSales)
