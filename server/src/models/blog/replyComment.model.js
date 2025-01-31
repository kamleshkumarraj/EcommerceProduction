import mongoose from 'mongoose';

const replyComment = new mongoose.Schema({
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments',
  },
  reply: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export const ReplyComments = mongoose.model('ReplyComments', replyComment);
