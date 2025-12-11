import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Pricing = () => {
  const {user} = UseAuth()
  const axiosSecure = useAxiosSecure()
  const handlePremium = async()=>{
      try {
    const res = await axiosSecure.post("/create-checkout-session", {
      userEmail: user.email,
      userId: user._id,
    });

    if (res.data.url) {
      window.location.href = res.data.url;
    }

  } catch (error) {
    console.log(error);
  }
  }
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-4">
        Choose Your Plan
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Upgrade once and enjoy lifetime premium access!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Free Plan */}
        <div className="border shadow-lg p-8 rounded-xl bg-white hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Free Plan</h2>
          <p className="text-gray-500 mb-5">Best for starters</p>

          <h3 className="text-4xl font-extrabold mb-4">৳0</h3>

          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2 text-gray-700">
              <FaCheckCircle className="text-green-600" /> Access to public lessons
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <FaCheckCircle className="text-green-600" /> Motivational content
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <FaCheckCircle className="text-green-600" /> Limited favorites
            </li>
          </ul>

          <button className="w-full py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg">
            Current Plan
          </button>
        </div>

        {/* Premium Lifetime Plan */}
        <div className="border shadow-lg p-8 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-bold mb-2">Premium Lifetime</h2>
          <p className="text-gray-200 mb-5">
            One-time payment — Access forever!
          </p>

          <h3 className="text-4xl font-extrabold mb-4">
            ৳1500 <span className="text-lg text-gray-200">(One-time)</span>
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

          
            <button onClick={handlePremium} className="w-full py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition-all">
              Upgrade to Lifetime Premium
            </button>
          
        </div>

      </div>
    </div>
  );
};

export default Pricing;
