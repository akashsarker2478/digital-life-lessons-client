// AdminProfile.jsx
import React, { useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { FaUserShield, FaCrown, FaEdit, FaCamera } from "react-icons/fa";

const AdminProfile = () => {
  const { user, updateUser } = UseAuth(); // updateUser = updateProfile from Firebase
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Mock activity stats (backend থেকে আনতে পারো পরে)
  const lessonsDeleted = 8;
  const lessonsFeatured = 24;
  const totalActions = lessonsDeleted + lessonsFeatured;

  const handleUpdateName = () => {
    if (!newName.trim()) {
      Swal.fire("Error!", "Name cannot be empty", "error");
      return;
    }

    updateUser({ displayName: newName.trim() })
      .then(() => {
        Swal.fire("Success!", "Display name updated!", "success");
        setIsEditingName(false);
      })
      .catch((err) => {
        Swal.fire("Error!", err.message || "Failed to update name", "error");
      });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      Swal.fire("Invalid!", "Please select an image file", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire("Too large!", "Image should be less than 5MB", "error");
      return;
    }

    setIsUploadingPhoto(true);

    // Firebase-এ photoURL update (এখানে সিম্পল URL দিয়ে করছি – real app-এ Firebase Storage ব্যবহার করো)
    // এখানে আমরা URL.createObjectURL দিয়ে preview দেখাচ্ছি (actual update-এর জন্য storage লাগবে)
    const previewUrl = URL.createObjectURL(file);

    Swal.fire({
      title: "Update Photo?",
      text: "Do you want to update your profile photo?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
    }).then((result) => {
      if (result.isConfirmed) {
        // Real update (Firebase Storage + updateProfile) এখানে যোগ করতে হবে
        // এখানে mock success
        updateUser({ photoURL: previewUrl })
          .then(() => {
            Swal.fire("Success!", "Profile photo updated!", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to update photo", "error");
          })
          .finally(() => setIsUploadingPhoto(false));
      } else {
        setIsUploadingPhoto(false);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
          Admin Profile
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Manage your admin account and view activity
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Photo Section */}
          <div className="relative group">
            <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-white shadow-xl">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center">
                  <span className="text-white text-6xl font-bold">
                    {user?.displayName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Upload Button */}
            <label className="absolute bottom-4 right-4 bg-white rounded-full p-4 shadow-lg cursor-pointer hover:shadow-xl transition-all">
              <FaCamera className="text-2xl text-gray-700" />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                disabled={isUploadingPhoto}
              />
            </label>

            {isUploadingPhoto && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                <FaSpinner className="animate-spin text-white text-3xl" />
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
              {isEditingName ? (
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="text-3xl font-bold border-b-2 border-blue-500 focus:outline-none px-2 py-1"
                    autoFocus
                  />
                  <button
                    onClick={handleUpdateName}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setNewName(user?.displayName || "");
                      setIsEditingName(false);
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-4xl font-bold text-gray-800">
                    {user?.displayName || "Admin User"}
                  </h2>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit className="text-2xl" />
                  </button>
                </>
              )}
            </div>

            <p className="text-xl text-gray-600 mb-6">{user?.email}</p>

            {/* Badges */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-lg">
                <FaUserShield className="text-2xl" />
                <span className="font-bold text-lg">Administrator</span>
              </div>

              {user?.isPremium && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-lg">
                  <FaCrown className="text-2xl" />
                  <span className="font-bold text-lg">Premium Member</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>



      <div className="text-center text-gray-500 mt-12">
        <p>Thank you for keeping the platform safe and high-quality! 👑</p>
      </div>
    </div>
  );
};

export default AdminProfile;