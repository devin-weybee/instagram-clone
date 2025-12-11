import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../Utils/Constants";
import PostCard from "../Post/PostCard";
import PostModal from "../Post/PostModal";

const PostList = ({ posts, loading }) => {
  const [selectedPostId, setSelectedPostId] = useState(null);

  const selectedPost = posts.find((p) => p._id === selectedPostId);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">Loading posts...</div>
    );
  }

  return (
    <div className="mt-10">
      <div className="grid grid-cols-3 gap-1 max-w-4xl mx-auto overflow-y-auto h-full">
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
        />
      )}
    </div>
  );
};

export default PostList;
