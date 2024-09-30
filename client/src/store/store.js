import {configureStore} from '@reduxjs/toolkit'
import { selfHandler } from './slices/selfHandler.slice.js'
import { apiHandlingReducers } from './slices/apiResonseHandler.slice.js'
import { productsHandler } from './slices/productsHandler.slice.js'


export const store = configureStore({
    reducer : {
        self : selfHandler,
        apiResponse : apiHandlingReducers,
        productsList : productsHandler
    }
})