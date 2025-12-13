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
    premiumLessons: 0,
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

    // Fetch premium status
    axiosSecure.get(`/users/status/${user.email}`)
      .then(res => setIsPremium(res.data.isPremium))
      .catch(err => console.error(err));

    // Fetch lessons
    axiosSecure.get(`/lessons?email=${user.email}`)
      .then(res => {
        setMyLessons(res.data);

        // Calculate stats
        const lessons = res.data;
        setStats({
          totalLessons: lessons.length,
          publicLessons: lessons.filter(l => l.privacy === 'public').length,
          privateLessons: lessons.filter(l => l.privacy === 'private').length,
          premiumLessons: lessons.filter(l => l.accessLevel === 'premium').length,
          totalViews: lessons.reduce((sum, l) => sum + (l.views || 0), 0),
          totalLikes: lessons.reduce((sum, l) => sum + (l.likes || 0), 0)
        });
      })
      .catch(err => console.error(err));
  }, [user, axiosSecure]);

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      let photoURL = formData.photoURL;

      // Upload image if new file selected
      if (imageFile) {
        const imgData = new FormData();
        imgData.append('image', imageFile);
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
          imgData
        );
        photoURL = imgRes.data.data.url;
      }

      // Update MongoDB
      const res = await axiosSecure.patch(`/users/${user.dbId}`, {
        name: formData.displayName,
        photoURL
      });

      if (res.data.modifiedCount > 0) {
        // Update Firebase
        await updateProfile(auth.currentUser, {
          displayName: formData.displayName,
          photoURL
        });

        // Update context
        setUser(prev => ({ ...prev, displayName: formData.displayName, photoURL }));

        Swal.fire({
          icon: 'success',
          title: 'Profile updated successfully!',
          text: 'Your changes have been saved.',
          confirmButtonColor: '#10b981',
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          showConfirmButton: false
        });

        setIsEditing(false);
        setImageFile(null);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Update failed!',
        text: err.response?.data?.message || 'Please try again.',
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'OK'
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your profile and view your content statistics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Profile Header */}
              <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Profile Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <FaEdit className="w-4 h-4" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <FaSpinner className="animate-spin w-4 h-4" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <FaSave className="w-4 h-4" />
                            Save
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <FaTimes className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                {/* Premium Badge */}
                {isPremium && (
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full">
                    <FaCrown className="w-4 h-4" />
                    <span className="font-semibold">Premium Member</span>
                  </div>
                )}
              </div>

              {/* Profile Content */}
              <div className="p-6">
                {/* Profile Image */}
                <div className="mb-6">
                  <div className="relative mx-auto w-32 h-32">
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                          <FaUserCircle className="w-16 h-16 text-white" />
                        </div>
                      )}
                    </div>
                    
                    {/* Premium Crown */}
                    {isPremium && (
                      <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                        <FaCrown className="w-5 h-5 text-white" />
                      </div>
                    )}
                    
                    {/* Edit Image Button */}
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-700 transition-colors">
                        <FiUpload className="w-5 h-5 text-white" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Profile Form */}
                <div className="space-y-4">
                  {/* Display Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Display Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.displayName}
                        onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="Enter your display name"
                      />
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-lg">
                        <FaUserCircle className="w-5 h-5 text-gray-500" />
                        <span className="font-medium">{formData.displayName || 'Not set'}</span>
                      </div>
                    )}
                  </div>

                  {/* Email (Read-only) */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-lg">
                      <FaEnvelope className="w-5 h-5 text-gray-500" />
                      <span className="font-medium">{user?.email}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Email cannot be changed for security reasons
                    </p>
                  </div>

                  {/* Photo URL (Only in edit mode) */}
                  {isEditing && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Photo URL
                      </label>
                      <input
                        type="text"
                        value={formData.photoURL}
                        onChange={(e) => setFormData(prev => ({ ...prev, photoURL: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="Or enter image URL"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter URL or upload image above
                      </p>
                    </div>
                  )}
                </div>

                {/* Member Since */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaCalendarAlt className="w-4 h-4" />
                    <span className="text-sm">
                      Member since {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats and Lessons */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Your Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Total Lessons */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Lessons</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.totalLessons}</p>
                    </div>
                    <FaBookOpen className="w-8 h-8 text-blue-500" />
                  </div>
                </div>

                {/* Public Lessons */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Public</p>
                      <p className="text-2xl font-bold text-green-600">{stats.publicLessons}</p>
                    </div>
                    <FaGlobe className="w-8 h-8 text-green-500" />
                  </div>
                </div>

                {/* Private Lessons */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Private</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.privateLessons}</p>
                    </div>
                    <FaLock className="w-8 h-8 text-purple-500" />
                  </div>
                </div>

                {/* Premium Lessons */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-100 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Premium</p>
                      <p className="text-2xl font-bold text-yellow-600">{stats.premiumLessons}</p>
                    </div>
                    <FaCrown className="w-8 h-8 text-yellow-500" />
                  </div>
                </div>

                {/* Total Views */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Views</p>
                      <p className="text-2xl font-bold text-indigo-600">{stats.totalViews}</p>
                    </div>
                    <FaEye className="w-8 h-8 text-indigo-500" />
                  </div>
                </div>

                {/* Total Likes */}
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Likes</p>
                      <p className="text-2xl font-bold text-pink-600">{stats.totalLikes}</p>
                    </div>
                    <FaHeart className="w-8 h-8 text-pink-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* My Lessons Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">My Lessons</h2>
                <span className="text-sm text-gray-500">
                  {myLessons.length} lesson{myLessons.length !== 1 ? 's' : ''}
                </span>
              </div>

              {myLessons.length === 0 ? (
                <div className="text-center py-12">
                  <FaBookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No lessons yet</h3>
                  <p className="text-gray-500 mb-4">Start sharing your insights with the community</p>
                  <a
                    href="/dashboard/add-lessons"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                  >
                    <FaEdit className="w-4 h-4" />
                    Create Your First Lesson
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {myLessons.map(lesson => (
                    <div key={lesson._id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg text-gray-800">{lesson.title}</h3>
                            {lesson.accessLevel === 'premium' && (
                              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                <FaCrown className="w-3 h-3" />
                                Premium
                              </span>
                            )}
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              lesson.privacy === 'public' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {lesson.privacy === 'public' ? (
                                <>
                                  <FaGlobe className="w-3 h-3" />
                                  Public
                                </>
                              ) : (
                                <>
                                  <FaLock className="w-3 h-3" />
                                  Private
                                </>
                              )}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {lesson.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <FaEye className="w-4 h-4" />
                              <span>{lesson.views || 0} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaHeart className="w-4 h-4" />
                              <span>{lesson.likes || 0} likes</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaCalendarAlt className="w-4 h-4" />
                              <span>{new Date(lesson.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        {lesson.image && (
                          <div className="ml-4">
                            <img
                              src={lesson.image}
                              alt={lesson.title}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                          </div>
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