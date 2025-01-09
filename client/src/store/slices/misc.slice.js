import { createSlice } from "@reduxjs/toolkit";

export const miscSlice = createSlice({
    name : 'misc',
    initialState : {
        isCreateProductsFormOpen : false
    },
    reducers : {
        setIsCreateProductsFormOpen : (state, action) => {
            state.isCreateProductsFormOpen = action.payload
        }
    }
})

export const {setIsCreateProductsFormOpen} = miscSlice.actions
export const miscReducer = miscSlice.reducer

export const getMiscData = (state) => state.misc