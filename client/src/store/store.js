import {configureStore} from '@reduxjs/toolkit'
import {selfHandler} from './slices/selfHandler.slice.js'
import {apiHandlingReducers} from './slices/apiResonseHandler.slice.js'
import {productsHandler} from './slices/productsHandler.slice.js'
import {orderHandlerSlice} from './slices/orderHandler.slice.js'
import {cartReducer} from './slices/cart.slice.js'
import { wishlistReducer } from './slices/wishlist.slice.js'


export const store = configureStore({
    reducer : {
        self : selfHandler,
        apiResponse : apiHandlingReducers,
        productsList : productsHandler,
        orders : orderHandlerSlice,
        cart : cartReducer,
        wishlist : wishlistReducer
    }
})