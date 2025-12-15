import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCloudUploadAlt, FaLock, FaGlobe } from "react-icons/fa";

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
      Swal.fire("Updated", "Lesson updated successfully", "success");
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
      Swal.fire("Published", "Lesson created successfully", "success");
    }

    navigate("/dashboard/my-lessons");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl p-10">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">
            {isEdit ? "Edit Your Lesson" : "Create a New Life Lesson"}
          </h1>
          <p className="text-gray-500 mt-2">
            Share your experience and inspire others
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">

          {/* Title */}
          <div>
            <label className="font-semibold text-gray-700">Lesson Title</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              placeholder="e.g. Overcoming Fear"
              className="mt-2 w-full rounded-xl border p-4 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-gray-700">Full Story</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              placeholder="Write your life lesson..."
              className="mt-2 w-full rounded-xl border p-4 h-36 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Selects */}
          <div className="grid md:grid-cols-2 gap-5">
            <select value={category} onChange={e => setCategory(e.target.value)} required className="rounded-xl border p-4">
              <option value="">Category</option>
              <option value="personal-growth">Personal Growth</option>
              <option value="career">Career</option>
              <option value="relationships">Relationships</option>
              <option value="mindset">Mindset</option>
            </select>

            <select value={tone} onChange={e => setTone(e.target.value)} required className="rounded-xl border p-4">
              <option value="">Emotional Tone</option>
              <option value="motivational">Motivational</option>
              <option value="sad">Sad</option>
              <option value="realization">Realization</option>
              <option value="gratitude">Gratitude</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="font-semibold text-gray-700">Cover Image</label>
            <div className="mt-3 border-2 border-dashed rounded-2xl p-6 text-center relative hover:border-indigo-400 transition">
              <input type="file" accept="image/*" onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer" />

              {previewImage ? (
                <img src={previewImage} className="mx-auto w-40 h-40 rounded-xl object-cover shadow-lg" />
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <FaCloudUploadAlt className="text-5xl mb-2" />
                  <p>Click to upload image</p>
                </div>
              )}
            </div>
          </div>

          {/* Privacy */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="flex items-center gap-3 border rounded-xl p-4">
              <FaGlobe />
              <select value={privacy} onChange={e => setPrivacy(e.target.value)} className="w-full outline-none">
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div className="flex items-center gap-3 border rounded-xl p-4">
              <FaLock />
              <select
                value={accessLevel}
                onChange={e => setAccessLevel(e.target.value)}
                disabled={!isPremium}
                className="w-full outline-none disabled:text-gray-400"
              >
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={isLoading}
            className="w-full py-4 rounded-2xl text-white font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] transition-transform shadow-lg"
          >
            {isLoading ? "Saving..." : isEdit ? "Update Lesson" : "Publish Lesson"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddLesson;
