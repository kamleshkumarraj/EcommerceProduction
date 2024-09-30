import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name : "products",
    initialState : {
        products : [],
        categories : [],
    },
    reducers : {
        setAllProducts : (state , action) => {
            state.products = action.payload
        },
        setAllCategories : (state , action) => {
            state.categories = action.payload
        }
    }
})

export const productsHandler = slice.reducer
export const {setAllProducts}  = slice.actions
export const getAllProducts = (state) => state