import React from 'react';
import { useNavigate } from 'react-router';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        
        {/* Error Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
            <FaExclamationTriangle className="text-4xl text-red-500" />
          </div>
        </div>

        {/* Error Text */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        {/* Single Button - Back to Home */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg w-full max-w-xs"
        >
          <FaHome className="text-lg" />
          Back to Home
        </button>

      </div>
    </div>
  );
};

export default NotFound;