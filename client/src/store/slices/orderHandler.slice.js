import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name : 'orders',
    initialState : {
        pending : [],
        active : [],
        delivered : [],
        cancelled : [],
        failed : [],
    },
    reducers : {
        setPendingOrders : (state , actions) => {
            state.pending.push(actions.payload)
        },
        setActiveOrders : (state , actions) => {
            state.active.push(actions.payload)
        },
        setDeliveredOrders : (state , actions) => {
            state.delivered.push(actions.payload)
        },
        setCancelledOrders : (state , actions) => {
            state.cancelled.push(actions.payload)
        },
        setFailedOrders : (state , actions) => {
            state.failed.push(actions.payload)
        }
    
    }
})

export const orderHandlerSlice = slice.reducer;
export const {setActiveOrders , setCancelledOrders , setDeliveredOrders , setPendingOrders , setFailedOrders} = slice.actions;

export const getAllOrders = (state) => state.orders