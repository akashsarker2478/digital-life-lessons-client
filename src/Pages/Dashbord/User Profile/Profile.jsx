import React, { useEffect, useState } from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import axios from 'axios';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase/firebase.config';
import {
  FaUserCircle,
  FaEdit,
  FaSave,
  FaTimes,
  FaUpload,
  FaCrown,
  FaBookOpen,
  FaGlobe,
  FaLock,
  FaEye,
  FaHeart,
  FaCalendarAlt,
  FaEnvelope,
  FaSpinner
} from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';

const Profile = () => {
  const { user, setUser } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const [myLessons, setMyLessons] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ displayName: '', photoURL: '' });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Stats
  const [stats, setStats] = useState({
    totalLessons: 0,
    publicLessons: 0,
    privateLessons: 0,
    totalViews: 0,
    totalLikes: 0
  });

  useEffect(() => {
    if (!user) return;
    // Init form
    setFormData({
      displayName: user.displayName || '',
      photoURL: user.photoURL || ''
    });
    setImagePreview(user.photoURL || null);
    // Fetch premium status + dbId
    axiosSecure.get(`/users/status/${user.email}`)
      .then(res => {
        setIsPremium(res.data.isPremium);
   
        if (res.data.dbId) {
          // UseAuth dbId
        }
      })
      .catch(err => console.error("Premium status error:", err));
    // Fetch my lessons
    axiosSecure.get('/lessons/my')
      .then(res => {
        const lessons = res.data;
        setMyLessons(lessons);
        // Calculate stats
        setStats({
          totalLessons: lessons.length,
          publicLessons: lessons.filter(l => l.privacy !== 'private').length, // default public
          privateLessons: lessons.filter(l => l.privacy === 'private').length,
          totalViews: lessons.reduce((sum, l) => sum + (l.viewsCount || l.views || 0), 0),
          totalLikes: lessons.reduce((sum, l) => sum + (l.likesCount || l.likes?.length || 0), 0)
        });
      })
      .catch(err => {
        console.error("My lessons error:", err);
        Swal.fire("Error", "Failed to load your lessons", "error");
      });
  }, [user, axiosSecure]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    if (!formData.displayName.trim()) {
      Swal.fire("Error!", "Name cannot be empty", "error");
      return;
    }
    try {
      setLoading(true);
      let photoURL = formData.photoURL;
      // Upload new image to ImgBB
      if (imageFile) {
        const imgData = new FormData();
        imgData.append('image', imageFile);
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
          imgData
        );
        photoURL = imgRes.data.data.url;
      }
      // Update MongoDB user
      const mongoRes = await axiosSecure.patch(`/users/${user.dbId || ''}`, {
        name: formData.displayName,
        photoURL
      });
      if (mongoRes.data.modifiedCount > 0 || mongoRes.data.matchedCount > 0) {
        // Update Firebase profile
        await updateProfile(auth.currentUser, {
          displayName: formData.displayName,
          photoURL
        });
        // Update context
        setUser(prev => ({
          ...prev,
          displayName: formData.displayName,
          photoURL
        }));
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: 'Your changes have been saved successfully.',
          timer: 2000,
          toast: true,
          position: 'top-end',
          showConfirmButton: false
        });
        setIsEditing(false);
        setImageFile(null);
      }
    } catch (err) {
      console.error("Profile update error:", err);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: err.response?.data?.message || 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ displayName: user.displayName || '', photoURL: user.photoURL || '' });
    setImagePreview(user.photoURL || null);
    setImageFile(null);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
      <title>User Profile</title>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your profile and view your content statistics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Profile Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-white"
                    >
                      <FaEdit /> Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg disabled:opacity-50 text-white"
                      >
                        {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg text-white"
                      >
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  )}
                </div>
                {isPremium && (
                  <div className="inline-flex items-center gap-2 bg-yellow-400 text-white px-4 py-2 rounded-full">
                    <FaCrown />
                    <span className="font-semibold">Premium Member</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="relative mx-auto w-32 h-32 mb-6">
                  <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-lg overflow-hidden">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <FaUserCircle className="w-20 h-20 text-white" />
                      </div>
                    )}
                  </div>
                  {isPremium && (
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                      <FaCrown className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700">
                      <FiUpload className="w-5 h-5 text-white" />
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Display Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.displayName}
                        onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Your name"
                      />
                    ) : (
                      <p className="font-medium text-lg text-gray-900 dark:text-gray-100">{formData.displayName || 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{user?.email}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Member since {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Lessons */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Your Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Lessons</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalLessons}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Public</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.publicLessons}</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Private</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.privateLessons}</p>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stats.totalViews}</p>
                </div>
                <div className="bg-pink-50 dark:bg-pink-950 border border-pink-200 dark:border-pink-800 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Likes</p>
                  <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">{stats.totalLikes}</p>
                </div>
                {isPremium && (
                  <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                    <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400 flex items-center justify-center gap-2">
                      <FaCrown /> Premium
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">My Lessons</h2>
                <span className="text-gray-500 dark:text-gray-400">{myLessons.length} lessons</span>
              </div>

              {myLessons.length === 0 ? (
                <div className="text-center py-12">
                  <FaBookOpen className="w-16 h-16 text-gray-300 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-lg text-gray-600 dark:text-gray-400">No lessons yet</p>
                  <a
                    href="/dashboard/add-lessons"
                    className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                  >
                    Create Your First Lesson
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {myLessons.map(lesson => (
                    <div key={lesson._id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition bg-white dark:bg-gray-800">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{lesson.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">{lesson.description}</p>
                          <div className="flex gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1"><FaEye /> {lesson.viewsCount || 0}</span>
                            <span className="flex items-center gap-1"><FaHeart /> {lesson.likesCount || 0}</span>
                            <span>{new Date(lesson.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        {lesson.privacy === 'private' && (
                          <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                            <FaLock className="inline w-3 h-3 mr-1" /> Private
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;