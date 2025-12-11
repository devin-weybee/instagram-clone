import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../Utils/Constants";
import { useNavigate } from "react-router-dom";

const FollowingModal = ({ profile, onClose }) => {
  const [following, setFollowing] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const scrollRef = useRef(null);

  const fetchFollowing = async (pageNumber = 1) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `${API_BASE_URL}/social-media/follow/list/following/${profile.account.username}?page=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const newData = res.data?.data?.following || [];
      const total = res.data?.data?.totalFollowing || 0;

      setFollowing((prev) => [...prev, ...newData]);

      if (following.length + newData.length >= total) {
        setHasMore(false);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching following:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowing(1);
  }, []);

  const handleScroll = () => {
    const div = scrollRef.current;
    if (!div) return;

    if (div.scrollTop + div.clientHeight >= div.scrollHeight - 10) {
      if (hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    }
  };

  const handleUserClick = (username) => {
    onClose();
    navigate(`/profile/${username}`);
  };

  useEffect(() => {
    if (page !== 1) {
      fetchFollowing(page);
    }
  }, [page]);

  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-black text-white w-96 max-h-[500px] rounded-xl overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">Following</h2>
          <button className="text-lg" onClick={onClose}>
            ✖
          </button>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="overflow-y-auto h-[400px]"
        >
          {following.length === 0 && !loading ? (
            <p className="p-4 text-gray-400">Not following anyone yet.</p>
          ) : (
            following.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-4 p-3 hover:bg-gray-900 cursor-pointer"
                onClick={() => handleUserClick(user?.username)}
              >
                <img
                  src={
                    user?.profile?.coverImage?.url ??
                    "https://via.placeholder.com/150"
                  }
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{user?.username}</p>
                  <p className="text-gray-400 text-sm">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </div>
            ))
          )}

          {loading && (
            <p className="text-center py-3 text-gray-400">Loading...</p>
          )}

          {!hasMore && (
            <p className="text-center py-3 text-gray-500">No more results</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowingModal;
