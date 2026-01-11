// Component/why learning/WhyLearningMatters.jsx
import React from "react";
import { 
  FaBrain, 
  FaUsers, 
  FaBook, 
  FaChartLine,
  FaLightbulb 
} from "react-icons/fa";

import reflectImg from "../../assets/img1.PNG";
import learnImg from "../../assets/img2.PNG";
import preserveImg from "../../assets/img3.PNG";
import growImg from "../../assets/img4.PNG";

const WhyLearningMatters = () => {
  const benefits = [
    {
      id: 1,
      title: "Reflect on Life Experiences",
      desc: "Pause and analyze your journey. Every experience holds a lesson that shapes your wisdom and future decisions.",
      img: reflectImg,
      icon: <FaBrain className="text-3xl" />,
      gradient: "from-yellow-400 to-amber-500",
      lightBg: "from-yellow-50 to-amber-50",
      accent: "bg-yellow-400"
    },
    {
      id: 2,
      title: "Learn from Collective Wisdom",
      desc: "Access real stories from diverse lives. Grow faster by learning from others' successes and challenges.",
      img: learnImg,
      icon: <FaUsers className="text-3xl" />,
      gradient: "from-blue-400 to-indigo-500",
      lightBg: "from-blue-50 to-indigo-50",
      accent: "bg-blue-400"
    },
    {
      id: 3,
      title: "Preserve Your Digital Legacy",
      desc: "Document your insights for future reference. Create a personal library of wisdom that guides you and inspires others.",
      img: preserveImg,
      icon: <FaBook className="text-3xl" />,
      gradient: "from-purple-400 to-pink-500",
      lightBg: "from-purple-50 to-pink-50",
      accent: "bg-purple-400"
    },
    {
      id: 4,
      title: "Grow with Purposeful Intent",
      desc: "Transform lessons into actionable growth. Track your progress and evolve intentionally with each life chapter.",
      img: growImg,
      icon: <FaChartLine className="text-3xl" />,
      gradient: "from-green-400 to-emerald-500",
      lightBg: "from-green-50 to-emerald-50",
      accent: "bg-green-400"
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 mb-8 shadow-lg animate-pulse">
            <FaLightbulb className="text-4xl text-blue-600" />
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
            Why Learning From Life Matters
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed">
            In our digital age, every experience becomes a lesson worth remembering, reflecting on, and sharing with the world.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {benefits.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-3"
            >
              {/* Image with Overlay */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent`} />
                
                {/* Icon in Bottom Right */}
                <div className={`absolute bottom-4 right-4 w-16 h-16 rounded-2xl bg-white shadow-2xl flex items-center justify-center border-4 border-white`}>
                  <div className={`text-white drop-shadow-lg bg-gradient-to-r ${item.gradient} p-3 rounded-xl`}>
                    {item.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`p-8 bg-gradient-to-b ${item.lightBg}`}>
                {/* Accent Bar */}
                <div className={`h-1.5 w-24 ${item.accent} rounded-full mb-5 shadow-md`} />

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 transition-all duration-300">
                  {item.title}
                </h3>
                
                <p className="text-gray-700 leading-relaxed text-base">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyLearningMatters;