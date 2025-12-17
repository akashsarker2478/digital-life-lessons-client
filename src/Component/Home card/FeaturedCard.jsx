
import React from "react";
import { useNavigate } from "react-router"; 
import UseAuth from "../../Hooks/UseAuth"; 
import { FaUserCircle, FaCalendarAlt, FaGlobe, FaLock, FaStar } from "react-icons/fa";

const FeaturedCard = ({ lesson }) => {
  const navigate = useNavigate();
  const { isPremium } = UseAuth(); 

  if (!lesson) return null;

  const {
    title = "Untitled Lesson",
    description = "No description available",
    category = "General",
    tone = "Neutral",
    createdBy = "Unknown",
    creatorPhoto = null,
    creatorName = "Anonymous",
    isPremium: lessonIsPremium = false,
    createdAt = new Date(),
    image = null,
    _id,
  } = lesson;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleReadLesson = () => {
    if (lessonIsPremium && !isPremium) {
      navigate("/dashboard/pricing");
    } else {
      navigate(`/lesson/${_id}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Card Header with Lesson Image */}
      <div className="relative h-64 overflow-hidden">
        {image ? (
          <>
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </>
        ) : (
          <>
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all" />
          </>
        )}

        {/* Title & Description Overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-2xl font-bold drop-shadow-lg line-clamp-2">{title}</h3>
          <p className="text-sm mt-2 opacity-95 line-clamp-2 drop-shadow-md">{description}</p>
        </div>

        {/* Featured Star Badge */}
        <div className="absolute top-4 right-4 bg-yellow-400 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 z-10">
          <FaStar className="w-5 h-5" />
          <span className="font-bold text-sm">Featured</span>
        </div>

        {/* Premium Badge */}
        {lessonIsPremium && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 z-10">
            <FaLock className="w-5 h-5" />
            <span className="font-bold text-sm">Premium</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Category & Tone */}
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {category}
          </span>
          <span className="px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            {tone}
          </span>
          <span className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 ${
            lessonIsPremium 
              ? "bg-orange-100 text-orange-700" 
              : "bg-green-100 text-green-700"
          }`}>
            {lessonIsPremium ? <FaLock className="w-4 h-4" /> : <FaGlobe className="w-4 h-4" />}
            {lessonIsPremium ? "Premium Only" : "Public"}
          </span>
        </div>

        {/* Creator Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-white shadow-md">
            {creatorPhoto ? (
              <img
                src={creatorPhoto}
                alt={creatorName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <FaUserCircle className="w-12 h-12 text-white" />
              </div>
            )}
          </div>
          <div>
            <p className="font-bold text-gray-800 text-lg">{creatorName || createdBy}</p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <FaCalendarAlt className="w-4 h-4" />
              {formattedDate}
            </p>
          </div>
        </div>

        {/* Action Button*/}
        <button
          onClick={handleReadLesson}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-md"
        >
          {lessonIsPremium && !isPremium ? "Upgrade to Read" : "Read Full Lesson"}
        </button>
      </div>
    </div>
  );
};

export default FeaturedCard;