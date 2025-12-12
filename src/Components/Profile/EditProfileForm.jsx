import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../Utils/Constants";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../Redux/Reducers/profileSlice";

const EditProfileForm = ({ profile, setIsEditing }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    dob: "",
    location: "",
    countryCode: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        bio: profile.bio || "",
        dob: profile.dob?.substring(0, 10) || "",
        location: profile.location || "",
        countryCode: profile.countryCode || "",
        phoneNumber: profile.phoneNumber || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/social-media/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      dispatch(updateProfile(response.data.data));
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("coverImage", file);
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/social-media/profile/cover-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(updateProfile(response.data.data));
    } catch (error) {
      console.error("Cover image upload failed:", error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center p-5 text-white">
      <form
        onSubmit={handleUpdateSubmit}
        className="w-full max-w-lg space-y-4 p-5 border rounded-md"
      >
        <h2 className="text-xl font-bold mb-3 text-center">Edit Profile</h2>

        <div className="relative flex justify-center mb-4">
          <img
            className="h-40 w-40 rounded-full object-cover"
            src={profile?.coverImage?.url}
            alt="coverimage"
          />
          <label className="absolute bottom-1 -mr-20 bg-gray-700 bg-opacity-50 text-white px-2 py-1 rounded cursor-pointer text-xs">
            Change
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverImageUpload}
            />
          </label>
        </div>

        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="First Name"
        />

        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Last Name"
        />

        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Bio"
        />

        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Location"
        />

        <div className="flex gap-3">
          <input
            type="text"
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className="w-24 p-2 border rounded"
            placeholder="+91"
            />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="flex-1 p-2 border rounded"
            placeholder="Phone Number"
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
            Save
          </button>

          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-700 px-4 py-2 rounded cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
