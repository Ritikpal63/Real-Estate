import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../utils/axiosConfig";
import BlogCard from "./BlogCard";

const LIMIT = 9;

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const requestId = useRef(0);

  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  const getBlogs = async (pageNum) => {
    const currentRequest = ++requestId.current;
    try {
      setLoading(true);
      setError(null);
      const offset = (pageNum - 1) * LIMIT;
      const res = await axiosInstance.get("/blogs", {
        params: { limit: LIMIT, offset },
      });

      // Ignore this response if a newer request has already started
      if (currentRequest !== requestId.current) return;

      if (res.data.success) {
        const data = res.data.data || [];
        const seen = new Set();
        const unique = data.filter((item) => {
          if (seen.has(item.id)) return false;
          seen.add(item.id);
          return true;
        });
        setBlogs(data);
        setTotal(Number(res.data.pagination?.total) || 0);
      } else {
        setBlogs([]);
        setError(res.data.message || "Failed to fetch blogs");
      }
    } catch (err) {
      if (currentRequest !== requestId.current) return;
      setBlogs([]);
      if (err.response) {
        setError(
          `${err.response.data?.message || "Server error"} (status ${err.response.status})`
        );
      } else if (err.request) {
        setError("Cannot connect to server. Please check if backend is running.");
      } else {
        setError("Something went wrong while loading blogs.");
      }
    } finally {
      if (currentRequest === requestId.current) setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    setPage(p);
  };

  // Build page numbers with ellipsis for large page counts, e.g. 1 2 3 ... 8
  const getPageNumbers = () => {
    const pages = [];
    const windowSize = 1; // pages shown around current page

    for (let p = 1; p <= totalPages; p++) {
      if (
        p === 1 ||
        p === totalPages ||
        (p >= page - windowSize && p <= page + windowSize)
      ) {
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
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
          </div>
        )}

        {!loading && error && (
          <div className="max-w-xl mx-auto text-center bg-red-50 border border-red-200 text-red-600 rounded-lg px-6 py-4">
            <p>{error}</p>
            <button
              onClick={() => getBlogs(page)}
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.length === 0 ? (
                <p className="col-span-full text-center text-gray-400 py-10">
                  No blog posts yet.
                </p>
              ) : (
                blogs.map((item) => <BlogCard key={item.id} item={item} />)
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  className="px-3 py-2 rounded-lg border text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Prev
                </button>

                {getPageNumbers().map((p, idx) =>
                  p === "..." ? (
                    <span key={`dots-${idx}`} className="px-2 text-gray-400">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => goToPage(p)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${p === page
                        ? "bg-[#374256] text-white"
                        : "border hover:bg-gray-100 text-gray-700"
                        }`}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  className="px-3 py-2 rounded-lg border text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Next
                </button>
              </div>
            )}

            <p className="text-center text-sm text-gray-400 mt-3">
              Page {page} of {totalPages} · {total} posts
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default AllBlogs;