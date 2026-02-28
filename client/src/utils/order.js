import { toast } from "react-toastify";
import { apiCalling } from "../api/apiCalling.api";
import { setAllOrders } from "../store/slices/order.slice";

export const fetchOrder = async ({ dispatch }) => {
  const options = {
    url: "http://frontend-public-alb-628648030.ap-south-1.elb.amazonaws.com/api/v2/user/order/all-orders",
    method: "GET",
  };

  const response = await dispatch(apiCalling(options));
  if (response?.success) {
    console.log(response?.message || "Orders fetched successfully");
    dispatch(setAllOrders(response?.data?.reverse()));
  } else {
    console.log(response?.message || "Failed to fetch orders");
  }
};

export const fetchCreateOrder = async ({ dispatch, payload }) => {
  const options = {
    method: "POST",
    url: "http://frontend-public-alb-628648030.ap-south-1.elb.amazonaws.com/api/v2/user/order/create-order",
    formData: payload,
  };

  const response = await dispatch(apiCalling(options));
  if (response?.success) {
    toast.success(response?.message || "Order created successfully");
    fetchOrder({ dispatch });
  } else {
    toast.error(response?.message || "Failed to create order");
  }
};

export const fetchSingleOrder = async ({ dispatch, payload }) => {
  try {
    const options = {
      method: "GET",
      url: `http://frontend-public-alb-628648030.ap-south-1.elb.amazonaws.com/api/v2/user/order/single-order/${payload}`,
    };

    const response = await dispatch(apiCalling(options));
    if (response?.success) {
      return { data: response?.data, success: true };
    } else {
      toast.error(response?.message || "Failed to fetch single order");
      return { success: false, message: response?.message };
    }
  } catch (error) {
    toast.error(error || "We get error during fetching single order");
    return { success: false, message: error };
  }
};
