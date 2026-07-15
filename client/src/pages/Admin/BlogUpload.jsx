import React, { useState } from "react";
import Section from "../../components/Section";
import UploadBlogPage from "./Property/UploadBlogPage";
import AdminAsideSection from "./AdminAsideSection";

const BlogUpload = () => {


  return (
    <>
      <Section title={"Admin Blog Upload"} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-12">
            <AdminAsideSection />
          </div>
          <div className="col-lg-8 col-md-12">
            <UploadBlogPage />
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
