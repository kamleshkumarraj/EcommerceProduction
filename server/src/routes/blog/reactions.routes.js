import { Router } from 'express';
import {
  createComment,
  createReactionForBlog,
  createReactionForComments,
  createReplyForComment,
  getAllCommentsForBlog,
  getAllLikeAndCreatorForBlog,
  getReactionCreatorForComment,
} from '../../controllers/blog/reactions.controller.js';
import isLoggedIn from '../../middlewares/isLoggedIn.middleware.js';

export const reactionRouter = Router();

reactionRouter.use(isLoggedIn);
// creating route
reactionRouter.route('/create-comment').post(createComment);
reactionRouter.route('/create-reply-comment').post(createReplyForComment);
reactionRouter.route('/create-reaction-blog').post(createReactionForBlog);
reactionRouter
  .route('/create-reaction-comment')
  .post(createReactionForComments);

// getting route.
reactionRouter.route('/get-comment-for-blog/:id').get(getAllCommentsForBlog);
reactionRouter.route('/get-reaction-for-blog/:id').get(getAllLikeAndCreatorForBlog);
reactionRouter
  .route('/get-reaction-for-comment/:id')
  .get(getReactionCreatorForComment);
