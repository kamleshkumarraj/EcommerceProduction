import {createSlice} from '@reduxjs/toolkit'

const addressSlice = createSlice({
    name : 'address',
    initialState : {
        addressList : [],
    },
    reducers : {
        setAllAddress : (state , action) => {
            state.addressList = action.payload
        },
        removeAddress : (state , action) => {
            state.addressList.filter(address => address._id != action.payload._id)
        },
        updateAddress : (state , action) => {
            
            const addressUpdatable = state.addressList.find(address => address._id == action.payload._id)
            Object.keys(action.payload.address).map((key) => {
                addressUpdatable[key] = action.payload.address[key]
            })
        }

    }
})

export const addressHandlerReducer = addressSlice.reducer
export const {removeAddress , setAllAddress , updateAddress} = addressSlice.actions;
export const getAllAddress = (state) => state?.address?.addressList || []