import mongoose from 'mongoose';
import { asyncHandler } from '../../errors/asynHandler.js';
import { Comments } from '../../models/blog/comments.models.js';
import ErrorHandler from '../../errors/errorHandler.js';
import { ReplyComments } from '../../models/blog/replyComment.model.js';
import { BlogReactions } from '../../models/blog/blogReactions.model.js';
import { CommentReactions } from '../../models/blog/commentReactions.model.js';

export const createComment = asyncHandler(async (req, res, next) => {
  const { blogId, comment } = req.body;
  if (mongoose.isValidObjectId(blogId) == false) {
    return next(new ErrorHandler('Please send valid blog id !', 401));
  }
  await Comments.create({ creator: req.user.id, blogId, comment });

  res.status(200).json({
    success: true,
    message: 'Comment created successfully for blog',
  });
});

export const createReplyForComment = asyncHandler(async (req, res, next) => {
  const { commentId, replyMessage } = req.body;
  if (mongoose.isValidObjectId(commentId) == false) {
    return next(new ErrorHandler('Please send valid blog id !', 400));
  }

  await ReplyComments.create({
    commentId,
    reply: replyMessage,
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
    BlogReactions.updateOne(
      { blogId, creator: req.user.id },
      { $set: { reaction: reactionType } },
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
  },
);

export const getAllLikeAndCreatorForBlog = asyncHandler(
  async (req, res, next) => {
    const { id: blogId } = req.params;

    if (mongoose.isValidObjectId(blogId) == false)
      return next(new ErrorHandler('Please send valid blog id !', 400));

    const blogReactions = await BlogReactions.aggregate([
      {
        $match: { blogId },
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
          _id: '$reactions',
          count: { $sum: 1 },
          creator: { $push: '$creatorDetails' },
        },
      },
      {
        $project: {
          creatorDetails: 1,
          creator: 1,
          reaction: '$_id',
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

  const commentData = await Comments.aggregate([
    { $match: { blogId } },
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
      $lookup: {
        from: 'replycomments',
        localField: '_id',
        foreignField: 'commentId',
        as: 'replyComment',
        pipeline: [
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
            $lookup: {
              from: 'commentReactions',
              foreignField: 'commentId',
              localField: '_id',
              as: 'replyReactions',
              pipeline: [
                {
                  $group: {
                    _id: '$reaction',
                    count: { $sum: 1 },
                  },
                },
                {
                  $project: {
                    reaction: '$_id',
                    count: { $sum: 1 },
                  },
                },
              ],
            },
          },
          {
            $unwind: '$creatorDetails',
          },
          {
            $project: {
              creatorDetails: 1,
              reply: 1,
              _id: 1,
              replyReactions: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: '$creatorDetails',
    },
    // now we find like count for a comment.
    {
      $lookup: {
        from: 'commentReactions',
        localField: '_id',
        foreignField: 'commentId',
        as: 'commentReactions',
        pipeline: [
          {
            $group: {
              _id: '$reaction',
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              reaction: '$_id',
              count: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        creatorDetails: 1,
        comment: 1,
        replyComment: 1,
        replySize: { $size: '$replyComment' },
        commentReactions: 1,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ]);

  return res.status(200).json({
    success: false,
    message: 'You get all comments for blog successfully.',
    data: commentData,
  });
});


