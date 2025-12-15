import React from 'react';
import { Link } from 'react-router';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import Logo from '../../Pages/Shared/Logo/Logo';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = {
        facebook: 'https://facebook.com/',
        twitter: 'https://twitter.com/',
        instagram: 'https://instagram.com/',
        linkedin: 'https://linkedin.com/',
        github: 'https://github.com/'
    };

    const handleSocialClick = (platform) => {
     
        window.open(socialLinks[platform], '_blank', 'noopener,noreferrer');
    };

    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Logo & Description */}
                    <div>
                        <div className="mb-4">
                            <Logo />
                        </div>
                        <p className="text-gray-400 text-sm">
                            Document, share, and learn from life experiences with our community of lifelong learners.
                        </p>
                    </div>
                    
                    {/* Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">Home</Link>
                            <Link to="/lessons" className="text-gray-400 hover:text-white text-sm transition-colors">Lessons</Link>
                            <Link to="/dashboard/pricing" className="text-gray-400 hover:text-white text-sm transition-colors">Pricing</Link>
                            <Link to="/dashboard/user-dashboard" className="text-gray-400 hover:text-white text-sm transition-colors">Dashboard</Link>
                            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
                            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</Link>
                        </div>
                    </div>
                    
                    {/* Social & Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">Connect With Us</h3>
                        <div className="flex gap-4 mb-4">
                            {/* Facebook */}
                            <button 
                                onClick={() => handleSocialClick('facebook')}
                                className="text-gray-400 hover:text-blue-500 transition-colors duration-300 group relative"
                                aria-label="Visit our Facebook page"
                            >
                                <FaFacebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Facebook
                                </span>
                            </button>
                            
                            {/* Twitter */}
                            <button 
                                onClick={() => handleSocialClick('twitter')}
                                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 group relative"
                                aria-label="Visit our Twitter page"
                            >
                                <FaTwitter className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Twitter
                                </span>
                            </button>
                            
                            {/* Instagram */}
                            <button 
                                onClick={() => handleSocialClick('instagram')}
                                className="text-gray-400 hover:text-pink-500 transition-colors duration-300 group relative"
                                aria-label="Visit our Instagram page"
                            >
                                <FaInstagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Instagram
                                </span>
                            </button>
                            
                            {/* LinkedIn */}
                            <button 
                                onClick={() => handleSocialClick('linkedin')}
                                className="text-gray-400 hover:text-blue-600 transition-colors duration-300 group relative"
                                aria-label="Visit our LinkedIn page"
                            >
                                <FaLinkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    LinkedIn
                                </span>
                            </button>

                            {/* GitHub (Optional) */}
                            <button 
                                onClick={() => handleSocialClick('github')}
                                className="text-gray-400 hover:text-gray-300 transition-colors duration-300 group relative"
                                aria-label="Visit our GitHub repository"
                            >
                                <FaGithub className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    GitHub
                                </span>
                            </button>
                        </div>
                        <p className="text-gray-400 text-sm">
                            contact@digitallifelessons.com
                        </p>
                    </div>
                </div>
                
                {/* Copyright */}
                <div className="border-t border-gray-800 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        &copy; {currentYear} Digital Life Lessons. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;