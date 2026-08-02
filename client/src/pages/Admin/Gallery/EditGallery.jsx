import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Section from "../../../components/Section";
import AdminAsideSection from "../AdminAsideSection";
import axiosInstance from "../../../utils/axiosConfig";
import ImageUploader from "../Property/ImageUploader";
const CATEGORIES = [
    "bedroom",
    "bathroom",
    "kitchen",
    "garage",
    "basement",
    "exterior",
];
export default function EditTeam() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        category: "bedroom",
        description: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [existingImage, setExistingImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMember = async () => {
            try {
                setFetching(true);
                const res = await axiosInstance.get(`/gallery/${id}`);
                const m = res.data.data || res.data;
                setForm({
                    title: m.title,
                    category: m.category,
                    description: m.description,
                });
                setExistingImage(m.image || "");
            } catch (err) {
                console.error(err);
                setError("Failed to load gallery item details.");
            } finally {
                setFetching(false);
            }
        };

        fetchMember();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.title.trim() || !form.category.trim()) {
            setError("Please fill in Title and Category.");
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

            await axiosInstance.put(`/gallery/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            navigate("/admin/viewgallery");
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message || "Failed to update gallery item. Try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Section title={"Edit Gallery Item"} />
            <div className="flex flex-col lg:flex-row">
                <AdminAsideSection />
                <div className="flex-1 w-full min-w-0 bg-gray-50">
                    <div className="max-w-3xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
                        {fetching ? (
                            <div className="text-gray-500">Loading gallery item...</div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-semibold">Edit Gallery Item</h2>
                                    <p className="text-gray-500 mt-1">
                                        Update this gallery item.
                                    </p>
                                </div>

                                {error && (
                                    <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        placeholder="Title"
                                        className="w-full bg-gray-100 rounded-xl px-4 py-3 mb-3 outline-none"
                                    />

                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        className="w-full bg-gray-100 rounded-xl px-4 py-3 mb-3 outline-none"
                                    >
                                        {CATEGORIES.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                            </option>
                                        ))}
                                    </select>

                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Short description (optional)"
                                        className="w-full bg-gray-100 rounded-xl px-4 py-3 mb-3 outline-none"
                                    />

                                    <ImageUploader onImageSelect={setImageFile} />

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-[#374256] text-white rounded-lg py-3 disabled:opacity-60"
                                    >
                                        {loading ? "Uploading..." : "Add to Gallery"}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}