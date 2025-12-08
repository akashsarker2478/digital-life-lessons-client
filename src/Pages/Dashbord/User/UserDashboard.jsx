import React from 'react';
import { 
  FaChartBar, 
  FaBookOpen, 
  FaHeart, 
  FaClock,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaPlus
} from 'react-icons/fa';

const UserDashboard = () => {
    return (
        <div>
            {/* Welcome Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome back, John! 👋
                </h2>
                <p className="text-gray-600">
                    Here's what's happening with your learning journey today.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Lessons Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <FaBookOpen className="text-blue-600 text-xl" />
                        </div>
                        <div className="text-green-600 text-sm font-semibold flex items-center">
                            <FaArrowUp className="mr-1" />
                            +12%
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">12</h3>
                    <p className="text-gray-600">Total Lessons Created</p>
                </div>

                {/* Favorites Card */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <FaHeart className="text-purple-600 text-xl" />
                        </div>
                        <div className="text-green-600 text-sm font-semibold flex items-center">
                            <FaArrowUp className="mr-1" />
                            +8%
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">8</h3>
                    <p className="text-gray-600">Saved Favorites</p>
                </div>

                {/* Recent Activity Card */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <FaClock className="text-green-600 text-xl" />
                        </div>
                        <div className="text-blue-600 text-sm font-semibold flex items-center">
                            3 Today
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">15</h3>
                    <p className="text-gray-600">This Week's Activity</p>
                </div>

                {/* Views Card */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <FaEye className="text-orange-600 text-xl" />
                        </div>
                        <div className="text-green-600 text-sm font-semibold flex items-center">
                            <FaArrowUp className="mr-1" />
                            +24%
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">245</h3>
                    <p className="text-gray-600">Total Lesson Views</p>
                </div>
            </div>

            {/* Analytics Chart Placeholder */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <FaChartBar className="text-blue-500" />
                        Weekly Analytics
                    </h3>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Last 3 Months</option>
                    </select>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                            <FaChartBar className="text-gray-300 text-5xl mx-auto mb-4" />
                            <p className="text-gray-500">Analytics chart will appear here</p>
                            <p className="text-gray-400 text-sm mt-1">Weekly reflections and contributions data</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Lessons & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Lessons */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Recently Added Lessons</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                                    <FaBookOpen className="text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900">The Power of Reflection</h4>
                                    <p className="text-sm text-gray-600">Added 2 days ago</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Public</span>
                                    <button className="text-blue-600 hover:text-blue-800">
                                        <FaEye />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-300 text-left">
                            <FaPlus className="text-blue-600 text-xl mb-2" />
                            <h4 className="font-medium text-gray-900">Add New Lesson</h4>
                            <p className="text-sm text-gray-600 mt-1">Share your wisdom</p>
                        </button>
                        <button className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-300 text-left">
                            <FaBookOpen className="text-purple-600 text-xl mb-2" />
                            <h4 className="font-medium text-gray-900">Browse Lessons</h4>
                            <p className="text-sm text-gray-600 mt-1">Learn from others</p>
                        </button>
                        <button className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-md transition-all duration-300 text-left">
                            <FaHeart className="text-green-600 text-xl mb-2" />
                            <h4 className="font-medium text-gray-900">View Favorites</h4>
                            <p className="text-sm text-gray-600 mt-1">Your saved lessons</p>
                        </button>
                        <button className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:shadow-md transition-all duration-300 text-left">
                            <FaChartBar className="text-orange-600 text-xl mb-2" />
                            <h4 className="font-medium text-gray-900">View Analytics</h4>
                            <p className="text-sm text-gray-600 mt-1">Track your progress</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;