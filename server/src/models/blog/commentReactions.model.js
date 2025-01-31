import mongoose from 'mongoose';

const commentReactions = new mongoose.Schema({
    reaction: {
        type: String,
        required: true,
        enum : ['like' , 'dislike', 'none'],
        default : 'none'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
        required: true,
    },
});

export const CommentReactions = mongoose.model('CommentReactions', commentReactions);
