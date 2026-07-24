import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/axiosConfig";


export default function PropertyView() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Sale");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get('/property')
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
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      const res = await axiosInstance.delete('/property')
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-semibold">My Properties</h2>
          <p className="text-gray-500 mt-1">Manage your real estate listings.</p>
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
            to="/admin/add-property"
            className="bg-[#374256] text-white text-sm rounded-lg px-4 py-2 whitespace-nowrap"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="h-44 w-full bg-gray-100 overflow-hidden">
                {property.image ? (
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-800 truncate">
                  {property.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {property.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
                  <span className="flex items-center gap-1">
                    📍 {property.location || "—"}
                  </span>
                  <span className="flex items-center gap-1">
                    🏠 {property.type || "—"}
                  </span>
                  <span className="flex items-center gap-1">
                    📐 {property.size ? `${property.size}m²` : "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="font-semibold text-gray-800">
                    ${Number(property.price || 0).toLocaleString()}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      🛏 {property.bedroom ?? 0}
                    </span>
                    <span className="flex items-center gap-1">
                      🛁 {property.bathroom ?? 0}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4 mt-auto pt-3">
                  <Link
                    to={`/admin/properties/${property.id}`}
                    className="flex-1 text-center text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 transition rounded-lg py-2"
                  >
                    See Details
                  </Link>
                  <Link
                    to={`/admin/properties/${property.id}/edit`}
                    className="flex-1 text-center text-xs sm:text-sm bg-[#374256] hover:opacity-90 transition text-white rounded-lg py-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="text-xs sm:text-sm text-red-500 hover:text-red-600 px-2"
                    title="Delete"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}