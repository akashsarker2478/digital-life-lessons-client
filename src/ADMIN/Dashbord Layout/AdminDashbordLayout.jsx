import React from "react";
import Swal from "sweetalert2";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";
import { Link, Outlet, NavLink } from "react-router";
import {
  FaChartBar,
  FaUsers,
  FaBookOpen,
  FaFlag,
  FaUserShield,
  FaHome,
  FaSignOutAlt,
  FaCrown,
  FaPlus, 
} from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import { useNavigate } from "react-router";

const AdminDashboardLayout = () => {
  const { user, logOut, isPremium } = UseAuth();
  const navigate = useNavigate();

 
  const adminLinks = [
    { name: "Dashboard Home", path: "admin-dashboard", icon: FaChartBar },
    { name: "Add Lesson", path: "add-lesson", icon: FaPlus }, 
    { name: "Manage Users", path: "manage-users", icon: FaUsers },
    { name: "Manage Lessons", path: "manage-lessons", icon: FaBookOpen },
    { name: "Reported Lessons", path: "reported-lessons", icon: FaFlag },
    { name: "Admin Profile", path: "admin-profile", icon: FaUserShield },
  ];

  const getLinkClass = ({ isActive }) =>
    `flex items-center gap-4 p-4 w-full rounded-xl transition-all duration-300 font-medium ${
      isActive
        ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg transform scale-[1.02]"
        : "text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-600 hover:shadow-md"
    }`;

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from admin panel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire("Logged Out!", "See you soon, Admin.", "success").then(() => {
            navigate("/login");
          });
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-pink-50">
      <Navbar />

      <div className="drawer lg:drawer-open">
        <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content bg-transparent">
          {/* Mobile Top Bar */}
          <nav className="navbar w-full bg-white/90 backdrop-blur-md shadow-lg lg:hidden sticky top-0 z-10">
            <div className="navbar-start">
              <label htmlFor="admin-drawer" className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </label>
            </div>
            <div className="navbar-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Admin Panel
              </h1>
            </div>
          </nav>

          {/* Main Content Area */}
          <main className="p-6 lg:p-10">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 p-6 lg:p-10 min-h-[calc(100vh-180px)]">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side z-30">
          <label htmlFor="admin-drawer" className="drawer-overlay"></label>

          <div className="flex flex-col min-h-full w-80 bg-gradient-to-b from-white via-red-50 to-pink-50 shadow-2xl border-r border-red-100">
            {/* Header */}
            <div className="p-8 text-center border-b border-red-100">
              <h1 className="mt-6 text-3xl font-extrabold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <div className="mt-4 flex justify-center">
                <div className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full shadow-lg flex items-center gap-3">
                  <FaUserShield className="w-6 h-6" />
                  <span className="font-bold">Administrator</span>
                </div>
              </div>
            </div>

            {/* Premium Badge */}
            {isPremium && (
              <div className="mx-8 mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl border border-yellow-300 shadow-md text-center">
                <div className="flex items-center justify-center gap-3">
                  <FaCrown className="w-7 h-7 text-yellow-600" />
                  <span className="text-lg font-bold text-orange-700">Premium Admin</span>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <ul className="menu p-6 space-y-3 flex-1">
              {adminLinks.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} className={getLinkClass}>
                    <link.icon className="w-6 h-6" />
                    <span>{link.name}</span>
                    {link.path === "admin-dashboard" && (
                      <div className="ml-auto w-3 h-3 rounded-full bg-white opacity-0 group-[.active]:opacity-100 transition-opacity" />
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Bottom Section */}
            <div className="p-6 border-t border-red-100 space-y-4">
              {/* Back to Homepage */}
              <Link
                to="/"
                className="flex items-center gap-4 p-4 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all"
              >
                <FaHome className="w-6 h-6" />
                <span className="font-medium">Back to Homepage</span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-4 p-4 w-full rounded-xl text-red-600 hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 transition-all font-medium"
              >
                <FaSignOutAlt className="w-6 h-6" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboardLayout;