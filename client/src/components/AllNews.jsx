import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import NewsCard from "./NewsCard";

const LIMIT = 9;

const AllNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  const getNews = async (pageNum) => {
    try {
      setLoading(true);
      setError(null);
      const offset = (pageNum - 1) * LIMIT;
      const res = await axiosInstance.get("/news", {
        params: { limit: LIMIT, offset }
      });
      if (res.data.success) {
        setNews(res.data.data);
        setTotal(res.data.pagination?.total || 0);
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
    getNews(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    setPage(p);
  };


  const getPageNumbers = () => {
    const pages = [];
    const windowSize = 1;

    for (let p = 1; p <= totalPages; p++) {
      if (
      p === 1 ||
      p === totalPages ||
      p >= page - windowSize && p <= page + windowSize)
      {
        pages.push(p);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {loading &&
        <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
          </div>
        }

        {!loading && error &&
        <div className="max-w-xl mx-auto text-center bg-red-50 border border-red-200 text-red-600 rounded-lg px-6 py-4">
            <p>{error}</p>
            <button
            onClick={() => getNews(page)}
            className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">

              Retry
            </button>
          </div>
        }

        {!loading && !error &&
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.length === 0 ?
            <p className="col-span-full text-center text-gray-400 py-10">
                  No news articles yet.
                </p> :

            news.map((item) => <NewsCard key={item.id} item={item} />)
            }
            </div>

            {totalPages > 1 &&
          <div className="flex justify-center items-center gap-2 mt-10">
                <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-2 rounded-lg border text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100">

                  Prev
                </button>

                {getPageNumbers().map((p, idx) =>
            p === "..." ?
            <span key={`dots-${idx}`} className="px-2 text-gray-400">
                      …
                    </span> :

            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
              p === page ?
              "bg-[#374256] text-white" :
              "border hover:bg-gray-100 text-gray-700"}`
              }>

                      {p}
                    </button>

            )}

                <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-2 rounded-lg border text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100">

                  Next
                </button>
              </div>
          }

            <p className="text-center text-sm text-gray-400 mt-3">
              Page {page} of {totalPages} · {total} articles
            </p>
          </>
        }
      </div>
    </section>);

};

export default AllNews;
