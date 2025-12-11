import React, { useState } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { API_BASE_URL } from "../../Utils/Constants";

const PostDetailsModal = ({ imageFiles, closeModal, afterPost }) => {
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");

  const handleSharePost = async () => {
    const formData = new FormData();
    const tagArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    formData.append("content", caption);

    tagArray.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });

    try {
      await axios.post(`${API_BASE_URL}/social-media/posts`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      afterPost();
    } catch (error) {
      console.error("Post Error:", error);
    }
  };

  return createPortal(
    <div className="fixed inset-0 backdrop-blur-md bg-black/60 flex justify-center items-center z-[9999]">
      <div className="bg-black w-[500px] rounded-xl shadow-lg p-5 relative">
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <IoClose size={28} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center text-white">
          Add Caption & Tags
        </h2>

        <textarea
          placeholder="Write a caption..."
          className="w-full p-3 border border-gray-400 bg-transparent text-white rounded-lg focus:outline-none"
          rows={3}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>

        <input
          type="text"
          placeholder="Add tags (comma separated)"
          className="w-full mt-3 p-3 border border-gray-400 bg-transparent text-white rounded-lg"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <button
          onClick={handleSharePost}
          className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Share Post
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default PostDetailsModal;
