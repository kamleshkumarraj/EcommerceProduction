import { toast } from "react-toastify";
import { apiCalling } from "../api/apiCalling.api";
import { decreasedWishlistQty, increaseWishlistQty, setAllWishlists , removeWishlistItems } from "../store/slices/wishlist.slice";

 export async function fetchAllWishlistItem( dispatch) {
    const options = {
      url: `http://localhost:2000/api/v2/user/wishlist/get`,
      method: "GET",
    };
    const response = await dispatch(apiCalling(options));
    if (response?.success) {
      dispatch(setAllWishlists(response?.data.reverse()));
    } else {
      console.log("We get error during fetching wishlist item from database !");
    }
    
  }

export async function updateWishlistQty(dispatch , wishlistItem , operation) {
    if(operation != 'increase' && operation != 'decrease') return;
    if(operation == 'increase') dispatch(increaseWishlistQty({_id : wishlistItem._id}))
    if(operation == 'decrease') dispatch(decreasedWishlistQty({_id : wishlistItem._id}))

    const options = {
        url : `http://localhost:2000/api/v2/user/wishlist/update/${wishlistItem._id}?operation=${operation}`,
        method : "PATCH"
    }

    const response = await dispatch(apiCalling(options))
    if(response?.success){
        toast.success(response?.message || "Wishlist item quantity updated successfully")
    }else{
        toast.error(response?.message || "Error while updating wishlist item quantity")
        fetchAllWishlistItem(dispatch)
    }

  }

export async function removeWishlistItem(dispatch , wishlistItem ){
    dispatch(removeWishlistItems({_id : wishlistItem._id}))
    const options = {
      url : `http://localhost:2000/api/v2/user/wishlist/remove/${wishlistItem._id}`,
      method : 'DELETE'
    }
    const response = await dispatch(apiCalling(options))
    if(response?.success){
        toast.success(response?.message || "Wishlist item removed successfully")
    }else{
      toast.error(response?.message || "Error while removing wishlist item")
      fetchAllWishlistItem(dispatch)
    }
}

export async function addWishlistItem(dispatch , product){
  const options = {
    url : `http://localhost:2000/api/v2/user/wishlist/add/${product._id}`,
    method : 'POST'
  }
  const response = await dispatch(apiCalling(options))
  if(response?.success){
    toast.success(response?.message || "Product added to wishlist successfully")
    fetchAllWishlistItem(dispatch)
  }else{
    toast.error(response?.message || "Error while adding product to wishlist")
  }
}
