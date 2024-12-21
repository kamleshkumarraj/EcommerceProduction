import { toast } from "react-toastify"
import { apiCalling } from "../api/apiCalling.api"
import { setAllOrders } from "../store/slices/order.slice"

export const fetchOrder = async ({dispatch}) => {
    const options = {
        url : "http://localhost:2000/api/v2/user/order/all-orders",
        method : "GET"
    }

    const response = await dispatch(apiCalling(options))
    if(response?.success){
        console.log(response?.message || "Orders fetched successfully")
        dispatch(setAllOrders(response?.data))
    }else{
        console.log(response?.message || "Failed to fetch orders")
    }
}

export const fetchCreateOrder = async ({dispatch , payload}) => {
    const options = {
        method : "POST",
        url : "http://localhost:2000/api/v2/user/order/create-order",
        formData : payload
    }

    const response = await dispatch(apiCalling(options))
    if(response?.success){
        toast.success(response?.message ||"Order created successfully")
        fetchOrder({dispatch})
    }else{
        toast.error(response?.message || "Failed to create order")
    }
}

