import React, { useEffect, useState } from "react";

const HomeCard = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch("/card.json")
      .then((res) => res.json())
      .then((data) => setLessons(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Life Lessons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={lesson.image}
              alt={lesson.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{lesson.title}</h2>
              <p className="text-gray-600 text-sm mb-2">
                {lesson.description.length > 100
                  ? lesson.description.slice(0, 100) + "..."
                  : lesson.description}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{lesson.category}</span>
                <span>{lesson.tone}</span>
              </div>
              <div className="mt-2 flex justify-between items-center text-xs">
                <span>{lesson.accessLevel}</span>
                <span>{lesson.privacy}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
