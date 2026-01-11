import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaLock, FaUserCircle, FaCalendarAlt, FaGlobe, FaStar, FaBookOpen, FaSearch, FaArrowLeft } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import useAxiosPublic from "../../Hooks/AxiosInstance";
import Loading from "../Shared/Loading/Loading";


const AuthorProfile = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const [author, setAuthor] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthorData = async () => {
      if (!email) {
        setError("No email provided");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);

        const [authorRes, lessonsRes] = await Promise.all([
          axiosPublic.get(`/authors/${email}`),
          axiosPublic.get(`/lessons/by-author/${email}`).catch(() => ({ data: [] }))
        ]);

        if (authorRes.data && authorRes.data.email) {
          setAuthor(authorRes.data);
          setLessons(lessonsRes.data || []);
        } else {
          setError("Author data not valid");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load author");
      } finally {
        setLoading(false);
      }
    };
    fetchAuthorData();
  }, [email, axiosPublic]);

  if (loading) {
    return <Loading />;
  }

  if (error || !author) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
        <div className="text-center bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10">
          <p className="text-3xl text-gray-700 dark:text-gray-300 mb-6">
            {error || "Author not found"} 😔
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium mb-8 transition-colors"
        >
          <FaArrowLeft />
          Back
        </button>

        {/* Author Header */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 mb-12 text-center">
          <div className="relative inline-block">
            {author.photoURL ? (
              <img
                src={author.photoURL}
                alt={author.name}
                className="w-40 h-40 rounded-full object-cover border-8 border-white dark:border-gray-700 shadow-xl"
              />
            ) : (
              <div className="w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-white text-6xl font-bold">
                  {author.name?.charAt(0).toUpperCase() || "A"}
                </span>
              </div>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mt-6 mb-3">
            {author.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">{author.email}</p>
          <div className="flex items-center justify-center gap-2 text-2xl font-semibold text-blue-600 dark:text-blue-400">
            <FaBookOpen className="text-3xl" />
            <span>{lessons.length} {lessons.length === 1 ? "Lesson" : "Lessons"} Published</span>
          </div>
        </div>

        {/* Lessons Grid */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-10 text-center">
          Lessons by {author.name}
        </h2>
        {lessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lessons.map((lesson) => (
              <div
                key={lesson._id}
                onClick={() => navigate(`/lesson/${lesson._id}`)}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                {lesson.image ? (
                  <img src={lesson.image} alt={lesson.title} className="w-full h-48 object-cover" />
                ) : (
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                    <FaBookOpen className="text-white text-5xl opacity-80" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {lesson.description?.substring(0, 120)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-lg">
            <FaBookOpen className="text-6xl text-gray-300 dark:text-gray-500 mx-auto mb-6" />
            <p className="text-xl text-gray-500 dark:text-gray-400">No lessons published yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorProfile;