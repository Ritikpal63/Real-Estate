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
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

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
                      {properties.map((property) => (
                        <tr key={property.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 max-w-xs">
                            <div className="flex items-center gap-3">
                              <img
                                src={property.image || "assets/img/blog/blog-1.jpg"}
                                alt={property.title}
                                className="w-10 h-10 rounded-lg object-cover shrink-0"
                              />
                              <div className="text-sm font-medium text-gray-900 truncate">
                                {property.title}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                              {property.type || "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
