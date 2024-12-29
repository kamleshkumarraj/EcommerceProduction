import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    blogId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'blogs',
        required : true
    },
    creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    },
    comment : {
        message : {
            type : [],
            required : true
        },
        reply : [{
           creator : {
               type : mongoose.Schema.Types.ObjectId,
               ref : 'users',
               required : true
           },
           message : {
            type : [],
            required : true
           }
        }]
    }
},{timestamps : true})

export const comments =mongoose.model('comments' , commentSchema)