import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Reducers/userSlice";
import { AiOutlineHome } from "react-icons/ai";
import { FiLogOut, FiSearch } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import { RiVideoFill } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi";
import { INSTA_TEXT_LOGO } from "../Utils/Constants";
import { useNavigate } from "react-router-dom";
import CreatePostModal from "./Post/CreatePostModal";
import useFetchProfile from "../Helper/useFetchProfile";

const Sidebar = ({ openCreatePostModal }) => {
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((store) => store.user?.user?.username);
  const profile = useSelector((state) => state.profile.profile);
  const myProfile = useFetchProfile();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="h-screen border-r border-gray-300 flex flex-col p-5 bg-black sticky top-0">
      <img src={INSTA_TEXT_LOGO} alt="" className="h-16 w-45" />

      <nav className="flex flex-col gap-6 text-lg font-medium mt-5">
        <button
          className="text-white flex items-center gap-4 hover:bg-gray-800 rounded-lg p-3 transition cursor-pointer"
          onClick={() => navigate("/")}
        >
          <AiOutlineHome size={26} /> <span>Home</span>
        </button>

        <button
          className="text-white flex items-center gap-4 hover:bg-gray-800 rounded-lg p-3 transition cursor-pointer"
          onClick={() => navigate("/search")}
        >
          <FiSearch size={25} /> <span>Search</span>
        </button>

        <button
          className="text-white flex items-center gap-4 hover:bg-gray-800 rounded-lg p-3 transition cursor-pointer"
          onClick={openCreatePostModal}
        >
          <IoAddCircleOutline size={26} /> <span>Create</span>
        </button>

        <button
          className="text-white flex items-center gap-4 hover:bg-gray-800 rounded-lg p-3 transition cursor-pointer"
          onClick={() => navigate("/reels")}
        >
          <RiVideoFill size={25} /> <span>Reels</span>
        </button>

        <button
          className="text-white flex items-center gap-4 hover:bg-gray-800 rounded-lg p-3 transition cursor-pointer"
          onClick={() => navigate(`/profile/${username}`)}
        >
          <img
            src={myProfile?.coverImage?.url}
            alt=""
            className="h-8 w-8 rounded-full"
          />{" "}
          <span>Profile</span>
        </button>
      </nav>

      <div className="flex-1"></div>

      <div className="mt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 hover:bg-gray-100 rounded-lg p-3 transition text-red-500"
        >
          <FiLogOut size={25} />
          <span>Logout</span>
        </button>
      </div>

      {showCreatePostModal && (
        <CreatePostModal closeModal={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};

export default Sidebar;
