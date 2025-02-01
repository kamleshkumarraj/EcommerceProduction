import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:2000/api/v2",
  }),
  tagTypes: ["getAllBlogs", "createBlogs","getAllCommentsForBlog"],
  endpoints: (builder) => ({
    // all endpoint related from reactions for blogs and products-blogs.
    createComment: builder.mutation({
      query: (data) => ({
        url: "/user/reaction/create-comment",
        credentials: "include",
        method: "POST",
        body: data,
      }),
      invalidatesTags : ['getAllCommentsForBlog']
    }),

    createReactionForComments: builder.mutation({
      query: (data) => ({
        url: "user/reaction/create-reaction-comment",
        credentials: "include",
        method: "POST",
        body: data,
      }),
    }),

    createReactionForBlogs: builder.mutation({
      query: (data) => ({
        url: "/user/reaction/create-reaction-blog",
        credentials: "include",
        method: "POST",
        body: data,
      }),
    }),

    createReplyComment: builder.mutation({
      query: (data) => ({
        url: "/user/reaction/create-reply-comment",
        credentials: "include",
        method: "POST",
        body: data,
      }),
    }),

    getCommentForBlog: builder.query({
      query: (blogId) => ({
        url: `/user/reaction/get-comment-for-blog/${blogId}`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (res) => {
        return res.data;
      },
      providesTags : ['getAllCommentsForBlog']
    }),

    getReactionForBlog: builder.query({
      query: (blogId) => ({
        url: `/user/reaction/get-reaction-for-blog/${blogId}`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (res) => {
        return res.data;
      },
    }),

    getReactionForComment: builder.query({
      query: (commentId) => ({
        url: `/user/reaction/get-reaction-for-comment/${commentId}`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (res) => {
        return res.data;
      },
    }),

    // all api endpoint for products-blogs.
    createProductsBlogs: builder.mutation({
      query: (data) => ({
        url: "/user/products-blogs/create",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    getAllProductsBlogs: builder.query({
      query: () => ({
        url: `/user/products-blogs/get-all`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (res) => {
        return res.data;
      },
    }),

    getSingleProductsBlog: builder.query({
      query: (productBlogId) => ({
        url: `/user/products-blogs/single/${productBlogId}`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (res) => {
        return res?.data;
      },
    }),

    getMyCreatedProductsBlogs: builder.query({
      query: () => ({
        url: `/user/products-blogs/get-my-created-blog`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (res) => {
        return res?.data;
      },
    }),

    getCategoriesWiseProductsBlogs: builder.query({
      query: () => ({
        url: `/user/products-blogs/get/categories-wise`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (res) => {
        return res.data;
      },
    }),

    // all api calling endpoint related from blogs.
    createBlogs: builder.mutation({
      query: (data) => ({
        url: "/user/blog/create",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    getAllBlogs: builder.query({
      query: () => ({
        url: `/user/blog/get-all`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (res) => {
        return res.data;
      },
    }),

    getSingleBlog: builder.query({
      query: (blogId) => ({
        url: `/user/blog/single/${blogId}`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (res) => {
        return res?.data;
      },
    }),

    getMyCreatedBlogs: builder.query({
      query: () => ({
        url: `/user/blog/get-my-created-blog`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (res) => {
        return res?.data;
      },
    }),

    getCategoriesWiseBlogs: builder.query({
      query: () => ({
        url: `/user/blog/get-blogs-categories-wise`,
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
  useCreateCommentMutation,
  useCreateReactionForBlogsMutation,
  useCreateReactionForCommentsMutation,
  useCreateReplyCommentMutation,
  useLazyGetCommentForBlogQuery,
  useLazyGetReactionForBlogQuery,
  useLazyGetReactionForCommentQuery,
  useCreateProductsBlogsMutation,
  useGetAllProductsBlogsQuery,
  useLazyGetSingleProductsBlogQuery,
  useLazyGetCategoriesWiseProductsBlogsQuery,
  useLazyGetMyCreatedProductsBlogsQuery,
  useCreateBlogsMutation,
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useLazyGetCategoriesWiseBlogsQuery,
  useLazyGetMyCreatedBlogsQuery,
} = blogApi;
