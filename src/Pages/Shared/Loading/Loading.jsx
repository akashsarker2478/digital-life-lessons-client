import React from 'react';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>

        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full"></div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-gray-600 font-medium">Loading...</p>
        <div className="flex space-x-1 justify-center">
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
    );
};

export default Loading;