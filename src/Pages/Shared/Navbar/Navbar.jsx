import { Link, useNavigate } from "react-router";
import {
  FaUserCircle,
  FaPlus,
  FaBookOpen,
  FaDollarSign,
  FaBars,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";
import Logo from "../Logo/Logo";
import premiumIcon from "../../../assets/premium icon.png";
import Loading from "../Loading/Loading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Navbar = () => {
  const { user, logOut, isPremium, loading ,isAdmin} = UseAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 

  console.log("Logged-in user:", user);
  if (loading) {
    return <Loading></Loading>;
  }
  // Base navigation links
  const baseNavLinks = [
    { path: "/", label: "Home" },
    {
      path: "/dashboard/add-lessons",
      label: "Add Lesson",
      icon: <FaPlus className="text-sm" />,
    },
    {
      path: "/public-lesson",
      label: "Public Lessons",
      icon: <FaBookOpen className="text-sm" />,
    },
  ];

  // Add Pricing link only if user is not premium or not logged in
  const navLinks = [...baseNavLinks];
  if (!user || !isPremium) {
    navLinks.push({
      path: "/dashboard/pricing",
      label: "Pricing",
      icon: <FaDollarSign className="text-sm" />,
    });
  }

  const handleLogOut = () => {
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
      background: "#ffffff",
      color: "#333",
      backdrop: "rgba(0,0,0,0.4)",
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
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: err.message || "Failed to logout. Please try again.",
              icon: "error",
              confirmButtonColor: "#ef4444",
              confirmButtonText: "Try Again",
            });
          });
      }
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Logo & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden btn btn-ghost btn-circle text-gray-700 hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                <FaBars className="h-5 w-5" />
              </button>

              {/* Logo */}
              <Logo />
            </div>

            {/* Center - Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium group"
                >
                  <span className="text-blue-500 group-hover:scale-110 transition-transform">
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Right Side - User/Auth */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                  >
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-sm font-semibold text-gray-800">
                        {user.displayName || user.email?.split("@")[0]}
                      </span>
                      <span className="text-xs text-gray-500">
                        {user.email}
                      </span>
                    </div>

                    {/* User Avatar with Premium Badge */}
                    <div className="relative group">
                      <div className="w-10 h-10 rounded-full border-2 border-blue-100 overflow-hidden">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.displayName || "User"}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">
                              {user.displayName?.charAt(0) ||
                                user.email?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      {/* Admin Badge on Avatar */}
{isAdmin && (
  <div className="absolute top-0 left-0 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center shadow-md border-2 border-white text-white text-xs font-bold">
    A
  </div>
)}

                      {/* Premium Badge (Only Icon) */}
                      {isPremium && (
                        <>
                          {/* Badge on Avatar */}
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                            <img
                              src={premiumIcon}
                              alt="Premium"
                              className="w-3.5 h-3.5"
                            />
                          </div>

                          {/* Tooltip on Hover */}
                          <div className="absolute -top-10 right-0 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            Premium Member
                          </div>
                        </>
                      )}

                      {/* Online Status Dot */}
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 ${
                          isPremium ? "bg-green-500" : "bg-gray-400"
                        } rounded-full border-2 border-white`}
                      ></div>
                    </div>
                  </div>

                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-white rounded-box z-[1] mt-3 w-64 p-2 shadow-xl border border-gray-200"
                  >
                    <li className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-100">
                            {user.photoURL ? (
                              <img
                                src={user.photoURL}
                                alt={user.displayName || "User"}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                <span className="text-white font-semibold text-xl">
                                  {user.displayName?.charAt(0) ||
                                    user.email?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Premium Badge in dropdown */}
                          {isPremium && (
                            <div className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                              <img
                                src={premiumIcon}
                                alt="Premium"
                                className="w-4 h-4"
                              />
                            </div>
                          )}

                          <div
                            className={`absolute bottom-0 right-0 w-4 h-4 ${
                              isPremium ? "bg-green-500" : "bg-gray-400"
                            } rounded-full border-2 border-white`}
                          ></div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-800">
                              {user.displayName || "User"}
                            </p>
                            {isPremium && (
                              <div className="relative group">
                                <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                  <img
                                    src={premiumIcon}
                                    alt="Premium"
                                    className="w-3 h-3"
                                  />
                                </div>
                                <div className="absolute left-full ml-2 -top-1 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                  Premium Member
                                </div>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </li>

                    <li>
                      <Link
                        to={isAdmin ? "/dashboard/admin/admin-dashboard" : "/dashboard/user-dashboard"}
                        className="flex items-center gap-3 py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors text-gray-700 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium">Dashboard</span>
                          <span className="text-xs text-gray-500 block">
                            View your progress
                          </span>
                        </div>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/dashboard/profile"
                        className="flex items-center gap-3 py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors text-gray-700 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                          <FaUserCircle className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <span className="font-medium">Profile</span>
                          <span className="text-xs text-gray-500 block">
                            Manage your account
                          </span>
                        </div>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/dashboard/my-lessons"
                        className="flex items-center gap-3 py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors text-gray-700 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                          <FaBookOpen className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <span className="font-medium">My Lessons</span>
                          <span className="text-xs text-gray-500 block">
                            Your created content
                          </span>
                        </div>
                      </Link>
                    </li>

                    <div className="divider my-0"></div>

                    <li>
                      <button
                        onClick={handleLogOut}
                        className="flex items-center gap-3 py-3 px-4 hover:bg-red-50 rounded-lg transition-colors text-red-600 w-full group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            ></path>
                          </svg>
                        </div>
                        <span className="font-medium">Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-gray-700 hover:text-blue-600 font-medium rounded-lg transition-colors hover:bg-gray-100"
                  >
                    Sign In
                  </Link>
                  {/* Show Get Started button only if user is not premium */}
                  {!isPremium && (
                    <Link
                      to="/dashboard/pricing"
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      Get Started
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (Drawer) */}
      <div
        className={`fixed inset-0 z-40 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:hidden`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={toggleMobileMenu}
        ></div>

        {/* Mobile Menu Panel */}
        <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                onClick={toggleMobileMenu}
                className="btn btn-ghost btn-circle"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* User Info (if logged in) */}
          {user && (
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-blue-100 overflow-hidden">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {user.displayName?.charAt(0) ||
                            user.email?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Premium Badge in mobile */}
                  {isPremium && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                      <img
                        src={premiumIcon}
                        alt="Premium"
                        className="w-3.5 h-3.5"
                      />
                    </div>
                  )}

                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 ${
                      isPremium ? "bg-green-500" : "bg-gray-400"
                    } rounded-full border-2 border-white`}
                  ></div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800">
                      {user.displayName || "User"}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="p-4">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={toggleMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group"
                  >
                    <span className="text-blue-500">{link.icon}</span>
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </li>
              ))}

              {/* User Menu Links for Mobile */}
              {user ? (
                <>
            <li>
  <Link
    to={isAdmin ? "/dashboard/admin" : "/dashboard/user-dashboard"}
    onClick={toggleMobileMenu}
    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
  >
    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      ></path>
    </svg>
    <span className="font-medium">Dashboard</span>
  </Link>
</li>

                  <li>
                    <Link
                      to="/dashboard/profile"
                      onClick={toggleMobileMenu}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <FaUserCircle className="w-5 h-5 text-purple-500" />
                      <span className="font-medium">Profile</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        toggleMobileMenu();
                        handleLogOut();
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        ></path>
                      </svg>
                      <span className="font-medium">Logout</span>
                    </button>
                  </li>
                </>
              ) : (
                <div className="pt-4 border-t border-gray-200">
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      onClick={toggleMobileMenu}
                      className="block w-full px-4 py-3 text-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium border border-gray-300"
                    >
                      Sign In
                    </Link>

                    {/* Show Get Started button only if user is not premium */}
                    {!isPremium && (
                      <Link
                        to="/dashboard/pricing"
                        onClick={toggleMobileMenu}
                        className="block w-full px-4 py-3 text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium shadow-sm hover:shadow transition-all"
                      >
                        Get Started
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
