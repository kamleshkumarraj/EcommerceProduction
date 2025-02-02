import { toast } from "react-toastify";
import { CREATE_REACTION_FOR_COMMENT, CREATE_REPLY_FOR_COMMENT } from "../../../events";
import { useHandleSocket } from "../../../hooks/useHandleSocket";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSelf } from "../../../store/slices/selfHandler.slice";
import { useSocket } from "../../../contexts/Socket";
import { checkAlreadyLiked, checkDisLiked } from "../../../helper/helper";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { FaReply } from "react-icons/fa";
import { Reply } from "./Reply";

export const Comment = ({ comment, }) => {
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
