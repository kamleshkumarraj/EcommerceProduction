import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name : 'order',
    initialState : {
        orders : [],
    },
    reducers : {
        setAllOrders : (state , action ) => {
            console.log(action.payload)
            state.orders = action.payload
        }
    }
})

export const orderHandlerReducer = orderSlice.reducer
export const {setAllOrders} = orderSlice.actions
export const getAllOrders = (state) => state.ordersList.orders