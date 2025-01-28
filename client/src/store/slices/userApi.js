import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:2000/api/v2",
  }),
  tagTypes: ["getAllProducts", "getAllProductsImages"],
  endpoints: (builder) => ({
    getUserTotalProducts: builder.query({
      query: () => ({
        url: "/common/products/all-products",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["getAllProducts"],
    }),
    getImagesForTotalProducts: builder.query({
      query: () => ({
        url: "/common/products/get-products-images",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["getAllProductsImages"],
      transformResponse: (res) => {
        return res.data;
      },
    }),
    checkoutOrder: builder.mutation({
      query: (data) => ({
        url: "/user/order/checkout",
        body: data,
        credentials: "include",
        method: "POST",
      }),
      transformResponse: (res) => {
        return res.data;
      },
    }),
    getRazorAPIKey: builder.query({
      query: () => ({
        url: "/user/order/get-razor-api-key",
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (res) => {
        return res.data;
      },
    }),
  }),
});

export const {
  useGetUserTotalProductsQuery,
  useGetImagesForTotalProductsQuery,
  useCheckoutOrderMutation,
  useLazyGetRazorAPIKeyQueryw
} = userApi;
