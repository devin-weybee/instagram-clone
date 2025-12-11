import React, { useState } from "react";
import { API_BASE_URL, DEFAULT_AVATAR } from "../../Utils/Constants";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import timeAgo from "../../Helper/timeAgo";
import axios from "axios";

const PostComments = ({ comment, onUpdateComment }) => {
  const [isCommentLiked, setIsCommentLiked] = useState(comment.isLiked);
  const [commentLikes, setCommentLikes] = useState(comment.likes);

  const handleCommentLike = async () => {
    try {
      const newLiked = !isCommentLiked;
      const newLikesCount = newLiked ? commentLikes + 1 : commentLikes - 1;

      setIsCommentLiked(newLiked);
      setCommentLikes(newLikesCount);

      onUpdateComment({
        ...comment,
        isLiked: newLiked,
        likes: newLikesCount,
      });

      await axios.post(
        `${API_BASE_URL}/social-media/like/comment/${comment._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (error) {
      console.error("Like error:", error);
      setIsCommentLiked(comment.isLiked);
      setCommentLikes(comment.likes);
    }
  };

  return (
    <div key={comment._id} className="mb-4 flex items-start justify-between">
      <div className="flex items-start gap-3">
        <img
          src={DEFAULT_AVATAR}
          alt="img"
          className="rounded-full h-10 w-10 object-cover"
        />

        <div>
          <span className="font-bold text-white mr-2">
            {comment.author.account.username}
          </span>
          <span>{comment.content}</span>

          <div className="text-xs text-gray-500 mt-1 flex gap-3">
            <span>{timeAgo(comment.createdAt)}</span>
            <span>{commentLikes} likes</span>
          </div>
        </div>
      </div>

      <div className="w-2/12 flex justify-end text-xl">
        {isCommentLiked ? (
          <AiFillHeart
            className="text-red-500 cursor-pointer"
            onClick={handleCommentLike}
          />
        ) : (
          <AiOutlineHeart
            className="cursor-pointer"
            onClick={handleCommentLike}
          />
        )}
      </div>
    </div>
  );
};

export default PostComments;
