import express from 'express';
import ErrorHandler from './errors/errorHandler.js';
import { productsAdminHandleRoute } from './routes/admin/products.route.js';
import { authenticationRoute } from './routes/Authentication/auth.route.js';
import { adminHandleUserRoute } from './routes/admin/users.route.js';
import { handleUserProfileRoute } from './routes/userSelf/userHandleProfile.route.js';
import { productHandleByUser } from './routes/productsUserRoute/productHandleByUser.route.js';
import { orderHandlerRouter } from './routes/ordersRoute/order.route.js';
import { orderHAndleByAdminRoute } from './routes/admin/orderHandle.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { commonRouter } from './routes/common/common.routes.js';
import { cartRouter } from './routes/cart/cart.routes.js';
import { wishlistHandlingRoute } from './routes/wishlist/wishlist.routes.js';

export const app = express();

app.use(cookieParser())
app.use(
  express.json({
    limit : '1mb'
  }),
);


app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:5173'],  // Allow your frontend domain
  credentials: true                            // Allow cookies to be sent
}));

app.use('/api/v2/auth', authenticationRoute);
app.use('/api/v2/admin/products',productsAdminHandleRoute)
app.use('/api/v2/admin/user',adminHandleUserRoute)

app.use('/api/v2/user',handleUserProfileRoute)
app.use('/api/v2/user/product',productHandleByUser)
app.use('/api/v2/user/order',orderHandlerRouter)
app.use('/api/v2/admin/order',orderHAndleByAdminRoute)
app.use('/api/v2/user/cart' , cartRouter)
app.use('/api/v2/user/wishlist' , wishlistHandlingRoute)
//common routes for requesting users for handling the products
app.use('/api/v2/products/' , commonRouter)

//that is error handler middleware at normal error during api calling.
app.use((err,req , res , next) =>{
  err.status = err.status || 500;
  err.message = err.message || "Interval server error"
  // now e handle mongodb cast errors;
  if(err.name == 'castError'){
    new ErrorHandler(`Resources not found ${err.path}`,500)
  }
  res.status(err.status).json({
    success : false,
    message : err.message
  })
})

//now we handle promiseRejection erros.
