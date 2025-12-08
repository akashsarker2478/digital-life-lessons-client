import React from "react";
import { 
  FaBrain, 
  FaUsers, 
  FaBook, 
  FaChartLine,
  FaArrowDown,
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
      color: "border-t-yellow-400",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-500",
      icon: <FaBrain className="text-xl" />,
      iconBg: "bg-yellow-100"
    },
    {
      id: 2,
      title: "Learn from Collective Wisdom",
      desc: "Access real stories from diverse lives. Grow faster by learning from others' successes and challenges.",
      img: learnImg,
      color: "border-t-blue-400",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      icon: <FaUsers className="text-xl" />,
      iconBg: "bg-blue-100"
    },
    {
      id: 3,
      title: "Preserve Your Digital Legacy",
      desc: "Document your insights for future reference. Create a personal library of wisdom that guides you and inspires others.",
      img: preserveImg,
      color: "border-t-purple-400",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
      icon: <FaBook className="text-xl" />,
      iconBg: "bg-purple-100"
    },
    {
      id: 4,
      title: "Grow with Purposeful Intent",
      desc: "Transform lessons into actionable growth. Track your progress and evolve intentionally with each life chapter.",
      img: growImg,
      color: "border-t-green-400",
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
      icon: <FaChartLine className="text-xl" />,
      iconBg: "bg-green-100"
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 mb-6">
            <FaLightbulb className="text-2xl text-blue-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Learning From Life Matters
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            In our digital age, every experience becomes a lesson worth remembering and sharing.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {/* Icon Overlay */}
                <div className={`absolute -bottom-6 right-6 w-14 h-14 ${item.iconBg} rounded-full flex items-center justify-center shadow-lg border-4 border-white`}>
                  <div className={item.iconColor}>
                    {item.icon}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="pt-8 pb-6 px-6">
                {/* Border Top Accent */}
                <div className={`h-1 w-20 ${item.color} rounded-full mb-4`}></div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
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