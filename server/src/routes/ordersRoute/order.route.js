
import { Router } from 'express';
import { createOrder } from '../../controllers/ordercontroller/orderCreate.controller.js';
import isLoggedIn from '../../middlewares/isLoggedIn.middleware.js';
import { validateAvailability } from '../../middlewares/orders/validateQuantity.js';
import { getSingleOrder } from '../../controllers/ordercontroller/getSingleOrder.controller.js';
import { getAllOrders } from '../../controllers/ordercontroller/getAllOrder.controller.js';
import { deleteSingleOrder } from '../../controllers/ordercontroller/deleteSingleOrder.js';

export const orderHandlerRouter = Router();

orderHandlerRouter.post('/create-order',isLoggedIn,validateAvailability,createOrder)
orderHandlerRouter.route('/single-order/:id').get(isLoggedIn,getSingleOrder)
orderHandlerRouter.route('/all-orders').get(isLoggedIn , getAllOrders)
orderHandlerRouter.route('/delete-single-order/:id').get(isLoggedIn,deleteSingleOrder) 
