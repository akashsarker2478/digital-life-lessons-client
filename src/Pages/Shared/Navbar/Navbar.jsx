import React, { useEffect, useState } from "react";
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
  FaBook,
  FaSun,
  FaMoon,
  FaInfoCircle,
  FaEnvelope
} from "react-icons/fa";
import Logo from "../Logo/Logo";
import premiumIcon from "../../../assets/premium icon.png";

const Navbar = () => {
  const { user, logOut, isPremium, isAdmin } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Theme toggle
  const toggleTheme = () => {
  const newTheme = theme === "light" ? "dark" : "light";
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);

  document.documentElement.setAttribute("data-theme", newTheme);
};


  // Apply theme on mount
 useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
}, [theme]);


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
    { path: "/about", label: "About", icon: <FaInfoCircle /> },     
  { path: "/contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  if (user && !isAdmin) {
    navLinks.push({ path: "/dashboard/add-lessons", label: "Add Lesson", icon: <FaPlus /> });
  }

  if (user && !isAdmin && !isPremium) {
    navLinks.push({ path: "/dashboard/pricing", label: "Pricing", icon: <FaDollarSign /> });
  }

  const isActive = (path) => location.pathname === path;

  const userStatusText = isAdmin ? "Admin" : isPremium ? "Premium Member" : "Free Member";

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center gap-6">
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <FaBars className="text-xl text-gray-700 dark:text-gray-200" />
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
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: User Menu + Theme Toggle */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <FaMoon className="text-xl text-indigo-600 dark:text-indigo-400" />
              ) : (
                <FaSun className="text-xl text-yellow-400" />
              )}
            </button>

            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700 shadow-sm">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Admin Badge */}
                    {isAdmin && (
                      <div className="absolute -top-1 -left-1 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                        A
                      </div>
                    )}

                    {/* Premium Badge */}
                    {isPremium && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900 shadow">
                        <img src={premiumIcon} alt="Premium" className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="hidden md:block text-left">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                      {user.displayName || user.email.split("@")[0]}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {userStatusText}
                    </p>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <ul tabIndex={0} className="dropdown-content menu p-4 shadow-2xl bg-white dark:bg-gray-800 rounded-2xl w-72 border border-gray-200 dark:border-gray-700 mt-3">
                  <li className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                            {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 dark:text-gray-100">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <Link to={isAdmin ? "/dashboard/admin/admin-dashboard" : "/dashboard/user-dashboard"} className="py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl flex items-center gap-3 text-gray-700 dark:text-gray-200">
                      <FaTachometerAlt className="text-indigo-600" /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/profile" className="py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl flex items-center gap-3 text-gray-700 dark:text-gray-200">
                      <FaUser className="text-purple-600" /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/my-lessons" className="py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl flex items-center gap-3 text-gray-700 dark:text-gray-200">
                      <FaBook className="text-green-600" /> My Lessons
                    </Link>
                  </li>

                  <div className="divider my-2 dark:divider-neutral"></div>

                  <li>
                    <button
                      onClick={handleLogOut}
                      className="w-full text-left py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl flex items-center gap-3"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link 
                  to="/login" 
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="hidden sm:block px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition"
                >
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
          <div className="absolute inset-0 bg-black/60 dark:bg-black/80" onClick={toggleMobileMenu}></div>
          <div className="absolute left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <Logo />
              <button onClick={toggleMobileMenu}>
                <FaTimes className="text-2xl text-gray-700 dark:text-gray-200" />
              </button>
            </div>

            <ul className="p-6 space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={toggleMobileMenu}
                    className={`flex items-center gap-4 px-5 py-4 rounded-xl font-medium transition-all ${
                      isActive(link.path)
                        ? "bg-indigo-600 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
              ))}

              {user && (
                <>
                  <div className="divider dark:divider-neutral my-4"></div>
                  <li>
                    <Link
                      to={isAdmin ? "/dashboard/admin/admin-dashboard" : "/dashboard/user-dashboard"}
                      onClick={toggleMobileMenu}
                      className="flex items-center gap-4 px-5 py-4 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <FaTachometerAlt className="text-indigo-600" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/profile"
                      onClick={toggleMobileMenu}
                      className="flex items-center gap-4 px-5 py-4 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <FaUser className="text-purple-600" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/my-lessons"
                      onClick={toggleMobileMenu}
                      className="flex items-center gap-4 px-5 py-4 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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
                      className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
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