import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCloudUploadAlt, FaLock, FaGlobe } from "react-icons/fa";
import Lottie from "lottie-react";
import successAnimation from '../../assets/Animation/success-confetti.json'

const AddLesson = () => {
  const { user, isPremium } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("id");
  const isEdit = !!lessonId;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [accessLevel, setAccessLevel] = useState("free");

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      axiosSecure.get(`/lessons/${lessonId}`).then(res => {
        const l = res.data;
        setTitle(l.title);
        setDescription(l.description);
        setCategory(l.category);
        setTone(l.tone);
        setPrivacy(l.privacy);
        setAccessLevel(l.accessLevel);
        setExistingImage(l.image);
        setPreviewImage(l.image);
      });
    }
  }, [lessonId, isEdit, axiosSecure]);

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    let imageUrl = existingImage;

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      imageUrl = data.data.url;
    }

    const payload = {
      title,
      description,
      category,
      tone,
      privacy,
      accessLevel,
      image: imageUrl
    };

    if (isEdit) {
      await axiosSecure.patch(`/lessons/${lessonId}`, payload);

      Swal.fire({
        title: "Updated Successfully!",
        html: '<div id="lottie-animation" style="width:300px; height:300px; margin: 0 auto;"></div>',
        icon: "success",
        showConfirmButton: false,
        timer: 3500,
        didOpen: () => {
          const container = document.getElementById('lottie-animation');
          if (container) {
            Lottie.loadAnimation({
              container: container,
              renderer: 'svg',
              loop: false,
              autoplay: true,
              animationData: successAnimation
            });
          }
        }
      });
    } else {
      await axiosSecure.post("/lessons", {
        ...payload,
        createdBy: user.email,
        createdByUid: user.uid,
        createdByName: user.displayName,
        createdAt: new Date(),
        views: 0,
        likes: [],
        status: "published"
      });

      Swal.fire({
        title: "Published Successfully!",
        html: '<div id="lottie-animation" style="width:300px; height:300px; margin: 0 auto;"></div>',
        icon: "success",
        showConfirmButton: false,
        timer: 3500,
        didOpen: () => {
          const container = document.getElementById('lottie-animation');
          if (container) {
            Lottie.loadAnimation({
              container: container,
              renderer: 'svg',
              loop: false,
              autoplay: true,
              animationData: successAnimation
            });
          }
        }
      });
    }

    navigate("/dashboard/my-lessons");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950 dark:via-gray-900 dark:to-purple-950 flex items-center justify-center px-4 py-10">
      <title>Add Lesson</title>
      <div 
        data-aos="fade-up" 
        data-aos-duration="1000"
        className="w-full max-w-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl p-10"
      >

        {/* Header */}
        <div data-aos="fade-down" data-aos-delay="200" className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">
            {isEdit ? "Edit Your Lesson" : "Create a New Life Lesson"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Share your experience and inspire others
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">

          {/* Title */}
          <div data-aos="fade-up" data-aos-delay="300">
            <label className="font-semibold text-gray-700 dark:text-gray-300">Lesson Title</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              placeholder="e.g. Overcoming Fear"
              className="mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-600 p-4 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Description */}
          <div data-aos="fade-up" data-aos-delay="400">
            <label className="font-semibold text-gray-700 dark:text-gray-300">Full Story</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              placeholder="Write your life lesson..."
              className="mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-600 p-4 h-36 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Selects */}
          <div data-aos="fade-up" data-aos-delay="500" className="grid md:grid-cols-2 gap-5">
            <div data-aos="fade-left" data-aos-delay="600">
              <select 
                value={category} 
                onChange={e => setCategory(e.target.value)} 
                required 
                className="rounded-xl border border-gray-300 dark:border-gray-600 p-4 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 outline-none"
              >
                <option value="">Category</option>
                <option value="Personal-growth">Personal Growth</option>
                <option value="Career">Career</option>
                <option value="Finance">Finance</option>
                <option value="Productivity">Productivity</option>
                <option value="Self-Discovery">Self-Discovery</option>
                <option value="Relationships">Relationships</option>
                <option value="Mindset">Mindset</option>
              </select>
            </div>

            <div data-aos="fade-right" data-aos-delay="600">
              <select 
                value={tone} 
                onChange={e => setTone(e.target.value)} 
                required 
                className="rounded-xl border border-gray-300 dark:border-gray-600 p-4 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 outline-none"
              >
                <option value="">Emotional Tone</option>
                <option value="Motivational">Motivational</option>
                <option value="Balanced">Balanced</option>
                <option value="Sad">Sad</option>
                <option value="Empowered">Empowered</option>
                <option value="Reflective">Reflective</option>
                <option value="Realization">Realization</option>
                <option value="Gratitude">Gratitude</option>
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div data-aos="zoom-in" data-aos-delay="700">
            <label className="font-semibold text-gray-700 dark:text-gray-300">Cover Image</label>
            <div className="mt-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-6 text-center relative hover:border-indigo-400 dark:hover:border-indigo-500 transition">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer" 
              />

              {previewImage ? (
                <img 
                  src={previewImage} 
                  className="mx-auto w-40 h-40 rounded-xl object-cover shadow-lg" 
                  alt="Preview" 
                />
              ) : (
                <div className="text-gray-400 dark:text-gray-500 flex flex-col items-center">
                  <FaCloudUploadAlt className="text-5xl mb-2" />
                  <p>Click to upload image</p>
                </div>
              )}
            </div>
          </div>

          {/* Privacy */}
          <div data-aos="fade-up" data-aos-delay="800" className="grid md:grid-cols-2 gap-5">
            <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-600 rounded-xl p-4 bg-white dark:bg-gray-700">
              <FaGlobe className="text-gray-600 dark:text-gray-300" />
              <select 
                value={privacy} 
                onChange={e => setPrivacy(e.target.value)} 
                className="w-full outline-none bg-transparent text-gray-900 dark:text-white"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-600 rounded-xl p-4 bg-white dark:bg-gray-700">
              <FaLock className="text-gray-600 dark:text-gray-300" />
              <select
                value={accessLevel}
                onChange={e => setAccessLevel(e.target.value)}
                disabled={!isPremium}
                className="w-full outline-none bg-transparent text-gray-900 dark:text-white disabled:text-gray-400 dark:disabled:text-gray-500"
              >
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <div data-aos="fade-up" data-aos-delay="900">
            <button
              disabled={isLoading}
              className="w-full py-4 rounded-2xl text-white font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : isEdit ? "Update Lesson" : "Publish Lesson"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddLesson;