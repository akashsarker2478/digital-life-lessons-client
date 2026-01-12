import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2"; 

const Pricing = () => {
  const { user, isPremium } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // If user is already premium
  if (isPremium) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl font-extrabold text-green-600 dark:text-green-400 mb-4">
          🎉 You are already a Premium member!
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          Your lifetime premium access is active.
        </p>
        <Link
          to="/"
          className="px-8 py-3 bg-blue-600 dark:bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-all"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  // handlePremium — Stripe Checkout
  const handlePremium = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to upgrade to Premium",
        confirmButtonColor: "#3b82f6",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    try {
      Swal.fire({
        title: "Redirecting to Payment...",
        text: "Please wait while we connect to Stripe",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await axiosSecure.post('/create-checkout-session');

      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Unable to start payment. Please try again later.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-4">
        Choose Your Plan
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
        Upgrade once and enjoy lifetime premium access!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="border border-gray-200 dark:border-gray-700 shadow-lg p-8 rounded-xl bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Free Plan</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-5">Best for starters</p>
          <h3 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-gray-100">৳0</h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <FaCheckCircle className="text-green-600 dark:text-green-400" /> Access to public lessons
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <FaCheckCircle className="text-green-600 dark:text-green-400" /> Motivational content
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <FaCheckCircle className="text-green-600 dark:text-green-400" /> Limited favorites
            </li>
          </ul>
          <button className="w-full py-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold rounded-lg cursor-not-allowed">
            Current Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="border border-gray-200 dark:border-gray-700 shadow-lg p-8 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-800 text-white hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-bold mb-2">Premium Lifetime</h2>
          <p className="text-gray-200 dark:text-gray-300 mb-5">One-time payment for lifetime access</p>
          <h3 className="text-4xl font-extrabold mb-4">
            ৳1500 <span className="text-lg text-gray-200 dark:text-gray-300">(One-time)</span>
          </h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-white" /> All Premium Lessons
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-white" /> Private Lessons Access
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-white" /> Unlimited Favorites
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-white" /> Priority Listing
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-white" /> Lifetime Support Access
            </li>
          </ul>
          <button
            onClick={handlePremium}
            className="w-full py-3 bg-white dark:bg-gray-200 text-blue-700 dark:text-blue-800 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-300 transition-all"
          >
            Upgrade to Lifetime Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;