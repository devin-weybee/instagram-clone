import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../Utils/Constants";
import UserContent from "./UserContent";
import { Link, useNavigate } from "react-router-dom";

const FollowersModal = ({ profile, onClose }) => {
  const [followers, setFollowers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const scrollRef = useRef(null);

  const fetchFollowers = async (pageNumber = 1) => {
    if (loading || !hasMore) return;
    try {
      const res = await axios.get(
        `${API_BASE_URL}/social-media/follow/list/followers/${profile.account.username}?page=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const newData = res.data?.data?.followers || [];
      const total = res.data?.data?.totalFollowers || 0;

      setFollowers((prev) => [...prev, ...newData]);

      if (followers.length + newData.length >= total) {
        setHasMore(false);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching followers:", err);
      setLoading(false);
    }
  };

  const handleUserClick = (username) => {
    onClose();
    navigate(`/profile/${username}`);
  };

  useEffect(() => {
    fetchFollowers(1);
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

  useEffect(() => {
    if (page !== 1) {
      fetchFollowers(page);
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
          <h2 className="text-xl font-bold">Followers</h2>
          <button className="text-lg" onClick={onClose}>
            ✖
          </button>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="overflow-y-auto h-[400px]"
        >
          {followers.length === 0 && !loading ? (
            <p className="p-4 text-gray-400">No followers yet.</p>
          ) : (
            followers.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-4 p-3 hover:bg-gray-900 cursor-pointer"
                onClick={() => handleUserClick(user?.username)}
              >
                <img
                  src={user.profile.coverImage.url}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{user?.username}</p>
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

export default FollowersModal;
