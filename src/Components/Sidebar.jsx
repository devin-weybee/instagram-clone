import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Reducers/userSlice";
import { AiOutlineHome } from "react-icons/ai";
import { FiLogOut, FiSearch } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import { RiVideoFill } from "react-icons/ri";
import { INSTA_TEXT_LOGO } from "../Utils/Constants";
import { useNavigate } from "react-router-dom";
import useFetchProfile from "../Helper/useFetchProfile";

const Sidebar = ({ openCreatePostModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((store) => store.user?.user?.username);
  const myProfile = useFetchProfile();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="h-screen sticky top-0 bg-black border-r border-gray-800
                    w-16 md:w-20 lg:w-64
                    flex flex-col items-center lg:items-start
                    px-2 lg:px-5 py-4">

      <img
        src={INSTA_TEXT_LOGO}
        alt="logo"
        className="h-10 lg:h-16 mb-6 hidden lg:block"
      />

      <nav className="flex flex-col gap-4 w-full">
        {[
          { icon: <AiOutlineHome size={26} />, label: "Home", action: () => navigate("/") },
          { icon: <FiSearch size={25} />, label: "Search", action: () => navigate("/search") },
          { icon: <IoAddCircleOutline size={26} />, label: "Create", action: openCreatePostModal },
          { icon: <RiVideoFill size={25} />, label: "Reels", action: () => navigate("/reels") },
        ].map((item, i) => (
          <button
            key={i}
            onClick={item.action}
            className="flex items-center justify-center lg:justify-start gap-4
                       text-white hover:bg-gray-800 rounded-lg p-3 transition w-full"
          >
            {item.icon}
            <span className="hidden lg:inline">{item.label}</span>
          </button>
        ))}

        <button
          onClick={() => navigate(`/profile/${username}`)}
          className="flex items-center justify-center lg:justify-start gap-4
                     text-white hover:bg-gray-800 rounded-lg p-3 transition w-full"
        >
          <img
            src={myProfile?.profileImage?.url || myProfile?.coverImage?.url}
            alt="profile"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="hidden lg:inline">Profile</span>
        </button>
      </nav>

      <div className="flex-1"></div>

      <button
        onClick={handleLogout}
        className="flex items-center justify-center lg:justify-start gap-4
                   text-red-500 hover:bg-gray-800 rounded-lg p-3 transition w-full"
      >
        <FiLogOut size={25} />
        <span className="hidden lg:inline">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
