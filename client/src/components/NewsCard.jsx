import React from "react";
import { Link } from "react-router-dom";
import { User, ArrowRight } from "lucide-react";

const FALLBACK_IMG = "assets/img/blog/blog-1.jpg";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const stripHtml = (text = "") => text.replace(/<[^>]*>/g, "");

const NewsCard = ({ item }) => {
  const excerpt =
    item.summary || stripHtml(item.content || "").slice(0, 110) + "...";

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Image */}
      <Link to={`/news/${item.id}`} className="block overflow-hidden h-48">
        <img
          src={item.image || FALLBACK_IMG}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = FALLBACK_IMG;
          }}
        />
      </Link>

      <div className="p-5">
        {/* Date badge + author row */}
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            {formatDate(item.created_at)}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <User size={13} />
            By {item.author || "Admin"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 leading-snug mb-2 line-clamp-2">
          <Link to={`/news/${item.id}`} className="hover:text-green-600 transition-colors">
            {item.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {excerpt}
        </p>

        {/* Read more */}
        <Link
          to={`/news/${item.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
        >
          Read More
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;