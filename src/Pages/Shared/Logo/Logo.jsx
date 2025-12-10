import React from 'react';
import { Link } from 'react-router'; 

const Logo = () => {
    return (
        <Link 
            to="/" 
            className="group flex items-center gap-3"
        >
          
            <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center animate-gradient-x">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    </div>
                </div>
            </div>
            
           
            <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Digital
                    </span>
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Life
                    </span>
                </div>
                <div className="text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    Lessons
                </div>
            </div>
        </Link>
    );
};

export default Logo;