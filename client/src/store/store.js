import { configureStore } from "@reduxjs/toolkit";
import { selfHandler } from "./slices/selfHandler.slice.js";
import { apiHandlingReducers } from "./slices/apiResonseHandler.slice.js";
import { productsHandler } from "./slices/productsHandler.slice.js";
import { cartReducer } from "./slices/cart.slice.js";
import { wishlistReducer } from "./slices/wishlist.slice.js";
import { addressHandlerReducer } from "./slices/addressHandler.slice.js";
import { orderedProductsReducer } from "./slices/orderItems.js";
import { orderHandlerReducer } from "./slices/order.slice.js";
import { blogReducers } from "./slices/blog.slice.js";
import { adminApi } from "./slices/adminApi.js";
import { miscReducer } from "./slices/misc.slice.js";

export const store = configureStore({
  reducer: {
    self: selfHandler,
    apiResponse: apiHandlingReducers,
    productsList: productsHandler,
    ordersList: orderHandlerReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    address: addressHandlerReducer,
    orderedProductsList: orderedProductsReducer,
    blogs: blogReducers,
    misc: miscReducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(adminApi.middleware),
});
