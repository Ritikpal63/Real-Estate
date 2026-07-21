import React, {useState} from 'react'
import { usePost } from "../../../contextApi/PostContext";
import { useAuth } from "../../../contextApi/AuthContext";


const UploadBlogPage = () => {
    const { addPost, setLoading, loading, setError, error, clearError, posts } =
    usePost();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const postSubmitHandler = async (e) => {
    e.preventDefault();
    clearError();
    setSuccess("");

    if (!formData.title || !formData.content || !formData.image) {
      setError("Please fill all fields including image");
      return;
    }

    try {
      setLoading(true);

      const newPost = {
        id: Date.now(),
        title: formData.title,
        content: formData.content,
        image: preview,
        excerpt: formData.content.slice(0, 120),
        createdAt: new Date().toLocaleString(),
      };

      addPost(newPost);
      setSuccess("Post uploaded successfully!");
      setFormData({ title: "", content: "", image: null });
      setPreview(null);
    } catch (err) {
      setError("Error uploading post");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
        <div className="container-fluid py-4">
        <div className="row px-4">
          <div className="col-xl-7 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div>
                    <p className="text-uppercase text-secondary mb-1">Admin panel</p>
                    <h3 className="mb-0">Create a new post</h3>
                    <p className="text-muted mb-0">
                      Logged in as <strong>{user?.name || user?.email}</strong>
                    </p>
                  </div>
                  <span className="badge fs-4">{posts.length} posts</span>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={postSubmitHandler}>
                  <div className="mb-3">
                    <label className="form-label text-secondary">Post title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      disabled={loading}
                      className="form-control form-control-lg border-2"
                      placeholder="Enter title"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-secondary">Post content</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      disabled={loading}
                      rows="6"
                      className="form-control border-2"
                      placeholder="Write the blog content here"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-secondary">Feature image</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={loading}
                      className="form-control"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-dark px-5 py-2"
                    disabled={loading}
                  >
                    {loading ? "Saving post..." : "Upload post"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-xl-5">
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body p-4">
                <h5 className="mb-3">Post preview</h5>
                {preview ? (
                  <div className="mb-3 rounded overflow-hidden border">
                    <img
                      src={preview}
                      alt="Preview"
                      className="img-fluid"
                      style={{ width: "100%", height: "240px", objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <div className="mb-3 rounded border p-4 text-center text-muted">
                    Choose an image to preview
                  </div>
                )}
                <div className="p-3 bg-light rounded">
                  <h6 className="mb-2 text-muted">Tip</h6>
                  <p className="small text-muted mb-0">
                    Use a high-quality image and a clear title to make your blog post more attractive.
                  </p>
                </div>
              </div>
            </div>

            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h5 className="mb-0">Recent posts</h5>
                    <p className="text-muted small mb-0">Quick access to all uploaded posts</p>
                  </div>
                </div>

                {posts.length === 0 ? (
                  <p className="text-muted">No posts yet. Your latest posts will appear here.</p>
                ) : (
                  posts.map((item) => (
                    <div key={item.id} className="d-flex gap-3 mb-3 pb-3 border-bottom">
                      <div style={{ width: 90, minHeight: 72, overflow: "hidden", borderRadius: 12 }}>
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="img-fluid"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <div className="bg-secondary bg-opacity-10 h-100" />
                        )}
                      </div>
                      <div className="">
                        <h6 className="mb-1">{item.title}</h6>
                        <p className="small text-muted mb-1">{item.excerpt}</p>
                        <small className="text-secondary">{item.createdAt}</small>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default UploadBlogPage