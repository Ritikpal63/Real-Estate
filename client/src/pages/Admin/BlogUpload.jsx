import React, { useState } from "react";
import Section from "../../components/Section";
import UploadBlogPage from "./Property/UploadBlogPage";
import AdminAsideSection from "./AdminAsideSection";

const BlogUpload = () => {
  return (
    <>
      <Section title={"Add Blog"} />
      <div className="flex flex-col lg:flex-row">
        <AdminAsideSection />
        <div className="flex-1 w-full min-w-0 bg-gray-50">
          <UploadBlogPage />
        </div>
      </div>
    </>
  );
};

export default BlogUpload;
