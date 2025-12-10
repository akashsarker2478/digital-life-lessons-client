import React from "react";
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
} from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import Logo from "../../Pages/Shared/Logo/Logo";

const DashboardLayout = () => {
  const { user, logOut } = UseAuth();

  const navLinks = [
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
    title: 'Logout?',
    text: 'Do you want to logout from your account?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Logout',
    cancelButtonText: 'Cancel',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      logOut()
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Logged out successfully!',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#10b981',
            color: '#ffffff'
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Logout failed!',
            text: 'Please try again.',
            confirmButtonText: 'OK'
          });
        });
    }
  });
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      

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
                Dashboard
              </div>
            </div>
            <div className="navbar-end">
              <div className="avatar">
                <div className="w-8 h-8 rounded-full ring-2 ring-blue-500 ring-offset-2">
                  <img
                    src={
                      user?.photoURL ||
                      `https://ui-avatars.com/api/?name=${
                        user?.displayName || "User"
                      }&background=random`
                    }
                    alt={user?.displayName || "User"}
                  />
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="p-4 md:p-6 lg:p-8 min-h-[calc(100vh-200px)]">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 md:p-6 lg:p-8">
              <Outlet></Outlet>
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
            
            {/* Brand Logo - User Profile Badge সহ */}
            <div className="flex items-center justify-between w-full mb-8">
             <Logo></Logo>
            
              <NavLink to="profile" className="group">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full ring-2 ring-blue-400 group-hover:ring-blue-500 transition-all">
                    <img
                      src={
                        user?.photoURL ||
                        `https://ui-avatars.com/api/?name=${
                          user?.displayName || "User"
                        }&background=gradient&color=fff`
                      }
                      alt={user?.displayName || "User"}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                </div>
              </NavLink>
            </div>

            {/* Navigation Menu */}
            <ul className="menu w-full grow space-y-2 px-2">
              {navLinks.map((link) => (
                <li key={link.path} className="group">
                  <NavLink to={link.path} className={getLinkClass}>
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 transition-all">
                      <link.icon className="w-4 h-4 text-blue-600 group-[.active]:text-white" />
                    </div>
                    <span className="font-medium">{link.name}</span>
                    <div className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-[.active]:opacity-100 transition-opacity"></div>
                  </NavLink>
                </li>
              ))}

              <div className="divider my-6 text-gray-400 text-xs">GENERAL</div>

              {/* Home Page Link */}
              <li className="group">
                <Link
                  to={"/"}
                  className="flex items-center gap-3 p-3 w-full rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 group-hover:from-blue-100 group-hover:to-purple-100 transition-all">
                    <FaHome className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <span className="font-medium">Homepage</span>
                </Link>
              </li>

              {/* Logout Button */}
              <li className="mt-auto pt-4 border-t border-gray-200/50">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-3 w-full rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-600 transition-all group"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 group-hover:from-red-100 group-hover:to-pink-100 transition-all">
                    <FaSignOutAlt className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
                  </div>
                  <span className="font-medium">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;