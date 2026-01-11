// ManageUsers.jsx
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUserEdit, FaTrashAlt, FaSpinner } from "react-icons/fa";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axiosSecure.get("/users");
        const usersData = res.data;

        
        const usersWithLessons = await Promise.all(
          usersData.map(async (user) => {
            try {
              const lessonsRes = await axiosSecure.get(`/lessons/by-author/${user.email}`);
              return { ...user, totalLessons: lessonsRes.data.length };
            } catch (err) {
              console.error(`Error fetching lessons for ${user.email}:`, err);
              return { ...user, totalLessons: 0 };
            }
          })
        );

        setUsers(usersWithLessons);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [axiosSecure]);

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Promote to Admin?",
      text: `Do you want to make ${user.name || user.email} an Admin?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Promote!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/make-admin/${user.email}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire("Success!", `${user.name || user.email} is now Admin!`, "success");
              setUsers((prev) =>
                prev.map((u) => (u.email === user.email ? { ...u, role: "admin" } : u))
              );
            }
          })
          .catch((err) => {
            Swal.fire("Error!", "Failed to promote. Try again.", "error");
          });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Delete Account?",
      text: `Are you sure you want to delete ${user.name || user.email}'s account? This is irreversible!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete API
        axiosSecure
          .delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "User account has been deleted.", "success");
              setUsers((prev) => prev.filter((u) => u._id !== user._id));
            }
          })
          .catch((err) => {
            Swal.fire("Error!", "Failed to delete user.", "error");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <FaSpinner className="animate-spin text-5xl text-blue-600" />
        <span className="ml-4 text-xl text-gray-600">Loading Users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 text-2xl font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <title>Manage-users</title>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Manage Users
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          View, promote, and manage all registered users
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="w-full text-left">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Total Lessons Created</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{user.name || user.email.split("@")[0]}</td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        user.role === "admin"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {user.role || "User"}
                    </span>
                  </td>
                  <td className="p-4 text-center font-bold text-blue-600">{user.totalLessons}</td>
                  <td className="p-4 flex gap-3">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
                      >
                        <FaUserEdit /> Make Admin
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all flex items-center gap-2"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500 text-lg">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;