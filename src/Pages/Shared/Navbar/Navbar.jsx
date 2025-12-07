import { Link } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import UseAuth from '../../../Hooks/UseAuth';

const Navbar = () => {
    const { user, logOut } = UseAuth();
    const links = <>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="">Add Lesson</Link></li>
                        <li><Link to="">Public Lessons</Link></li>
                        <li><Link to="">pricing/upgrade</Link></li>
    </>
    
    return (
        <div className="navbar bg-base-100 shadow-sm">
            {/* Left Side - Logo and Mobile Menu */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                        
                      
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl">Digital Life Lessons</Link>
            </div>

            {/* Center - Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>

            {/* Right Side - User/Auth */}
            <div className="navbar-end gap-2">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {user.photoURL ? (
                                    <img 
                                        src={user.photoURL} 
                                        alt={user.displayName || "User"} 
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full">
                                        <FaUserCircle className="w-8 h-8 text-gray-500" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li className="menu-title">
                                <span>{user.displayName || user.email}</span>
                            </li>
                            <li>
                                <Link to='' className="justify-between">
                                    Dashboard
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/settings">Settings</Link>
                            </li>
                            <div className="divider my-0"></div>
                            <li>
                                <button onClick={logOut} className="text-red-500 hover:text-red-700">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-primary btn-sm">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;