import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import BlogpostPage from "./pages/BlogpostPage";
import NotfoundPage from "./pages/NotfoundPage";
import AgentprofilePage from "./pages/AgentprofilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import PropertyPage from "./pages/PropertyPage";
import FaqPage from "./pages/FaqPage";
import BlogUpload from "./pages/Admin/BlogUpload";
import NotAuthorizedPage from "./pages/NotAuthorizedPage";
import { PostProvider } from "./contextApi/PostContext";
import { AuthProvider } from "./contextApi/AuthContext";
import RequireAdmin from "./components/RequireAdmin";

const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blogpost" element={<BlogpostPage />} />
          <Route path="/property" element={<PropertyPage />} />
          <Route path="/property-details" element={<PropertyDetailPage />} />
          <Route path="agent-profile" element={<AgentprofilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <BlogUpload />
              </RequireAdmin>
            }
          />
          <Route path="/not-authorized" element={<NotAuthorizedPage />} />
          <Route path="/*" element={<NotfoundPage />} />
        </Routes>
        <Footer />
      </PostProvider>
    </AuthProvider>
  );
};

export default App;