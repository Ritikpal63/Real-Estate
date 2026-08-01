// src/pages/Admin/Blog/AdminBlog.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Section from "../../../components/Section";
import AdminAsideSection from "../AdminAsideSection";
import axiosInstance from "../../../utils/axiosConfig";
import { useAuth } from "../../../contextApi/useAuth";
import ImageUploader from "../Property/ImageUploader";

const CATEGORY_STYLES = {
    General: { bg: "bg-slate-100", text: "text-slate-600" },
    "Buying Guide": { bg: "bg-green-100", text: "text-green-600" },
    "Home Improvement": { bg: "bg-orange-100", text: "text-orange-600" },
    "Market Insights": { bg: "bg-purple-100", text: "text-purple-600" },
    "Legal & Finance": { bg: "bg-red-100", text: "text-red-600" },
};

// formData sirf title + content rakhta hai (jo form mein actually dikhte hain).
// summary/category/author backend defaults le lega jab tak inhe wapas form mein add na karein.
const emptyForm = {
    title: "",
    content: "",
};

const AdminBlog = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState("");
    const [formData, setFormData] = useState(emptyForm);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
            return;
        }
        fetchBlogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            // FIX: sahi endpoint "/blogs/allblogs" hai ("/blogs/all" exist nahi karta,
            // isliye list load hi nahi ho rahi thi)
            const response = await axiosInstance.get("/blogs/all");
            const data = response.data.data || [];
            setBlogs(data);
            setFilteredBlogs(data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            if (error.response?.status === 401) {
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (value) => {
        setSearch(value);
        if (!value.trim()) {
            setFilteredBlogs(blogs);
            return;
        }
        const result = blogs.filter((blog) =>
            blog.title.toLowerCase().includes(value.toLowerCase()),
        );
        setFilteredBlogs(result);
    };

    const handleDelete = async (id) => {
        if (
            !window.confirm(
                "Are you sure you want to delete this blog post? Its comments will be deleted too.",
            )
        )
            return;

        try {
            const response = await axiosInstance.delete(`/blogs/${id}`);
            if (response.data.success) {
                await fetchBlogs();
                toast.success("Blog deleted successfully!");
            } else {
                toast.error(response.data.message || "Failed to delete blog.");
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            if (error.response?.status === 401) {
                toast.error("Your session has expired. Please login again.");
                navigate("/login");
            } else {
                toast.error(error.response?.data?.message || "Failed to delete blog.");
            }
        }
    };

    // FIX: pehle "setForm" (jo exist hi nahi karta) call ho raha tha -> typing crash/no-op
    // ho jaati thi. Ab sahi setter "setFormData" use ho raha hai.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const postSubmitHandler = async (e) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.content.trim()) {
            toast.error("Please fill in title and content.");
            return;
        }
        if (!isEditing && !imageFile) {
            toast.error("Please choose a cover image");
            return;
        }

        try {
            setSaving(true);

            const newFormData = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                newFormData.append(key, value);
            });
            if (imageFile) {
                newFormData.append("image", imageFile);
            }

            let response;
            // FIX: pehle yahan hamesha POST call hota tha, chahe tu Edit kar raha ho —
            // isliye Update dabane par ek NAYA blog ban jaata tha (duplicate), purana
            // wahi ka wahi reh jaata tha. Ab isEditing/editId check karke sahi PUT/POST
            // call hoti hai.
            if (isEditing) {
                response = await axiosInstance.put(`/blogs/${editId}`, newFormData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                response = await axiosInstance.post("/blogs", newFormData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            if (response.data.success) {
                // FIX: pehle yahan navigate("/admin") ho jaata tha — updated list dikhti
                // hi nahi thi, isliye lagta tha values change hi nahi hui. Ab list turant
                // refresh hoti hai aur wahi page pe confirmation dikhta hai.
                await fetchBlogs();
                resetForm();
                toast.success(
                    isEditing ? "Blog updated successfully!" : "Blog published successfully!",
                );
            }
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                toast.error("Your session has expired. Please login again.");
                navigate("/login");
            } else {
                toast.error(err.response?.data?.message || "Failed to save blog. Try again.");
            }
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (blog) => {
        setFormData({
            title: blog.title,
            content: blog.content,
        });
        setImageFile(null);
        setImagePreview(blog.image || "");
        setIsEditing(true);
        setEditId(blog.id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const resetForm = () => {
        setFormData(emptyForm);
        setImageFile(null);
        setImagePreview("");
        setIsEditing(false);
        setEditId(null);
        setShowForm(false);
    };

    return (
        <>
            <Section title={"Blog Upload"} />
            <div className="flex flex-col lg:flex-row">
                <AdminAsideSection />

                <div className="flex-1 w-full min-w-0 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                            <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
                                Blog Management
                            </h1>
                            {!showForm && (
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white text-sm sm:text-base px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors self-start sm:self-auto"
                                >
                                    <svg
                                        className="w-4 h-4 sm:w-5 sm:h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    Add New Blog Post
                                </button>
                            )}
                        </div>

                        {/* Form */}
                        {showForm && (
                            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
                                <div className="flex justify-between items-center mb-4 sm:mb-6">
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                                        {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
                                    </h2>
                                    <button
                                        onClick={resetForm}
                                        className="text-gray-500 hover:text-gray-700 shrink-0"
                                    >
                                        <svg
                                            className="w-5 h-5 sm:w-6 sm:h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <form onSubmit={postSubmitHandler} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Title *
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                            placeholder="Enter blog title"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Content *
                                        </label>
                                        <textarea
                                            name="content"
                                            value={formData.content}
                                            onChange={handleChange}
                                            required
                                            rows="8"
                                            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                            placeholder="Write your blog post here... (separate paragraphs with a blank line)"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Cover Image {!isEditing && "*"}
                                        </label>
                                        <ImageUploader
                                            onImageSelect={(file) => {
                                                setImageFile(file);
                                                // naya file choose hote hi purani "existing image"
                                                // wali preview hata do taaki confusion na ho
                                                setImagePreview("");
                                            }}
                                        />
                                        {isEditing && (
                                            <p className="text-xs text-gray-400 mt-1">
                                                Leave empty to keep the current image.
                                            </p>
                                        )}
                                        {imagePreview && (
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="mt-3 h-40 w-full sm:w-64 object-cover rounded-lg border"
                                            />
                                        )}
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors text-sm sm:text-base w-full sm:w-auto"
                                        >
                                            {saving
                                                ? "Saving..."
                                                : isEditing
                                                    ? "Update Blog Post"
                                                    : "Publish Blog Post"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base w-full sm:w-auto"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Blog list */}
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        ) : blogs.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-lg text-center py-12">
                                <p className="text-gray-500">
                                    No blog posts found. Publish your first post!
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* MOBILE + TABLET: Card view */}
                                <input
                                    type="text"
                                    placeholder="Search blog posts..."
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="w-full border rounded-lg p-2 mb-4 lg:hidden"
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
                                    {filteredBlogs.map((blog) => {
                                        const style = CATEGORY_STYLES[blog.category] || CATEGORY_STYLES["General"];
                                        return (
                                            <div
                                                key={blog.id}
                                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3 w-full min-w-0 overflow-hidden hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <img
                                                        src={blog.image || "assets/img/blog/blog-1.jpg"}
                                                        alt={blog.title}
                                                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                                                    />
                                                    <button
                                                        onClick={() => handleEdit(blog)}
                                                        className="w-8 h-8 shrink-0 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
                                                        title="Quick edit"
                                                    >
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>

                                                <div className="min-w-0">
                                                    <h3 className="text-base font-bold text-gray-900 line-clamp-2 break-words">
                                                        {blog.title}
                                                    </h3>
                                                    {blog.summary ? (
                                                        <p className="text-sm text-gray-500 line-clamp-2 break-words mt-1">
                                                            {blog.summary}
                                                        </p>
                                                    ) : (
                                                        <p className="text-sm text-gray-400 italic mt-1">
                                                            No summary added
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between text-xs text-gray-400 -mt-1">
                                                    <span className={`font-medium ${style.text}`}>
                                                        {blog.category || "General"}
                                                    </span>
                                                    <span>{blog.comment_count || 0} comments</span>
                                                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-2 mt-1">
                                                    <button
                                                        onClick={() => handleEdit(blog)}
                                                        className="flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-full transition-colors"
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(blog.id)}
                                                        className="flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium py-2.5 rounded-full transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* DESKTOP: Table view */}
                                <input
                                    type="text"
                                    placeholder="Search blog posts..."
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="w-full border rounded-lg p-2 mb-4 lg:block hidden"
                                />
                                <div className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden">
                                    <div className="h-[750px] overflow-y-auto adminNews">
                                        <table className="w-full">
                                            <thead className="bg-gray-50 sticky top-0">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Post
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Category
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Comments
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Date
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {filteredBlogs.map((blog) => (
                                                    <tr key={blog.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 max-w-xs">
                                                            <div className="flex items-center gap-3">
                                                                <img
                                                                    src={blog.image || "assets/img/blog/blog-1.jpg"}
                                                                    alt={blog.title}
                                                                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                                                                />
                                                                <div className="text-sm font-medium text-gray-900 truncate">
                                                                    {blog.title}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                                                {blog.category || "General"}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-500">
                                                            {blog.content|| 0}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-green-800">
                                                            {new Date(blog.created_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex gap-3">
                                                                <button
                                                                    onClick={() => handleEdit(blog)}
                                                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(blog.id)}
                                                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminBlog;