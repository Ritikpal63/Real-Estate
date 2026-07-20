import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Home,
  Building2,
  TrendingUp,
  BookOpen,
  Search,
  Bell,
  Bookmark,
  Share2,
  MessageCircle,
  Clock,
  ChevronRight,
} from "lucide-react";
import axiosInstance from "../utils/axiosConfig";


const FALLBACK_IMG = "assets/img/blog/blog-1.jpg";

const CATEGORIES = [
  "General",
  "Market Trends",
  "Investment Tips",
  "Property News",
  "Legal Updates",
];

const CATEGORY_STYLES = {
  General: "bg-blue-100 text-blue-600",
  "Market Trends": "bg-purple-100 text-purple-600",
  "Investment Tips": "bg-green-100 text-green-600",
  "Property News": "bg-orange-100 text-orange-600",
  "Legal Updates": "bg-red-100 text-red-600",
};

const NAV_LINKS = [
  { label: "Home", icon: Home, to: "/" },
  { label: "Properties", icon: Building2, to: "/property" },
  { label: "Market", icon: TrendingUp, to: "/blog" },
  { label: "Guides", icon: BookOpen, to: "/faq" },
];

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const estimateReadTime = (text = "") => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("") || "A";

const NewsDetailPage = () => {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const loadArticle = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.get(`/news/${id}`);
      const data = res.data?.data || res.data;

      if (!data || res.data?.success === false) {
        setError(res.data?.message || "This article could not be found.");
        setArticle(null);
        return;
      }
      setArticle(data);

      const savedIds = JSON.parse(localStorage.getItem("savedNews") || "[]");
      setSaved(savedIds.includes(String(data.id)));

      // Related news: prefer same category, fall back to latest
      try {
        const relRes = await axiosInstance.get(
          `/news/category/${encodeURIComponent(data.category || "General")}`
        );
        let items = relRes.data?.data || relRes.data || [];
        items = items.filter((n) => String(n.id) !== String(data.id));

        if (items.length < 3) {
          const latestRes = await axiosInstance.get("/news/latest?limit=6");
          const latestItems = (latestRes.data?.data || latestRes.data || []).filter(
            (n) => String(n.id) !== String(data.id)
          );
          const merged = [...items];
          latestItems.forEach((n) => {
            if (merged.length < 4 && !merged.some((m) => m.id === n.id)) {
              merged.push(n);
            }
          });
          items = merged;
        }
        setRelated(items.slice(0, 4));
      } catch {
        setRelated([]);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || "Server error occurred.");
      } else if (err.request) {
        setError("Cannot connect to server. Please check if backend is running.");
      } else {
        setError("Failed to load this article. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadArticle();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [loadArticle]);

  const toggleSave = () => {
    if (!article) return;
    const savedIds = JSON.parse(localStorage.getItem("savedNews") || "[]");
    const key = String(article.id);
    const next = saved
      ? savedIds.filter((sId) => sId !== key)
      : [...savedIds, key];
    localStorage.setItem("savedNews", JSON.stringify(next));
    setSaved(!saved);
  };

  const shareArticle = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: article?.title, url });
        return;
      } catch {
        /* user cancelled — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable, ignore */
    }
  };

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* ---- Top toolbar ---- */}
          <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-gray-100">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <span className="text-xl font-extrabold tracking-tight text-gray-900">
                ESTATE
              </span>
              <span className="text-xl font-extrabold tracking-tight text-green-500">
                NEWS
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map(({ label, icon: Icon, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-green-600 transition-colors"
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-2 w-48 lg:w-64">
                <Search size={16} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter search term"
                  className="bg-transparent outline-none text-sm ml-2 w-full text-gray-600 placeholder:text-gray-400"
                />
              </div>
              <button
                type="button"
                aria-label="Notifications"
                className="relative p-2 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
              </button>
            </div>
          </div>

          {/* ---- Loading / error states ---- */}
          {loading && (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
            </div>
          )}

          {!loading && error && (
            <div className="px-6 py-16 text-center">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                We couldn't load this article
              </p>
              <p className="text-gray-500 mb-6">{error}</p>
              <button
                onClick={loadArticle}
                className="bg-green-500 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-green-600 transition-colors"
              >
                Try again
              </button>
            </div>
          )}

          {/* ---- Article ---- */}
          {!loading && !error && article && (
            <div className="px-6 py-6">
              {/* Section heading row */}
              <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-bold text-gray-900">
                  {article.category || "General"}
                </h1>
                <span className="text-sm font-semibold text-gray-400">
                  Related News
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* ---- Left sidebar: profile + categories ---- */}
                <aside className="lg:col-span-2 order-2 lg:order-1">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-11 w-11 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
                      {initials(article.author)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 leading-tight">
                        {article.author || "Admin"}
                      </p>
                      <p className="text-xs text-gray-400">Contributor</p>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-gray-800 mb-3">
                    Category
                  </h4>
                  <ul className="space-y-2.5">
                    {CATEGORIES.map((cat) => (
                      <li key={cat}>
                        <span
                          className={`text-sm cursor-default ${
                            cat === (article.category || "General")
                              ? "text-green-600 font-semibold"
                              : "text-gray-500"
                          }`}
                        >
                          {cat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </aside>

                {/* ---- Main article ---- */}
                <article className="lg:col-span-7 order-1 lg:order-2">
                  <div className="rounded-xl overflow-hidden mb-4">
                    <img
                      src={article.image || FALLBACK_IMG}
                      alt={article.title}
                      className="w-full h-80 object-cover"
                      onError={(e) => {
                        e.target.src = FALLBACK_IMG;
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        CATEGORY_STYLES[article.category] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {article.category || "General"}
                    </span>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {estimateReadTime(article.content)} min read
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={14} />
                        {formatDate(article.created_at)}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-400 mb-5">
                    By {article.author || "Admin"} &middot;{" "}
                    {formatDate(article.created_at)}
                  </p>

                  <div className="flex items-center gap-3 mb-6">
                    <button
                      type="button"
                      onClick={toggleSave}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                        saved
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-600"
                      }`}
                    >
                      <Bookmark
                        size={16}
                        fill={saved ? "currentColor" : "none"}
                      />
                      {saved ? "Saved" : "Save to pocket"}
                    </button>
                    <button
                      type="button"
                      onClick={shareArticle}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors"
                    >
                      <Share2 size={16} />
                      {copied ? "Link copied!" : "Share on media"}
                    </button>
                  </div>

                  <div className="prose max-w-none text-gray-600 leading-relaxed space-y-4">
                    {(
                      article.summary
                        ? `${article.summary}\n\n${article.content}`
                        : article.content || ""
                    )
                      .split(/\n+/)
                      .filter((p) => p.trim())
                      .map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                  </div>
                </article>

                {/* ---- Right sidebar: related news ---- */}
                <aside className="lg:col-span-3 order-3">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-gray-800">
                      Related News
                    </h4>
                    <Link
                      to="/news/allnews"
                      className="text-xs font-semibold text-green-600 hover:text-green-700 flex items-center gap-0.5"
                    >
                      See all
                      <ChevronRight size={14} />
                    </Link>
                  </div>

                  {related.length === 0 ? (
                    <p className="text-sm text-gray-400">
                      No related articles yet.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {related.map((item) => (
                        <Link
                          key={item.id}
                          to={`/news/${item.id}`}
                          className="block rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                        >
                          <div className="relative h-28">
                            <img
                              src={item.image || FALLBACK_IMG}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = FALLBACK_IMG;
                              }}
                            />
                            <span
                              className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                CATEGORY_STYLES[item.category] ||
                                "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {item.category || "General"}
                            </span>
                          </div>
                          <div className="p-3">
                            <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-gray-400 mt-1">
                              {formatDate(item.created_at)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </aside>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsDetailPage;