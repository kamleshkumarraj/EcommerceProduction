
import { Router } from 'express';
import { deleteSingleOrder } from '../../controllers/ordercontroller/deleteSingleOrder.js';
import { getAllOrders } from '../../controllers/ordercontroller/getAllOrder.controller.js';
import { getSingleOrder } from '../../controllers/ordercontroller/getSingleOrder.controller.js';
import { checkout, createOrder } from '../../controllers/ordercontroller/orderCreate.controller.js';
import isLoggedIn from '../../middlewares/isLoggedIn.middleware.js';

export const orderHandlerRouter = Router();

orderHandlerRouter.post('/create-order',isLoggedIn,createOrder)
orderHandlerRouter.route('/single-order/:id').get(isLoggedIn,getSingleOrder)
orderHandlerRouter.route('/all-orders').get(isLoggedIn , getAllOrders)
orderHandlerRouter.route('/delete-single-order/:id').get(isLoggedIn,deleteSingleOrder) 
orderHandlerRouter.route('/checkout').post(isLoggedIn,checkout);
