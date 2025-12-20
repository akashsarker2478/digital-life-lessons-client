// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FaUsers,
  FaBookOpen,
  FaFlag,
  FaCalendarDay,
  FaTrophy,
  FaSpinner,
} from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";

const AdminDashboard = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLessons: 0,
    totalReported: 0,
    todayNewLessons: 0,
  });
  const [userGrowth, setUserGrowth] = useState([]);
  const [lessonCategories, setLessonCategories] = useState([]);
  const [visibilityData, setVisibilityData] = useState([]);
  const [topContributors, setTopContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);

        // Parallel API calls
        const [usersRes, lessonsRes, reportsRes] = await Promise.all([
          axiosSecure.get("/users"),
          axiosSecure.get("/lessons/all"),
          axiosSecure.get("/reports"),
        ]);

        const users = usersRes.data;
        const lessons = lessonsRes.data;
        const reports = reportsRes.data;

        // Total counts
        const totalUsers = users.length;
        const totalLessons = lessons.length;
        const uniqueReportedLessons = [
          ...new Set(reports.map((r) => r.lessonId.toString())),
        ].length;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayNewLessons = lessons.filter(
          (l) => new Date(l.createdAt) >= today
        ).length;

        setStats({
          totalUsers,
          totalLessons,
          totalReported: uniqueReportedLessons,
          todayNewLessons,
        });

        // User Growth (Last 7 days)
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          date.setHours(0, 0, 0, 0);
          const count = users.filter(
            (u) => new Date(u.joinDate) <= date
          ).length;
          last7Days.push({
            day: date.toLocaleDateString("en-US", { weekday: "short" }),
            users: count,
          });
        }
        setUserGrowth(last7Days);

        // Lesson Categories
        const categoryMap = {};
        lessons.forEach((l) => {
          const cat = l.category || "Others";
          categoryMap[cat] = (categoryMap[cat] || 0) + 1;
        });
        const categoryData = Object.entries(categoryMap).map(
          ([category, lessons]) => ({
            category,
            lessons,
          })
        );
        setLessonCategories(categoryData);

        // Visibility Pie
        const publicCount = lessons.filter(
          (l) => l.visibility !== "private"
        ).length; // default public
        const privateCount = totalLessons - publicCount;

        setVisibilityData([
          { name: "Public", value: publicCount, color: "#3b82f6" },
          { name: "Private", value: privateCount, color: "#ef4444" },
        ]);

        // Top Contributors
        const contributorMap = {};
        lessons.forEach((l) => {
          const email = l.createdBy;
          contributorMap[email] = (contributorMap[email] || 0) + 1;
        });
        const contributors = users
          .map((u) => ({
            name: u.name || u.email.split("@")[0],
            email: u.email,
            lessons: contributorMap[u.email] || 0,
          }))
          .filter((c) => c.lessons > 0)
          .sort((a, b) => b.lessons - a.lessons)
          .slice(0, 5)
          .map((c, i) => ({ ...c, rank: i + 1 }));

        setTopContributors(contributors);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        Swal.fire("Error!", "Failed to load dashboard data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-6xl text-red-600" />
        <span className="ml-4 text-2xl text-gray-600">
          Loading Dashboard...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
          Admin Dashboard Overview
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Welcome back,{" "}
          <span className="font-semibold">{user?.displayName || "Admin"}</span>!
          Monitor platform activity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Users</p>
              <h2 className="text-3xl font-bold mt-2">{stats.totalUsers}</h2>
            </div>
            <FaUsers className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Lessons</p>
              <h2 className="text-3xl font-bold mt-2">{stats.totalLessons}</h2>
            </div>
            <FaBookOpen className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Reported Lessons</p>
              <h2 className="text-3xl font-bold mt-2">{stats.totalReported}</h2>
            </div>
            <FaFlag className="w-12 h-12 text-red-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Today's New Lessons</p>
              <h2 className="text-3xl font-bold mt-2">
                {stats.todayNewLessons}
              </h2>
            </div>
            <FaCalendarDay className="w-12 h-12 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            User Growth (Last 7 Days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Lessons by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={lessonCategories}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="lessons" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Lesson Visibility
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={visibilityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                dataKey="value"
              >
                {visibilityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-3">
            <FaTrophy className="text-yellow-500" /> Top Contributors
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Rank</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Lessons</th>
                </tr>
              </thead>
              <tbody>
                {topContributors.length > 0 ? (
                  topContributors.map((c) => (
                    <tr key={c.email} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-bold text-lg">#{c.rank}</td>
                      <td className="p-3">{c.name}</td>
                      <td className="p-3 text-gray-600">{c.email}</td>
                      <td className="p-3 font-semibold text-green-600">
                        {c.lessons}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-500">
                      No lessons created yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
