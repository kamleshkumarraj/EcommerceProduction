import { useCallback, useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaReply } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  useCreateCommentMutation,
  useLazyGetCommentForBlogQuery,
} from "../../../store/slices/blogApi";
import styles from "./comments.module.css";
import { useSelector } from "react-redux";
import { getSelf } from "../../../store/slices/selfHandler.slice";
import { toast } from "react-toastify";
import { toastUpdate } from "../../../helper/helper";
import { useSocket } from "../../../contexts/Socket";
import { useHandleSocket } from "../../../hooks/useHandleSocket";
import { JOIN_ROOM_FOR_BLOG, LEAVE_ROOM_FOR_BLOG, NEW_COMMENT_ADDED } from "../../../events";

const CommentSection = () => {
  
  let [
    getCommentsData,
    { data: comments, isLoading: isCommentLoading, isError: isCommentError },
  ] = useLazyGetCommentForBlogQuery();
  const blogId = useParams().blog_id;
  const user = useSelector(getSelf);
  const [commentMessage, setCommentMessage] = useState("");
  const status = user?.firstname ? "authenticated" : "unauthenticated";
  const [createComment] = useCreateCommentMutation();
  const socket = useSocket();
  let commentData = [];
  const [realTimeComment , setRealTimeComments] = useState([]);
  
  useEffect(() => {
    getCommentsData(blogId);
  }, [blogId]);

  // code for join room for getting comment and after leave the page we remove from room.
  useEffect(() => {
    socket.emit(JOIN_ROOM_FOR_BLOG, blogId)

    return () => {
      socket.emit(LEAVE_ROOM_FOR_BLOG, blogId);
      socket.off()
    }
  },[blogId])

  // const sendComment = async () => {
  //   if (!commentMessage) {
  //     toast.error("Please enter a comment first!");
  //     return;
  //   }
  //   const toastId = toast.loading("comment creating...");
  //   const payload = { comment: commentMessage, blogId };
  //   try {
  //     const {data} = await createComment(payload);
      
  //     if (data?.success) {
  //       toastUpdate({
  //         message: data?.message || "Comment posted successfully!",
  //         type: "success",
  //         toastId,
  //       });
  //       setCommentMessage("");
  //     } else {
  //       toastUpdate({
  //         message: data?.message || "comment creating failed !",
  //         type: "error",
  //         toastId,
  //       });
  //     }
  //   } catch (error) {
  //     toastUpdate({
  //       message: error.message || "comment creating failed !",
  //       type: "error",
  //       toastId,
  //     });
  //   }
  // };

  // now we handle the comment using socket.

  //code for creating message and send on server using socket.
  
  const addCommentsSocketHandler = useCallback(({success, commentData}) => {
    if(success){
      setRealTimeComments((prev) => [ commentData, ...prev]);
    }else{
      console.log("Comment created failed",commentData);
    }
  },[])
  comments = !comments ? [] : comments;
  commentData = [...realTimeComment, ...comments,]
  useHandleSocket({[NEW_COMMENT_ADDED] : addCommentsSocketHandler})
  
  const sendComment = async () => {
    if (!commentMessage) {
      toast.error("Please enter a comment first!");
      return;
    }
    const payload = { comment: commentMessage, blogId, creator : user._id };
    socket.emit(NEW_COMMENT_ADDED , payload);
  };
  

  if (isCommentLoading)
    return (
      <h1 className="text-[1.8rem] text-gray-400">
        Comment Data is Loading...
      </h1>
    );
    
  if (isCommentError)
    return (
      <h1 className="text-[1.8rem] text-red-500">
        There was an error while fetching comments...
      </h1>
    );

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Comments</h1>
        {status === "authenticated" ? (
          <div className={styles.write}>
            <textarea
              placeholder="write a comment..."
              className={styles.input}
              onChange={(e) => setCommentMessage(e.target.value)}
              value={commentMessage}
              style={{color : 'black'}}
            />
            <button className={styles.button} onClick={sendComment} >Send</button>
          </div>
        ) : (
          <h1>Please login for writing the comment</h1>
        )}
      </div>

      <div className="max-w-[100rem] p-4 mx-auto text-white bg-gray-900 rounded-lg">
        {commentData &&
          commentData.length > 0 &&
          commentData.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
      </div>
    </>
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
        <span className="text-[2rem] font-semibold text-blue-400">
          {comment.creatorDetails.creatorName}
        </span>
      </div>
      <p className="text-gray-300 ml-14 text-[1.7rem] font-[500]">
        {comment.comment}
      </p>
      <div className="flex items-center gap-6 mt-2 text-gray-400 ml-14">
        <button
          onClick={() => setLikeCount(likeCount + 1)}
          className="flex items-center gap-2 hover:text-green-400"
        >
          <FaThumbsUp /> {likeCount}
        </button>
        <button
          onClick={() => setDislikeCount(dislikeCount + 1)}
          className="flex items-center gap-2 hover:text-red-400"
        >
          <FaThumbsDown /> {dislikeCount}
        </button>
        <button
          onClick={() => setShowReplies(!showReplies)}
          className="flex items-center gap-2 hover:text-yellow-400"
        >
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
        <span className="text-[1.6rem] font-semibold text-purple-400">
          {reply.creatorDetails.creatorName}
        </span>
      </div>
      <p className="text-[1.5rem] text-gray-300 ml-14">{reply.reply}</p>
      <div className="flex items-center gap-6 text-sm text-gray-400 ml-14">
        <button
          onClick={() => setLikeCount(likeCount + 1)}
          className="flex items-center gap-2 hover:text-green-400"
        >
          <FaThumbsUp /> {likeCount}
        </button>
        <button
          onClick={() => setDislikeCount(dislikeCount + 1)}
          className="flex items-center gap-2 hover:text-red-400"
        >
          <FaThumbsDown /> {dislikeCount}
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
