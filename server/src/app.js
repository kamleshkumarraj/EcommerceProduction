import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import ErrorHandler from './errors/errorHandler.js';
import { orderHAndleByAdminRoute } from './routes/admin/orderHandle.route.js';
import { productsAdminHandleRoute } from './routes/admin/products.route.js';
import { adminHandleUserRoute } from './routes/admin/users.route.js';
import { authenticationRoute } from './routes/Authentication/auth.route.js';
import { cartRouter } from './routes/cart/cart.routes.js';
import { commonRouter } from './routes/common/common.routes.js';
import { orderHandlerRouter } from './routes/ordersRoute/order.route.js';
import { productHandleByUser } from './routes/productsUserRoute/productHandleByUser.route.js';
import { addressHandlerRouter } from './routes/shippingAddress/address.routes.js';
import { handleUserProfileRoute } from './routes/userSelf/userHandleProfile.route.js';
import { wishlistHandlingRoute } from './routes/wishlist/wishlist.routes.js';
import { blogRouter } from './routes/blog/blog.routes.js';
import { productsBlogRouter } from './routes/blog/productsBlog.routes.js';
import { reactionRouter } from './routes/blog/reactions.routes.js';

export const app = express();

app.use(cookieParser())
app.use(
  express.json({
    limit : '1mb'
  }),
);


app.use(cors({
  origin: "*",  // Allow your frontend domain
  credentials: true                            // Allow cookies to be sent
}));

// health check route
app.get('/api/v2/health-check', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy!"
  });
})

//routes related from authentication
app.use('/api/v2/auth', authenticationRoute);

//routes related from admin panel
app.use('/api/v2/admin/user',adminHandleUserRoute)
app.use('/api/v2/admin/products',productsAdminHandleRoute)
app.use('/api/v2/admin/order',orderHAndleByAdminRoute)

// routes related from user panel
app.use('/api/v2/user/blog' , blogRouter)
app.use('/api/v2/user',handleUserProfileRoute)
app.use('/api/v2/user/product',productHandleByUser)
app.use('/api/v2/user/order',orderHandlerRouter)
app.use('/api/v2/user/cart' , cartRouter)
app.use('/api/v2/user/wishlist' , wishlistHandlingRoute)
app.use('/api/v2/user/address' , addressHandlerRouter)
app.use('/api/v2/user/products-blogs' , productsBlogRouter)
app.use('/api/v2/user/reaction' , reactionRouter)

// common routes for unknown user.
app.use('/api/v2/common/products' , commonRouter)


//that is error handler middleware at normal error during api calling.
app.use((err,req , res , next) =>{
  
  err.status = err.status || 500;
  err.message = err.message || "Interval server error"
  
  // now e handle mongodb cast errors;
  if(err.name == 'castError'){
    new ErrorHandler(`Resources not found ${err.path}`,500)
  }
  if(err?.code == "LIMIT_UNEXPECTED_FILE" && err?.field == "images") {
    err.message = "Maximum 3 files are allowed to uploading for images!"
    err.status = 400
  }
  if(err?.code == "LIMIT_UNEXPECTED_FILE" && err?.field == "thumbnail") {
    err.message = "Maximum 1 files are allowed to uploading for thumbnail !"
    err.status = 400
  }
  res.status(err.status).json({
    success : false,
    message : err.message
  })
})

//now we handle promiseRejection erros.
