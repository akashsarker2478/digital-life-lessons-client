import React from "react";
import { Link } from "react-router"; 
import { 
    FaChartBar, 
    FaBookOpen, 
    FaHeart, 
    FaClock, 
    FaArrowUp, 
    FaEye, 
    FaPlus,
    FaUserCircle, 
    FaTag 
} from "react-icons/fa";
import UseAuth from "../../../Hooks/UseAuth"; 

const UserDashboard = () => {
    const { user } = UseAuth(); 
    
    // --- Dummy Data (Replace with API data) ---
    const stats = [
        { title: "Total Lessons Created", value: 12, icon: FaBookOpen, color: "blue", change: "+12%" },
        { title: "Total Saved (Favorites)", value: 8, icon: FaHeart, color: "purple", change: "+8%" },
        { title: "This Week's Activity", value: 15, icon: FaClock, color: "green", change: "3 Today" },
        { title: "Total Lesson Views", value: 245, icon: FaEye, color: "orange", change: "+24%" },
    ];

    const recentLessons = [
        { title: "The Power of Reflection", time: "2 days ago", status: "Public", link: '/dashboard/my-lessons/1' },
        { title: "Handling Career Mistakes", time: "5 hours ago", status: "Private", link: '/dashboard/my-lessons/2' },
        { title: "Mindset for Growth", time: "1 day ago", status: "Public", link: '/dashboard/my-lessons/3' },
    ];

    return (
        <div className="space-y-10 p-4 md:p-6 bg-white rounded-xl shadow-lg border border-gray-100">

            {/* Welcome Section */}
            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        {user?.displayName || 'User'}
                    </span>! 👋
                </h2>
                <p className="text-gray-600">
                    Here is a quick overview of your learning journey today.
                </p>
            </div>

            {/* Stats Cards: Total lessons created, Total saved */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div 
                        key={index} 
                        className={`bg-white rounded-xl p-6 border shadow-md border-${stat.color}-200 hover:shadow-lg transition duration-200`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center shadow-inner`}>
                                <stat.icon className={`text-${stat.color}-600 text-xl`} />
                            </div>
                            {/* Change/Activity */}
                            <div className={`text-sm font-semibold flex items-center ${stat.change.includes('+') ? 'text-green-600' : 'text-blue-600'}`}>
                                {stat.change.includes('+') && <FaArrowUp className="mr-1" />}
                                {stat.change}
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                        <p className="text-gray-600">{stat.title}</p>
                    </div>
                ))}
            </div>

            {/* Analytics Chart & Quick Actions Group */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Analytics Chart Placeholder (Weekly/Monthly reflections/contributions) */}
                <div className="lg:col-span-2 bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-inner">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
                        <FaChartBar className="text-blue-500" />
                        Weekly Analytics
                    </h3>
                    <div className="h-64 flex items-center justify-center border-dashed border-2 border-gray-300 rounded-lg">
                        <div className="text-center">
                            <FaChartBar className="text-gray-300 text-5xl mx-auto mb-4" />
                            <p className="text-gray-500">Analytics chart will appear here</p>
                            <p className="text-gray-400 text-sm mt-1">Weekly reflections and contributions data</p>
                        </div>
                    </div>
                </div>

                {/* Quick Shortcuts to important actions */}
                <div className="lg:col-span-1 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Quick Shortcuts
                    </h3>
                    
                    {/* Quick Shortcut 1: Add Lesson */}
                    <Link 
                        to={'/dashboard/add-lessons'} 
                        className={`block p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition duration-300 text-left`}
                    >
                        <FaPlus className={`text-blue-600 text-xl mb-2`} />
                        <h2 className="font-medium text-gray-900">Add New Lesson</h2>
                        <p className="text-sm text-gray-600 mt-1">Share your wisdom</p>
                    </Link>
                    
                    {/* Quick Shortcut 2: My Favorites */}
                    <Link 
                        to={'/dashboard/my-favorites'} 
                        className={`block p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg transition duration-300 text-left`}
                    >
                        <FaHeart className={`text-purple-600 text-xl mb-2`} />
                        <h4 className="font-medium text-gray-900">My Favorites</h4>
                        <p className="text-sm text-gray-600 mt-1">View your saved lessons</p>
                    </Link>

                    {/* Additional Quick Action (Example) */}
                    <Link 
                        to={'/dashboard/my-lessons'} 
                        className={`block p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-lg transition duration-300 text-left`}
                    >
                        <FaBookOpen className={`text-green-600 text-xl mb-2`} />
                        <h4 className="font-medium text-gray-900">Manage My Lessons</h4>
                        <p className="text-sm text-gray-600 mt-1">Update or delete your content</p>
                    </Link>
                </div>
            </div>
            
            {/* Recently added lessons */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-inner">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Recently Added Lessons
                </h3>
                <div className="space-y-4">
                    {recentLessons.map((lesson, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 transition duration-150"
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <FaTag className="text-blue-600 text-lg" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                                <p className="text-xs text-gray-500">Added: {lesson.time}</p>
                            </div>
                            <span className={`px-3 py-1 text-xs rounded-full font-semibold ${lesson.status === 'Public' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {lesson.status}
                            </span>
                            <Link to={lesson.link} className="text-gray-500 hover:text-blue-600 transition tooltip" data-tip="View Details">
                                <FaEye />
                            </Link>
                        </div>
                    ))}
                    {recentLessons.length === 0 && (
                        <p className="text-center text-gray-500 py-4">You have not created any lessons recently.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;