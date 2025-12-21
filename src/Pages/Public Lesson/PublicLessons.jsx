
import React, { useEffect, useState } from "react";
import { FaLock, FaUserCircle, FaCalendarAlt, FaGlobe, FaStar, FaBookOpen, FaSearch } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import useAxiosPublic from "../../Hooks/AxiosInstance";
import { useNavigate } from "react-router";

const PublicLessons = () => {
  const { user, isPremium } = UseAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filter & Sort States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTone, setSelectedTone] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm.trim());
        if (selectedCategory !== "all") params.append("category", selectedCategory);
        if (selectedTone !== "all") params.append("tone", selectedTone);
        if (sortBy === "mostSaved") params.append("sort", "mostSaved");
        params.append("page", currentPage);
        params.append("limit", 9); 

        const res = await axiosPublic.get(`/lessons/public?${params.toString()}`);

        setLessons(res.data.lessons);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Failed to fetch lessons:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [searchTerm, selectedCategory, selectedTone, sortBy, currentPage, axiosPublic]);

  const handleCardClick = (lesson) => {
    navigate(`/lesson/${lesson._id}`);
  };

  // Pagination Component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div data-aos="fade-up" data-aos-delay="300" className="flex justify-center items-center gap-3 mt-16">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-6 py-3 bg-gray-200 rounded-xl hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
        >
          Previous
        </button>

        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-12 h-12 rounded-xl font-bold transition-all ${
                currentPage === i + 1
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-6 py-3 bg-gray-200 rounded-xl hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
        >
          Next
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading Public Lessons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div data-aos="fade-down" data-aos-delay="100" className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Public Life Lessons
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore inspiring stories and wisdom shared by our community
          </p>
        </div>

        {/* Search + Filter + Sort Bar */}
        <div data-aos="fade-up" data-aos-delay="200" className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or keyword..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); 
                }}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value="all">All Categories</option>
              <option value="Relationships">Relationships</option>
              <option value="Personal Growth">Personal Growth</option>
              <option value="Productivity">Productivity</option>
              <option value="Mental Health">Mental Health</option>
              <option value="Finance">Finance</option>
              <option value="Self-Discovery">Self-Discovery</option>
              <option value="Career">Career</option>
            </select>

            {/* Tone Filter */}
            <select
              value={selectedTone}
              onChange={(e) => {
                setSelectedTone(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value="all">All Tones</option>
              <option value="Gratitude">Gratitude</option>
              <option value="Motivational">Motivational</option>
              <option value="Reflective">Reflective</option>
              <option value="Resilient">Resilient</option>
              <option value="Calm">Calm</option>
              <option value="Hopeful">Hopeful</option>
              <option value="Curious">Curious</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value="newest">Newest First</option>
              <option value="mostSaved">Most Saved</option>
            </select>
          </div>
        </div>

        {/* Lessons Grid */}
        {lessons.length === 0 ? (
          <div data-aos="fade-up" className="text-center py-20">
            <FaGlobe className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-2xl text-gray-500">No lessons found</p>
            <p className="text-gray-400 mt-2">Try adjusting your filters or search term</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lessons.map((lesson, index) => {
                const isLocked = lesson.accessLevel === "premium" && !isPremium;

                return (
                  <div
                    key={lesson._id}
                    data-aos="fade-up"
                    data-aos-delay={300 + index * 100}
                    data-aos-duration="800"
                    className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group ${!isLocked ? 'cursor-pointer' : ''}`}
                    onClick={() => !isLocked && handleCardClick(lesson)}
                  >
                    
                    <div className="relative h-64 overflow-hidden">
                      {lesson.image ? (
                        <img
                          src={lesson.image}
                          alt={lesson.title}
                          className={`w-full h-full object-cover transition-transform duration-700 ${
                            isLocked ? "blur-md" : "group-hover:scale-110"
                          }`}
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center ${isLocked ? "blur-md" : ""}`}>
                          <FaBookOpen className="w-20 h-20 text-white/80" />
                        </div>
                      )}

                      {/* Premium Lock Overlay with Upgrade Button */}
                      {isLocked && (
                        <div 
                          className="absolute inset-0 bg-black/70 flex items-center justify-center z-20"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="text-center text-white">
                            <FaLock className="w-20 h-20 mx-auto mb-4" />
                            <p className="text-2xl font-bold">Premium Lesson</p>
                            <p className="text-lg mt-2 mb-6">Upgrade to unlock this wisdom</p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/dashboard/pricing");
                              }}
                              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl hover:scale-105 transition shadow-lg"
                            >
                              Upgrade Now
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Featured Badge */}
                      {lesson.isFeatured && !isLocked && (
                        <div className="absolute top-4 right-4 bg-yellow-400 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 z-10">
                          <FaStar className="w-5 h-5" />
                          <span className="font-bold text-sm">Featured</span>
                        </div>
                      )}
                    </div>

                    <div className={`p-6 ${isLocked ? "opacity-60" : ""}`}>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-2">
                        {lesson.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{lesson.description}</p>

                      <div className="flex flex-wrap gap-3 mb-5">
                        <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {lesson.category || "General"}
                        </span>
                        <span className="px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          {lesson.tone || "Neutral"}
                        </span>
                        <span className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 ${
                          lesson.accessLevel === "premium" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"
                        }`}>
                          {lesson.accessLevel === "premium" ? <FaLock className="w-4 h-4" /> : <FaGlobe className="w-4 h-4" />}
                          {lesson.accessLevel === "premium" ? "Premium" : "Public"}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-white shadow">
                          {lesson.creatorPhoto ? (
                            <img src={lesson.creatorPhoto} alt={lesson.creatorName} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                              <FaUserCircle className="w-12 h-12 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{lesson.creatorName}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <FaCalendarAlt className="w-4 h-4" />
                            {new Date(lesson.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      
                      {!isLocked && (
                        <div className="w-full py-3.5 rounded-xl font-bold text-lg text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all duration-300 shadow-md">
                          View Details
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <Pagination />
          </>
        )}
      </div>
    </div>
  );
};

export default PublicLessons;