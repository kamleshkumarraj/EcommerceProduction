import {createSlice} from '@reduxjs/toolkit'
import { findProduct } from '../../helper/helper'

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
        },
        updateSelectAddressStatus : (state , action) => {
            const prevAddr = findProduct(state.addressList , action.payload.prev_id)
            prevAddr.selectStatus = false;
            const currAddr = findProduct(state.addressList , action.payload.curr_id);
            currAddr.selectStatus = true;

        },
        resetCurrentAddressStatus : (state , action ) => {
            console.log(action.payload._id)
            const target = findProduct(state.addressList , action.payload._id);
            console.log(target)
            target['selectStatus'] = false;
        }

    }
})

export const addressHandlerReducer = addressSlice.reducer
export const {removeAddress , setAllAddress , updateAddress , updateSelectAddressStatus , resetCurrentAddressStatus} = addressSlice.actions;
export const getAllAddress = (state) => state?.address?.addressList || []
export const getSelectedAddress = (state) => state?.address?.addressList.find(address => address.selectStatus) || {}