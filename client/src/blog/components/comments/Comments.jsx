import { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaReply } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useLazyGetCommentForBlogQuery } from "../../../store/slices/blogApi";

const CommentSection = () => {
  const [getCommentsData , {data : comments , isLoading : isCommentLoading , isError : isCommentError}] = useLazyGetCommentForBlogQuery();
  const blogId = useParams().blog_id;

  useEffect(() => {
    getCommentsData(blogId);
  }, [blogId]);
  
  if (isCommentLoading) return <h1 className="text-[1.8rem] text-gray-400">Comment Data is Loading...</h1>;
  if (isCommentError) return <h1 className="text-[1.8rem] text-red-500">There was an error while fetching comments...</h1>;
  
  return (
    <div className="max-w-[100rem] p-4 mx-auto text-white bg-gray-900 rounded-lg">
      {comments && comments.length > 0 && comments.map((comment) => (
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
    <div className="p-4 border-b border-gray-700">
      <div className="flex items-center gap-4">
        <img
          src={comment.creatorDetails.avatar.url}
          alt="avatar"
          className="border-blue-500 rounded-full h-14 borer-2 w-14"
        />
        <span className="text-[2rem] font-semibold text-blue-400">{comment.creatorDetails.creatorName}</span>
      </div>
      <p className="text-gray-300 ml-14 text-[1.7rem] font-[500]">{comment.comment}</p>
      <div className="flex items-center gap-6 mt-2 text-gray-400 ml-14">
        <button onClick={() => setLikeCount(likeCount + 1)} className="flex items-center gap-2 hover:text-green-400">
          <FaThumbsUp /> {likeCount}
        </button>
        <button onClick={() => setDislikeCount(dislikeCount + 1)} className="flex items-center gap-2 hover:text-red-400">
          <FaThumbsDown /> {dislikeCount}
        </button>
        <button onClick={() => setShowReplies(!showReplies)} className="flex items-center gap-2 hover:text-yellow-400">
          <FaReply /> Reply ({comment.replySize})
        </button>
      </div>
      {showReplies && (
        <div className="pl-6 mt-2 border-l border-gray-700 ml-14">
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
      <div className="flex items-center gap-4">
        <img
          src={reply.creatorDetails.avatar.url}
          alt="avatar"
          className="w-12 h-12 border-2 border-purple-500 rounded-full"
        />
        <span className="text-[1.6rem] font-semibold text-purple-400">{reply.creatorDetails.creatorName}</span>
      </div>
      <p className="text-[1.5rem] text-gray-300 ml-14">{reply.reply}</p>
      <div className="flex items-center gap-6 text-sm text-gray-400 ml-14">
        <button onClick={() => setLikeCount(likeCount + 1)} className="flex items-center gap-2 hover:text-green-400">
          <FaThumbsUp /> {likeCount}
        </button>
        <button onClick={() => setDislikeCount(dislikeCount + 1)} className="flex items-center gap-2 hover:text-red-400">
          <FaThumbsDown /> {dislikeCount}
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
