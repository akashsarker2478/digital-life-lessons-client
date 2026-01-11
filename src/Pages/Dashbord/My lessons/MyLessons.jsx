import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import Loading from "../../Shared/Loading/Loading";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";

const MyLessons = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    data: lessons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myLessons", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons/my");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This lesson will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/lessons/${id}`);
        Swal.fire("Deleted!", "Your lesson has been deleted.", "success");
        refetch();
      } catch (error) {
        Swal.fire("Error", "Failed to delete lesson", "error");
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <title>My Lessons</title>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">My Lessons</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage, update and track your life lessons
        </p>
      </div>

      {lessons.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            You haven’t created any lessons yet 🌱
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-left">
                <th className="p-4">Title</th>
                <th className="p-4">Visibility</th>
                <th className="p-4">Access</th>
                <th className="p-4">Created</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {lessons.map((lesson) => (
                <tr
                  key={lesson._id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-4 font-semibold text-gray-800 dark:text-gray-100">
                    {lesson.title}
                  </td>

                  <td className="p-4 capitalize">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        lesson.privacy === "public"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {lesson.privacy}
                    </span>
                  </td>

                  <td className="p-4 capitalize">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        lesson.accessLevel === "premium"
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                          : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      }`}
                    >
                      {lesson.accessLevel}
                    </span>
                  </td>

                  <td className="p-4 text-gray-600 dark:text-gray-400">
                    {new Date(
                      lesson.createdAt || Date.now()
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      {/* View */}
                      <button
                        onClick={() => navigate(`/lesson/${lesson._id}`)}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                      >
                        <FaEye /> View
                      </button>

                      {/* Update */}
                      <button
                        onClick={() =>
                          navigate(
                            `/dashboard/add-lessons?id=${lesson._id}`
                          )
                        }
                        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                      >
                        <FaEdit /> Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(lesson._id)}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyLessons;