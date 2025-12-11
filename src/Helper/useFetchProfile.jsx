import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../Utils/Constants";
import { fetchProfile } from "../Redux/Reducers/profileSlice";

const useFetchProfile = () => {
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.profile.profile);
  const loadMyProfile = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/social-media/profile`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("accessToken")}`
        },
      });
      dispatch(fetchProfile(res.data.data));
    } catch (err) {
      console.error("Failed loading user's own profile:", err);
    }
  };

  useEffect(() => {
    if (!myProfile) {
      loadMyProfile();
    }
  }, []);
  return myProfile;
};

export default useFetchProfile;
