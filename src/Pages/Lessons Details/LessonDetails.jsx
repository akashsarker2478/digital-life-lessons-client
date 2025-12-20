import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { 
  FaHeart, 
  FaRegHeart, 
  FaBookmark, 
  FaRegBookmark, 
  FaFlag, 
  FaCalendarAlt, 
  FaClock, 
  FaEye,
  FaShareAlt,
  FaExclamationTriangle,
  FaUserCircle,
  FaImage,
  FaSpinner,
  FaStar
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdReport, MdVisibility } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import Loading from "../Shared/Loading/Loading";

// react-share imports 
import {
  FacebookShareButton,
  LinkedinShareButton,
  FacebookIcon,
  LinkedinIcon,
} from "react-share";

const LessonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();

  const [lesson, setLesson] = useState(null);
  const [author, setAuthor] = useState(null);
  const [similarLessons, setSimilarLessons] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [viewCount] = useState(Math.floor(Math.random() * 10000));
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetchUserStatus();
    }
  }, [user]);

  const fetchUserStatus = async () => {
    try {
      const res = await axiosSecure.get(`/users/status/${user.email}`);
      setIsPremiumUser(res.data.isPremium);
    } catch (error) {
      console.error("Error fetching user status:", error);
    }
  };

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        setLoading(true);

        const [lessonRes, similarRes, commentsRes] = await Promise.allSettled([
          axiosSecure.get(`/lessons/${id}`),
          axiosSecure.get(`/lessons/similar/${id}`),
          axiosSecure.get(`/lessons/${id}/comments`)
        ]);

        if (lessonRes.status === 'fulfilled' && lessonRes.value.data) {
          const lessonData = lessonRes.value.data;
          setLesson(lessonData);

          if (user?.email) {
            setLiked(lessonData.likes?.includes(user.email) || false);
            setFavorited(lessonData.favorites?.includes(user.email) || false);
          }

          if (lessonData.createdBy) {
            try {
              const authorRes = await axiosSecure.get(`/authors/${lessonData.createdBy}`);
              setAuthor(authorRes.data);
            } catch (authorError) {
              setAuthor({
                name: lessonData.creatorName || lessonData.createdBy?.split('@')[0] || "Unknown Author", // fallback from lesson data
                photoURL: lessonData.creatorPhoto || null,
                email: lessonData.createdBy,
                totalLessons: 0
              });
            }
          }
        }

        if (similarRes.status === 'fulfilled') {
          setSimilarLessons(similarRes.value.data || []);
        }

        if (commentsRes.status === 'fulfilled') {
          setComments(commentsRes.value.data?.comments || []);
        }

      } catch (err) {
        console.error("Error fetching lesson data:", err);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };

    fetchLessonData();
  }, [id, axiosSecure, user]);

  const showSuccess = (message) => {
    Swal.fire({ icon: 'success', title: 'Success!', text: message, timer: 2000, showConfirmButton: false });
  };

  const showError = (message) => {
    Swal.fire({ icon: 'error', title: 'Error!', text: message });
  };

  const showInfo = (message) => {
    Swal.fire({ icon: 'info', title: 'Info', text: message });
  };

  const handleLike = async () => {
    if (!user) return showInfo("Please log in to like this lesson");
    try {
      const res = await axiosSecure.patch(`/lessons/${id}/like`);
      setLesson(prev => ({ ...prev, likesCount: res.data.likesCount }));
      setLiked(!liked);
      showSuccess(liked ? "Like removed" : "Lesson liked!");
    } catch (err) {
      showError("Failed to update like");
    }
  };

  const handleFavorite = async () => {
    if (!user) return showInfo("Please log in to save to favorites");
    try {
      const res = await axiosSecure.patch(`/lessons/${id}/favorite`);
      setLesson(prev => ({ ...prev, favoritesCount: res.data.favoritesCount }));
      setFavorited(!favorited);
      showSuccess(favorited ? "Removed from favorites" : "Added to favorites!");
    } catch (err) {
      showError("Failed to update favorites");
    }
  };

  const handleReport = async () => {
    if (!user) return showInfo("Please log in to report a lesson");

    const { value: reason } = await Swal.fire({
      title: 'Report This Lesson',
      input: 'select',
      inputOptions: {
        "Inappropriate Content": "Inappropriate Content",
        "Hate Speech or Harassment": "Hate Speech or Harassment",
        "Misleading or False Information": "Misleading or False Information",
        "Spam or Promotional Content": "Spam or Promotional Content",
        "Sensitive or Disturbing Content": "Sensitive or Disturbing Content",
        "Other": "Other"
      },
      inputPlaceholder: 'Select a reason',
      showCancelButton: true,
      confirmButtonText: 'Submit Report',
      cancelButtonText: 'Cancel',
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage('Please select a reason');
        }
        return value;
      }
    });

    if (reason) {
      try {
        await axiosSecure.post('/lessons/report', {
          lessonId: lesson._id,
          reason,
          reportedUserEmail: lesson.createdBy
        });
        Swal.fire('Report Submitted!', 'Thank you for helping us maintain a safe community.', 'success');
      } catch {
        showError("Failed to submit report");
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) return showInfo("Please log in to add a comment");
    if (!commentText.trim()) return showInfo("Please write a comment");

    setSubmittingComment(true);
    try {
      const res = await axiosSecure.post(`/lessons/${id}/comment`, { text: commentText });
      const commentWithUser = {
        ...res.data,
        userPhoto: user.photoURL || null
      };
      setComments(prev => [commentWithUser, ...prev]);
      setCommentText("");
      showSuccess("Comment added successfully!");
    } catch (error) {
      showError("Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleUpgradeClick = () => {
    navigate("/dashboard/pricing");
  };

  if (loading) return <Loading />;

  if (!lesson) {
    return (
      <div data-aos="fade-up" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center p-12 bg-white rounded-3xl shadow-2xl max-w-lg">
          <FaExclamationTriangle className="text-6xl text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Lesson Not Found</h2>
          <p className="text-gray-600 mb-8">The lesson you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate('/')} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition">
            Browse Lessons
          </button>
        </div>
      </div>
    );
  }

  const shouldBlurContent = lesson.isPremium && !isPremiumUser;
  const estimatedReadingTime = Math.ceil((lesson.description?.split(" ").length || 300) / 200);
  const shareUrl = window.location.href;
  const shareTitle = lesson.title;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Premium Banner */}
        {shouldBlurContent && (
          <div data-aos="fade-up" data-aos-delay="100" className="mb-10 bg-gradient-to-r from-amber-500 to-pink-600 rounded-3xl p-8 text-white shadow-2xl text-center">
            <div className="flex flex-col items-center gap-4">
              <FaLock className="text-5xl" />
              <h2 className="text-3xl font-bold">This is a Premium Lesson</h2>
              <p className="text-xl opacity-90">Upgrade to unlock exclusive content and wisdom</p>
              <button 
                onClick={handleUpgradeClick}
                className="px-10 py-4 bg-white text-pink-600 font-bold rounded-2xl hover:scale-105 transition shadow-lg"
              >
                Upgrade to Premium
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div data-aos="fade-down" data-aos-delay="200" className={`bg-white rounded-3xl shadow-2xl overflow-hidden ${shouldBlurContent ? 'opacity-60 pointer-events-none' : ''}`}>

          {/* Featured Image */}
          <div className="relative h-96 overflow-hidden">
            {lesson.image ? (
              <img src={lesson.image} alt={lesson.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <FaImage className="text-white text-8xl opacity-50" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl">{lesson.title}</h1>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 bg-blue-600 rounded-full text-sm font-medium">{lesson.category}</span>
                <span className="px-4 py-2 bg-purple-600 rounded-full text-sm font-medium">{lesson.tone}</span>
                {lesson.isPremium && <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-sm font-bold">Premium</span>}
              </div>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="300" className="p-8 md:p-12">
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-10">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-indigo-500" />
                <span>{new Date(lesson.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-purple-500" />
                <span>{estimatedReadingTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <MdVisibility className="text-green-500" />
                <span>{lesson.visibility || "Public"}</span>
              </div>
            </div>

            {/* Description */}
            <div data-aos="fade-up" data-aos-delay="400" className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{lesson.description}</p>
            </div>

            {/* Author Section */}
            <div data-aos="fade-left" data-aos-delay="500" className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">About the Creator</h3>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  {author?.photoURL ? (
                    <img src={author.photoURL} alt={author.name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl" />
                  ) : (
                    <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                      <FaUserCircle className="text-white text-6xl" />
                    </div>
                  )}
                  {lesson.isFeatured && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <FaStar /> Featured Creator
                    </div>
                  )}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">{author?.name || "Unknown Author"}</h4>
                  <p className="text-gray-600 mb-4">{author?.email || lesson.createdBy}</p>
                  <p className="text-xl text-gray-700 mb-6">
                    <span className="font-bold text-2xl text-indigo-600">{author?.totalLessons || 0}</span> lessons shared with the community
                  </p>
                  <button
                    onClick={() => navigate(`/author/${lesson.createdBy}`)}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-2xl transition transform hover:scale-105"
                  >
                    View All Lessons by This Author
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div data-aos="fade-up" data-aos-delay="600" className="bg-gradient-to-br from-red-50 to-pink-50 p-8 rounded-3xl text-center shadow-lg">
                <FaHeart className="text-5xl text-red-500 mx-auto mb-4" />
                <p className="text-4xl font-bold text-gray-900">{lesson.likesCount || 0}</p>
                <p className="text-gray-600">Likes</p>
              </div>
              <div data-aos="fade-up" data-aos-delay="700" className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-3xl text-center shadow-lg">
                <FaBookmark className="text-5xl text-yellow-500 mx-auto mb-4" />
                <p className="text-4xl font-bold text-gray-900">{lesson.favoritesCount || 0}</p>
                <p className="text-gray-600">Saved</p>
              </div>
              <div data-aos="fade-up" data-aos-delay="800" className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl text-center shadow-lg">
                <FaEye className="text-5xl text-blue-500 mx-auto mb-4" />
                <p className="text-4xl font-bold text-gray-900">{viewCount.toLocaleString()}</p>
                <p className="text-gray-600">Views</p>
              </div>
            </div>

            {/* Interaction Buttons */}
            <div data-aos="fade-up" data-aos-delay="900" className="flex flex-wrap justify-center gap-6 mb-12">
              <button onClick={handleLike} className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-2xl ${liked ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {liked ? <FaHeart /> : <FaRegHeart />}
                {liked ? 'Liked' : 'Like'}
              </button>

              <button onClick={handleFavorite} className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-2xl ${favorited ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {favorited ? <FaBookmark /> : <FaRegBookmark />}
                {favorited ? 'Saved' : 'Save'}
              </button>

              <button onClick={handleReport} className="flex items-center gap-3 px-8 py-4 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-2xl font-bold transition-all shadow-lg hover:shadow-2xl">
                <FaFlag />
                Report
              </button>
            </div>

            {/* Social Share */}
            <div data-aos="zoom-in" data-aos-delay="1000" className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-10 mb-12 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Share This Lesson</h3>
              <div className="flex justify-center gap-10">
                {/* Facebook */}
                <FacebookShareButton url={shareUrl} quote={shareTitle}>
                  <div className="flex flex-col items-center gap-2 hover:scale-110 transition">
                    <FacebookIcon size={60} round />
                    <span className="text-sm font-medium text-gray-700">Facebook</span>
                  </div>
                </FacebookShareButton>

                {/* X (Custom) */}
                <a 
                  href={`https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 hover:scale-110 transition"
                >
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-lg">
                    <FaXTwitter className="text-white text-4xl" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">X</span>
                </a>

                {/* LinkedIn */}
                <LinkedinShareButton url={shareUrl} title={shareTitle} summary={lesson.description}>
                  <div className="flex flex-col items-center gap-2 hover:scale-110 transition">
                    <LinkedinIcon size={60} round />
                    <span className="text-sm font-medium text-gray-700">LinkedIn</span>
                  </div>
                </LinkedinShareButton>
              </div>
            </div>

            {/* Comments Section */}
            <div data-aos="fade-up" data-aos-delay="1100" className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Comments ({comments.length})</h3>
              {user && (
                <form onSubmit={handleCommentSubmit} className="bg-gray-50 rounded-3xl p-8 mb-10">
                  <div className="flex gap-6">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="You" className="w-16 h-16 rounded-full object-cover" />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">{user.email?.charAt(0).toUpperCase()}</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="w-full p-6 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 resize-none text-lg"
                        rows="5"
                        disabled={submittingComment}
                      />
                      <div className="mt-4 flex justify-end">
                        <button
                          type="submit"
                          disabled={submittingComment || !commentText.trim()}
                          className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-xl transition disabled:opacity-50"
                        >
                          {submittingComment ? "Posting..." : "Post Comment"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* Comments List */}
              {comments.length > 0 ? (
                <div className="space-y-6">
                  {comments.map((comment, index) => (
                    <div key={index} data-aos="fade-up" data-aos-delay={1200 + index * 100} className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-lg transition">
                      <div className="flex gap-6">
                        {comment.userPhoto ? (
                          <img src={comment.userPhoto} alt={comment.userName} className="w-14 h-14 rounded-full object-cover" />
                        ) : (
                          <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">{comment.userName?.charAt(0) || "U"}</span>
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-gray-900">{comment.userName || comment.userId?.split("@")[0]}</h4>
                            <p className="text-sm text-gray-500">
                              {new Date(comment.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{comment.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-3xl">
                  <FaUserCircle className="text-6xl text-gray-300 mx-auto mb-6" />
                  <p className="text-xl text-gray-500">No comments yet</p>
                  <p className="text-gray-400 mt-2">Be the first to share your thoughts!</p>
                </div>
              )}
            </div>

            {/* Similar Lessons */}
            {similarLessons.length > 0 && (
              <div data-aos="fade-up" data-aos-delay="1300">
                <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center">Similar Lessons You Might Like</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {similarLessons.map((similar, index) => (
                    <div
                      key={similar._id}
                      data-aos="fade-up"
                      data-aos-delay={1400 + index * 100}
                      onClick={() => navigate(`/lesson/${similar._id}`)}
                      className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group"
                    >
                      {similar.image ? (
                        <img src={similar.image} alt={similar.title} className="w-full h-56 object-cover group-hover:scale-105 transition" />
                      ) : (
                        <div className="w-full h-56 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                          <FaImage className="text-white text-5xl opacity-50" />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex gap-3 mb-4">
                          <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">{similar.category}</span>
                          {similar.isPremium && <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">Premium</span>}
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition">
                          {similar.title}
                        </h4>
                        <p className="text-gray-600 line-clamp-3 mb-4">{similar.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="flex items-center gap-1"><FaHeart className="text-red-400" /> {similar.likesCount || 0}</span>
                          <span className="flex items-center gap-1"><FaBookmark className="text-yellow-400" /> {similar.favoritesCount || 0}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;