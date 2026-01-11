import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const GoToTop = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrollPercent = (scrollTop / docHeight) * 100;

      setProgress(scrollPercent);
      setVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        visible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-0 pointer-events-none"
      }`}
    >
      <div className="relative w-14 h-14">
        {/* Progress Ring */}
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
            className="stroke-gray-200 dark:stroke-gray-700"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
            strokeDasharray="282.6"
            strokeDashoffset={282.6 - (282.6 * progress) / 100}
            className="stroke-indigo-600 transition-all duration-200"
          />
        </svg>

        {/* Button */}
        <button
          onClick={scrollToTop}
          className="absolute inset-2 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-2xl hover:bg-indigo-700 hover:scale-110 transition-all duration-300 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          title="Go to top"
        >
          <FaArrowUp className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default GoToTop;
