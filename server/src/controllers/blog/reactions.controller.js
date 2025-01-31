import mongoose from "mongoose";
import { asyncHandler } from "../../errors/asynHandler.js";
import { Comments } from "../../models/blog/comments.models.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { ReplyComments } from "../../models/blog/replyComment.model.js";

export const createComment = asyncHandler(async (req, res, next) => {
    const {blogId  , comment } = req.body;
    if(mongoose.isValidObjectId(blogId) == false){
        return next(new ErrorHandler("Please send valid blog id !",401));
    }
    await Comments.create({creator : req.user.id, blogId, comment})

    res.status(200).json({
        success : true,
        message : "Comment created successfully for blog",

    })
})

export const createReplyForComment = asyncHandler(async (req, res, next) => {
    const {commentId , replyMessage} = req.body;
    if(mongoose.isValidObjectId(commentId) == false){
        return next(new ErrorHandler("Please send valid blog id !",400));
    }

    await ReplyComments.create({commentId, reply : replyMessage, creator : req.user.id})

    res.status(200).json({
        success : true,
        message : "You create reply successfully for comment.",
    })
})