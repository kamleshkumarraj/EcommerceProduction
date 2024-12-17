import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name : 'cart',
    initialState : {
        cartItems : []
    },
    reducers : {
        setAllCarts : (state , action ) => {
            state.cartItems = action.payload
        },
        removeCartItems : (state , action) => {
            state.cartItems = state.cartItems.filter(({_id}) => action.payload._id != _id)
        },
        increaseCartQty : (state , action) => {
            state.cartItems = state.cartItems.map((item) => {
                if(item._id == action.payload._id){
                    return {...item , quantity : item.quantity + 1}
                }else return item
            })
        },
        decreasedCartQty : (state , action) => {
            state.cartItems = state.cartItems.map((item) => {
                if(item._id == action.payload._id){
                    return {...item , quantity : item.quantity - 1}
                }else return item
            }).filter((item) => item.quantity != 0)
        }
    }
})

export const getAllCartItems = (state) => state.cart.cartItems