import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { Clock, MessageCircle, Share2, ChevronRight } from "lucide-react";
import axiosInstance from "../utils/axiosConfig";
import CommentSection from "./CommentSection";

const FALLBACK_IMG = "assets/img/blog/blog-1.jpg";

const CATEGORIES = [
	"General",
	"Buying Guide",
	"Home Improvement",
	"Market Insights",
	"Legal & Finance",
];

const CATEGORY_STYLES = {
	General: "bg-blue-100 text-blue-600",
	"Buying Guide": "bg-green-100 text-green-600",
	"Home Improvement": "bg-orange-100 text-orange-600",
	"Market Insights": "bg-purple-100 text-purple-600",
	"Legal & Finance": "bg-red-100 text-red-600",
};

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

const BlogDetailPage = () => {
	const { id } = useParams();

	const [blog, setBlog] = useState(null);
	const [related, setRelated] = useState([]);
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [commentsLoading, setCommentsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [copied, setCopied] = useState(false);

	const loadBlog = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const res = await axiosInstance.get(`/blogs/${id}`);
			const data = res.data?.data || res.data;

			if (!data || res.data?.success === false) {
				setError(res.data?.message || "This blog post could not be found.");
				setBlog(null);
				return;
			}
			setBlog(data);

			// Related posts: prefer same category, fall back to latest
			try {
				const relRes = await axiosInstance.get(
					`/blogs/category/${encodeURIComponent(data.category || "General")}`
				);
				let items = relRes.data?.data || relRes.data || [];
				items = items.filter((b) => String(b.id) !== String(data.id));

				if (items.length < 3) {
					const latestRes = await axiosInstance.get("/blogs/latest?limit=6");
					const latestItems = (latestRes.data?.data || latestRes.data || []).filter(
						(b) => String(b.id) !== String(data.id)
					);
					const merged = [...items];
					latestItems.forEach((b) => {
						if (merged.length < 4 && !merged.some((m) => m.id === b.id)) {
							merged.push(b);
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
				setError("Failed to load this blog post. Please try again.");
			}
		} finally {
			setLoading(false);
		}
	}, [id]);

	const loadComments = useCallback(async () => {
		try {
			setCommentsLoading(true);
			const res = await axiosInstance.get(`/blogs/${id}/comments`);
			setComments(res.data?.data || []);
		} catch {
			setComments([]);
		} finally {
			setCommentsLoading(false);
		}
	}, [id]);

	useEffect(() => {
		loadBlog();
		loadComments();
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [loadBlog, loadComments]);

	const shareBlog = async () => {
		const url = window.location.href;
		if (navigator.share) {
			try {
				await navigator.share({ title: blog?.title, url });
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
					{loading && (
						<div className="flex justify-center py-20">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
						</div>
					)}

					{!loading && error && (
						<div className="px-6 py-16 text-center">
							<p className="text-lg font-semibold text-gray-800 mb-2">
								We couldn't load this blog post
							</p>
							<p className="text-gray-500 mb-6">{error}</p>
							<button
								onClick={loadBlog}
								className="bg-green-500 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-green-600 transition-colors"
							>
								Try again
							</button>
						</div>
					)}

					{/* ---- Blog post ---- */}
					{!loading && !error && blog && (
						<div className="px-6 py-6">
							<div className="flex items-center justify-between mb-5">
								<h1 className="text-lg font-bold text-gray-900">
									{blog.category || "General"}
								</h1>
								<span className="text-sm font-semibold text-gray-400">
									Related Posts
								</span>
							</div>

							<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
								{/* ---- Left sidebar: author + categories ---- */}
								<aside className="lg:col-span-2 order-2 lg:order-1">
									<div className="flex items-center gap-3 mb-8">
										<div className="h-11 w-11 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
											{initials(blog.author)}
										</div>
										<div>
											<p className="text-sm font-semibold text-gray-800 leading-tight">
												{blog.author || "Admin"}
											</p>
											<p className="text-xs text-gray-400">Contributor</p>
										</div>
									</div>

									<h4 className="text-sm font-bold text-gray-800 mb-3">Category</h4>
									<ul className="space-y-2.5">
										{CATEGORIES.map((cat) => (
											<li key={cat}>
												<span
													className={`text-sm cursor-default ${cat === (blog.category || "General")
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

								{/* ---- Main article + comments ---- */}
								<article className="lg:col-span-7 order-1 lg:order-2">
									<div className="rounded-xl overflow-hidden mb-4">
										<img
											src={blog.image || FALLBACK_IMG}
											alt={blog.title}
											className="w-full h-80 object-cover"
											onError={(e) => {
												e.target.src = FALLBACK_IMG;
											}}
										/>
									</div>

									<div className="flex items-center justify-between flex-wrap gap-3 mb-4">
										<span
											className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${CATEGORY_STYLES[blog.category] || "bg-gray-100 text-gray-600"
												}`}
										>
											{blog.category || "General"}
										</span>
										<div className="flex items-center gap-4 text-xs text-gray-400">
											<span className="flex items-center gap-1">
												<Clock size={14} />
												{estimateReadTime(blog.content)} min read
											</span>
											<span className="flex items-center gap-1">
												<MessageCircle size={14} />
												{comments.length} comments
											</span>
										</div>
									</div>

									<h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-2">
										{blog.title}
									</h2>
									<p className="text-sm text-gray-400 mb-5">
										By {blog.author || "Admin"} &middot; {formatDate(blog.created_at)}
									</p>

									<div className="flex items-center gap-3 mb-6">
										<button
											type="button"
											onClick={shareBlog}
											className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors"
										>
											<Share2 size={16} />
											{copied ? "Link copied!" : "Share"}
										</button>
									</div>

									<div className="prose max-w-none text-gray-600 leading-relaxed space-y-4">
										{(
											blog.summary
												? `${blog.summary}\n\n${blog.content}`
												: blog.content || ""
										)
											.split(/\n+/)
											.filter((p) => p.trim())
											.map((para, idx) => (
												<p key={idx}>{para}</p>
											))}
									</div>

									{/* ---- Comments: view + post + delete own ---- */}
									<CommentSection
										blogId={blog.id}
										comments={comments}
										setComments={setComments}
										loading={commentsLoading}
									/>
								</article>

								{/* ---- Right sidebar: related posts ---- */}
								<aside className="lg:col-span-3 order-3">
									<div className="flex items-center justify-between mb-4">
										<h4 className="text-sm font-bold text-gray-800">Related Posts</h4>
										<Link
											to="/blog"
											className="text-xs font-semibold text-green-600 hover:text-green-700 flex items-center gap-0.5"
										>
											See all
											<ChevronRight size={14} />
										</Link>
									</div>

									{related.length === 0 ? (
										<p className="text-sm text-gray-400">No related posts yet.</p>
									) : (
										<div className="space-y-4">
											{related.map((item) => (
												<Link
													key={item.id}
													to={`/blog/${item.id}`}
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
															className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${CATEGORY_STYLES[item.category] || "bg-gray-100 text-gray-600"
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

export default BlogDetailPage;