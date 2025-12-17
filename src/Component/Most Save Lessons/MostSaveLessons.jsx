import React from "react";
import Marquee from "react-fast-marquee";
import { FaHeart, FaBookOpen, FaFire, FaBookmark, FaEye } from "react-icons/fa";

const MostSavedLessons = ({ lessons = [] }) => {
  if (lessons.length === 0) {
    return (
      <div className="text-center py-12 bg-gradient-to-r from-pink-50 to-red-50 rounded-3xl shadow-xl p-8">
        <FaBookOpen className="w-16 h-16 text-pink-400 mx-auto mb-4" />
        <p className="text-2xl font-semibold text-gray-600">No saved lessons yet</p>
        <p className="text-gray-500 mt-2">Start creating and saving lessons!</p>
      </div>
    );
  }

  // Sort lessons by favoritesCount
  const sortedLessons = [...lessons].sort((a, b) => 
    (b.favoritesCount || 0) - (a.favoritesCount || 0)
  );

  return (
    <div className="bg-gradient-to-br from-pink-50 to-red-100 rounded-3xl shadow-2xl p-8 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full"></div>
            <FaHeart className="w-12 h-12 text-red-500 relative animate-pulse" />
          </div>
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
              Most Saved Lessons
            </h2>
            <p className="text-gray-600">Community favorites</p>
          </div>
        </div>
        <div className="bg-red-100 px-4 py-2 rounded-full">
          <span className="text-red-800 font-bold flex items-center gap-2">
            <FaFire /> Trending Now
          </span>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-200/20 to-transparent rounded-2xl"></div>
        
        <Marquee
          speed={50}
          gradient={true}
          gradientWidth={100}
          gradientColor="rgba(255, 245, 245, 0.8)"
          pauseOnHover={true}
          className="py-6"
        >
          {sortedLessons.map((lesson, index) => (
            <div
              key={lesson._id}
              className="mx-4 transition-all duration-300 hover:scale-105"
            >
              <div className="relative bg-gradient-to-br from-white to-pink-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-pink-200 min-w-[300px] group">
                {/* Hot Badge */}
                {index < 3 && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <div className="bg-gradient-to-br from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                      <FaFire className="w-3 h-3" />
                      HOT
                    </div>
                  </div>
                )}

                {/* Lesson Image */}
                <div className="relative overflow-hidden rounded-xl mb-4">
                  {lesson.image ? (
                    <>
                      <img
                        src={lesson.image}
                        alt={lesson.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </>
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-pink-300 to-red-400 rounded-xl flex items-center justify-center">
                      <FaBookOpen className="w-20 h-20 text-white/80" />
                    </div>
                  )}
                  
                  {/* Save Count Overlay */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <p className="text-red-600 font-bold flex items-center gap-1">
                      <FaHeart className="w-4 h-4" />
                      {lesson.favoritesCount || 0}
                    </p>
                  </div>
                </div>

                {/* Lesson Info */}
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-2 flex-1">
                      {lesson.title}
                    </h3>
                    <div className="bg-pink-100 text-pink-800 text-xs font-bold px-2 py-1 rounded ml-2">
                      #{index + 1}
                    </div>
                  </div>

                  {/* Creator Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      {lesson.creatorPhoto ? (
                        <img
                          src={lesson.creatorPhoto}
                          alt={lesson.creatorName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-sm font-bold">
                          {lesson.creatorName?.charAt(0) || 'U'}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">by {lesson.creatorName || lesson.createdBy}</p>
                      <p className="text-xs text-gray-500">Creator</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gradient-to-r from-pink-50 to-red-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                          <FaBookmark className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-800">{lesson.saves || 0}</p>
                          <p className="text-xs text-gray-600">Saves</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <FaEye className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-800">{lesson.views || 0}</p>
                          <p className="text-xs text-gray-600">Views</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Difficulty Level */}
                  {lesson.difficulty && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Difficulty</span>
                        <span className="font-bold capitalize">{lesson.difficulty}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            lesson.difficulty === 'beginner' 
                              ? 'bg-green-500 w-1/3'
                              : lesson.difficulty === 'intermediate'
                              ? 'bg-yellow-500 w-2/3'
                              : 'bg-red-500 w-full'
                          }`}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {lesson.tags && lesson.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {lesson.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gradient-to-r from-pink-100 to-red-100 text-pink-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {lesson.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{lesson.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Footer Stats */}
      <div className="mt-8 pt-6 border-t border-pink-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-pink-600">
              {sortedLessons.length}
            </p>
            <p className="text-gray-600">Total Lessons</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">
              {sortedLessons.reduce((sum, l) => sum + (l.favoritesCount || 0), 0)}
            </p>
            <p className="text-gray-600">Total Saves</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">
              {sortedLessons[0]?.favoritesCount || 0}
            </p>
            <p className="text-gray-600">Most Saved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostSavedLessons;