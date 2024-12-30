import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name : "blog",
    initialState : {
        totalBlog : [],
        mySavedBlogs : [],
        myLikedBlogs : [],
        myCreatedBlogs : []
    },
    reducers : {
        setAllBlogs : (state , action) => {
            state.totalBlog = action.payload;
        },
        setMySavedBlogs : (state , action) => {
            state.mySavedBlogs = action.payload;
        },
        setMyLikedBlogs : (state , action) => {
            state.myLikedBlogs = action.payload;
        },
        setMyCreatedBlogs : (state , action) => {
            state.myCreatedBlogs = action.payload;
        }
    }
})

export const blogReducers = blogSlice.reducer;
export const {setAllBlogs , setMyCreatedBlogs , setMyLikedBlogs , setMySavedBlogs} = blogSlice.actions;
export const getAllBlogs = (state) => state.blogs.totalBlog;
export const getMySavedBlogs = (state) => state.blogs.mySavedBlogs;
export const getMyLikedBlogs = (state) => state.blogs.myLikedBlogs;
export const getMyCreatedBlogs = (state) => state.blogs.myCreatedBlogs;