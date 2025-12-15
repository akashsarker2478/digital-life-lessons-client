import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import Loading from "../../Shared/Loading/Loading";

const MyLessons = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: lessons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myLessons", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      try {
        await axiosSecure.delete(`/lessons/${id}`);
        alert("Lesson deleted successfully");
        refetch();
      } catch (error) {
        console.error(error);
        alert("Failed to delete lesson");
      }
    }
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Lessons</h2>

      {lessons.length === 0 ? (
        <p className="text-gray-500">You have not created any lessons yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Visibility</th>
                <th className="p-3 border">Access Level</th>
                <th className="p-3 border">Created Date</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{lesson.title}</td>
                  <td className="p-3 border">{lesson.privacy}</td>
                  <td className="p-3 border">{lesson.accessLevel}</td>
                  <td className="p-3 border">
                    {new Date(
                      lesson.createdAt || Date.now()
                    ).toLocaleDateString()}
                  </td>
                  <td className="p-3 border space-x-2">
                    <button
                      onClick={() =>
                        (window.location.href = `/dashboard/my-lessons/${lesson._id}`)
                      }
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        (window.location.href = `/dashboard/add-lessons?id=${lesson._id}`)
                      }
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(lesson._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
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
