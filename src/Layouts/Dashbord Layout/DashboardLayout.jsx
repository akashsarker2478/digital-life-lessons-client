import React from "react";
import Swal from "sweetalert2";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";
import { Link, Outlet, NavLink } from "react-router";
import {
  FaChartBar,
  FaBookOpen,
  FaHeart,
  FaPlus,
  FaUserCircle,
  FaHome,
  FaSignOutAlt,
  FaCrown,
} from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import Logo from "../../Pages/Shared/Logo/Logo";
import { useNavigate } from "react-router";

const DashboardLayout = () => {
  const { user, logOut, isPremium } = UseAuth(); 
  const navigate = useNavigate();

 
  const userLinks = [
    { name: "Dashboard Home", path: "user-dashboard", icon: FaChartBar },
    { name: "Add Lesson", path: "add-lessons", icon: FaPlus },
    { name: "My Lessons", path: "my-lessons", icon: FaBookOpen },
    { name: "My Favorites", path: "my-favorites", icon: FaHeart },
    { name: "Profile", path: "profile", icon: FaUserCircle },
  ];

  const getLinkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 w-full rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md transform scale-[1.02]"
        : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 hover:shadow-sm"
    }`;

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              text: "You have been successfully logged out.",
              icon: "success",
              confirmButtonColor: "#10b981",
              confirmButtonText: "OK",
              timer: 2000,
              timerProgressBar: true,
            }).then(() => {
              navigate("/login");
            });
          })
          .catch((error) => {
            console.error("Logout error:", error);
            Swal.fire({
              title: "Error!",
              text: error.message || "Failed to logout.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <title>User Dashboard</title>
      <Navbar />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content bg-transparent">
          {/* Mobile Navbar */}
          <nav className="navbar w-full bg-white/90 backdrop-blur-sm shadow-sm lg:hidden sticky top-0 z-10">
            <div className="navbar-start">
              <label htmlFor="my-drawer-4" className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
            </div>
            <div className="navbar-center">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Dashboard
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="p-4 md:p-6 lg:p-8 min-h-[calc(100vh-200px)]">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 md:p-6 lg:p-8">
              <Outlet />
            </div>
          </main>
        </div>

        <div className="drawer-side z-20">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="flex min-h-full flex-col items-start bg-gradient-to-b from-white via-white to-blue-50/50 w-72 p-5 shadow-xl border-r border-gray-200/50">
            {/* Logo & Title */}
            <div className="w-full mb-6 text-center">
              
              <h2 className="mt-4 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Dashboard
              </h2>
            </div>

            {/* Premium Indicator */}
            {isPremium && (
              <div className="w-full mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 text-center shadow-sm">
                <div className="flex items-center justify-center gap-2">
                  <FaCrown className="w-6 h-6 text-yellow-600" />
                  <span className="text-lg font-semibold text-yellow-700">Premium Member</span>
                </div>
              </div>
            )}

            {/* Navigation Menu */}
            <ul className="menu w-full grow space-y-2 px-2">
              {userLinks.map((link) => (
                <li key={link.path} className="group">
                  <NavLink to={link.path} className={getLinkClass}>
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 transition-all">
                      <link.icon className="w-5 h-5 text-blue-600 group-[.active]:text-white" />
                    </div>
                    <span className="font-medium">{link.name}</span>
                    <div className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-[.active]:opacity-100 transition-opacity"></div>
                  </NavLink>
                </li>
              ))}

              {/* Upgrade to Premium (Non-premium users only) */}
              {!isPremium && (
                <li className="mt-6">
                  <Link
                    to="/dashboard/pricing"
                    className="flex items-center gap-3 p-4 w-full rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg text-center justify-center font-semibold"
                  >
                    <FaCrown className="w-5 h-5" />
                    <span>Upgrade to Premium</span>
                  </Link>
                </li>
              )}

              <div className="divider my-8 text-gray-400 text-sm">GENERAL</div>

              {/* Homepage Link */}
              <li className="group">
                <Link
                  to="/"
                  className="flex items-center gap-3 p-3 w-full rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 group-hover:from-blue-100 group-hover:to-purple-100 transition-all">
                    <FaHome className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <span className="font-medium">Homepage</span>
                </Link>
              </li>

              {/* Logout */}
              <li className="mt-auto pt-6 border-t border-gray-200/50">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-4 w-full rounded-xl text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 group-hover:from-red-100 group-hover:to-pink-100 transition-all">
                    <FaSignOutAlt className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                  </div>
                  <span className="font-medium">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;