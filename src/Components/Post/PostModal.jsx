import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import axios from "axios";
import PostComments from "./PostComments";
import PostModalFooter from "./PostModalFooter";
import { API_BASE_URL } from "../../Utils/Constants";

const PostModal = ({ post, onClose }) => {
  console.log(post);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/social-media/comments/post/${post._id}`
      );
      setComments(response.data.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

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
    } catch (error) {
      console.error("Like error:", error);
      setIsLiked(post.isLiked);
      setLikes(post.likes);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    const commentInput = e.target.previousSibling;
    const content = commentInput.value.trim();
    if (!content) return;

    try {
      setLoading(true);
      await axios.post(
        `${API_BASE_URL}/social-media/comments/post/${post._id}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      commentInput.value = "";
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post._id]);

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-black text-white flex w-[900px] h-[550px] rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-6/12">
          <PostCard post={post} showArrow={true} />
        </div>

        <div className="w-6/12 flex flex-col">
          <div className="flex items-center p-4 border-b border-gray-800 gap-3">
            <img
              src={post.author.account.avatar.url}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold">
              {post.author.account.username}
            </span>

            <button
              className="ml-auto text-xl cursor-pointer"
              onClick={onClose}
            >
              ✖
            </button>
          </div>

          <div className="p-4 border-b border-gray-800 text-sm">
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

          <div className="flex-1 overflow-y-auto p-4 text-sm text-gray-300">
            {comments.map((comment) => (
              <PostComments
                comment={comment}
                key={comment._id}
                onUpdateComment={(updated) => {
                  setComments((prev) =>
                    prev.map((c) => (c._id === updated._id ? updated : c))
                  );
                }}
              />
            ))}
          </div>

          <PostModalFooter
            isLiked={isLiked}
            likes={likes}
            handleLike={handleLike}
            postComment={postComment}
          />
        </div>
      </div>
    </div>
  );
};

export default PostModal;
