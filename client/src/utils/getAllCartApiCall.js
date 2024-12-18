import { apiCalling } from "../api/apiCalling.api";
import { setAllCarts } from "../store/slices/cart.slice";

async function getAllCart( dispatch , user) {
    const options = {
      url: `http://localhost:2000/api/v2/user/cart/get/${user._id}`,
      method: "GET",
    };
    const response = await dispatch(apiCalling(options));
    if (response?.success) {
      dispatch(setAllCarts(response?.data));
    } else {
      console.log("We get error during fetching carts item from database !");
    }
    
  }

  export default getAllCart