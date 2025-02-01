import mongoose from 'mongoose';
import { asyncHandler } from '../../errors/asynHandler.js';
import { Comments } from '../../models/blog/comments.models.js';
import ErrorHandler from '../../errors/errorHandler.js';
import { ReplyComments } from '../../models/blog/replyComment.model.js';
import { BlogReactions } from '../../models/blog/blogReactions.model.js';
import { CommentReactions } from '../../models/blog/commentReactions.model.js';
import { commentFindQuery } from '../../helper/helper.js';

export const createComment = asyncHandler(async (req, res, next) => {
  const { blogId, comment } = req.body;
  if (mongoose.isValidObjectId(blogId) == false) {
    return next(new ErrorHandler('Please send valid blog id !', 401));
  }
  await Comments.create({ creator: req?.user?.id, blogId, comment });

  res.status(200).json({
    success: true,
    message: 'Comment created successfully for blog',
  });
});

export const createReplyForComment = asyncHandler(async (req, res, next) => {
  const { commentId, reply } = req.body;
  if (mongoose.isValidObjectId(commentId) == false) {
    return next(new ErrorHandler('Please send valid blog id !', 400));
  }

  await ReplyComments.create({
    commentId,
    reply,
    creator: req.user.id,
  });

  res.status(200).json({
    success: true,
    message: 'You create reply successfully for comment.',
  });
});

export const createReactionForBlog = asyncHandler(async (req, res, next) => {
  const { blogId, reactionType } = req.body;

  if (mongoose.isValidObjectId(blogId) == false) {
    return next(new ErrorHandler('Please send valid blog id !', 400));
  }

  const existReaction = await BlogReactions.findOne({
    blogId,
    creator: req.user.id,
  });

  if (existReaction) {
    await BlogReactions.updateOne(
      { blogId, creator: req.user.id },
      { $set: { reaction: reactionType } },
      {
        runValidators: true,
      },
    );
  } else {
    await BlogReactions.create({
      blogId,
      creator: req.user.id,
      reaction: reactionType,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Reaction created successfully for blog.',
  });
});

export const createReactionForComments = asyncHandler(
  async (req, res, next) => {
    const { commentId, reactionType } = req.body;

    if (mongoose.isValidObjectId(commentId) == false) {
      return next(new ErrorHandler('Please send valid comment id !', 400));
    }

    const existReaction = await CommentReactions.findOne({
      commentId,
      creator: req.user.id,
    });
    if (existReaction) {
      await CommentReactions.updateOne(
        { commentId, creator: req.user.id },
        { $set: { reaction: reactionType } },
      );
    } else {
      await CommentReactions.create({
        commentId,
        creator: req.user.id,
        reaction: reactionType,
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Reaction created successfully for comment.',
    })
  },
);

export const getAllLikeAndCreatorForBlog = asyncHandler(
  async (req, res, next) => {
    const { id: blogId } = req.params;

    if (mongoose.isValidObjectId(blogId) == false)
      return next(new ErrorHandler('Please send valid blog id !', 400));

    const blogReactions = await BlogReactions.aggregate([
      {
        $match: { blogId : new mongoose.Types.ObjectId(blogId) },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'creator',
          foreignField: '_id',
          as: 'creatorDetails',
          pipeline: [
            {
              $project: {
                creatorName: { $concat: ['$firstname', ' ', '$lastname'] },
                avatar: 1,
                username: 1,
                email: 1,
                _id: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: '$creatorDetails',
      },
      {
        $group: {
          _id: '$reaction',
          count: { $sum: 1 },
          creator: { $push: '$creatorDetails' },
        },
      },
      {
        $project: {
          count : 1,
          creator: 1,
          reaction: '$_id',
          _id : 0
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: 'We get all like and creator for blog successfully.',
      data: blogReactions,
    });
  },
);

export const getAllCommentsForBlog = asyncHandler(async (req, res, next) => {
  const { id: blogId } = req.params;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;


  const commentData = await Comments.aggregate(
    commentFindQuery({matchQuery : { blogId  : new mongoose.Types.ObjectId(blogId)}, skip, limit, userId: req.user.id})
  );

  return res.status(200).json({
    success: false,
    message: 'You get all comments for blog successfully.',
    data: commentData,
  });
});


export const getReactionCreatorForComment = asyncHandler(
  async (req, res, next) => {
    const { id: commentId } = req.params;
    if (mongoose.isValidObjectId(commentId) == false) {
      return next(new ErrorHandler('Please send valid comment id !', 400));
    }
    const likeCreatorForComments = await CommentReactions.aggregate([
      {
        $match: { commentId : new mongoose.Types.ObjectId(commentId) },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'creator',
          foreignField: '_id',
          as: 'creatorDetails',
          pipeline: [
            {
              $project: {
                creatorName: { $concat: ['$firstname', ' ', '$lastname'] },
                avatar: 1,
                username: 1,
                email: 1,
                _id: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: '$creatorDetails',
      },
      {
        $group: {
          _id: '$reaction',
          count: { $sum: 1 },
          creator: { $push: '$creatorDetails' },
        },
      },
      {
        $project: {
          reaction: '$_id',
          creator: 1,
          count: 1,
          _id : 0
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: 'You get all like creator for comment successfully.',
      data: likeCreatorForComments,
    });
  },
);

// helper controller for socket.
export const getSingleComment = async (commentId) => {
  try {
    const [commentData] = await Comments.aggregate(
      commentFindQuery({matchQuery : {_id : new mongoose.Types.ObjectId(commentId)}, skip: 0, limit: 1})
    )
    return {success: true, commentData};
  } catch (error) {
    return {success : false, commentData : error};
  }
}