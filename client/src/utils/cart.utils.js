import { apiCalling } from "../api/apiCalling.api"
import { removeMultipleCartItems } from "../store/slices/cart.slice"
import getAllCart from "./getAllCartApiCall"

export const fetchRemoveMultipleCartItems = async ({dispatch , cartIdList}) => {
    dispatch(removeMultipleCartItems(cartIdList))
    const options = {
        url : "http://localhost:2000/api/v2/user/cart/remove-multiple",
        method : "DELETE",
        formData : cartIdList
    }

    const response = await dispatch(apiCalling(options))
    if(response?.success){
        console.log(response?.message || "Items deleted successfully !" )
    }else{
        console.log(response?.message || "Failed to delete items !" )
        getAllCart(dispatch)
    }
}