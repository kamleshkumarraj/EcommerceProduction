import mongoose from "mongoose";
import { asyncHandler } from "../../errors/asynHandler.js";
import { Comments } from "../../models/blog/comments.models.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { ReplyComments } from "../../models/blog/replyComment.model.js";
import { BlogReactions } from "../../models/blog/blogReactions.model.js";
import { CommentReactions } from "../../models/blog/commentReactions.model.js";

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

export const createReactionForBlog = asyncHandler(async (req, res, next) => {
    const {blogId , reactionType} = req.body;

    if(mongoose.isValidObjectId(blogId) == false){
        return next(new ErrorHandler("Please send valid blog id !",400));
    }

    const existReaction = await BlogReactions.findOne({blogId , creator : req.user.id});

    if(existReaction) {
        BlogReactions.updateOne({blogId , creator : req.user.id}, {$set : {reaction : reactionType}})
    }else {
        await BlogReactions.create({blogId , creator : req.user.id , reaction : reactionType})
    }

    res.status(200).json({
        success : true,
        message : "Reaction created successfully for blog.",
    })
})

export const createReactionForComments = asyncHandler(async (req, res, next) => {
    const {commentId , reactionType} = req.body;

    if(mongoose.isValidObjectId(commentId) == false){
        return next(new ErrorHandler("Please send valid comment id !",400));
    }

    const existReaction = await CommentReactions.findOne({commentId , creator : req.user.id});
    if(existReaction) {
        await CommentReactions.updateOne({commentId , creator : req.user.id}, {$set : {reaction : reactionType}})
    }else{
        await CommentReactions.create({commentId, creator : req.user.id, reaction : reactionType})
    }
})



