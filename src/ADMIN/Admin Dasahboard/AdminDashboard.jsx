// AdminDashboard.jsx (or AdminHome.jsx)
import React from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FaUsers, FaBookOpen, FaFlag, FaCalendarDay, FaTrophy } from "react-icons/fa";

const AdminDashboard = () => {
  // Mock Data (backend থেকে fetch করার জন্য placeholder)
  const totalUsers = 1248;
  const totalLessons = 342;
  const totalReported = 18;
  const todayNewLessons = 12;

  // User Growth Data (Last 7 days)
  const userGrowthData = [
    { day: "Mon", users: 1100 },
    { day: "Tue", users: 1150 },
    { day: "Wed", users: 1180 },
    { day: "Thu", users: 1200 },
    { day: "Fri", users: 1215 },
    { day: "Sat", users: 1230 },
    { day: "Sun", users: 1248 },
  ];

  // Lesson Growth by Category (Mock)
  const lessonCategoryData = [
    { category: "Technology", lessons: 120 },
    { category: "Health", lessons: 85 },
    { category: "Finance", lessons: 60 },
    { category: "Lifestyle", lessons: 45 },
    { category: "Education", lessons: 32 },
  ];

  // Pie Chart for Lesson Distribution
  const pieData = [
    { name: "Public", value: 300, color: "#3b82f6" },
    { name: "Private", value: 42, color: "#ef4444" },
  ];

  // Top Contributors (Most active)
  const topContributors = [
    { rank: 1, name: "Rahim Khan", lessons: 45, email: "rahim@example.com" },
    { rank: 2, name: "Ayesha Siddika", lessons: 38, email: "ayesha@example.com" },
    { rank: 3, name: "Karim Ahmed", lessons: 32, email: "karim@example.com" },
    { rank: 4, name: "Fatima Begum", lessons: 28, email: "fatima@example.com" },
    { rank: 5, name: "Omar Faruk", lessons: 25, email: "omar@example.com" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
          Admin Dashboard Overview
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Monitor platform activity at a glance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Users</p>
              <h2 className="text-3xl font-bold mt-2">{totalUsers}</h2>
            </div>
            <FaUsers className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Lessons</p>
              <h2 className="text-3xl font-bold mt-2">{totalLessons}</h2>
            </div>
            <FaBookOpen className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Reported Lessons</p>
              <h2 className="text-3xl font-bold mt-2">{totalReported}</h2>
            </div>
            <FaFlag className="w-12 h-12 text-red-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Today's New Lessons</p>
              <h2 className="text-3xl font-bold mt-2">{todayNewLessons}</h2>
            </div>
            <FaCalendarDay className="w-12 h-12 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Growth Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">User Growth (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Lesson Categories Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Lessons by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={lessonCategoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="lessons" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row: Pie Chart + Top Contributors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Lesson Visibility Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Contributors Table */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-3">
            <FaTrophy className="text-yellow-500" /> Most Active Contributors
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Rank</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Lessons Created</th>
                </tr>
              </thead>
              <tbody>
                {topContributors.map((contributor) => (
                  <tr key={contributor.rank} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-bold text-lg">#{contributor.rank}</td>
                    <td className="p-3">{contributor.name}</td>
                    <td className="p-3 text-gray-600">{contributor.email}</td>
                    <td className="p-3 font-semibold text-blue-600">{contributor.lessons}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
