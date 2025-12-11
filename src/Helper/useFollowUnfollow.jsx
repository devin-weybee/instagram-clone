import axios from "axios";
import React from "react";
import { API_BASE_URL } from "../Utils/Constants";

const useFollowUnfollow = async (userID) => {
  return await axios.post(
    `${API_BASE_URL}/social-media/follow/${userID}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
};

export default useFollowUnfollow;
