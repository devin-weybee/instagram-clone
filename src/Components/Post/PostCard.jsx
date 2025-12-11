import React, { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const PostCard = ({ post, onClick, showArrow }) => {
  const [index, setIndex] = useState(0);

  const totalImages = post.images.length;

  const nextImage = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  if (!post || !post.images || post.images.length === 0) {
    return (
      <div className="w-full h-full bg-gray-800 flex justify-center items-center text-white">
        No Image
      </div>
    );
  }

  return (
    <div className="relative cursor-pointer group h-full" onClick={onClick}>
      <img
        src={post.images[index].url}
        alt="post"
        className="w-full h-full object-cover transition-all duration-300"
      />

      {showArrow && totalImages > 1 && (
        <FaArrowAltCircleLeft
          className={`${
            index == 0 ? "hidden" : "inline-block"
          } absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl opacity-0 group-hover:opacity-100 cursor-pointer transition`}
          onClick={prevImage}
        />
      )}

      {showArrow && totalImages > 1 && (
        <FaArrowAltCircleRight
          className={`${
            index == 5 ? "hidden" : "inline-block"
          } absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl opacity-0 group-hover:opacity-100 cursor-pointer transition`}
          onClick={nextImage}
        />
      )}
    </div>
  );
};

export default PostCard;
