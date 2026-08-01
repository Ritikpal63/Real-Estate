import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/axiosConfig";
import Section from "../../../components/Section";
import AdminAsideSection from "../AdminAsideSection";

export default function AdminViewGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/gallery");
        setItems(res.data.data);
        console.log("Gallery items:", res.data.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this gallery item?")) return;
    try {
      await axiosInstance.delete(`/gallery/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <>
      <Section title={"Gallery"} />
      <div className="flex flex-col lg:flex-row">
        <AdminAsideSection />
        <div className="flex-1 w-full min-w-0 bg-gray-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Gallery</h2>
                <p className="text-gray-500 mt-1">Manage gallery photos.</p>
              </div>
              <Link
                to="/admin/addgallery"
                className="bg-blue-500 text-md rounded-lg px-4 py-2"
              >
                + Add Photo
              </Link>
            </div>

            {loading && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-gray-100 rounded-2xl h-48 animate-pulse" />
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="bg-red-50 text-red-600 rounded-xl px-4 py-3 text-sm">{error}</div>
            )}

            {!loading && !error && items.length === 0 && (
              <div className="bg-gray-50 rounded-xl px-4 py-10 text-center text-gray-500">
                No gallery items yet. Click "+ Add Photo" to upload one.
              </div>
            )}

            {!loading && !error && items.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative"
                  >
                    <div className="h-40 w-full bg-gray-100 overflow-hidden">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-gray-800 truncate">{item.title}</h3>
                      <span className="text-xs text-gray-500 capitalize">{item.category}</span>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="absolute top-2 right-2 bg-white/90 hover:bg-red-500 hover:text-white text-red-500 rounded-full w-8 h-8 flex items-center justify-center text-sm shadow"
                      title="Delete"
                    >
                      🗑
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}