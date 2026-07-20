import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import NewsCard from "./NewsCard";

const AllNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get("/news");
      if (res.data.success) {
        setNews(res.data.data);
      } else {
        setError(res.data.message || "Failed to fetch news");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Cannot connect to server. Please check if backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
          </div>
        )}

        {!loading && error && (
          <div className="max-w-xl mx-auto text-center bg-red-50 border border-red-200 text-red-600 rounded-lg px-6 py-4">
            <p>{error}</p>
            <button
              onClick={getNews}
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.length === 0 ? (
              <p className="col-span-full text-center text-gray-400 py-10">
                No news articles yet.
              </p>
            ) : (
              news.map((item) => <NewsCard key={item.id} item={item} />)
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllNews;