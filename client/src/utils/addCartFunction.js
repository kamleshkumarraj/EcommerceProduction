import { toast } from "react-toastify";
import { apiCalling } from "../api/apiCalling.api";
import getAllCart from "./getAllCartApiCall";

export const addToCart = async (
  _id,
  dispatch,
  user,
  setEventLoading,
  navigate
) => {
  if (!user) {
    toast.error("Please login to access this resources !");
    navigate("/login");
    return;
  }
  setEventLoading(true);
  const options = {
    url: `https://ecommerceproduction.onrender.com/api/v2/user/cart/add/${_id}`,
    method: "POST",
  };
  const response = await dispatch(apiCalling(options));
  if (response?.success) {
    toast.success("Product added to cart successfully");
    getAllCart(dispatch, user);
  } else {
    toast.error("Failed to add product to cart !");
  }
  setEventLoading(false);
};

export const removeToCart = async (
  cart,
  dispatch,
  user,
  setEventLoading,
  navigate
) => {
  if (!user) {
    toast.error("Please login to access this resources !");
    navigate("/login");
    return;
  }
  setEventLoading(true);
  const options = {
    url: `https://ecommerceproduction.onrender.com/api/v2/user/cart/remove/${cart._id}`,
    method: "DELETE",
  };
  const response = await dispatch(apiCalling(options));
  if (response?.success) {
    toast.success("Product removed from cart successfully");
    getAllCart(dispatch, user);
  } else {
    toast.error("Failed to remove product from cart !");
  }
  setEventLoading(false);
};
