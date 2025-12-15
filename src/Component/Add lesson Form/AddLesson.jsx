import { useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddLesson = () => {
  const { user, isPremium } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [accessLevel, setAccessLevel] = useState("free");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Premium check
    if (accessLevel === "premium" && !isPremium) {
      Swal.fire({
        icon: "warning",
        title: "Premium Required!",
        text: "Upgrade to Premium to create premium lessons.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    setIsLoading(true);

    let imageUrl = null;

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      const img_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

      try {
        const imgResponse = await fetch(img_API_URL, {
          method: "POST",
          body: formData
        });
        const imgData = await imgResponse.json();
        imageUrl = imgData.data.url;
      } catch (err) {
        console.error("Image upload failed:", err);
        Swal.fire({
          icon: "error",
          title: "Image Upload Failed",
          text: "Please try again",
          confirmButtonColor: "#ef4444",
        });
        setIsLoading(false);
        return;
      }
    }

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

    try {
      const result = await axiosSecure.post("/lessons", lessonData);
      console.log("Lesson created:", result.data);

      Swal.fire({
        icon: "success",
        title: "Lesson Created!",
        text: "Your lesson has been successfully added.",
        confirmButtonColor: "#10b981",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setTone("");
      setPrivacy("public");
      setAccessLevel("free");
      setImageFile(null);
      setPreviewImage(null);

    } catch (err) {
      console.error("Error creating lesson:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to create lesson",
        text: "Please try again.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New Lesson</h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Lesson Title *</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Full Description *</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
              className="border p-3 rounded-lg w-full h-32 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Category *</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                required 
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
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
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Emotional Tone *</label>
              <select 
                value={tone} 
                onChange={(e) => setTone(e.target.value)} 
                required 
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select tone</option>
                <option value="motivational">Motivational</option>
                <option value="sad">Sad / Emotional</option>
                <option value="realization">Realization</option>
                <option value="gratitude">Gratitude</option>
              </select>
            </div>
          </div>

         <div>
  <label className="block text-gray-700 font-semibold mb-2">Image (Optional)</label>
  
  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-400 transition-colors relative cursor-pointer">
    <input 
      type="file" 
      accept="image/*" 
      onChange={handleImageChange} 
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />
    
    {previewImage ? (
      <div className="flex flex-col items-center gap-2">
        <img 
          src={previewImage} 
          alt="Preview" 
          className="w-32 h-32 object-cover rounded-lg shadow-md" 
        />
        <button 
          type="button" 
          onClick={() => { setImageFile(null); setPreviewImage(null); }}
          className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
        >
          Remove Image
        </button>
      </div>
    ) : (
      <div className="flex flex-col items-center gap-2 text-gray-500">
        <FaCloudUploadAlt className="w-12 h-12 mx-auto text-gray-400" />
        <p className="text-sm">Click or drag to upload an image</p>
        <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
      </div>
    )}
  </div>
</div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Privacy *</label>
              <select 
                value={privacy} 
                onChange={(e) => setPrivacy(e.target.value)} 
                required 
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Access Level *</label>
              <select 
                value={accessLevel} 
                onChange={(e) => setAccessLevel(e.target.value)} 
                disabled={!isPremium} 
                title={!isPremium ? "Upgrade to Premium to create paid lessons" : ""}
                required
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 mt-4 rounded-lg text-white font-semibold flex items-center justify-center gap-2 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            }`}
          >
            {isLoading ? "Creating..." : <><FaCloudUploadAlt /> Publish Lesson</>}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddLesson;
