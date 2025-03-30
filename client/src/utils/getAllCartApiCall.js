import { apiCalling } from "../api/apiCalling.api";
import { setAllCarts } from "../store/slices/cart.slice";

async function getAllCart(dispatch) {
  const options = {
    url: `https://ecommerceproduction.onrender.com/api/v2/user/cart/get`,
    method: "GET",
  };
  const response = await dispatch(apiCalling(options));
  if (response?.success) {
    dispatch(setAllCarts(response?.data.reverse()));
  } else {
    console.log("We get error during fetching carts item from database !");
  }
}

export default getAllCart;
