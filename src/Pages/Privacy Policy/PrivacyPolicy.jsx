// src/pages/PrivacyPolicy.jsx
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 py-16 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto prose prose-lg dark:prose-invert max-w-none">
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 rounded-full mb-6">
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Legal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Last updated: January 11, 2026
          </p>
        </div>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-10 shadow-2xl mb-12" data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-8">1. Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            Digital Life Lessons ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with our platform.
          </p>
        </div>

        <div className="space-y-16">
          {/* Section 2 */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h2 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">2. Information We Collect</h2>
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200/30 dark:border-gray-700/30 rounded-2xl p-8">
              <ul className="list-disc pl-6 space-y-4 text-gray-700 dark:text-gray-300 text-lg">
                <li><strong>Personal Information:</strong> Name, email address, profile picture (when provided during registration or profile update).</li>
                <li><strong>User Content:</strong> Lessons you publish, comments, likes, favorites, and any other content you upload or submit.</li>
                <li><strong>Technical Information:</strong> IP address, browser type/version, device type, operating system, pages visited, time spent, referring/exit pages.</li>
                <li><strong>Payment Information:</strong> We do not store payment details. All transactions are processed securely through Stripe.</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div data-aos="fade-up" data-aos-delay="400">
            <h2 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">3. How We Use Your Information</h2>
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200/30 dark:border-gray-700/30 rounded-2xl p-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-6">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-4 text-gray-700 dark:text-gray-300 text-lg">
                <li>To provide, maintain, and improve our platform and services</li>
                <li>To communicate with you regarding your account, content, or inquiries</li>
                <li>To personalize your experience and content recommendations</li>
                <li>To detect, prevent, and address technical issues or fraudulent activity</li>
                <li>To comply with legal obligations and protect our rights</li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div data-aos="fade-up" data-aos-delay="500">
            <h2 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">4. Data Sharing & Disclosure</h2>
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200/30 dark:border-gray-700/30 rounded-2xl p-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                We do not sell your personal information. We may share your data in limited circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-4 text-gray-700 dark:text-gray-300 text-lg mt-6">
                <li><strong>Service Providers:</strong> With trusted third-party vendors (hosting, analytics, email service) who assist us in operating the platform.</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government request.</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets.</li>
              </ul>
            </div>
          </div>

          {/* Section 5 - Your Rights */}
          <div data-aos="fade-up" data-aos-delay="600">
            <h2 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">5. Your Rights & Choices</h2>
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200/30 dark:border-gray-700/30 rounded-2xl p-8">
              <ul className="list-disc pl-6 space-y-4 text-gray-700 dark:text-gray-300 text-lg">
                <li>Access, correct, or delete your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request data portability</li>
                <li>Withdraw consent where processing is based on consent</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
              <p className="mt-6 text-gray-700 dark:text-gray-300">
                To exercise these rights, please contact us at support@digitallifelessons.com
              </p>
            </div>
          </div>

          {/* Contact Footer */}
          <div className="text-center mt-20" data-aos="fade-up" data-aos-delay="700">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Questions about this policy? Reach out at
              <a href="mailto:support@digitallifelessons.com" className="text-indigo-600 dark:text-indigo-400 hover:underline ml-2 font-medium">
                support@digitallifelessons.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;