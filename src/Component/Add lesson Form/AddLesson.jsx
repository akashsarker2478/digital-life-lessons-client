import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import {
  FaCrown,
  FaInfoCircle,
  FaImage,
  FaLock,
  FaGlobe,
  FaUser,
  FaBriefcase,
  FaHeart,
  FaBrain,
  FaBook,
  FaStethoscope,
  FaMoneyBillWave,
  FaPeace,
  FaRocket,
  FaSadTear,
  FaLightbulb,
  FaHandsHelping,
  FaRegLightbulb,
  FaPray,
  FaCloudUploadAlt,
  FaSpinner,
  FaCheckCircle
} from "react-icons/fa";
import {
  FiUploadCloud,
  FiAlertCircle
} from "react-icons/fi";

const AddLesson = () => {
  const { user, isPremium } = UseAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  const axiosSecure = useAxiosSecure();

  // Watch accessLevel value
  const accessLevel = watch("accessLevel", "free");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", e.target.files);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      // Check if user is trying to create Premium lesson without being premium
      if (data.accessLevel === "premium" && !isPremium) {
        Swal.fire({
          title: "Premium Required!",
          text: "You need to upgrade to Premium to create premium lessons.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Upgrade Now",
          showCancelButton: true,
          cancelButtonText: "Cancel"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/dashboard/pricing";
          }
        });
        setIsLoading(false);
        return;
      }

      const {
        title,
        description,
        category,
        tone,
        privacy,
        accessLevel,
        image,
      } = data;

      let imageUrl = null;

      // If user selected an image → Upload to imgBB
      if (image && image[0]) {
        const imgFile = image[0];

        const formData = new FormData();
        formData.append("image", imgFile);

        const img_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        const imgResponse = await axios.post(img_API_URL, formData);
        imageUrl = imgResponse.data.data.url;
      }

      // Create lesson object
      const lessonData = {
        title,
        description,
        category,
        tone,
        privacy,
        accessLevel,
        image: imageUrl,
        createdBy: user?.email,
        createdByUid: user?.uid,
        createdByName: user?.displayName || user?.email?.split("@")[0],
        createdAt: new Date(),
        views: 0,
        likes: 0,
        isFeatured: false,
        status: "published"
      };

      console.log("📌 FINAL LESSON DATA:", lessonData);

      // Send to backend
      const result = await axiosSecure.post('/lessons', lessonData);
      
      if (result.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Lesson created successfully!",
          icon: "success",
          confirmButtonColor: "#10b981",
          confirmButtonText: "OK",
          timer: 3000,
          timerProgressBar: true,
          position: "top-end",
          toast: true,
          showConfirmButton: false,
        });
        reset(); // Reset form after success
        setSelectedCategory("");
        setSelectedTone("");
        setPreviewImage(null);
      }

    } catch (error) {
      console.error("Error creating lesson:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to create lesson. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Try Again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Life Lesson</h1>
          <p className="text-gray-600">
            Share your insights, stories, and lessons learned with the community.
          </p>
          
          {/* Premium Status Banner */}
          {isPremium ? (
            <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-3">
                <FaCrown className="w-5 h-5 text-yellow-600" />
                <div>
                  <span className="font-semibold text-yellow-700">Premium Member</span>
                  <p className="text-sm text-yellow-600 mt-1">
                    You can create both Free and Premium lessons
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-gray-100 border border-blue-200 rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <FiAlertCircle className="w-5 h-5 text-blue-600" />
                  <div>
                    <span className="font-medium text-blue-700">Free Account</span>
                    <p className="text-sm text-gray-600 mt-1">
                      You can only create Free lessons. Upgrade to create premium content.
                    </p>
                  </div>
                </div>
                <a 
                  href="/dashboard/pricing" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-lg hover:shadow-md transition-shadow font-medium"
                >
                  <FaCrown className="w-4 h-4" />
                  Upgrade to Premium
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* TITLE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lesson Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register("title", { 
                  required: "Title is required",
                  minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters"
                  },
                  maxLength: {
                    value: 100,
                    message: "Title must be less than 100 characters"
                  }
                })}
                type="text"
                className={`w-full px-4 py-3 rounded-lg border ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                placeholder="Enter a meaningful title for your lesson"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <FiAlertCircle className="w-4 h-4" />
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* FULL DESCRIPTION */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Description / Story <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description", { 
                  required: "Description is required",
                  minLength: {
                    value: 50,
                    message: "Description must be at least 50 characters"
                  }
                })}
                className={`w-full px-4 py-3 rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition h-40`}
                placeholder="Share your story, insights, and what you learned..."
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <FiAlertCircle className="w-4 h-4" />
                  {errors.description.message}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Minimum 50 characters. Be descriptive and share valuable insights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CATEGORY */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("category", { required: "Please select a category" })}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none"
                  >
                    <option value="">Select category</option>
                    <option value="personal-growth">Personal Growth</option>
                    <option value="career">Career & Professional</option>
                    <option value="relationships">Relationships</option>
                    <option value="mindset">Mindset</option>
                    <option value="mistakes-learned">Mistakes Learned</option>
                    <option value="health">Health & Wellness</option>
                    <option value="finance">Finance</option>
                    <option value="spirituality">Spirituality</option>
                  </select>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <FaInfoCircle className="w-5 h-5" />
                  </div>
                  {selectedCategory === "personal-growth" && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <FaBrain className="w-5 h-5" />
                    </div>
                  )}
                  {selectedCategory === "career" && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <FaBriefcase className="w-5 h-5" />
                    </div>
                  )}
                  {selectedCategory === "relationships" && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <FaHeart className="w-5 h-5" />
                    </div>
                  )}
                  {selectedCategory === "mindset" && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <FaBrain className="w-5 h-5" />
                    </div>
                  )}
                  {selectedCategory === "mistakes-learned" && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <FaBook className="w-5 h-5" />
                    </div>
                  )}
                </div>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <FiAlertCircle className="w-4 h-4" />
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* EMOTIONAL TONE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Emotional Tone <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("tone", { required: "Please select an emotional tone" })}
                    value={selectedTone}
                    onChange={(e) => setSelectedTone(e.target.value)}
                    className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none"
                  >
                    <option value="">Select tone</option>
                    <option value="motivational">Motivational</option>
                    <option value="sad">Sad / Emotional</option>
                    <option value="realization">Realization</option>
                    <option value="gratitude">Gratitude</option>
                    <option value="inspirational">Inspirational</option>
                    <option value="reflective">Reflective</option>
                    <option value="hopeful">Hopeful</option>
                  </select>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <FaInfoCircle className="w-5 h-5" />
                  </div>
                  {selectedTone === "motivational" && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <FaRocket className="w-5 h-5" />
                    </div>
                  )}
                  {selectedTone === "sad" && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <FaSadTear className="w-5 h-5" />
                    </div>
                  )}
                  {selectedTone === "realization" && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <FaLightbulb className="w-5 h-5" />
                    </div>
                  )}
                  {selectedTone === "gratitude" && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <FaPray className="w-5 h-5" />
                    </div>
                  )}
                </div>
                {errors.tone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <FiAlertCircle className="w-4 h-4" />
                    {errors.tone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PRIVACY */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Privacy <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("privacy", { required: "Please select privacy setting" })}
                    className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none"
                  >
                    <option value="public">Public (Visible to everyone)</option>
                    <option value="private">Private (Only visible to you)</option>
                  </select>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {watch("privacy", "public") === "public" ? (
                      <FaGlobe className="w-5 h-5" />
                    ) : (
                      <FaLock className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </div>

              {/* ACCESS LEVEL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Access Level <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("accessLevel", { required: "Please select access level" })}
                    disabled={!isPremium}
                    className={`w-full px-4 py-3 pl-10 rounded-lg border appearance-none ${!isPremium ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                    title={!isPremium ? "Upgrade to Premium to create premium lessons" : ""}
                  >
                    <option value="free">Free (Available to all users)</option>
                    <option value="premium" disabled={!isPremium}>
                      Premium (Only for premium members)
                    </option>
                  </select>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    {accessLevel === "free" ? (
                      <FaUser className={`w-5 h-5 ${!isPremium ? 'text-gray-400' : 'text-gray-500'}`} />
                    ) : (
                      <FaCrown className={`w-5 h-5 ${!isPremium ? 'text-gray-400' : 'text-yellow-500'}`} />
                    )}
                  </div>
                  
                  {!isPremium && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="relative group">
                        <FiAlertCircle className="w-5 h-5 text-gray-400" />
                        <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                          Upgrade to Premium to create paid lessons
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-600 flex items-center gap-1">
                  {isPremium ? (
                    <>
                      <FaCheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-green-600 font-medium">
                        You can create both Free and Premium lessons
                      </span>
                    </>
                  ) : (
                    <>
                      <FiAlertCircle className="w-4 h-4 text-blue-500" />
                      <span className="text-blue-600">
                        Only Free lessons available.{" "}
                        <a href="/dashboard/pricing" className="font-medium underline">
                          Upgrade to Premium
                        </a>{" "}
                        for premium content.
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* IMAGE (OPTIONAL) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  {...register("image")}
                  type="file"
                  id="image-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload" className="cursor-pointer block">
                  {previewImage ? (
                    <div className="mb-3">
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-lg mx-auto"
                      />
                    </div>
                  ) : (
                    <>
                      <FiUploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <span className="text-gray-600 font-medium">Click to upload image</span>
                      <p className="text-sm text-gray-500 mt-1">
                        PNG, JPG, GIF up to 5MB (Optional)
                      </p>
                    </>
                  )}
                </label>
              </div>
              {previewImage && (
                <button
                  type="button"
                  onClick={() => {
                    setPreviewImage(null);
                    setValue("image", null);
                  }}
                  className="mt-2 text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <FiAlertCircle className="w-4 h-4" />
                  Remove image
                </button>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin h-5 w-5" />
                    Creating Lesson...
                  </>
                ) : (
                  <>
                    <FaCloudUploadAlt className="w-5 h-5" />
                    Publish Lesson
                  </>
                )}
              </button>
              
              {/* Form Info */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-3">
                  <FaInfoCircle className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">
                      <strong>Note:</strong> Your lesson will be reviewed and published shortly. 
                      Premium lessons are only accessible to premium members.
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaUser className="w-3 h-3" />
                        Free: Accessible to all
                      </div>
                      <div className="flex items-center gap-1">
                        <FaCrown className="w-3 h-3 text-yellow-500" />
                        Premium: Members only
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;