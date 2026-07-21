// src/pages/Admin/News/AdminNews.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../../../components/Section";
import AdminAsideSection from "../AdminAsideSection";
import axiosInstance from "../../../utils/axiosConfig";
import { useAuth } from "../../../contextApi/AuthContext";

const AdminNews = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    summary: "",
    category: "General",
    image: "",
    author: "Admin",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/admin/login");
      return;
    }
    fetchNews();
  }, [navigate, isAuthenticated, token]);

  const fetchNews = async () => {
    try {
      const response = await axiosInstance.get("/news/allnews");
      setNews(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      if (error.response?.status === 401) {
        navigate("/admin/login");
      }
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this news article?")) {
      try {
        const response = await axiosInstance.delete(`/news/${id}`);
        if (response.data.success) {
          await fetchNews();
          alert("News deleted successfully!");
        } else {
          alert(response.data.message || "Failed to delete news.");
        }
      } catch (error) {
        console.error("Error deleting news:", error);
        if (error.response) {
          if (error.response.status === 401) {
            alert("Your session has expired. Please login again.");
            navigate("/admin/login");
          } else {
            alert(error.response.data?.message || "Failed to delete news.");
          }
        } else if (error.request) {
          alert("Cannot connect to server. Please check your connection.");
        } else {
          alert("An error occurred. Please try again.");
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter a title");
      return;
    }
    if (!formData.content.trim()) {
      alert("Please enter content");
      return;
    }

    try {
      let response;
      if (isEditing) {
        response = await axiosInstance.put(`/news/${editId}`, formData);
      } else {
        response = await axiosInstance.post("/news", formData);
      }

      if (response.data.success) {
        await fetchNews();
        resetForm();
        alert(
          isEditing
            ? "News updated successfully!"
            : "News created successfully!",
        );
      }
    } catch (error) {
      console.error("Error saving news:", error);
      if (error.response?.status === 401) {
        alert("Your session has expired. Please login again.");
        navigate("/admin/login");
      } else {
        alert(error.response?.data?.message || "Failed to save news.");
      }
    }
  };

  const handleEdit = (article) => {
    setFormData({
      title: article.title,
      content: article.content,
      summary: article.summary || "",
      category: article.category || "General",
      image: article.image || "",
      author: article.author || "Admin",
    });
    setIsEditing(true);
    setEditId(article.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      summary: "",
      category: "General",
      image: "",
      author: "Admin",
    });
    setIsEditing(false);
    setEditId(null);
    setShowForm(false);
  };

  return (
    <>
      <Section title={"News Upload"} />
      <div className="flex flex-col lg:flex-row">
        <AdminAsideSection />

        <div className="flex-1 w-full min-w-0 bg-gray-50">
          <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
                News Management
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
                  Add New Article
                </button>
              )}
            </div>

            {/* Form */}
            {showForm && (
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {isEditing ? "Edit Article" : "Create New Article"}
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter news title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Summary
                    </label>
                    <input
                      type="text"
                      name="summary"
                      value={formData.summary}
                      onChange={(e) =>
                        setFormData({ ...formData, summary: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Short summary (optional)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content *
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      required
                      rows="6"
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Write your news article here..."
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="General">General</option>
                        <option value="Market Trends">Market Trends</option>
                        <option value="Investment Tips">Investment Tips</option>
                        <option value="Property News">Property News</option>
                        <option value="Legal Updates">Legal Updates</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
                    >
                      {isEditing ? "Update Article" : "Publish Article"}
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

            {/* News List */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : news.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg text-center py-12">
                <p className="text-gray-500">
                  No news articles found. Create your first article!
                </p>
              </div>
            ) : (
              <>
                {/* MOBILE + TABLET: Card view */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
                  {news.map((article) => {
                    const styles = {
                      General: { bg: "bg-slate-100", text: "text-slate-600" },
                      "Market Trends": {
                        bg: "bg-blue-100",
                        text: "text-blue-600",
                      },
                      "Investment Tips": {
                        bg: "bg-green-100",
                        text: "text-green-600",
                      },
                      "Property News": {
                        bg: "bg-orange-100",
                        text: "text-orange-600",
                      },
                      "Legal Updates": {
                        bg: "bg-purple-100",
                        text: "text-purple-600",
                      },
                    };
                    const style = styles[article.category] || styles["General"];

                    return (
                      <div
                        key={article.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3 w-full min-w-0 overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div
                            className={`w-11 h-11 shrink-0 rounded-xl ${style.bg} ${style.text} flex items-center justify-center`}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2zM7 8h10M7 12h10M7 16h6"
                              />
                            </svg>
                          </div>
                          <button
                            onClick={() => handleEdit(article)}
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
                            {article.title}
                          </h3>
                          {article.summary ? (
                            <p className="text-sm text-gray-500 line-clamp-2 break-words mt-1">
                              {article.summary}
                            </p>
                          ) : (
                            <p className="text-sm text-gray-400 italic mt-1">
                              No summary added
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-400 -mt-1">
                          <span className={`font-medium ${style.text}`}>
                            {article.category || "General"}
                          </span>
                          <span>
                            {new Date(article.created_at).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <button
                            onClick={() => handleEdit(article)}
                            className="flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-full transition-colors"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(article.id)}
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
                <div className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-96 overflow-y-auto ritik">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
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
                        {news.map((article) => (
                          <tr key={article.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 max-w-xs">
                              <div className="text-sm font-medium text-gray-900 truncate">
                                {article.title}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                {article.category || "General"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-green-800">
                              {new Date(
                                article.created_at,
                              ).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-3">
                                <button
                                  onClick={() => handleEdit(article)}
                                  className="text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                  <svg
                                    className="w-5 h-5"
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
                                <button
                                  onClick={() => handleDelete(article.id)}
                                  className="text-red-600 hover:text-red-800 transition-colors"
                                >
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
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

export default AdminNews;
