import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:2000/api/v2",
  }),
  tagTypes: ["getAllProducts", "getAllProductsImages", "create-comment"],
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

    // all endpoint related from reactions for blogs and products-blogs.
    createComment : builder.mutation({
      query : (data) => ({
        url : "/user/reaction/create-comment",
        credentials : "include",
        method : "POST",
        body : data
      }),
    }),

    createReactionForComments : builder.mutation({
      query : (data) => ({
        url : "user/reaction/create-reaction-comment",
        credentials : "include",
        method : "POST",
        body : data
      }),
      
    }),

    createReactionForBlogs : builder.mutation({
      query : (data) => ({
        url : "/user/reaction/create-reaction-blog",
        credentials : "include",
        method : "POST",
        body : data
      })
    }),

    createReplyComment : builder.mutation({
      query : (data) => ({
        url : "/user/reaction/create-reply-comment",
        credentials : "include",
        method : "POST",
        body : data
      })
    }),

    getCommentForBlog : builder.query({
      query : (blogId) => ({
        url : `/user/reaction/get-comment-for-blog/${blogId}`,
        method : "GET",
        credentials : "include",

      }),
      transformResponse : (res) => {
        return res.data
      }
    }),

    getReactionForBlog : builder.query({
      query : (blogId) => ({
        url : `/user/reaction/get-reaction-for-blog/${blogId}`,
        method : "GET",
        credentials : "include"
      }),
      transformResponse : (res) => {
        return res.data
      }
    }),

    getReactionForComment : builder.query({
      query : (commentId) => ({
        url : `/user/reaction/get-reaction-for-comment/${commentId}`,
        method : "GET",
        credentials : "include"
      }),
      transformResponse : (res) => {
        return res.data
      }
    }),

    // all api endpoint for products-blogs.
    createProductsBlogs : builder.mutation({
      query : (data) => ({
        url : "/user/products-blogs/create",
        method : "POST",
        credentials : "include",
        body : data
      })
    })



  }),
});

export const {
  useGetUserTotalProductsQuery,
  useGetImagesForTotalProductsQuery,
  useCheckoutOrderMutation,
  useLazyGetRazorAPIKeyQuery,
  useCreateCommentMutation,
  useCreateReactionForBlogsMutation,
  useCreateReactionForCommentsMutation,
  useCreateReplyCommentMutation,
  useLazyGetCommentForBlogQuery,
  useLazyGetReactionForBlogQuery,
  useLazyGetReactionForCommentQuery
} = userApi;
