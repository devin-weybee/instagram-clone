import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

const PostModalFooter = ({ isLiked, likes, handleLike, postComment }) => {
  return (
    <>
      <div className="flex items-center gap-5 px-4 py-3 border-t border-gray-800 text-2xl">
        {isLiked ? (
          <AiFillHeart
            className="text-red-500 cursor-pointer"
            onClick={handleLike}
          />
        ) : (
          <AiOutlineHeart className="cursor-pointer" onClick={handleLike} />
        )}

        <FaRegComment className="cursor-pointer" />
      </div>

      <div className="px-4 pb-3 font-semibold">{likes} likes</div>

      <div className="w-full flex items-center gap-3 px-4 py-2 border-t border-gray-800">
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-10/12 p-2 focus:outline-none"
        />
        <button
          className="px-4 py-2 text-blue-500 font-semibold w-2/12"
          onClick={postComment}
        >
          Post
        </button>
      </div>
    </>
  );
};

export default PostModalFooter;
