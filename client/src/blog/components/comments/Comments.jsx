import { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaReply } from "react-icons/fa";
import { useLazyGetCommentForBlogQuery } from "../../../store/slices/userApi";
import { useParams } from "react-router-dom";

const CommentSection = () => {
  const [getCommentsData , {data : comments , isLoading : isCommentLoading , isError : isCommentError}] = useLazyGetCommentForBlogQuery();
  const blogId = useParams().blog_id

  useEffect(() => {
    getCommentsData(blogId)
  },[blogId])
  
  if(isCommentLoading) return <h1>Comment Data is Loading...</h1>
  if(isCommentError) return <h1> There was an error while fetching comments...</h1>
  
  return (
    <div className="max-w-2xl p-4 mx-auto">
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

const Comment = ({ comment }) => {
  const [likeCount, setLikeCount] = useState(
    comment.commentReactions.find((r) => r.reaction === "like")?.count || 0
  );
  const [dislikeCount, setDislikeCount] = useState(0);
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="p-2 border-b">
      <div className="flex items-center gap-2">
        <img
          src={comment.creatorDetails.avatar.url}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <span className="font-semibold">{comment.creatorDetails.creatorName}</span>
      </div>
      <p className="ml-10 text-gray-700">{comment.comment}</p>
      <div className="flex items-center gap-4 mt-2 ml-10 text-gray-500">
        <button onClick={() => setLikeCount(likeCount + 1)} className="flex items-center gap-1">
          <FaThumbsUp /> {likeCount}
        </button>
        <button onClick={() => setDislikeCount(dislikeCount + 1)} className="flex items-center gap-1">
          <FaThumbsDown /> {dislikeCount}
        </button>
        <button onClick={() => setShowReplies(!showReplies)} className="flex items-center gap-1">
          <FaReply /> Reply ({comment.replySize})
        </button>
      </div>
      {showReplies && (
        <div className="pl-4 mt-2 ml-10 border-l">
          {comment.replyComment.map((reply) => (
            <Reply key={reply._id} reply={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

const Reply = ({ reply }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2">
        <img
          src={reply.creatorDetails.avatar.url}
          alt="avatar"
          className="w-6 h-6 rounded-full"
        />
        <span className="text-sm font-semibold">{reply.creatorDetails.creatorName}</span>
      </div>
      <p className="ml-8 text-sm text-gray-700">{reply.reply}</p>
      <div className="flex items-center gap-4 ml-8 text-sm text-gray-500">
        <button onClick={() => setLikeCount(likeCount + 1)} className="flex items-center gap-1">
          <FaThumbsUp /> {likeCount}
        </button>
        <button onClick={() => setDislikeCount(dislikeCount + 1)} className="flex items-center gap-1">
          <FaThumbsDown /> {dislikeCount}
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
