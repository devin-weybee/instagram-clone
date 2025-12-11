import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { API_BASE_URL } from "../../Utils/Constants";
import axios from "axios";
import timeAgo from "../../Helper/timeAgo";
import PostCard from "../Post/PostCard";
import { useNavigate } from "react-router-dom";

const FeedPost = ({ post, onCommentClick }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);
  const [index, setIndex] = useState(0);

  const totalImages = post.images.length;
  const navigate = useNavigate();

  const handleLike = async () => {
    try {
      setIsLiked(!isLiked);
      setLikes(isLiked ? likes - 1 : likes + 1);

      await axios.post(
        `${API_BASE_URL}/social-media/like/post/${post._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (e) {
      console.error(e);
      setIsLiked(post.isLiked);
      setLikes(post.likes);
    }
  };

  return (
    <div className="bg-black border border-gray-800 rounded-lg text-white">
      <div className="flex items-center gap-3 p-4">
        <img
          src={post.author.account.avatar.url}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
        <span
          className="font-semibold cursor-pointer"
          onClick={() => navigate(`/profile/${post.author.account.username}`)}
        >
          {post.author.account.username}
        </span>
      </div>

      <PostCard post={post} showArrow={true} />

      <div className="flex items-center gap-4 px-4 text-3xl py-3">
        {isLiked ? (
          <AiFillHeart
            className="text-red-500 cursor-pointer"
            onClick={handleLike}
          />
        ) : (
          <AiOutlineHeart className="cursor-pointer" onClick={handleLike} />
        )}

        <FaRegComment className="cursor-pointer" onClick={onCommentClick} />
      </div>

      <div className="px-4 text-md font-semibold">{likes} likes</div>

      <div className="px-4 py-2 text-sm text-gray-200">
        <span className="font-semibold mr-2">
          {post.author.account.username}
        </span>
        {post.content}
        <div className="flex flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-blue-600 px-1 py-1 rounded-md text-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <p className="px-4 pb-2 text-xs text-gray-500">
        {timeAgo(post.createdAt)}
      </p>

      <div className="border-t border-gray-800 flex items-center p-3 gap-3">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 bg-transparent outline-none text-white"
        />
        <button className="text-blue-500 font-semibold">Post</button>
      </div>
    </div>
  );
};

export default FeedPost;
