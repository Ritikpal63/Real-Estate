import React, { useState } from "react";
import Section from "../../components/Section";
import { usePost } from "../../contextApi/PostContext";
import { useAuth } from "../../contextApi/AuthContext";

const BlogUpload = () => {
  const { addPost, setLoading, loading, setError, error, clearError, posts } = usePost();
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
    <>
      <Section title={"Admin Blog Upload"} />
      <div className="container-fluid py-4">
        <div className="row gx-4">
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
                  <span className="badge  fs-4">{posts.length} posts</span>
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
    </>
  );
};

export default BlogUpload; 





// import React, { useState } from "react";
// import Section from "../../components/Section";
// import { usePost } from "../../contextApi/PostContext";

// const BlogUpload = () => {
//   const { addPost, setLoading, loading, setError, error, clearError, posts } = usePost();
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     image: null,
//   });
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       image: e.target.files[0],
//     }));
//   };

//   const postSubmitHandler = async (e) => {
//     e.preventDefault();
//     clearError();
//     setSuccess("");

//     if (!formData.title || !formData.content || !formData.image) {
//       setError("Please fill all fields including image");
//       return;
//     }

//     try {
//       setLoading(true);
      
//       const uploadFormData = new FormData();
//       uploadFormData.append("title", formData.title);
//       uploadFormData.append("content", formData.content);
//       uploadFormData.append("image", formData.image);

//       const newPost = {
//         id: Date.now(),
//         title: formData.title,
//         content: formData.content,
//         image: URL.createObjectURL(formData.image),
//       };
      
//       addPost(newPost);
      
//       setSuccess("Post uploaded successfully!");
      
//       setFormData({
//         title: "",
//         content: "",
//         image: null,
//       });
//     } catch (error) {
//       setError(error.response?.data?.message || "Error uploading post");
//       console.log("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Section title={"Blog Post Page"} />
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-8">
//             {error && <div className="alert alert-danger">{error}</div>}
//             {success && <div className="alert alert-success">{success}</div>}
            
//             <form onSubmit={postSubmitHandler}>
//               <div className="input mb-3 mt-3">
//                 <input
//                   type="text"
//                   name="title"
//                   placeholder="Title..."
//                   className="rounded-md border border-primary p-2 w-100"
//                   value={formData.title}
//                   onChange={handleChange}
//                   disabled={loading}
//                 />
//               </div>
//               <div className="input mb-3">
//                 <textarea
//                   name="content"
//                   placeholder="Content..."
//                   className="border border-primary rounded-md p-2 w-100"
//                   rows="5"
//                   value={formData.content}
//                   onChange={handleChange}
//                   disabled={loading}
//                 />
//               </div>
//               <div className="input mb-3">
//                 <input
//                   type="file"
//                   name="image"
//                   className="border rounded-md py-2 border-primary w-100"
//                   onChange={handleImageChange}
//                   accept="image/*"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <button
//                   type="submit"
//                   className="bg-[#321949] text-2xl text-light py-2 px-5 w-100 rounded-md"
//                   disabled={loading}
//                   style={{fontSize:"24px", borderRadius:"6px"}}
//                 >
//                   {loading ? "Uploading..." : "Submit Post"}
//                 </button>
//               </div>
//             </form>
//           </div>

//           <div className="col-lg-4">
//             <div className="card">
//               <div className="card-header text-white">
//                 <h5 className="mb-0">📋 All Posts ({posts.length})</h5>
//               </div>
//               <div className="card-body" style={{ maxHeight: "600px", overflowY: "auto" }}>
//                 {posts.length === 0 ? (
//                   <p className="text-muted">No posts yet. Create one!</p>
//                 ) : (
//                   posts.map((item) => (
//                     <div key={item.id} className="mb-3 border rounded p-3">
//                       {item.image && (
//                         <img src={item.image} alt={item.title} className="img-fluid rounded mb-2" style={{ maxHeight: "150px", width: "100%", objectFit: "cover" }} />
//                       )}
//                       <h6 className="fw-bold">{item.title}</h6>
//                       <p className="small text-muted" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                         {item.content}
//                       </p>
//                       <small className="text-secondary">ID: {item.id}</small>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BlogUpload;





// import React, { useState } from "react";
// import Section from "../../components/Section";
// // import axios from "axios";
// import { usePost } from "../../contextApi/PostContext";

// const BlogUpload = () => {
//   const { addPost, setLoading, loading, setError, error, clearError, posts } = usePost();
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     image: null,
//   });
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       image: e.target.files[0],
//     }));
//   };

//   const postSubmitHandler = async (e) => {
//     e.preventDefault();
//     clearError();
//     setSuccess("");

//     if (!formData.title || !formData.content || !formData.image) {
//       setError("Please fill all fields including image");
//       return;
//     }

//     try {
//       setLoading(true);
      
//       const uploadFormData = new FormData();
//       uploadFormData.append("title", formData.title);
//       uploadFormData.append("content", formData.content);
//       uploadFormData.append("image", formData.image);

//     //   const response = await axios.post(
//     //     "http://localhost:8000/api/blogupload",
//     //     uploadFormData,
//     //     {
//     //       headers: {
//     //         "Content-Type": "multipart/form-data",
//     //       },
//     //     }
//     //   );

//     //   addPost(response.data.post);
      
//       setSuccess("Post uploaded successfully!");
//     //   console.log("Response:", response.data);
      
//       setFormData({
//         title: "",
//         content: "",
//         image: null,
//       });
//       console.log("Form Data",formData)
//       console.log("Posts",posts)
//     } catch (error) {
//       setError(error.response?.data?.message || "Error uploading post");
//       console.log("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Section title={"Blog Post Page"} />
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-8">
//             {error && <div className="alert alert-danger">{error}</div>}
//             {success && <div className="alert alert-success">{success}</div>}
            
//             <form onSubmit={postSubmitHandler}>
//               <div className="input mb-3 mt-3">
//                 <input
//                   type="text"
//                   name="title"
//                   placeholder="Title..."
//                   className="rounded-md border border-primary p-2 col-lg-10"
//                   value={formData.title}
//                   onChange={handleChange}
//                   disabled={loading}
//                 />
//               </div>
//               <div className="input mb-3">
//                 <textarea
//                   name="content"
//                   placeholder="Content..."
//                   className="border border-primary rounded-md p-2 col-lg-10"
//                   rows="5"
//                   value={formData.content}
//                   onChange={handleChange}
//                   disabled={loading}
//                 />
//               </div>
//               <div className="input mb-3">
//                 <input
//                   type="file"
//                   name="image"
//                   className="border col-lg-10 rounded-md py-2 border-primary"
//                   onChange={handleImageChange}
//                   accept="image/*"
//                   disabled={loading}
//                 />
//               </div>
//               <div>
//                 <button
//                   type="submit"
//                   className="btn btn-primary px-5 col-lg-10 rounded-md text-2xl"
//                   disabled={loading}
//                 >
//                   {loading ? "Uploading..." : "Submit Post"}
//                 </button>
//               </div>
//             </form>
//           </div>
//           <div className="col lg-4">
//             {posts.map((item)=>{
//                 return <div>{item}</div>
//             })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BlogUpload;