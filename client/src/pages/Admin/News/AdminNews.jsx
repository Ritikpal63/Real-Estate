// src/components/admin/AdminNews.jsx
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

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated()) {
      console.log('Not authenticated, redirecting to login');
      navigate('/admin/login');
      return;
    }
    
    console.log('Token exists:', !!token);
    fetchNews();
  }, [navigate, isAuthenticated, token]);

  const fetchNews = async () => {
    try {
      console.log('Fetching news...');
      const response = await axiosInstance.get('/news');
      console.log('News fetched:', response.data);
      setNews(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this news article?")) {
      try {
        console.log('Deleting news with ID:', id);
        const response = await axiosInstance.delete(`/news/${id}`);
        console.log('Delete response:', response.data);
        
        if (response.data.success) {
          await fetchNews();
          alert("News deleted successfully!");
        } else {
          alert(response.data.message || "Failed to delete news.");
        }
      } catch (error) {
        console.error("Error deleting news:", error);
        
        if (error.response) {
          console.error('Error response:', error.response.data);
          
          if (error.response.status === 401) {
            alert("Your session has expired. Please login again.");
            navigate('/admin/login');
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

  // Handle form submission
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
        response = await axiosInstance.post('/news', formData);
      }

      if (response.data.success) {
        await fetchNews();
        resetForm();
        alert(isEditing ? "News updated successfully!" : "News created successfully!");
      }
    } catch (error) {
      console.error("Error saving news:", error);
      
      if (error.response?.status === 401) {
        alert("Your session has expired. Please login again.");
        navigate('/admin/login');
      } else {
        alert(error.response?.data?.message || "Failed to save news.");
      }
    }
  };

  // Handle edit
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

  // Reset form
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

  // ... rest of your render method (JSX)
  
  return (
    <>
      <Section title={"News Upload"} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 w-full col-md-12 py-2">
            <AdminAsideSection />
          </div>
          <div className="col-lg-8 col-md-12 w-full py-2">
            <div className="min-h-screen bg-gray-50 py-8">
              <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-800">
                    News Management
                  </h1>
                  {!showForm && (
                    <button
                      onClick={() => setShowForm(true)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Add New Article
                    </button>
                  )}
                </div>

                {/* Form */}
                {showForm && (
                  <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {isEditing ? "Edit Article" : "Create New Article"}
                      </h2>
                      <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Enter news title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
                        <input
                          type="text"
                          name="summary"
                          value={formData.summary}
                          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Short summary (optional)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                        <textarea
                          name="content"
                          value={formData.content}
                          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                          required
                          rows="6"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Write your news article here..."
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          >
                            <option value="General">General</option>
                            <option value="Market Trends">Market Trends</option>
                            <option value="Investment Tips">Investment Tips</option>
                            <option value="Property News">Property News</option>
                            <option value="Legal Updates">Legal Updates</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                          <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          {isEditing ? "Update Article" : "Publish Article"}
                        </button>
                        <button
                          type="button"
                          onClick={resetForm}
                          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
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
                ) : (
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {news.map((article) => (
                            <tr key={article.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-gray-900 w-90 h-15 overflow-hidden">
                                  {article.title}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                  {article.category || "General"}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-green-800">
                                {new Date(article.created_at).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleEdit(article)}
                                    className="text-blue-600 hover:text-blue-800 transition-colors"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => handleDelete(article.id)}
                                    className="text-red-600 hover:text-red-800 transition-colors"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {news.length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No news articles found. Create your first article!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNews;