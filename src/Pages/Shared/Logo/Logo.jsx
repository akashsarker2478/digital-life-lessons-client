import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link 
            to="/" 
            className="group flex items-center gap-3"
        >
            {/* Elegant Icon Design */}
            <div className="relative flex items-center justify-center">
                {/* Outer ring with gradient */}
                <div className="absolute w-10 h-10 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 p-[2px]">
                    <div className="w-full h-full rounded-full bg-white"></div>
                </div>
                
                {/* Inner circle with gradient */}
                <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    </div>
                </div>
            </div>
            
            {/* Consistent Blue-Purple Gradient */}
            <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-transparent">
                        Digital
                    </span>
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                        Life
                    </span>
                </div>
                <div className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Lessons
                </div>
            </div>
        </Link>
    );
};

export default Logo;