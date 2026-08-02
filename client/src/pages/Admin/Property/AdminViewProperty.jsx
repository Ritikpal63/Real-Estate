import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosConfig";
import Section from "../../../components/Section";
import AdminAsideSection from "../AdminAsideSection";

export default function PropertyView() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Sale");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/property/all", {
          params: {
            limit: 50,
            offset: 0,
          },
        });
        setProperties(res.data.data);
        setFilteredProperties(res.data.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);
  const handleSearch = (value) => {
    setSearch(value);
    if (!value.trim()) {
      setFilteredProperties(properties);
      return;
    }
    const result = properties.filter((property) =>
      property.title?.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredProperties(result);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;
    try {
      const res = await axiosInstance.delete(`/property/${id}`);
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Section title={"View Property"} />
      <div className="flex flex-col lg:flex-row">
        <AdminAsideSection />
        <div className="flex-1 w-full min-w-0 bg-gray-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-2xl font-semibold">My Properties</h2>
                <p className="text-gray-500 mt-1">
                  Manage your real estate listings.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="bg-gray-100 rounded-xl px-4 py-2 text-sm outline-none"
                >
                  <option value="Sale">Status: Sale</option>
                  <option value="Rent">Status: Rent</option>
                  <option value="All">Status: All</option>
                </select>

                <Link
                  to="/admin/addproperty"
                  className="bg-primary text-white text-md rounded-lg px-4 py-2 whitespace-nowrap"
                >
                  + Add Property
                </Link>
              </div>
            </div>

            {/* Loading / Error states */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="bg-gray-100 rounded-2xl h-80 animate-pulse"
                  />
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="bg-red-50 text-red-600 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {!loading && !error && properties.length === 0 && (
              <div className="bg-gray-50 rounded-xl px-4 py-10 text-center text-gray-500">
                No properties found. Click "Add Property" to create one.
              </div>
            )}

            {/* Property Grid */}
            {!loading && !error && properties.length > 0 && (
              <>
                {/* Mobile Responsive View */}
                <input
                  type="text"
                  placeholder="Search Service..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full border rounded-lg p-2 mb-4 lg:hidden"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
                  {filteredProperties.map((article) => {
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
                        {/* <div className="flex items-start justify-between">
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
                        </div> */}

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
                            onClick={() => navigate(`/admin/property/${article.id}/edit`)}
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

                {/* Desktop Responsive View */}
                <input
                  type="text"
                  placeholder="Search Properties..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full border rounded-lg p-2 mb-4 hidden lg:block"
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
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
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
                        {filteredProperties.map((property) => (
                          <tr key={property.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 max-w-xs">
                              <div className="flex items-center gap-3">
                                <img
                                  src={property.image || "assets/img/blog/blog-1.jpg"}
                                  alt={property.title}
                                  className="w-10 h-10 rounded-lg object-cover shrink-0"
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                {property.type || "N/A"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 truncate">
                              {property.title || 0}
                            </td>
                            <td className="px-6 py-4 text-sm text-green-800">
                              {new Date(property.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-3">
                                <button
                                  onClick={() => navigate(`/admin/property/${property.id}/edit`)}
                                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(property.id)}
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
}
