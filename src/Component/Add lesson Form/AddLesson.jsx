import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";

const AddLesson = () => {
  const {user,isPremium} = UseAuth()
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure()
  const isPremiumUser = false;

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

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

        imageUrl = imgResponse.data.data.url; // <-- THIS IS THE URL
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
        createdAt: new Date(),
        
      };

      console.log("📌 FINAL LESSON DATA:", lessonData);

      // Send to your backend
      axiosSecure.post('/lessons',lessonData)
      .then(res=>{
        console.log(res.data)
        alert("Lesson created successfully!");
      })

      

    } catch (error) {
      console.error(error);
      alert("Failed to create lesson");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <div className="max-w-xl mx-auto bg-white p-6 shadow-md rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4">Create New Life Lesson</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* TITLE */}
        <div>
          <label className="block font-medium">Lesson Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter lesson title"
          />
        </div>

        {/* FULL DESCRIPTION */}
        <div>
          <label className="block font-medium">Full Description / Story</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full p-2 border rounded h-32"
            placeholder="Write the full story..."
          ></textarea>
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block font-medium">Category</label>
          <select
            {...register("category", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select category</option>
            <option value="personal-growth">Personal Growth</option>
            <option value="career">Career</option>
            <option value="relationships">Relationships</option>
            <option value="mindset">Mindset</option>
            <option value="mistakes-learned">Mistakes Learned</option>
          </select>
        </div>

        {/* EMOTIONAL TONE */}
        <div>
          <label className="block font-medium">Emotional Tone</label>
          <select
            {...register("tone", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select tone</option>
            <option value="motivational">Motivational</option>
            <option value="sad">Sad</option>
            <option value="realization">Realization</option>
            <option value="gratitude">Gratitude</option>
          </select>
        </div>

        {/* IMAGE (OPTIONAL) */}
        <div>
          <label className="block font-medium">Image (Optional)</label>
          <input
            {...register("image")}
            type="file"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* PRIVACY */}
        <div>
          <label className="block font-medium">Privacy</label>
          <select
            {...register("privacy", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* ACCESS LEVEL */}
        <div>
          <label className="block font-medium">Access Level</label>
          <select
            {...register("accessLevel", { required: true })}
            disabled={!isPremiumUser}
            className={`w-full p-2 border rounded ${
              !isPremiumUser ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            title={
              !isPremiumUser
                ? "Upgrade to Premium to create paid lessons"
                : ""
            }
          >
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Lesson"}
        </button>
      </form>
    </div>
  );
};

export default AddLesson;
