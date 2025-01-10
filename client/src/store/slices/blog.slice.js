import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name : "blog",
    initialState : {
        latestBlog : [],
        realtimeNewBlog : [],
    },
    reducers : {
        setLatestBlogs : (state , action) => {
            state.latestBlog = action.payload;
        },
        setRealtimeNewBlog : (state , action) => {
            state.realtimeNewBlog = action.payload;
        }
    }
})

export const blogReducers = blogSlice.reducer;
export const {setLatestBlogs , setRealtimeNewBlog} = blogSlice.actions;

export const getLatestBlogs = (state) => state.blogs.latestBlog;
export const getRealtimeNewBlog = (state) => state.blogs.realtimeNewBlog;
