// ManageLessons.jsx
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaTrashAlt, FaStar, FaSpinner } from "react-icons/fa";

const ManageLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        setError(null);

        // সব lessons fetch করো
        const lessonsRes = await axiosSecure.get("/lessons/public");
        let allLessons = lessonsRes.data;

        // প্রত্যেক lesson-এর report count যোগ করো
        const reportsRes = await axiosSecure.get("/reports");
        const reports = reportsRes.data;

        const reportCountMap = {};
        reports.forEach((report) => {
          const lessonId = report.lessonId.toString();
          reportCountMap[lessonId] = (reportCountMap[lessonId] || 0) + 1;
        });

        // Author name যোগ করার জন্য users fetch (optional কিন্তু সুন্দর লাগবে)
        const usersRes = await axiosSecure.get("/users");
        const users = usersRes.data;
        const userMap = {};
        users.forEach((u) => {
          userMap[u.email] = u.name || u.email.split("@")[0];
        });

        const enrichedLessons = allLessons.map((lesson) => ({
          ...lesson,
          _id: lesson._id.toString(),
          authorName: userMap[lesson.createdBy] || "Unknown",
          reportCount: reportCountMap[lesson._id] || 0,
          isFeatured: lesson.isFeatured || false,
        }));

        setLessons(enrichedLessons);
      } catch (err) {
        console.error("Error fetching lessons:", err);
        setError("Failed to load lessons. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [axiosSecure]);

  const handleDeleteLesson = (lesson) => {
    Swal.fire({
      title: "Delete Lesson?",
      text: `"${lesson.title}" will be permanently deleted!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/lessons/${lesson._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Lesson has been removed.", "success");
              setLessons((prev) => prev.filter((l) => l._id !== lesson._id));
            }
          })
          .catch((err) => {
            Swal.fire("Error!", "Failed to delete lesson.", "error");
          });
      }
    });
  };

 const handleToggleFeatured = (lesson) => {
  const newStatus = !lesson.isFeatured;

  Swal.fire({
    title: newStatus ? "Make Featured?" : "Remove Featured?",
    text: lesson.title,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      axiosSecure.patch(`/lessons/${lesson._id}/featured`)
        .then((res) => {
          Swal.fire("Success!", res.data.message, "success");
          setLessons(prev => prev.map(l => 
            l._id === lesson._id ? { ...l, isFeatured: newStatus } : l
          ));
        })
        .catch(() => Swal.fire("Error!", "Failed to update", "error"));
    }
  });
};

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <FaSpinner className="animate-spin text-5xl text-red-600" />
        <span className="ml-4 text-xl text-gray-600">Loading Lessons...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-red-600 text-2xl">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Manage Lessons
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Moderate and control all lessons on the platform
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="w-full text-left">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Author</th>
              <th className="p-4">Category</th>
              <th className="p-4">Created</th>
              <th className="p-4 text-center">Likes</th>
              <th className="p-4 text-center">Favorites</th>
              <th className="p-4 text-center">Reports</th>
              <th className="p-4 text-center">Featured</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.length > 0 ? (
              lessons.map((lesson) => (
                <tr key={lesson._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium max-w-xs truncate">{lesson.title}</td>
                  <td className="p-4 text-gray-600">{lesson.authorName}</td>
                  <td className="p-4">{lesson.category || "Uncategorized"}</td>
                  <td className="p-4 text-gray-600">
                    {new Date(lesson.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center">{lesson.likesCount || 0}</td>
                  <td className="p-4 text-center">{lesson.favoritesCount || 0}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${
                        lesson.reportCount > 0
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {lesson.reportCount}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {lesson.isFeatured ? (
                      <FaStar className="text-yellow-500 text-xl mx-auto" />
                    ) : (
                      <FaStar className="text-gray-300 text-xl mx-auto" />
                    )}
                  </td>
                  <td className="p-4 flex gap-3 justify-center">
                    <button
                      onClick={() => handleToggleFeatured(lesson)}
                      className={`px-4 py-2 rounded-lg text-white font-medium transition-all ${
                        lesson.isFeatured
                          ? "bg-orange-500 hover:bg-orange-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {lesson.isFeatured ? "Unfeature" : "Feature"}
                    </button>
                    <button
                      onClick={() => handleDeleteLesson(lesson)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all flex items-center gap-2"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-8 text-center text-gray-500 text-lg">
                  No lessons found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLessons;