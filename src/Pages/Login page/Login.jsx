import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TypeAnimation } from "react-type-animation";
import { FaEnvelope, FaLock, FaArrowRight, FaEye, FaEyeSlash, FaSignInAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../Social login/SocialLogin";
import loginImg from "../../assets/loginImg.jpg";

const Login = () => {
  const { loginUser } = UseAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (data) => {
    setIsLoading(true);

    loginUser(data.email, data.password)
      .then((res) => {
        Swal.fire({
          title: "Welcome Back!",
          text: "Login successful!",
          icon: "success",
          confirmButtonColor: "#10b981",
          confirmButtonText: "Continue Learning",
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          navigate("/");
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Login Failed!",
          text: err.message || "Invalid email or password. Please try again.",
          icon: "error",
          confirmButtonColor: "#ef4444",
          confirmButtonText: "Try Again",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Demo credentials quick fill
  const fillUserDemo = () => {
    document.getElementById("email").value = "demouser@gmail.com";
    document.getElementById("password").value = "Demo12";
  };

  const fillAdminDemo = () => {
    document.getElementById("email").value = "akash@sarker.com";
    document.getElementById("password").value = "Akash12";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950">
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl w-full rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        {/* Left Side - Image with Overlay */}
        <div className="relative hidden lg:block">
          <img
            src={loginImg}
            alt="Login"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70 dark:from-blue-950/80 dark:to-purple-950/80"></div>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-4">
                <TypeAnimation
                  sequence={[
                    "Welcome Back!",
                    2000,
                    "Continue Your Journey",
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
                Sign in to access your life lessons and continue learning
              </p>
            </div>

            <div className="space-y-6 mt-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Secure Access</h4>
                  <p className="opacity-80">Your data is protected</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Sync Across Devices</h4>
                  <p className="opacity-80">Access anywhere, anytime</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Community Access</h4>
                  <p className="opacity-80">Connect with fellow learners</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 md:p-12 bg-white dark:bg-gray-900">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-6 shadow-lg">
              <FaSignInAlt className="text-3xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to your Digital Life Lessons account
            </p>
          </div>

          {/* Demo Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={fillUserDemo}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              <FaEnvelope /> User Login (Demo)
            </button>
            <button
              onClick={fillAdminDemo}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              <FaUserShield /> Admin Login (Demo)
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <FaEnvelope className="text-blue-500 dark:text-blue-400" />
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
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
                <p className="text-red-500 dark:text-red-400 text-sm flex items-center gap-1">
                  Email is required
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FaLock className="text-blue-500 dark:text-blue-400" />
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                  })}
                  className={`w-full px-4 py-3 pl-12 pr-12 rounded-xl border ${
                    errors.password
                      ? "border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-950/20"
                      : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
                  } focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300`}
                  placeholder="Enter your password"
                />
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password?.type === "required" && (
                <p className="text-red-500 dark:text-red-400 text-sm">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 dark:text-red-400 text-sm">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Remember me for 30 days
              </label>
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
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
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

          {/* Register Link */}
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl border border-blue-100 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Don't have an account?
            </p>
            <Link
              to="/signUp"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-800 text-white font-semibold rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Create Free Account
            </Link>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Join thousands of learners documenting their life journey
            </p>
          </div>

          {/* Security Note */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Your data is secure</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  We use encryption to protect your personal information and life lessons.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;