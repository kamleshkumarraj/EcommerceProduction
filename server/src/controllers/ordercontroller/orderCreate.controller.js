import mongoose from 'mongoose';
import { createRazorInstance } from '../../config/config.config.js';
import { asyncHandler } from '../../errors/asynHandler.js';
import ErrorHandler from '../../errors/errorHandler.js';
import { ordersModel } from '../../models/order.model.js';
import { productsModel } from '../../models/products.model.js';
import crypto from 'crypto';
import fs from 'fs/promises'

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
  const order = req.body;
  // console.log(payload)
  const orderItemId = order.orderItems.map(
    (order) => new mongoose.Types.ObjectId(order.productId),
  );

  const amount = await productsModel.aggregate([
    { $match: { _id: { $in: orderItemId } } },
    
    {
      $project: {
        _id: 0,
        price : 1,
      },
    },
  ]);

  const price = amount.reduce((acc , {price}, idx) => {
    console.log(idx)
    acc += price * order?.orderItems[idx]?.quantity 
    return acc;
  },0);

  const taxPrice = price * 0.018;
  const totalPrice = price + taxPrice;

  const options = {
    amount: Math.round(totalPrice) * 100,
    currency: 'INR',
  };
  const instance = await createRazorInstance();
  const response = await instance.orders.create(options);

  console.log(response)

  await fs.writeFile('log.json', [JSON.stringify(response) , JSON.stringify(order)] , {encoding : 'utf-8'});
  // if(response.status == "created"){
  //   const orders = await ordersModel.create({shippingPrice : 0, totalPrice : totalPrice, taxPrice : taxPrice})
  // }

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
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const sign = razorpay_order_id + '|' + razorpay_payment_id;

  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZOR_API_SECRET)
    .update(sign)
    .digest('hex');

  if (generated_signature == razorpay_signature) {
    const orderForDB = req.redirect('http://localhost:5173/checkout/success');
  }

  return res.json({
    success: true,
    message: 'Payment is verified.',
  });
});
