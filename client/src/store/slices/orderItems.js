import { createSlice } from "@reduxjs/toolkit";
import { findProduct } from "../../helper/helper";


const orderedProductsSlice = createSlice({
    name : 'orderedProducts',
    initialState : {
        orderedProducts : []
    },
    reducers : {
        addProduct : (state , action) => {
            state.orderedProducts.push(action.payload)
        },
        removeProduct : (state , action) => {
            state.orderedProducts.filter(product => product._id != action.payload._id)
        },
        setOrderedProducts : (state , action) => {
            state.orderedProducts = action.payload
        },
        increaseOrderedProductsQty : (state , action) => {
            const targetProducts = findProduct(state.orderedProducts , action.payload._id);
            targetProducts.quantity += 1;
            
        },
        decreaseOrderedProductsQty : (state , action) => {
            const targetProducts = findProduct(state.orderedProducts , action.payload._id);
            targetProducts.quantity -= 1;
        },
        removeOrderedProductsQty : (state , action) => {
            state.orderedProducts = state.orderedProducts.filter(product => product._id != action.payload._id)
        },
        resetOrderProductsStore : (state , action) => {
            state.orderedProducts = [];
        }
    }
})

export const orderedProductsReducer = orderedProductsSlice.reducer
export const {addProduct , decreaseOrderedProductsQty , increaseOrderedProductsQty , removeOrderedProductsQty , removeProduct , resetOrderProductsStore , setOrderedProducts} = orderedProductsSlice.actions;

export const getAllOrderedProducts = (state) => state?.orderedProductsList?.orderedProducts || []