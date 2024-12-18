import { createSlice } from "@reduxjs/toolkit";

 const wishlistSlice = createSlice({
    name : 'wishlist',
    initialState : {
        wishlistItems : []
    },
    reducers : {
        setAllWishlists : (state , action ) => {
            state.wishlistItems = action.payload
        },
        removeWishlistItems : (state , action) => {
            state.wishlistItems = state.wishlistItems.filter(({_id}) => action.payload._id != _id)
        },
        increaseWishlistQty : (state , action) => {
            state.wishlistItems = state.wishlistItems.map((item) => {
                if(item._id == action.payload._id){
                    return {...item , quantity : item.quantity + 1}
                }else return item
            })
        },
        decreasedWishlistQty : (state , action) => {
            state.wishlistItems = state.wishlistItems.map((item) => {
                if(item._id == action.payload._id){
                    return {...item , quantity : item.quantity - 1}
                }else return item
            }).filter((item) => item.quantity != 0)
        }
    }
})
export const wishlistReducer = wishlistSlice.reducer
export const getAllWishlistItems = (state) => state.wishlist.wishlistItems
export const {decreasedWishlistQty,
            increaseWishlistQty,
            removeWishlistItems,
            setAllWishlists} = wishlistSlice.actions