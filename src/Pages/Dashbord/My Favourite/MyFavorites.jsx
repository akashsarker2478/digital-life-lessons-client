import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import Loading from "../../Shared/Loading/Loading";
import Swal from "sweetalert2";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router";

const MyFavourites = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["myFavourites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons/favorites");
      return res.data;
    },
  });

  const handleToggleFavorite = async (lessonId) => {
    try {
      const res = await axiosSecure.patch(`/lessons/${lessonId}/favorite`);
      Swal.fire({
        icon: "success",
        title: "Favorites Updated!",
        text: res.data.message,
        timer: 1200,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["myFavourites", user?.email]);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not update favorite",
      });
    }
  };

  const handleView = (id) => navigate(`/lesson/${id}`);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Favourite Lessons</h2>

      {lessons.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          No favourite lessons yet <span className="text-red-500">❤️</span>
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Created Date</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{lesson.title}</td>
                  <td className="p-3 border">{lesson.category}</td>
                  <td className="p-3 border">
                    {new Date(lesson.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border space-x-2 flex items-center">
                    <button
                      onClick={() => handleView(lesson._id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleToggleFavorite(lesson._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                    >
                      {lesson.favorites?.includes(user.email) ? (
                        <>
                          <FaHeart /> Unfavorite
                        </>
                      ) : (
                        <>
                          <FaRegHeart /> Favorite
                        </>
                      )}
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

export default MyFavourites;
