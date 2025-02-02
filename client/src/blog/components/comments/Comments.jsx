import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSocket } from "../../../contexts/Socket";
import {
  JOIN_ROOM_FOR_BLOG,
  LEAVE_ROOM_FOR_BLOG,
  NEW_COMMENT_ADDED
} from "../../../events";
import { useHandleSocket } from "../../../hooks/useHandleSocket";
import {
  useLazyGetCommentForBlogQuery
} from "../../../store/slices/blogApi";
import { getSelf } from "../../../store/slices/selfHandler.slice";
import styles from "./comments.module.css";
import { Comment } from "./SingleComments";

const CommentSection = () => {
  let [
    getCommentsData,
    { data: comments, isLoading: isCommentLoading, isError: isCommentError },
  ] = useLazyGetCommentForBlogQuery();
  const blogId = useParams().blog_id;
  const user = useSelector(getSelf);
  const [commentMessage, setCommentMessage] = useState("");
  const status = user?.firstname ? "authenticated" : "unauthenticated";
  const socket = useSocket();
  let commentData = [];
  const [realTimeComment, setRealTimeComments] = useState([]);

  useEffect(() => {
    getCommentsData(blogId);
  }, [blogId]);

  // code for join room for getting comment and after leave the page we remove from room.
  useEffect(() => {
    socket.emit(JOIN_ROOM_FOR_BLOG, blogId);

    return () => {
      socket.emit(LEAVE_ROOM_FOR_BLOG, blogId);
      socket.off();
    };
  }, [blogId]);

  const addCommentsSocketHandler = useCallback(({ success, commentData }) => {
    if (success) {
      setRealTimeComments((prev) => [commentData, ...prev]);
    } else {
      console.log("Comment created failed", commentData);
    }
  }, []);
  
  comments = !comments ? [] : comments;
  commentData = [...realTimeComment, ...comments];

  useHandleSocket({
    [NEW_COMMENT_ADDED]: addCommentsSocketHandler,
  });

  const sendComment = async () => {
    if (!commentMessage) {
      toast.error("Please enter a comment first!");
      return;
    }
    const payload = { comment: commentMessage, blogId, creator: user._id };
    socket.emit(NEW_COMMENT_ADDED, payload);
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
              style={{ color: "black" }}
            />
            <button className={styles.button} onClick={sendComment}>
              Send
            </button>
          </div>
        ) : (
          <h1>Please login for writing the comment</h1>
        )}
      </div>

      <div className="max-w-[100rem] p-4 mx-auto text-white bg-gray-900 rounded-lg">
        {commentData &&
          commentData.length > 0 &&
          commentData.map((comment) => (
            <Comment key={comment._id} 
            comment={comment}
            />
          ))}
      </div>
    </>
  );
};





export default CommentSection;
