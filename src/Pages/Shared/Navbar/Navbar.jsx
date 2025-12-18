
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { 
  FaBars, 
  FaTimes, 
  FaUserCircle, 
  FaSignOutAlt, 
  FaBookOpen, 
  FaPlus, 
  FaDollarSign,
  FaHome,
  FaTachometerAlt,
  FaUser,
  FaBook
} from "react-icons/fa";
import Logo from "../Logo/Logo";
import premiumIcon from "../../../assets/premium icon.png";

const Navbar = () => {
  const { user, logOut, isPremium, isAdmin } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire("Logged Out!", "See you soon!", "success");
          navigate("/");
        });
      }
    });
  };

  // Navigation links
  const navLinks = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/public-lesson", label: "Public Lessons", icon: <FaBookOpen /> },
  ];

  if (user && !isAdmin) {
    navLinks.push({ path: "/dashboard/add-lessons", label: "Add Lesson", icon: <FaPlus /> });
  }

  if (user && !isAdmin && !isPremium) {
    navLinks.push({ path: "/dashboard/pricing", label: "Pricing", icon: <FaDollarSign /> });
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center gap-6">
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <FaBars className="text-xl text-gray-700" />
            </button>
            <Logo />
          </div>

          {/* Center: Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: User Menu */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 shadow">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Admin Badge */}
                    {isAdmin && (
                      <div className="absolute -top-1 -left-1 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                        A
                      </div>
                    )}

                    {/* Premium Badge */}
                    {isPremium && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white shadow">
                        <img src={premiumIcon} alt="Premium" className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="hidden md:block text-left">
                    <p className="font-semibold text-gray-800">
                      {user.displayName || user.email.split("@")[0]}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isPremium ? "Premium Member" : "Free Member"}
                    </p>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <ul tabIndex={0} className="dropdown-content menu p-3 shadow-2xl bg-white rounded-2xl w-64 border border-gray-200">
                  <li className="px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-200">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                            {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <Link to={isAdmin ? "/dashboard/admin/admin-dashboard" : "/dashboard/user-dashboard"} className="py-3 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                      <FaTachometerAlt className="text-blue-600" /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/profile" className="py-3 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                      <FaUser className="text-purple-600" /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/my-lessons" className="py-3 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                      <FaBook className="text-green-600" /> My Lessons
                    </Link>
                  </li>

                  <div className="divider my-2"></div>

                  <li>
                    <button
                      onClick={handleLogOut}
                      className="w-full text-left py-3 text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="px-6 py-2.5 text-gray-700 font-medium hover:text-blue-600 transition">
                  Sign In
                </Link>
                <Link to="/signup" className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={toggleMobileMenu}></div>
          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-2xl">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <Logo />
              <button onClick={toggleMobileMenu}>
                <FaTimes className="text-2xl text-gray-700" />
              </button>
            </div>

            <ul className="p-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={toggleMobileMenu}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      isActive(link.path)
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
              ))}

              {user && (
                <>
                  <li>
                    <Link
                      to={isAdmin ? "/dashboard/admin/admin-dashboard" : "/dashboard/user-dashboard"}
                      onClick={toggleMobileMenu}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                      <FaTachometerAlt className="text-blue-600" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/profile"
                      onClick={toggleMobileMenu}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                      <FaUser className="text-purple-600" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/my-lessons"
                      onClick={toggleMobileMenu}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                      <FaBook className="text-green-600" />
                      My Lessons
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        toggleMobileMenu();
                        handleLogOut();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;