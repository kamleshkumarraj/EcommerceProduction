import { createRazorInstance } from '../../config/config.config.js';
import { asyncHandler } from '../../errors/asynHandler.js';
import ErrorHandler from '../../errors/errorHandler.js';
import { ordersModel } from '../../models/order.model.js';
import { productsModel } from '../../models/products.model.js';
import crypto from 'crypto'

export const createOrder = asyncHandler(async (req, res, next) => {
  const { orderItems } = req.body;
  req.body.user = req.user.id;
  const validateStock = async (product) => {
    const orderedProduct = await productsModel.findById(product.productId);
    orderedProduct.quantity -= product.quantity;
    await orderedProduct.save({ validateBeforeSave: false });
  };

  orderItems.forEach(async (order) => {
    validateStock(order);
  });

  const order = await ordersModel.create(req.body);

  res.status(200).json({
    success: true,
    message: 'Order created successfully',
    order,
  });
});

export const checkout = asyncHandler(async (req, res, next) => {
  const {orders } = req.body;
  const orderItemId = orders.orderItems.map((order) => order.productId);
  const amount = ordersModel.aggregate([
    { $match: { _id: { $in: orderItemId } } },
    { $group: {
      _id : "null",
      total : { $sum : "$price" }
    }},
    { $project: { total : 1 , _id : 0 } }
  ])
  
  console.log(amount)
  const options = {
    amount: 5000 * 100,
    currency: 'INR',
  };
  const instance = await createRazorInstance();
  const response = await instance.orders.create(options);

  return res.status(200).json({
    success: true,
    message: 'Order created successfully.',
    data: response,
  });
});

export const getRazorAPIKey = asyncHandler(async (req, res, next) => {
  const RAZOR_API_KEY = process.env.RAZOR_API_KEY;
  return res.status(200).json({
    message: 'You get successfully api key',
    success: true,
    data: RAZOR_API_KEY,
  });
});

export const verifyOrder = asyncHandler(async (req, res, next) => {
  const {razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  
  const sign = razorpay_order_id +"|"+razorpay_payment_id;

  const generated_signature = crypto.createHmac('sha256', process.env.RAZOR_API_SECRET).update(sign).digest('hex');

  if(generated_signature == razorpay_signature){
    const orderForDB = 
    req.redirect("http://localhost:5173/checkout/success")
  }

    

  return res.json({
    success : true,
    message : "Payment is verified."
  })
})
