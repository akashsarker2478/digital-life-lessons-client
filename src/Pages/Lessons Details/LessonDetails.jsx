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
  FaEdit,
  FaEye,
  FaShareAlt,
  FaExclamationTriangle,
  FaUserCircle,
  FaImage,
  FaSpinner
} from "react-icons/fa";
import { MdReport, MdVisibility } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import Loading from "../Shared/Loading/Loading";

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
        
        // Parallel API calls for better performance
        const [lessonRes, similarRes, commentsRes] = await Promise.allSettled([
          axiosSecure.get(`/lessons/${id}`),
          axiosSecure.get(`/lessons/similar/${id}`),
          axiosSecure.get(`/lessons/${id}/comments`)
        ]);

        // Handle lesson data
        if (lessonRes.status === 'fulfilled' && lessonRes.value.data) {
          const lessonData = lessonRes.value.data;
          setLesson(lessonData);

          // Check if user liked/favorited
          if (user?.email) {
            setLiked(lessonData.likes?.includes(user.email) || false);
            setFavorited(lessonData.favorites?.includes(user.email) || false);
          }

          // Fetch author info
          if (lessonData.createdBy) {
            try {
              const authorRes = await axiosSecure.get(`/authors/${lessonData.createdBy}`);
              setAuthor(authorRes.data);
            } catch (authorError) {
              console.log("Author fetch error, using fallback:", authorError);
              setAuthor({
                name: lessonData.createdBy?.split('@')[0] || "Unknown Author",
                email: lessonData.createdBy,
                
              });
            }
          }
        } else {
          throw new Error("Lesson not found");
        }

        // Handle similar lessons
        if (similarRes.status === 'fulfilled') {
          setSimilarLessons(similarRes.value.data || []);
        } else {
          setSimilarLessons([]);
        }

        // Handle comments
        if (commentsRes.status === 'fulfilled') {
          setComments(commentsRes.value.data?.comments || []);
        } else {
          setComments([]);
        }

      } catch (err) {
        console.error("Error fetching lesson data:", err);
        
        // Show user-friendly error message
        if (err.message === "Lesson not found") {
          // Don't show error alert immediately, wait a bit
          setTimeout(() => {
            if (!lesson) {
              Swal.fire({ 
                icon: "error", 
                title: "Lesson Not Found", 
                text: "The lesson you're looking for doesn't exist.",
                confirmButtonColor: "#3b82f6"
              });
            }
          }, 1000);
        }
      } finally {
        // Add slight delay to ensure all data is loaded
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };

    fetchLessonData();
  }, [id, axiosSecure, user]);

  // Alert functions
  const showSuccess = (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
      timer: 2000,
      showConfirmButton: false,
      background: '#f9fafb',
      color: '#1f2937'
    });
  };

  const showError = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: message,
      confirmButtonColor: '#3b82f6'
    });
  };

  const showWarning = (message) => {
    Swal.fire({
      icon: 'warning',
      title: 'Warning',
      text: message,
      confirmButtonColor: '#3b82f6'
    });
  };

  const showInfo = (message) => {
    Swal.fire({
      icon: 'info',
      title: 'Info',
      text: message,
      confirmButtonColor: '#3b82f6'
    });
  };

 const handleLike = async () => {

    if (!user) {

      showInfo("Please log in to like this lesson");

      return;

    }



    try {

      const res = await axiosSecure.patch(`/lessons/${id}/like`);

      setLesson(prev => ({

        ...prev,

        likesCount: res.data.likesCount

      }));

      setLiked(!liked);

      showSuccess(liked ? "Like removed" : "Lesson liked!");

    } catch (err) {

      showError("Failed to update like");

    }

  };



  const handleFavorite = async () => {
    if (!user) {
      showInfo("Please log in to save to favorites");
      return;
    }

    try {
      const res = await axiosSecure.patch(`/lessons/${id}/favorite`);
      setLesson(prev => ({ 
        ...prev, 
        favoritesCount: res.data.favoritesCount 
      }));
      setFavorited(!favorited);
      showSuccess(favorited ? "Removed from favorites" : "Added to favorites!");
    } catch (err) {
      showError("Failed to update favorites");
    }
  };

  const handleReport = async () => {
    if (!user) {
      showInfo("Please log in to report a lesson");
      return;
    }

    const { value: reason } = await Swal.fire({
      title: 'Report This Lesson',
      html: `
        <div class="text-left">
          <p class="mb-4 text-gray-600">Please select a reason for reporting this lesson:</p>
          <select id="reportReason" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="" disabled selected>Select a reason</option>
            <option value="Inappropriate Content">Inappropriate Content</option>
            <option value="Hate Speech or Harassment">Hate Speech or Harassment</option>
            <option value="Misleading or False Information">Misleading or False Information</option>
            <option value="Spam or Promotional Content">Spam or Promotional Content</option>
            <option value="Sensitive or Disturbing Content">Sensitive or Disturbing Content</option>
            <option value="Other">Other</option>
          </select>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Submit Report',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
      preConfirm: () => {
        const reason = document.getElementById('reportReason').value;
        if (!reason) {
          Swal.showValidationMessage('Please select a reason');
          return false;
        }
        return reason;
      }
    });

    if (reason) {
      try {
        await axiosSecure.post('/lessons/report', {
          lessonId: lesson._id,
          reason,
          reportedUserEmail: lesson.createdBy
        });

        Swal.fire({
          title: 'Report Submitted!',
          text: 'Thank you for helping us maintain a safe community.',
          icon: 'success',
          confirmButtonColor: '#3b82f6',
          timer: 2000,
          showConfirmButton: false
        });
      } catch {
        showError("Failed to submit report");
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      showInfo("Please log in to add a comment");
      return;
    }

    if (!commentText.trim()) {
      showWarning("Please write a comment");
      return;
    }

    setSubmittingComment(true);

    try {
      const res = await axiosSecure.post(`/lessons/${id}/comment`, { 
        text: commentText 
      });
      
      // Add current user's photoURL to comment
      const commentWithUser = {
        ...res.data,
        userPhoto: user.photoURL || null
      };
      
      setComments(prev => [commentWithUser, ...prev]);
      setCommentText("");
      showSuccess("Comment added successfully!");
    } catch (error) {
      console.error("Comment submit error:", error);
      showError(error.response?.data?.message || "Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showSuccess("Link copied to clipboard!");
    } catch (err) {
      showError("Failed to copy link");
    }
  };

  const handleUpgradeClick = () => {
    Swal.fire({
      title: 'Unlock Premium Content',
      html: `
        <div class="text-center py-4">
          <div class="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl font-bold text-white">🔥</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Premium Features Await!</h3>
          <ul class="text-left space-y-2 text-gray-600 mb-4">
            <li class="flex items-center gap-2">✓ Access all premium lessons</li>
            <li class="flex items-center gap-2">✓ Ad-free reading experience</li>
            <li class="flex items-center gap-2">✓ Exclusive content updates</li>
            <li class="flex items-center gap-2">✓ Priority support</li>
          </ul>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'View Pricing Plans',
      cancelButtonText: 'Later',
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/pricing');
      }
    });
  };

  if (loading) {
    return <Loading></Loading>
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="text-red-500 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Lesson Not Found</h2>
          <p className="text-gray-600 mb-6">The lesson you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Browse Lessons
          </button>
        </div>
      </div>
    );
  }

  const shouldBlurContent = lesson.isPremium && !isPremiumUser;
  const estimatedReadingTime = lesson.description ? Math.ceil(lesson.description.split(" ").length / 200) : 3;
  const lastUpdated = lesson.updatedAt || lesson.createdAt;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Premium Upgrade Banner */}
        {shouldBlurContent && (
          <div className="mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <FaExclamationTriangle className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Premium Content Locked 🔒</h3>
                    <p className="text-blue-100 mt-1">This is an exclusive premium lesson. Upgrade to unlock all content.</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleUpgradeClick}
                className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        {/* Main Content Card */}
        <div className={`bg-white rounded-2xl shadow-xl overflow-hidden ${shouldBlurContent ? 'filter blur-md' : ''}`}>
          
          {/* Featured Image */}
          {lesson.image ? (
            <div className="h-96 w-full overflow-hidden">
              <img 
                src={lesson.image} 
                alt={lesson.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="h-64 w-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="text-center text-white">
                <FaImage className="text-6xl mb-4 opacity-80" />
                <p className="text-xl font-semibold">No Image Available</p>
              </div>
            </div>
          )}

          <div className="p-8">
            {/* Category & Premium Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-semibold shadow-sm">
                {lesson.category || "Personal Growth"}
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-sm font-semibold shadow-sm">
                {lesson.emotionalTone || lesson.tone || "Motivational"}
              </span>
              {lesson.isPremium && (
                <span className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-sm font-semibold shadow-sm flex items-center gap-2">
                  <span>⭐</span> Premium
                </span>
              )}
            </div>

            {/* Lesson Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {lesson.title}
            </h1>

            {/* Lesson Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                <FaCalendarAlt className="text-blue-500" />
                <span>Created: {new Date(lesson.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              
              {lesson.updatedAt && (
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                  <FaEdit className="text-green-500" />
                  <span>Updated: {new Date(lesson.updatedAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                <MdVisibility className="text-purple-500" />
                <span>Visibility: {lesson.visibility || "Public"}</span>
              </div>
              
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                <FaClock className="text-orange-500" />
                <span>{estimatedReadingTime} min read</span>
              </div>
            </div>

            {/* Lesson Content */}
            <div className="mb-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {lesson.description}
                </p>
              </div>
            </div>

            {/* Author Section*/}
           {/* Author Section - UPDATED with Total Lessons & Button */}
<div className="border-t border-b border-gray-200 py-8 my-8">
  <h3 className="text-2xl font-bold text-gray-900 mb-6">About the Creator</h3>
  <div className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl">
    {/* Profile Image */}
    <div className="relative flex-shrink-0">
      {author?.photoURL ? (
        <img
          src={author.photoURL}
          alt={author?.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"
        />
      ) : (
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
          <FaUserCircle className="text-white text-5xl" />
        </div>
      )}
    </div>

    {/* Author Info + Button */}
    <div className="flex-1 text-center md:text-left">
      <h4 className="text-2xl font-bold text-gray-900 mb-2">
        {author?.name || lesson.createdBy?.split('@')[0] || "Unknown Author"}
      </h4>
      <p className="text-gray-600 mb-4">
        {lesson.createdBy || "No email provided"}
      </p>
      
      {/* Total Lessons */}
      <p className="text-lg text-gray-700 mb-6">
        <span className="font-semibold">{author?.totalLessons || 0}</span> lessons created
      </p>

      {/* View All Lessons Button */}
      <button
        onClick={() => navigate(`/author/${lesson.createdBy}`)} 
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
      >
        View all lessons by this author
      </button>
    </div>
  </div>
</div>
            {/* Stats & Engagement Section */}
            <div className="mb-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl border border-red-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-1">Likes</p>
                      <p className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-red-500">❤️</span> {lesson.likesCount || 0}
                      </p>
                    </div>
                    <button
                      onClick={handleLike}
                      className={`p-3 rounded-full transition-all ${liked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {liked ? <FaHeart className="text-xl" /> : <FaRegHeart className="text-xl" />}
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-1">Favorites</p>
                      <p className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-yellow-500">🔖</span> {lesson.favoritesCount || 0}
                      </p>
                    </div>
                    <button
                      onClick={handleFavorite}
                      className={`p-3 rounded-full transition-all ${favorited ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {favorited ? <FaBookmark className="text-xl" /> : <FaRegBookmark className="text-xl" />}
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-1">Views</p>
                      <p className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        <FaEye className="text-blue-500" /> {viewCount.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      Updated just now
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interaction Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={handleLike}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all ${liked ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {liked ? <FaHeart /> : <FaRegHeart />}
                {liked ? 'Liked' : 'Like'}
              </button>

              <button
                onClick={handleFavorite}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all ${favorited ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {favorited ? <FaBookmark /> : <FaRegBookmark />}
                {favorited ? 'Saved' : 'Save to Favorites'}
              </button>

              <button
                onClick={handleReport}
                className="flex items-center gap-3 px-6 py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl font-semibold transition-all"
              >
                <FaFlag />
                Report Lesson
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
              >
                <FaShareAlt />
                Share
              </button>
            </div>

            {/* Comments Section */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Comments ({comments.length})</h3>
                {!user && (
                  <p className="text-gray-600 text-sm">Log in to join the discussion</p>
                )}
              </div>

              {/* Add Comment Form */}
              {user && (
                <form onSubmit={handleCommentSubmit} className="mb-8">
                  <div className="bg-gray-50 rounded-2xl p-6 mb-4">
                    <div className="flex gap-4">
                      {user.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user.email}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {user.email?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="mb-2">
                          <span className="font-semibold text-gray-900">
                            {user.email}
                          </span>
                          <p className="text-xs text-gray-500">Commenting as</p>
                        </div>
                        <textarea
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Share your thoughts on this lesson..."
                          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                          rows="4"
                          disabled={submittingComment}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        type="submit"
                        disabled={submittingComment || !commentText.trim()}
                        className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 ${
                          submittingComment || !commentText.trim()
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                        }`}
                      >
                        {submittingComment ? (
                          <>
                            <FaSpinner className="animate-spin" />
                            Posting...
                          </>
                        ) : (
                          'Post Comment'
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-200 transition-colors">
                      <div className="flex items-center gap-4 mb-4">
                        {comment.userPhoto ? (
                          <img 
                            src={comment.userPhoto} 
                            alt={comment.userId}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {comment.userId?.charAt(0).toUpperCase() || 'U'}
                            </span>
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-bold text-gray-900">
                                {comment.userName || comment.userId}
                              </h4>
                              {comment.userId && (
                                <p className="text-xs text-gray-500">{comment.userId}</p>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {new Date(comment.createdAt).toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 pl-16">{comment.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaUserCircle className="text-blue-500 text-3xl" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-700 mb-2">No comments yet</h4>
                    <p className="text-gray-500">Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Lessons Section */}
        {similarLessons.length > 0 && (
          <div className="mt-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Similar Lessons You Might Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarLessons.map((similarLesson) => (
                <div 
                  key={similarLesson._id}
                  onClick={() => navigate(`/lessons/${similarLesson._id}`)}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                >
                  {similarLesson.featuredImage ? (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={similarLesson.featuredImage} 
                        alt={similarLesson.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                      <FaImage className="text-white text-4xl opacity-70" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        {similarLesson.category || "Category"}
                      </span>
                      {similarLesson.isPremium && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                          Premium
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {similarLesson.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {similarLesson.description?.substring(0, 100) || "No description available"}...
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                      <div className="flex items-center gap-1">
                        <FaHeart className="text-red-400" />
                        <span>{similarLesson.likesCount || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaBookmark className="text-yellow-400" />
                        <span>{similarLesson.favoritesCount || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaEye className="text-blue-400" />
                        <span>{Math.floor(Math.random() * 1000).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonDetails;/*  */