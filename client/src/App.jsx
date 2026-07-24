import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route, Outlet } from "react-router-dom";
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
import AdminHome from "./pages/Admin/AdminHome";
import AddPropertyPage from "./pages/Admin/AddPropertyPage";
import AdminNews from "./pages/Admin/News/AdminNews";
import ContactPopup from "./components/ContactPopup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewsDetailPage from "./components/NewsDetailPage";
import AllNews from "./components/AllNews";
import TeamMember from "./pages/TeamMember";
import AdminViewProperty from "./pages/Admin/Property/AdminViewProperty";




const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <Navbar />
        <ToastContainer />
        <ContactPopup />
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
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/news/allnews" element={<AllNews />} />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <Outlet />
              </RequireAdmin>
            }
          >
            <Route path="allteam" element={<TeamMember />} />
            <Route index element={<AdminHome />} />
            <Route path="addblog" element={<BlogUpload />} />
            <Route path="addproperty" element={<AddPropertyPage />} /> 
            <Route path="addnews" element={<AdminNews />} />
            <Route path="viewproperty" element={<AdminViewProperty />} />
          </Route>
          <Route path="/not-authorized" element={<NotAuthorizedPage />} />
          <Route path="/*" element={<NotfoundPage />} />
        </Routes>
        <Footer />
      </PostProvider>
    </AuthProvider>
  );
};

export default App;
