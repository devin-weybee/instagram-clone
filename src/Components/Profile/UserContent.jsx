import React, { useEffect, useState } from "react";
import FollowersModal from "./FollowersModal";
import FollowingModal from "./FollowingModal";
import { useSelector } from "react-redux";
import useFollowUnfollow from "../../Helper/useFollowUnfollow";

const UserContent = ({ profile, setIsEditing, totalPosts }) => {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(profile.isFollowing);

  const user = useSelector((store) => store.user.user);

  useEffect(() => {
    setIsFollowing(profile?.isFollowing);
  }, [profile]);

  const handleClick = async () => {
    if (user?.username === profile?.account?.username) {
      setIsEditing(true);
      return;
    }

    try {
      const res = await useFollowUnfollow(profile?.account?._id);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center gap-10 p-5 text-white">
      <div className="relative">
        <img
          className="h-40 w-40 rounded-full object-cover"
          src={profile?.coverImage?.url}
          alt="coverimage"
        />
      </div>

      <div className="text-center space-y-2 w-80">
        <div className="flex justify-between">
          <h6 className="text-xl font-bold text-left">
            {profile?.account?.username}
          </h6>

          <button
            onClick={handleClick}
            className="bg-gray-700 p-2 rounded-md text-white hover:bg-gray-700"
          >
            {user?.username == profile?.account?.username
              ? "Edit Profile"
              : isFollowing
              ? "Unfollow"
              : "Follow"}
          </button>
        </div>

        <div className="flex justify-start items-center gap-5">
          <p className="text-gray-600">Posts: {totalPosts}</p>

          <p
            className="text-gray-600 cursor-pointer hover:text-white"
            onClick={() => setShowFollowers(true)}
          >
            Followers: {profile?.followersCount}
          </p>

          <p
            className="text-gray-600 cursor-pointer hover:text-white"
            onClick={() => setShowFollowing(true)}
          >
            Following: {profile?.followingCount}
          </p>
        </div>

        <p className="text-left">
          {profile?.firstName + " " + profile?.lastName}
        </p>
        <p className="text-gray-400 text-left">{profile?.bio}</p>
      </div>

      {showFollowers && (
        <FollowersModal
          profile={profile}
          onClose={() => setShowFollowers(false)}
        />
      )}

      {showFollowing && (
        <FollowingModal
          profile={profile}
          onClose={() => setShowFollowing(false)}
        />
      )}
    </div>
  );
};

export default UserContent;
