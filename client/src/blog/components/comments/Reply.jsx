import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { checkReplyAlreadyLiked, checkReplyDisLiked } from "../../../helper/helper";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getSelf } from "../../../store/slices/selfHandler.slice";

export const Reply = ({ reply, createReactionForComment }) => {
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

Reply.propTypes = {
    reply: PropTypes.object.isRequired,
    createReactionForComment: PropTypes.func.isRequired,
  };