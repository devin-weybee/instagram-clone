import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../Utils/Constants";
import PostCard from "../Post/PostCard";
import PostModal from "../Post/PostModal";

const PostList = ({ posts: initialPosts, loading }) => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [posts, setPosts] = useState(initialPosts);

  const selectedPost = posts.find((p) => p._id === selectedPostId);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">Loading posts...</div>
    );
  }

  return (
    <div className="mt-10">
      <div className="grid grid-cols-3 gap-1 mx-auto w-full max-w-[340px] sm:max-w-[420px] md:max-w-[600px] lg:max-w-[850px]">
        {posts.map((post) => (
          <div key={post._id} className="aspect-square">
            <PostCard
              post={post}
              onClick={() => setSelectedPostId(post._id)}
              isHover={true}
              showArrow={false}
            />
          </div>
        ))}
      </div>

      {selectedPostId && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPostId(null)}
          onDelete={(deletedId) => {
            setSelectedPostId(null);
            setPosts((prev) => prev.filter((p) => p._id !== deletedId));
          }}
        />
      )}
    </div>
  );
};

export default PostList;
