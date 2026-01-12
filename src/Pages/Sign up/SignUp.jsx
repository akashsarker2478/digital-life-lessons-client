import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TypeAnimation } from 'react-type-animation';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCamera,
  FaArrowRight,
  FaCheckCircle,
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import UseAuth from '../../Hooks/UseAuth';
import SocialLogin from '../Social login/SocialLogin';
import { useNavigate } from 'react-router';
import axios from 'axios';
import registerImg from '../../assets/register img.jpg';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const SignUp = () => {
  const { createUser, updateUser } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const password = watch("password", "");

  const handleRegister = (data) => {
    setIsLoading(true);
    const profileImg = data.photo[0];

    createUser(data.email, data.password)
      .then(() => {
        if (!profileImg) {
          return { data: { data: { url: null } } };
        }

        const formData = new FormData();
        formData.append("image", profileImg);
        const img_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

        return axios.post(img_API_URL, formData);
      })
      .then((imgResponse) => {
        const imageUrl = imgResponse?.data?.data?.url || null;

        // Firebase profile update
        return updateUser({
          displayName: data.name,
          photoURL: imageUrl,
        }).then(() => imageUrl);
      })
      .then((imageUrl) => {
        const userInfo = {
          name: data.name,
          email: data.email,
          role: 'user',
          photoURL: imageUrl,
        };

        return axiosSecure.post('/users', userInfo);
      })
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Account created successfully!",
          icon: "success",
          confirmButtonColor: "#10b981",
          timer: 3000,
          timerProgressBar: true,
        }).then(() => {
          navigate("/");
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error!",
          text: err.message || "Registration failed.",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950">
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl w-full rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        {/* Left Side - Image with Overlay */}
        <div className="relative hidden lg:block">
          <img
            src={registerImg}
            alt="Registration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70 dark:from-blue-950/80 dark:to-purple-950/80"></div>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-4">
                <TypeAnimation
                  sequence={[
                    "Start Your Journey",
                    2000,
                    "Share Your Wisdom",
                    2000,
                    "Learn & Grow Together",
                    2000,
                  ]}
                  speed={50}
                  repeat={Infinity}
                  wrapper="span"
                  style={{ display: "inline-block" }}
                />
              </h2>
              <p className="text-xl opacity-90">
                Join our community of lifelong learners
              </p>
            </div>

            <div className="space-y-6 mt-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <FaCheckCircle className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Document Life Lessons</h4>
                  <p className="opacity-80">Capture your experiences</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <FaCheckCircle className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Learn from Others</h4>
                  <p className="opacity-80">Discover shared wisdom</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <FaCheckCircle className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Grow Together</h4>
                  <p className="opacity-80">Community-driven learning</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="p-8 md:p-12 bg-white dark:bg-gray-900">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-6 shadow-lg">
              <FaUser className="text-3xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Join Digital Life Lessons today</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <FaUser className="text-blue-500 dark:text-blue-400" />
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className={`w-full px-4 py-3 pl-12 rounded-xl border ${
                    errors.name
                      ? "border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-950/20"
                      : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
                  } focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300`}
                  placeholder="Enter your full name"
                />
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              </div>
              {errors.name?.type === "required" && (
                <p className="text-red-500 dark:text-red-400 text-sm flex items-center gap-1">
                  Name is required
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <FaEnvelope className="text-blue-500 dark:text-blue-400" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className={`w-full px-4 py-3 pl-12 rounded-xl border ${
                    errors.email
                      ? "border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-950/20"
                      : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
                  } focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300`}
                  placeholder="you@example.com"
                />
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              </div>
              {errors.email?.type === "required" && (
                <p className="text-red-500 dark:text-red-400 text-sm">Email is required</p>
              )}
            </div>

            {/* Photo Upload Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <FaCamera className="text-blue-500 dark:text-blue-400" />
                Profile Photo
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  {...register("photo", { required: false })}
                  className={`w-full px-4 py-3 pl-12 rounded-xl border ${
                    errors.photo
                      ? "border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-950/20"
                      : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
                  } focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50`}
                />
                <FaCamera className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Optional - You can add later
              </p>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <FaLock className="text-blue-500 dark:text-blue-400" />
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                  })}
                  className={`w-full px-4 py-3 pl-12 rounded-xl border ${
                    errors.password
                      ? "border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-950/20"
                      : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
                  } focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300`}
                  placeholder="Create a strong password"
                />
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              </div>

              {/* Password Requirements */}
              <div className="space-y-1 mt-2">
                <div
                  className={`flex items-center gap-2 text-xs ${
                    password.length >= 6 ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      password.length >= 6 ? "bg-green-500 dark:bg-green-400" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  ></div>
                  At least 6 characters
                </div>
                <div
                  className={`flex items-center gap-2 text-xs ${
                    /[a-z]/.test(password) ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      /[a-z]/.test(password) ? "bg-green-500 dark:bg-green-400" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  ></div>
                  One lowercase letter
                </div>
                <div
                  className={`flex items-center gap-2 text-xs ${
                    /[A-Z]/.test(password) ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      /[A-Z]/.test(password) ? "bg-green-500 dark:bg-green-400" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  ></div>
                  One uppercase letter
                </div>
                <div
                  className={`flex items-center gap-2 text-xs ${
                    /\d/.test(password) ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      /\d/.test(password) ? "bg-green-500 dark:bg-green-400" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  ></div>
                  One number
                </div>
              </div>

              {errors.password?.type === "required" && (
                <p className="text-red-500 dark:text-red-400 text-sm">Password is required</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
            <span className="px-4 text-gray-500 dark:text-gray-400 text-sm">Or continue with</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          </div>

          {/* Social Login */}
          <div className="mb-8">
            <SocialLogin />
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;