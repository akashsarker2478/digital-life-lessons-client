import React from "react";
import Marquee from "react-fast-marquee";
import { FaUserCircle, FaTrophy, FaCrown } from "react-icons/fa";

const TopContributors = ({ contributors = [] }) => {
  if (contributors.length === 0) {
    return (
      <div className="text-center py-12 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-indigo-950 dark:to-purple-950 rounded-3xl shadow-xl p-8 border border-yellow-200 dark:border-indigo-800">
        <FaTrophy className="w-16 h-16 text-yellow-400 dark:text-indigo-400 mx-auto mb-4" />
        <p className="text-2xl font-semibold text-gray-600 dark:text-gray-300">No contributors yet</p>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Be the first to create lessons!</p>
      </div>
    );
  }

  // Sort contributors by lessonsCount
  const sortedContributors = [...contributors].sort((a, b) => b.lessonsCount - a.lessonsCount);

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-indigo-950 dark:to-purple-950 rounded-3xl shadow-2xl p-8 overflow-hidden border border-yellow-200 dark:border-indigo-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <FaTrophy className="w-12 h-12 text-yellow-500 dark:text-indigo-400 animate-bounce" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 dark:bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">🔥</span>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Top Contributors
            </h2>
            <p className="text-gray-600 dark:text-gray-400">This week's leaderboard</p>
          </div>
        </div>
        <div className="bg-yellow-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full">
          <span className="text-yellow-800 dark:text-indigo-300 font-bold">🏆 Weekly Ranking</span>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gold Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/20 dark:via-indigo-700/20 to-transparent rounded-2xl"></div>
        
        <Marquee
          speed={60}
          gradient={true}
          gradientWidth={100}
          gradientColor="rgba(255, 247, 237, 0.8)"
          pauseOnHover={true}
          className="py-6"
        >
          {sortedContributors.map((contributor, index) => (
            <div
              key={contributor.email}
              className="mx-4 transition-all duration-300 hover:scale-105"
            >
              <div className="relative bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-indigo-950 rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-yellow-200 dark:border-indigo-800 min-w-[280px]">
                {/* Rank Badge */}
                <div className="absolute -top-3 -left-3">
                  {index === 0 && (
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-indigo-500 dark:to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <FaCrown className="w-6 h-6 text-white" />
                    </div>
                  )}
                  {index === 1 && (
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-500 dark:to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">2</span>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-800 dark:from-indigo-700 dark:to-purple-800 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                  )}
                  {index > 2 && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-indigo-600 dark:to-purple-700 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                  )}
                </div>

                {/* Contributor Info */}
                <div className="flex flex-col items-center">
                  {/* Avatar */}
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl">
                      {contributor.photoURL ? (
                        <img
                          src={contributor.photoURL}
                          alt={contributor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                          <FaUserCircle className="w-16 h-16 text-white" />
                        </div>
                      )}
                    </div>
                    {/* Online Status */}
                    <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 dark:bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>

                  {/* Name and Stats */}
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1 text-center">
                    {contributor.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{contributor.email}</p>
                  
                  {/* Lessons Count */}
                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-indigo-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-yellow-500 dark:bg-indigo-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">📚</span>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-orange-700 dark:text-indigo-300">
                          {contributor.lessonsCount}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Lessons Created</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full mt-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{Math.min(100, (contributor.lessonsCount / 10) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-indigo-500 dark:to-purple-600 rounded-full"
                        style={{ width: `${Math.min(100, (contributor.lessonsCount / 10) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Footer Stats */}
      <div className="mt-8 pt-6 border-t border-yellow-200 dark:border-indigo-800">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-600 dark:text-indigo-400">
              {sortedContributors.length}
            </p>
            <p className="text-gray-600 dark:text-gray-400">Total Contributors</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600 dark:text-indigo-300">
              {sortedContributors.reduce((sum, c) => sum + c.lessonsCount, 0)}
            </p>
            <p className="text-gray-600 dark:text-gray-400">Total Lessons</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600 dark:text-purple-400">
              {sortedContributors[0]?.lessonsCount || 0}
            </p>
            <p className="text-gray-600 dark:text-gray-400">Top Score</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopContributors;