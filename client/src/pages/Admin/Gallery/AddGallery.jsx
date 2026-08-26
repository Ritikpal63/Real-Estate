import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminAsideSection from "../AdminAsideSection";
import Section from "../../../components/Section";
import ImageUploader from "../Property/ImageUploader";
import axiosInstance from "../../../utils/axiosConfig";

const CATEGORIES = [
"bedroom",
"bathroom",
"kitchen",
"garage",
"basement",
"exterior"];


const AddGallery = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: "bedroom",
    description: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title) return setError("Please add a title.");
    if (!imageFile) return setError("Please select an image.");

    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
      );
      formData.append("image", imageFile);

      await axiosInstance.post("/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      toast.success("Gallery item added!");
      navigate("/admin/viewgallery");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to add gallery item. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Section title={"Add Gallery"} />
      <div className="flex flex-col lg:flex-row">
        <AdminAsideSection />import axiosInstance from "../../../utils/axiosConfig";

        <div className="flex-1 w-full min-w-0 bg-gray-50">
          <div className="max-w-3xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Add Gallery Item</h2>
              <p className="text-gray-500 mt-1">
                Upload a photo for the property gallery.
              </p>
            </div>

            {error &&
            <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
                {error}
              </div>
            }

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full bg-gray-100 rounded-xl px-4 py-3 mb-3 outline-none" />


              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 mb-3 outline-none">

                {CATEGORIES.map((cat) =>
                <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                )}
              </select>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Short description (optional)"
                className="w-full bg-gray-100 rounded-xl px-4 py-3 mb-3 outline-none" />


              <ImageUploader onImageSelect={setImageFile} />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#374256] text-white rounded-lg py-3 disabled:opacity-60">

                {loading ? "Uploading..." : "Add to Gallery"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>);

};

export default AddGallery;
