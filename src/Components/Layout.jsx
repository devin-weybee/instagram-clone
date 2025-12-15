import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import PostDetailsModal from "./Post/PostDetailsModal";
import CreatePostModal from "./Post/CreatePostModal";

const Layout = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const openCreatePost = () => setShowUploadModal(true);

  const goToDetails = (imageFile) => {
    setSelectedImageFile(imageFile);
    setShowUploadModal(false);
    setShowDetailsModal(true);
  };

  const finishPost = () => {
    setShowDetailsModal(false);
    window.location.reload();
  };

  return (
    <>
      <div className="flex min-h-screen bg-black">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {showUploadModal && (
        <CreatePostModal
          closeModal={() => setShowUploadModal(false)}
          goNext={goToDetails}
        />
      )}

      {showDetailsModal && (
        <PostDetailsModal
          imageFiles={selectedImageFile}
          closeModal={() => setShowDetailsModal(false)}
          afterPost={finishPost}
        />
      )}
    </>
  );
};

export default Layout;
