import React, { useEffect, useState } from "react";
import { FaUsers, FaBookOpen, FaGlobe, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const JoinOurCommunity = () => {
  const stats = [
    { icon: FaUsers, end: 15000, suffix: "+", label: "Active Members", color: "indigo" },
    { icon: FaBookOpen, end: 45000, suffix: "+", label: "Lessons Shared", color: "purple" },
    { icon: FaGlobe, end: 120, suffix: "+", label: "Countries", color: "pink" },
  ];

  const testimonials = [
    {
      quote: "This platform changed how I reflect on life. Truly powerful!",
      author: "Sarah M.",
    },
    {
      quote: "Connecting with so many wise people — best decision ever!",
      author: "Rahim K.",
    },
  ];

  // Animated Counter Component
  const AnimatedCounter = ({ end, duration = 2500, suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [end, duration]);

    return (
      <span className="text-5xl md:text-6xl font-extrabold">
        {count.toLocaleString()}
        {suffix}
      </span>
    );
  };

  return (
    <section className="py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.15)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_30%,rgba(129,140,248,0.15)_0%,transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 mb-8 shadow-xl"
          >
            <FaUsers className="text-5xl text-indigo-600 dark:text-indigo-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-6"
          >
            Join Our Growing Community
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Connect with thousands of lifelong learners, creators, and thinkers from around the world.  
            <span className="font-semibold text-indigo-600 dark:text-indigo-400"> Share • Reflect • Grow</span> together.
          </motion.p>
        </div>

        {/* Animated Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center group"
            >
              <stat.icon className={`text-6xl mx-auto mb-6 text-${stat.color}-600 dark:text-${stat.color}-400 group-hover:scale-110 transition-transform duration-300`} />
              
              <h3 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-3">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </h3>
              
              <p className="text-xl font-medium text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-xl border border-gray-100 dark:border-gray-700 relative"
            >
              <div className="absolute -top-5 left-8 text-6xl text-indigo-200 dark:text-indigo-800/30">"</div>
              <p className="text-xl italic text-gray-700 dark:text-gray-300 mb-6 relative z-10">
                {t.quote}
              </p>
              <p className="font-semibold text-indigo-600 dark:text-indigo-400 text-right">
                — {t.author}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
          <motion.a
            href="/signup"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative px-12 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-800 text-white font-bold text-xl rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Get Started Now
              <FaArrowRight className="group-hover:translate-x-3 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.a>

          <motion.a
            href="/about"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group px-12 py-6 border-2 border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 font-bold text-xl rounded-xl hover:bg-indigo-600 dark:hover:bg-indigo-700 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Learn More About Us
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default JoinOurCommunity;