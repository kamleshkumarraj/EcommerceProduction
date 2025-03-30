import { apiCalling } from "../api/apiCalling.api";

export const fetchReviews = async ({ dispatch, productId }) => {
  const options = {
    url: `https://ecommerceproduction.onrender.com/api/v2/user/product/all-reviews/${productId}`,
    method: "GET",
  };
  const response = await dispatch(apiCalling(options));
  if (response?.success) {
    return { success: true, data: response?.data };
  } else {
    return { success: false, data: response?.message };
  }
};
