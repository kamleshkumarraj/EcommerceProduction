import { useCallback, useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaReply } from "react-icons/fa";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useCreateCommentMutation,
  useLazyGetCommentForBlogQuery,
} from "../../../store/slices/blogApi";
import styles from "./comments.module.css";
import { useSelector } from "react-redux";
import { getSelf } from "../../../store/slices/selfHandler.slice";
import { toast } from "react-toastify";
import {
  checkAlreadyLiked,
  checkDisLiked,
  checkReplyAlreadyLiked,
  checkReplyDisLiked,
  toastUpdate,
} from "../../../helper/helper";
import { useSocket } from "../../../contexts/Socket";
import { useHandleSocket } from "../../../hooks/useHandleSocket";
import {
  CREATE_REACTION_FOR_COMMENT,
  CREATE_REACTION_FOR_REPLY,
  CREATE_REPLY_FOR_COMMENT,
  JOIN_ROOM_FOR_BLOG,
  LEAVE_ROOM_FOR_BLOG,
  NEW_COMMENT_ADDED,
} from "../../../events";
import { BiLike, BiSolidDislike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";

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

const Comment = ({ comment, }) => {
  const socket = useSocket();
  const navigate = useNavigate();
  const blogId = useParams().blog_id;
  const user = useSelector(getSelf);
  const [commentData, setCommentData] = useState(comment);
  const [likeCount, setLikeCount] = useState(
    commentData.commentReactions.find((r) => r.reaction === "like")?.count || 0
  );
  const [reply, setReply] = useState({
    reply : "",
    commentId : "",
  });

  const [dislikeCount, setDislikeCount] = useState(
    commentData.commentReactions.find((r) => r.reaction === "dislike")?.count ||
      0
  );

  const [showReplies, setShowReplies] = useState(false);

  const addCreateReactionForComment = useCallback(
    ({ success, commentData }) => {
      if (success) {
        setCommentData((prev) => {
          if (prev._id == commentData?._id) {
            setLikeCount(
              commentData.commentReactions.find((r) => r.reaction === "like")
                ?.count || 0
            );
            setDislikeCount(
              commentData.commentReactions.find((r) => r.reaction === "dislike")
                ?.count || 0
            );
            return commentData;
          } else {
            return prev;
          }
        });
      } else {
        toast.error("Reaction creation failed !");
      }
    },
    []
  );

  const addCreateReplyForComment = useCallback(({success, commentData}) => {
    if (success) {
      setCommentData((prev) => {
        if (prev._id == commentData?._id) {
          setReply({reply : "", commentId : ''});
          return commentData;
        } else {
          return prev;
        }
      });
    } else {
      toast.error("Reply creation failed !");
    }
  }, []);
  
  useHandleSocket({
    [CREATE_REACTION_FOR_COMMENT]: addCreateReactionForComment,
    [CREATE_REPLY_FOR_COMMENT] : addCreateReplyForComment
  });

  const createReactionForComment = async (payload) => {
    if (!user) {
      toast.error("Please login to create comment!");
      navigate("/login");
      return;
    }
    socket.emit(CREATE_REACTION_FOR_COMMENT, {
      ...payload,
      creator: user?._id,
      blogId,
      parentCommentId : commentData?._id
    });
  };

  const createReplyForComment = async () => {
    if (!user) {
      toast.error("Please login to create comment!");
      navigate("/login");
      return;
    }
    if(!reply.reply){
      toast.error("Please enter a reply first!");
      return;
    }
    socket.emit(CREATE_REPLY_FOR_COMMENT, {
      ...reply,
      creator: user?._id,
      blogId,
    });
  };

  return (
    <div className="p-4 border-b border-gray-700">
      <div className="flex items-center gap-4">
        <img
          src={commentData.creatorDetails.avatar.url}
          alt="avatar"
          className="border-blue-500 rounded-full h-14 borer-2 w-14"
        />
        <span className="text-[2rem] font-semibold text-blue-400">
          {commentData.creatorDetails.creatorName}
        </span>
      </div>
      <p className="text-gray-300 ml-14 text-[1.7rem] font-[500]">
        {commentData.comment}
      </p>
      <div className="flex items-center gap-6 mt-2 text-gray-400 ml-14">
        <button className="flex items-center gap-2 hover:text-green-400">
          {checkAlreadyLiked({
            commentData: commentData,
            userId: user?._id,
          }) ? (
            <BiSolidLike
              onClick={() => {
                createReactionForComment({
                  commentId: commentData?._id,
                  reaction: "none",
                });
              }}
              size={"20"}
              color="#F44336"
            />
          ) : (
            <BiLike
              onClick={() => {
                createReactionForComment({
                  commentId: commentData?._id,
                  reaction: "like",
                });
              }}
              size={"20"}
            />
          )}{" "}
          {likeCount}
        </button>
        <button className="flex items-center gap-2 hover:text-red-400">
          {checkDisLiked({ commentData: commentData, userId: user?._id }) ? (
            <BiSolidDislike
              onClick={() => {
                createReactionForComment({
                  commentId: commentData?._id,
                  reaction: "none",
                });
              }}
              size={"20"}
              color="gray"
            />
          ) : (
            <BiDislike
              onClick={() => {
                createReactionForComment({
                  commentId: commentData?._id,
                  reaction: "dislike",
                });
              }}
              size={"20"}
            />
          )}{" "}
          {dislikeCount}
        </button>
        <button
          onClick={() => setShowReplies(!showReplies)}
          className="flex items-center gap-2 hover:text-yellow-400"
        >
          <FaReply /> Reply ({commentData.replySize})
        </button>
      </div>
      {showReplies && (
        <div className="pl-6 mt-2 border-l border-gray-700 ml-14">
          {commentData.replyComment.map((reply) => (
            <Reply key={reply._id} reply={reply} createReactionForComment={createReactionForComment} />
          ))}

          <div className="flex w-full max-w-lg p-4 rounded-xl">
            <textarea
              className="w-full p-3 text-white placeholder-gray-400 bg-transparent border-b-2 resize-none border-b-pink-800 border-gradient focus:outline-none focus:border-b-green-800"
              rows="1"
              value={reply?.reply}
              onChange={(e) => {
                setReply({reply : e.target.value , commentId : commentData._id})
              }}
              placeholder="Type your reply..."
            />
            <button className="w-[12rem] py-4 font-bold text-black transition-transform  shadow-md bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 hover:scale-105" onClick={createReplyForComment} >
              Send 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Reply = ({ reply, createReactionForComment }) => {
  const likeCount = reply?.replyReactions?.find((r) => r.reaction === "like")?.count || 0;
  const dislikeCount = reply?.replyReactions?.find((r) => r.reaction === "dislike")?.count || 0;
  const user = useSelector(getSelf);
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
          className="flex text-[1.4rem] items-center gap-2 hover:text-green-400"
        >
          {checkReplyAlreadyLiked({
            commentData: reply,
            userId: user?._id,
          }) ? (
            <BiSolidLike
              onClick={() => {
                createReactionForComment({
                  commentId: reply?._id,
                  reaction: "none",
                });
              }}
              size={"16"}
              color="#F44336"
            />
          ) : (
            <BiLike
              onClick={() => {
                createReactionForComment({
                  commentId: reply?._id,
                  reaction: "like",
                });
              }}
              size={"16"}
            />
          )}{" "}
          {likeCount}
        </button>
        <button
          className="flex text-[1.4rem] items-center gap-2 hover:text-red-400"
        >{checkReplyDisLiked({ commentData: reply, userId: user?._id }) ? (
          <BiSolidDislike
            onClick={() => {
              createReactionForComment({
                commentId: reply?._id,
                reaction: "none",
              });
            }}
            size={"16"}
            color="gray"
          />
        ) : (
          <BiDislike
            onClick={() => {
              createReactionForComment({
                commentId: reply?._id,
                reaction: "dislike",
              });
            }}
            size={"16"}
          />
        )}{" "}
        {dislikeCount}
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
