import React, { useState } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

const CreatePostModal = ({ closeModal, goNext }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImageFiles((prev) => [...prev, ...files]);
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...previewImages];

    updatedFiles.splice(index, 1);
    URL.revokeObjectURL(updatedPreviews[index].url);
    updatedPreviews.splice(index, 1);

    setImageFiles(updatedFiles);
    setPreviewImages(updatedPreviews);
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black/80 flex justify-center items-center z-[9999]"
      onClick={closeModal}
    >
      <div
        className="bg-black w-[500px] rounded-xl shadow-lg p-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <IoClose size={28} />
        </button>

        {previewImages.length > 0 && (
          <button
            onClick={() => goNext(imageFiles)}
            className="absolute right-4 top-4 mr-[60px] px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Next →
          </button>
        )}

        <h2 className="text-xl font-semibold mb-4 text-center text-white">
          Upload Images
        </h2>

        <label className="cursor-pointer flex flex-col justify-center items-center border-2 border-dashed border-gray-400 rounded-lg h-32 mb-4">
          <span className="text-gray-400">Click to select images</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageSelect}
          />
        </label>

        {previewImages.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {previewImages.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img.url}
                  alt="preview"
                  className="w-full h-28 object-cover rounded-lg"
                />

                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <IoClose size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default CreatePostModal;
