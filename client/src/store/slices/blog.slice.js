import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name : "blog",
    initialState : {
        latestBlog : []
    },
    reducers : {
        setLatestBlogs : (state , action) => {
            state.latestBlog = action.payload;
        },
     
    }
})

export const blogReducers = blogSlice.reducer;
export const {setLatestBlogs} = blogSlice.actions;
export const getLatestBlogs = (state) => state.blogs.latestBlog;
