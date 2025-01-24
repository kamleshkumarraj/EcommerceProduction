import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:2000/api/v2/admin",
  }),
  tagTypes: ["getSalesData", "getUsersData", "getProductsData", "getOrdersData", "getSingleOrdersData"],

  endpoints: (builder) => ({
    getAllSalesData: builder.query({
      query: () => ({
        url: "/order/total-sales",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["getSalesData"],
    }),

    getTotalUsers: builder.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response) => {
        console.log(response)
        return {
          ...response,
          data: {
            ...response?.data,
            users: response?.data?.users?.reverse(),
          },
        };
      },
      providesTags: ["getUsersData"],
    }),

    getTotalProducts: builder.query({
      query: () => ({
        url: "/products/",
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response) => ({
        ...response,
        data: {
          ...response?.data,
          products: response?.data?.products?.reverse(),
        },
      }),
      providesTags: ["getProductsData"],
    }),

    getTotalOrdersData : builder.query({
      query: () => ({
        url: "/order/all-orders",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["getOrdersData"],
    }),

    createProducts : builder.mutation({
      query : (productsData) => ({
        url : "/products/create-product",
        method : "POST",
        credentials : "include",
        body : productsData,
      }),
      invalidatesTags : ['getProductsData']
    }),

    updateOrderStatus : builder.mutation({
      query : ({orderId , status}) => ({
        url : `/order/update-order-status?orderId=${orderId}&status=${status}` ,
        method : "PATCH",
        credentials : "include",
      }),
    }),

    getAllProductsCategoriesWise : builder.query({
      query : () => ({
        url : "/products/get-categories-wise-products",
        method : "GET",
        credentials : "include"
      }),
      providesTags : ["getProductsData"],
    }),
    
    deleteSingleProducts : builder.mutation({
      query : (productId) => ({
        url : `/products/${productId}`,
        method : "DELETE",
        credentials : "include"
      }),
    })
  }),
});

export const {
  useGetAllSalesDataQuery,
  useGetTotalUsersQuery,
  useGetTotalProductsQuery,
  useCreateProductsMutation,
  useGetTotalOrdersDataQuery,
  useUpdateOrderStatusMutation,
  useGetAllProductsCategoriesWiseQuery,
  useDeleteSingleProductsMutation
} = adminApi;
