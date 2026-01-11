// src/pages/ContactUs.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    Swal.fire({
      title: "Message Sent!",
      text: "We'll get back to you within 24-48 hours.",
      icon: "success",
      confirmButtonColor: "#4F46E5",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950 py-16 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
            Let's Connect
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Have a question, suggestion, or just want to say hello? We're here for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div 
            className="relative bg-white/30 dark:bg-gray-900/30 backdrop-blur-2xl border border-white/20 dark:border-gray-700/30 rounded-3xl p-10 shadow-2xl overflow-hidden"
            data-aos="fade-right"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent opacity-50"></div>
            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
              <div>
                <label className="block text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-5 bg-white/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none transition-all text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-5 bg-white/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none transition-all text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-5 bg-white/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none transition-all text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-6 py-5 bg-white/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none transition-all text-gray-900 dark:text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Info + Social */}
          <div className="space-y-10" data-aos="fade-left">
            {/* Direct Contact */}
            <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-2xl border border-white/20 dark:border-gray-700/30 rounded-3xl p-10 shadow-2xl">
              <h3 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-8">Reach Out Directly</h3>
              <div className="space-y-8 text-gray-800 dark:text-gray-200">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-3xl">
                    📧
                  </div>
                  <div>
                    <p className="font-medium">Email us</p>
                    <a href="mailto:support@digitallifelessons.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                      support@digitallifelessons.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-3xl">
                    🌐
                  </div>
                  <div>
                    <p className="font-medium">Website</p>
                    <a href="https://digital-life-lessons-f43b0.web.app" className="text-purple-600 dark:text-purple-400 hover:underline">
                      digital-life-lessons-f43b0.web.app
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-2xl border border-white/20 dark:border-gray-700/30 rounded-3xl p-10 shadow-2xl">
              <h3 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-8">Follow Us</h3>
              <div className="flex gap-8 justify-center">
                <a href="https://web.facebook.com/akash.sarker.671998" target="_blank" rel="noreferrer" className="text-5xl text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform">
                  <FaFacebookF />
                </a>
                <a href="https://x.com/AkashSarke1472" target="_blank" rel="noreferrer" className="text-5xl text-sky-500 dark:text-sky-400 hover:scale-110 transition-transform">
                  <FaXTwitter />
                </a>
                <a href="https://www.linkedin.com/in/akashsarker/" target="_blank" rel="noreferrer" className="text-5xl text-blue-700 dark:text-blue-400 hover:scale-110 transition-transform">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
