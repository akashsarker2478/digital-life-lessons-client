import React, { useEffect, useState } from "react";

import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import axios from "axios";

const PublicLessons = () => {
  const [lessons, setLessons] = useState([]);
  
  const { isPremium } = UseAuth();
  const navigate = useNavigate();



useEffect(() => {
  const fetchLessons = async () => {
    try {
      const res = await axios.get("http://localhost:3000/lessons/public");
      setLessons(res.data);
    } catch (err) {
      console.error("Failed to fetch public lessons:", err);
    }
  };
  fetchLessons();
}, []);


  const handleViewDetails = (lesson) => {
    if (lesson.accessLevel === "premium" && !isPremium) {
      navigate("/pricing"); 
    } else {
      navigate(`/lesson/${lesson._id}`); 
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
        Public Life Lessons
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            className={`border rounded-xl p-4 shadow hover:shadow-lg transition relative overflow-hidden ${
              lesson.accessLevel === "premium" && !isPremium
                ? "filter blur-sm pointer-events-none"
                : ""
            }`}
          >
            {/* Premium overlay */}
            {lesson.accessLevel === "premium" && !isPremium && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-semibold rounded-xl">
                <FaLock className="mr-2" /> Premium Lesson – Upgrade to view
              </div>
            )}

            {/* Lesson Image */}
            {lesson.image ? (
              <img
                src={lesson.image}
                alt={lesson.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded mb-4 text-gray-500">
                No Image
              </div>
            )}

            <h2 className="text-xl font-bold mb-2">{lesson.title}</h2>
            <p className="text-gray-600 mb-2 line-clamp-2">{lesson.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span className="capitalize">{lesson.category}</span>
              <span className="capitalize">{lesson.tone}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
              <span>{lesson.createdByName || lesson.createdBy}</span>
              <span>{new Date(lesson.createdAt).toLocaleDateString()}</span>
            </div>

            {/* View Details button */}
            <button
              onClick={() => handleViewDetails(lesson)}
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicLessons;
