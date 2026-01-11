// src/pages/AboutUs.jsx
import React from "react";
import { Link } from "react-router";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-20" data-aos="fade-up">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 rounded-full mb-6">
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Our Story</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
            Digital Life Lessons
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            A sanctuary where real human experiences transform into timeless wisdom.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid lg:grid-cols-2 gap-10 mb-24">
          <div 
            className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
            data-aos="fade-right"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h2 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-8 relative z-10">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg relative z-10">
              We exist to bridge the gap between lived experience and collective growth. Every lesson shared here is a piece of someone's soul—raw, real, and profoundly valuable. Our mission is simple yet powerful: create a global space where vulnerability becomes strength, stories become teachers, and wisdom flows freely across generations and cultures.
            </p>
          </div>

          <div 
            className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
            data-aos="fade-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h2 className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-8 relative z-10">Our Vision</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg relative z-10">
              To become the most trusted digital archive of human wisdom. A place where millions come not just to read, but to reflect, heal, evolve, and contribute. We dream of a world where life lessons are as accessible as knowledge itself—where a single story can change someone's entire trajectory, and every individual feels seen, heard, and valued.
            </p>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="mb-24" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-gray-100 mb-16">
            Our Guiding Principles
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Authenticity", desc: "No filters. No fiction. Just real human truth.", color: "indigo" },
              { title: "Empathy", desc: "We honor every journey with deep understanding and compassion.", color: "purple" },
              { title: "Impact", desc: "One story can change a life. We exist to make that possible.", color: "pink" }
            ].map((value, i) => (
              <div 
                key={i}
                className={`group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-${value.color}-200/30 dark:border-${value.color}-800/30 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                data-aos="zoom-in"
                data-aos-delay={i * 100}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${value.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <h3 className={`text-3xl font-bold text-${value.color}-600 dark:text-${value.color}-400 mb-6 relative z-10`}>{value.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg relative z-10">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Community Call to Action */}
        <div className="text-center" data-aos="fade-up" data-aos-delay="600">
          <div className="inline-block p-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-8">
            <div className="bg-white dark:bg-gray-900 px-10 py-5 rounded-full">
              <span className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">Join the Movement</span>
            </div>
          </div>
          <p className="text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-10">
            Be part of the largest growing community of wisdom seekers and storytellers.
          </p>
          <Link to={'/login'} className="px-12 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 text-xl">
            Start Sharing Your Story Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;