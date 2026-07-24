import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageUploader from "./ImageUploader";
import axiosInstance from "../../../utils/axiosConfig";

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "",
    amenities: "",
    bedroom: 0,
    bathroom: 0,
    size: "",
    year: "",
    price: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setFetching(true);
        const res = await axiosInstance.get(`/property/${id}`);
        const p = res.data;
        setForm({
          title: p.title || "",
          location: p.location || "",
          type: p.type || "",
          amenities: p.amenities || "",
          bedroom: p.bedroom || 0,
          bathroom: p.bathroom || 0,
          size: p.size || "",
          year: p.year || "",
          price: p.price || "",
          description: p.description || "",
        });
        setExistingImage(p.image);
      } catch (err) {
        console.error(err);
        setError("Failed to load property details.");
      } finally {
        setFetching(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.location || !form.type) {
      setError("Please fill in Property Name, Location and Type.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axiosInstance.put(`/properties/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin/properties");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to update property. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-8 text-gray-500">
        Loading property...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Edit Property</h2>
        <p className="text-gray-500 mt-1">Update your real estate listing.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Property Name"
          className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
        >
          <option value="">Select Property Type</option>
          <option value="Villa">Villa</option>
          <option value="Apartment">Apartment</option>
          <option value="Office">Office</option>
          <option value="Land">Land</option>
        </select>

        <input
          name="amenities"
          value={form.amenities}
          onChange={handleChange}
          placeholder="Amenities (comma separated)"
          className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            name="bedroom"
            value={form.bedroom}
            onChange={handleChange}
            placeholder="Bedrooms"
            min="0"
            className="bg-gray-100 rounded-xl px-4 py-3 w-full outline-none"
          />
          <input
            type="number"
            name="bathroom"
            value={form.bathroom}
            onChange={handleChange}
            placeholder="Bathrooms"
            min="0"
            className="bg-gray-100 rounded-xl px-4 py-3 w-full outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            name="size"
            value={form.size}
            onChange={handleChange}
            placeholder="Size (SQM)"
            className="bg-gray-100 rounded-xl px-4 py-3 w-full outline-none"
          />
          <input
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="Year Built"
            className="bg-gray-100 rounded-xl px-4 py-3 w-full outline-none"
          />
        </div>

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          min="0"
          className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          placeholder="About Property"
          className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
        />

        <ImageUploader
          onImageSelect={setImageFile}
          existingImage={existingImage}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#374256] text-white rounded-lg py-3 disabled:opacity-60"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}