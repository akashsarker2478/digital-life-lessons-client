import { Link, useNavigate } from 'react-router';
import { FaUserCircle, FaPlus, FaBookOpen, FaDollarSign } from 'react-icons/fa';
import Swal from 'sweetalert2';
import UseAuth from '../../../Hooks/UseAuth';
import Logo from '../Logo/Logo';

const Navbar = () => {
    const { user, logOut } = UseAuth();
    const navigate = useNavigate();
    
    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/add-lesson", label: "Add Lesson", icon: <FaPlus className="text-xs" /> },
        { path: "/lessons", label: "Public Lessons", icon: <FaBookOpen className="text-xs" /> },
        { path: "/pricing", label: "Pricing", icon: <FaDollarSign className="text-xs" /> }
    ];

    const handleLogOut = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out from your account!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            background: '#ffffff',
            color: '#333',
            backdrop: 'rgba(0,0,0,0.4)'
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        // Success Alert
                        Swal.fire({
                            title: 'Logged Out!',
                            text: 'You have been successfully logged out.',
                            icon: 'success',
                            confirmButtonColor: '#10b981',
                            confirmButtonText: 'OK',
                            timer: 2000,
                            timerProgressBar: true,
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        }).then(() => {
                            navigate('/login');
                        });
                    })
                    .catch(err => {
                        // Error Alert
                        Swal.fire({
                            title: 'Error!',
                            text: err.message || 'Failed to logout. Please try again.',
                            icon: 'error',
                            confirmButtonColor: '#ef4444',
                            confirmButtonText: 'Try Again'
                        });
                    });
            }
        });
    };

    const handleLoginPrompt = () => {
        Swal.fire({
            title: 'Welcome Back!',
            text: 'Please login to access all features',
            icon: 'info',
            confirmButtonText: 'Go to Login',
            confirmButtonColor: '#3b82f6',
            showCancelButton: true,
            cancelButtonText: 'Maybe Later',
            background: '#f8fafc',
            color: '#1e293b',
            iconColor: '#3b82f6'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/login');
            }
        });
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    
                    {/* Left Side - Logo */}
                    <div className="flex items-center">
                        <div className="lg:hidden mr-2">
                            <label htmlFor="my-drawer" className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </label>
                        </div>
                        <Logo />
                    </div>

                    {/* Center - Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium"
                            >
                                {link.icon}
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Side - User/Auth */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors">
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm font-semibold text-gray-800">
                                            {user.displayName || user.email?.split('@')[0]}
                                        </span>
                                        <span className="text-xs text-gray-500">Premium User</span>
                                    </div>
                                    <div className="avatar">
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
                                                    <span className="text-white font-semibold">
                                                        {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[1] mt-2 w-56 p-2 shadow-lg border border-gray-100">
                                    <li className="p-3 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                                    {user.photoURL ? (
                                                        <img 
                                                            src={user.photoURL} 
                                                            alt={user.displayName || "User"} 
                                                            className="w-full h-full object-cover"
                                                            referrerPolicy="no-referrer"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                                            <span className="text-white text-lg font-semibold">
                                                                {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{user.displayName || "User"}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </li>
                                    
                                    <li>
                                        <Link to="/dashboard" className="flex items-center gap-3 py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors">
                                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-800">Dashboard</span>
                                                <span className="text-xs text-gray-500 block">View your progress</span>
                                            </div>
                                        </Link>
                                    </li>
                                    
                                    <li>
                                        <Link to="/profile" className="flex items-center gap-3 py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors">
                                            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                                                <FaUserCircle className="w-4 h-4 text-purple-600" />
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-800">Profile Settings</span>
                                                <span className="text-xs text-gray-500 block">Manage your account</span>
                                            </div>
                                        </Link>
                                    </li>
                                    
                                    <div className="divider my-0"></div>
                                    
                                    <li>
                                        <button 
                                            onClick={handleLogOut}
                                            className="flex items-center gap-3 py-3 px-4 hover:bg-red-50 rounded-lg transition-colors text-red-600 w-full"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                                </svg>
                                            </div>
                                            <span className="font-medium">Logout</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link 
                                    to="/login" 
                                    className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg transition-colors"
                                >
                                    Sign In
                                </Link>
                                <button 
                                    onClick={handleLoginPrompt}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                                >
                                    Get Started
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden border-t border-gray-100 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-around py-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="flex flex-col items-center gap-1 px-3 py-2 text-gray-600 hover:text-blue-600 rounded-lg transition-colors"
                            >
                                <div className="text-lg">
                                    {link.icon}
                                </div>
                                <span className="text-xs font-medium">{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;