import mongoose from "mongoose";

const blogReactions = new mongoose.Schema({
    reaction: {
        type: String,
        required: true,
        enum: ['like' , 'dislike'],
        
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    blogId : {
        type : mongoose.Types.ObjectId,
        ref : "blogs",
        required : true,
    }
    
});

export const BlogReactions = mongoose.model('BlogReactions', blogReactions);

