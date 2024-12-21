import { toast } from "react-toastify"
import { apiCalling } from "../api/apiCalling.api"
import { removeAddress, setAllAddress, updateAddress, updateSelectAddressStatus } from "../store/slices/addressHandler.slice"

export const fetchAllAddress = async (dispatch) => {
    const options = {
        url : "http://localhost:2000/api/v2/user/address/get",
        method : "GET",
    }
    const response = await dispatch(apiCalling(options))
    if(response?.success){
        dispatch(setAllAddress(response?.data))
    }else{
        console.log("We get error while fetching all address from database !")
    }
}

export const fetchRemoveAddress = async (dispatch , _id) => {
    dispatch(removeAddress({_id}))
    const options = {
        url : `http://localhost:2000/api/v2/user/address/remove/${_id}`,
        method : "DELETE",
    }
    const response = await dispatch(apiCalling(options))
    if(response?.success){
        toast.success(response?.message || "Address removed successfully !") 
    }else{
        toast.error(response?.message || "We get error while removing address from database !")
        fetchAllAddress(dispatch)
    }
}

export const fetchUpdateAddress = async ({dispatch , address , _id}) => {
    dispatch(updateAddress({_id , address}))
    console.log(address)
    const options = {
        method : "PATCH",
        url : `http://localhost:2000/api/v2/user/address/update/${_id}`,
        formData : address
    }
    const response = await dispatch(apiCalling(options))
    if(response?.success){
        toast.success(response?.message || "Address updated successfully !") 
    }else{
        toast.error(response?.message || "We get error while updating address from database !")
        fetchAllAddress(dispatch)
    }

}

export const fetchAddAddress = async (dispatch , address) => {
    const options = {
        method : "POST",
        url : "http://localhost:2000/api/v2/user/address/add",
        formData : address
    }
    const response = await dispatch(apiCalling(options))
    if(response?.success){
        toast.success(response?.message || "Address added successfully !") 
        fetchAllAddress(dispatch)
    }else{
        toast.error(response?.message || "We get error while adding address to database !")
    }
}

export const fetchUpdateSelectedAddress = async ({dispatch , prevAddr , currAddr}) => {
    if(!prevAddr?._id || !currAddr?._id) return
    if(prevAddr._id == currAddr?._id) return
    dispatch(updateSelectAddressStatus({prev_id : prevAddr._id , curr_id : currAddr._id}))

    const options = {
        url : `http://localhost:2000/api/v2/user/address/update-status/${prevAddr._id}/${currAddr._id}`,
        method : "PATCH"
    }

    const response = await dispatch(apiCalling(options))

    if(response?.success){
        toast.success(response?.message || "Selected address updated successfully !") 
    }else{
        toast.error(response?.message || "We get error while updating selected address from database !")
        fetchAllAddress(dispatch)
    }
}