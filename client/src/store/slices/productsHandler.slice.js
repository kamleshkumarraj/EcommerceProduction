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
export const {setAllProducts , setAllCategories}  = slice.actions
export const getAllProducts = (state) => state.productsList.products;
export const getAllCategories = (state) => state.productsList.categories;