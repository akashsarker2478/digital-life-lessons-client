import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link 
            to="/" 
            className="group flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
        >
            {/* Minimal dot design */}
            <div className="relative">
                <div className="h-2.5 w-2.5 rounded-full bg-blue-500 group-hover:bg-blue-600 transition-colors"></div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-px bg-blue-300/50"></div>
            </div>
            
            {/* Clean typography */}
            <div className="flex items-baseline gap-2">
                <span className="text-lg font-medium text-gray-700">
                    Digital
                </span>
                <span className="text-lg font-bold text-blue-700">
                    Life
                </span>
                <span className="text-lg font-medium text-gray-700">
                    Lessons
                </span>
            </div>
        </Link>
    );
};

export default Logo;