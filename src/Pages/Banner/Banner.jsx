import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { useNavigate } from 'react-router';
import { FaArrowRight, FaPlus, FaBookOpen } from 'react-icons/fa';
import CountUp from 'react-countup';

import img1 from '../../assets/banner img1.jpg';
import img2 from '../../assets/banner img2.jpg';
import img3 from '../../assets/banner img3.jpg';

const Banner = () => {
    const navigate = useNavigate();

    const slides = [
        {
            img: img1,
            headline: "Life Teaches in Silence",
            subtext: "Reflect on your experiences and transform them into valuable life lessons worth remembering and sharing.",
            gradient: "from-blue-900/70 to-purple-900/40",
            buttonColor: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
            accentColor: "border-l-blue-500"
        },
        {
            img: img2,
            headline: "Shared Wisdom Builds Stronger Minds",
            subtext: "Learn from authentic stories, connect with real experiences, and grow collectively with our community of lifelong learners.",
            gradient: "from-emerald-900/70 to-teal-900/40",
            buttonColor: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700",
            accentColor: "border-l-emerald-500"
        },
        {
            img: img3,
            headline: "Your Growth Journey Starts Today",
            subtext: "Every lesson learned is a step forward. Document, share, and master life's wisdom to become your best self.",
            gradient: "from-violet-900/70 to-purple-900/40",
            buttonColor: "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700",
            accentColor: "border-l-violet-500"
        },
    ];

    return (
        <div className="w-full relative overflow-hidden">
            <Swiper
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{ 
                    delay: 6000, 
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true 
                }}
                speed={1000}
                loop={true}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={true}
                className="w-full h-[600px] md:h-[700px] lg:h-[750px] relative"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <img
                                src={slide.img}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            
                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}></div>
                            
                            {/* Content Container */}
                            <div className="absolute inset-0 flex items-center">
                                <div className="container mx-auto px-4 md:px-8 lg:px-12">
                                    <div className="max-w-2xl ml-0 lg:ml-12 xl:ml-20">
                                        {/* Accent Line */}
                                        <div className="h-20 w-1 bg-gradient-to-b from-white/50 to-transparent rounded-full mb-8 hidden lg:block"></div>
                                        
                                        {/* Headline */}
                                        <div className={`mb-6 pl-4 border-l-4 ${slide.accentColor} py-2`}>
                                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                                {slide.headline}
                                            </h2>
                                        </div>
                                        
                                        {/* Subtext */}
                                        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-xl leading-relaxed font-light">
                                            {slide.subtext}
                                        </p>
                                        
                                        {/* Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                                            <button
                                                onClick={() => navigate('/public-lessons')}
                                                className={`${slide.buttonColor} text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group`}
                                            >
                                                <FaBookOpen className="text-xl" />
                                                Explore Lessons
                                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                            
                                            <button
                                                onClick={() => navigate('/dashboard/add-lesson')}
                                                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:bg-white/20 hover:border-white/50 transform hover:-translate-y-1 transition-all duration-300 group"
                                            >
                                                <FaPlus className="text-xl" />
                                                Share Your Lesson
                                            </button>
                                        </div>
                                        
                                        {/* Animated Stats */}
                                        <div className="flex gap-8 mt-12">
                                            <div className="text-center">
                                                <div className="text-2xl md:text-3xl font-bold text-white">
                                                    <CountUp end={500} duration={2} suffix="+" />
                                                </div>
                                                <div className="text-sm text-white/70">Active Learners</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl md:text-3xl font-bold text-white">
                                                    <CountUp end={2000} duration={2} suffix="+" />
                                                </div>
                                                <div className="text-sm text-white/70">Lessons Shared</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl md:text-3xl font-bold text-white">
                                                    <CountUp end={98} duration={2} suffix="%" />
                                                </div>
                                                <div className="text-sm text-white/70">Satisfaction Rate</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom CSS for Swiper */}
            <style jsx>{`
                .swiper-pagination-bullet {
                    background: rgba(255, 255, 255, 0.5);
                    opacity: 1;
                    width: 12px;
                    height: 12px;
                }
                .swiper-pagination-bullet-active {
                    background: white;
                    width: 32px;
                    border-radius: 9999px;
                }
                .swiper-button-next,
                .swiper-button-prev {
                    color: white;
                    width: 48px;
                    height: 48px;
                }
                .swiper-button-next:hover,
                .swiper-button-prev:hover {
                    transform: scale(1.1);
                }
                .swiper-button-next:after,
                .swiper-button-prev:after {
                    font-size: 24px;
                }
            `}</style>
        </div>
    );
};

export default Banner;
