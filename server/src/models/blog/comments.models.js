import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blogs',
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    }
  },
  { timestamps: true },
);

export const Comments = mongoose.model('comments', commentSchema);
