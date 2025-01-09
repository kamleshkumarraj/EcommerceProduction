import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:2000/api/v2/user/blog",
  }),
  tagTypes: ["getAllBlogs", "createBlogs"],
  endpoints: (builder) => ({
    createBlogs: builder.mutation({
      query: (blogData) => ({
        method: "POST",
        url: "/create",
        credentials: "include",
        body: blogData,
      }),
      invalidatesTags: ["getAllBlogs"],
    }),
    getAllBlogs: builder.query({
      query: () => ({
        url: "/get-all",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["getAllBlogs"],
      transformResponse : (response) => ({
        ...response,
        data : response?.data?.reverse()
      })
    }),
  }),
});

export const { useCreateBlogsMutation, useGetAllBlogsQuery } = blogApi;
