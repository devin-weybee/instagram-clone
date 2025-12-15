import axios from "axios";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { API_BASE_URL } from "../../Utils/Constants";
import FeedPost from "./FeedPost";
import PostModal from "../Post/PostModal";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({ threshold: 1 });

  const fetchAllPosts = async (pageNumber = 1) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const response = await axios.get(
        `${API_BASE_URL}/social-media/posts?page=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const newPosts = response.data?.data?.posts || [];
      const totalPosts = response.data?.data?.totalPosts || 0;

      setAllPosts((prev) => [...prev, ...newPosts]);

      if (allPosts.length + newPosts.length >= totalPosts) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts(1);
  }, []);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  useEffect(() => {
    if (page !== 1) fetchAllPosts(page);
  }, [page]);

  return (
    <div className="max-w-xs md:max-w-sm lg:max-w-md mx-auto mt-10 space-y-10">
      {allPosts.map((post) => (
        <FeedPost
          key={post._id}
          post={post}
          onCommentClick={() => setSelectedPost(post)}
        />
      ))}

      <div ref={ref} className="text-center py-4 text-gray-400">
        {loading ? "Loading..." : ""}
      </div>

      {!hasMore && (
        <p className="text-center text-gray-500 py-4">No more posts.</p>
      )}

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

export default Home;
