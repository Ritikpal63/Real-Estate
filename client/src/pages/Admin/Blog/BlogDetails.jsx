import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../../utils/axiosConfig"
import { FaArrowLeft, FaCalendarAlt, FaUser } from "react-icons/fa";

const BlogDetails = () => {
    const { id } = useParams();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBlog = async () => {
        try {
            setLoading(true);

            const res = await axiosInstance.get(`/blogs/${id}`);

            setBlog(res.data.data);
        } catch (err) {
            console.error(err);
            setError("Blog not found.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <p className="text-xl font-semibold">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-red-600">{error}</h2>

                <Link
                    to="/blogs"
                    className="inline-block mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg"
                >
                    Back to Blogs
                </Link>
            </div>
        );
    }

    return (
        <section className="max-w-5xl mx-auto px-5 py-10">

            <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8"
            >
                <FaArrowLeft />
                Back to Blogs
            </Link>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-[450px] object-cover"
                />

                <div className="p-8">

                    <h1 className="text-4xl font-bold text-gray-800 mb-6">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap gap-6 text-gray-500 mb-8">

                        <div className="flex items-center gap-2">
                            <FaUser />
                            <span>Admin</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <FaCalendarAlt />
                            <span>
                                {new Date(blog.created_at).toLocaleDateString()}
                            </span>
                        </div>

                    </div>

                    <div className="leading-8 text-gray-700 whitespace-pre-line text-lg">
                        {blog.content}
                    </div>

                </div>

            </div>
        </section>
    );
};

export default BlogDetails;