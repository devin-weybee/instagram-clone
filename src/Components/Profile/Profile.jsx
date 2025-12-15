import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../Utils/Constants";
import EditProfileForm from "./EditProfileForm";
import PostList from "./PostList";
import UserContent from "./UserContent";
import { useParams } from "react-router-dom";
import useFetchPostList from "../../Helper/useFetchPostList";
import { useSelector } from "react-redux";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const { username } = useParams();

  const { posts, loading } = useFetchPostList();
  const updatedProfile = useSelector((store) => store.profile.profile);

  const fetchProfileData = async () => {
    try {
      const reponse = await axios.get(
        `${API_BASE_URL}/social-media/profile/u/${username}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setProfile(reponse.data.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    if (updatedProfile) {
      setProfile(updatedProfile);
    }
  }, [updatedProfile]);

  useEffect(() => {
    fetchProfileData();
  }, [username]);

  if (isEditing) {
    return <EditProfileForm profile={profile} setIsEditing={setIsEditing} />;
  }

  return (
    <div className="mx-auto">
      {profile && (
        <UserContent
          profile={profile}
          setIsEditing={setIsEditing}
          totalPosts={posts.length}
        />
      )}
      <PostList posts={posts} loading={loading} />
    </div>
  );
};

export default Profile;
