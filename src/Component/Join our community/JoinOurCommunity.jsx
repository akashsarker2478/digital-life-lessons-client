import React from "react";
import { FaUsers } from "react-icons/fa";

const JoinOurCommunity = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-8">
          <FaUsers className="text-indigo-600 text-6xl mx-auto mb-4" />
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with thousands of learners and creators. Share your knowledge, 
            grow together, and become part of a vibrant learning community.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8">
          <a
            href="/signup"
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300"
          >
            Get Started
          </a>
          <a
            href="/about"
            className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default JoinOurCommunity;
