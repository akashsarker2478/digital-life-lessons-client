import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router";

const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md">
        
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you! Your **Lifetime Premium Access** is now activated.
        </p>

        <Link
          to="/dashboard/user-dashboard"
          className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </Link>

      </div>
    </div>
  );
};

export default PaymentSuccess;
