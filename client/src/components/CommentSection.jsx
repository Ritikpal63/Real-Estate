import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Send, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosConfig";
import { useAuth } from "../contextApi/useAuth";

const initials = (name = "") =>
name.
split(" ").
filter(Boolean).
slice(0, 2).
map((n) => n[0]?.toUpperCase()).
join("") || "U";

const formatDate = (dateString) =>
new Date(dateString).toLocaleDateString("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});





const CommentSection = ({ blogId, comments, setComments, loading }) => {
  const { user, isAdmin, isAuthenticated } = useAuth();
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      setPosting(true);
      const res = await axiosInstance.post(`/blogs/${blogId}/comments`, {
        comment: text.trim()
      });
      if (res.data.success) {
        setComments((prev) => [res.data.data, ...prev]);
        setText("");
        toast.success("Comment posted!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post comment");
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      const res = await axiosInstance.delete(`/blogs/${blogId}/comments/${commentId}`);
      if (res.data.success) {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
        toast.success("Comment deleted");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete comment");
    }
  };

  return (
    <div className="mt-10 border-t border-gray-100 pt-8">
      <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-5">
        <MessageCircle size={20} />
        Comments {comments.length > 0 && `(${comments.length})`}
      </h3>

      {}
      {isAuthenticated() ?
      <form onSubmit={handlePost} className="flex gap-3 mb-8">
          <div className="h-10 w-10 shrink-0 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
            {initials(user?.name || user?.username)}
          </div>
          <div className="flex-1">
            <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="Share your thoughts..."
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none" />

            <div className="flex justify-end mt-2">
              <button
              type="submit"
              disabled={posting || !text.trim()}
              className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors">

                <Send size={14} />
                {posting ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </div>
        </form> :

      <div className="mb-8 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-500">
          <Link to="/login" className="text-green-600 font-semibold hover:underline">
            Login
          </Link>{" "}
          to join the conversation.
        </div>
      }

      {}
      {loading ?
      <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
        </div> :
      comments.length === 0 ?
      <p className="text-sm text-gray-400">No comments yet. Be the first to comment!</p> :

      <div className="space-y-5">
          {comments.map((c) =>
        <div key={c.id} className="flex gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm">
                {initials(c.user_name || c.user_username)}
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-800">
                    {c.user_name || c.user_username}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{formatDate(c.created_at)}</span>
                    {(isAdmin || user?.id === c.user_id) &&
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors"
                  title="Delete comment">

                        <Trash2 size={14} />
                      </button>
                }
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1 whitespace-pre-line break-words">
                  {c.comment}
                </p>
              </div>
            </div>
        )}
        </div>
      }
    </div>);

};

export default CommentSection;
