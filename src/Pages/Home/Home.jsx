
import React, { useEffect, useState } from "react";
import Banner from '../Banner/Banner';
import WhyLearningMatters from '../../Component/why learning/WhyLearningMatters';
import FeaturedCard from '../../Component/Home card/FeaturedCard';
import TopContributors from '../../Component/Top Contributors/TopContributors';
import MostSavedLessons from '../../Component/Most Save Lessons/MostSaveLessons';
import { FaSpinner } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/AxiosInstance";


const Home = () => {
  const axiosPublic = useAxiosPublic();

  const [featuredLessons, setFeaturedLessons] = useState([]);
  const [topContributors, setTopContributors] = useState([]);
  const [mostSavedLessons, setMostSavedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);

        const [lessonsRes, usersRes] = await Promise.all([
          axiosPublic.get("/lessons/public"),
          axiosPublic.get("/users/public")
        ]);

        const lessons = lessonsRes.data;
        const users = usersRes.data || [];

        // Featured Lessons
        const featured = lessons.filter(l => l.isFeatured).slice(0, 6);
        setFeaturedLessons(featured);

        // Top Contributors
        const contributorMap = {};
        lessons.forEach(l => {
          contributorMap[l.createdBy] = (contributorMap[l.createdBy] || 0) + 1;
        });

        const contributors = users
          .map(u => ({
            email: u.email,
            name: u.name || u.email.split("@")[0],
            photoURL: u.photoURL,
            lessonsCount: contributorMap[u.email] || 0
          }))
          .filter(c => c.lessonsCount > 0)
          .sort((a, b) => b.lessonsCount - a.lessonsCount)
          .slice(0, 10);

        setTopContributors(contributors);

        // Most Saved Lessons
        const mostSaved = lessons
          .sort((a, b) => (b.favoritesCount || 0) - (a.favoritesCount || 0))
          .slice(0, 10);

        setMostSavedLessons(mostSaved);

      } catch (err) {
        console.error("Home data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [axiosPublic]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <FaSpinner className="animate-spin text-6xl text-blue-600" />
        <p className="ml-6 text-2xl text-gray-600">Loading amazing content for you...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner */}
      <section className="my-2">
        <Banner />
      </section>

      {/* Featured Life Lessons */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-4">
              ⭐ Featured Life Lessons
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked by our admins – powerful stories and insights that inspire real change
            </p>
          </div>

          {featuredLessons.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-2xl text-gray-500">No featured lessons yet. Stay tuned!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredLessons.map(lesson => (
                <FeaturedCard key={lesson._id} lesson={lesson} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Learning Matters */}
      <section className="py-20 bg-white">
        <WhyLearningMatters />
      </section>

      {/* Top Contributors Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              🏆 Top Contributors This Week
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Celebrating the passionate creators who share their wisdom and inspire our community
            </p>
          </div>
          <TopContributors contributors={topContributors} />
        </div>
      </section>

      {/* Most Saved Lessons Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-red-50 my-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              ❤️ Most Saved Lessons
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lessons that touched hearts and were saved by the most members – true gems of wisdom
            </p>
          </div>
          <MostSavedLessons lessons={mostSavedLessons} />
        </div>
      </section>
    </div>
  );
};

export default Home;