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
import ViewTeamMember from "./pages/ViewTeamMember";
import AdminViewProperty from "./pages/Admin/Property/AdminViewProperty";
import EditProperty from "./pages/Admin/Property/EditProperty";
import AddTeam from "./pages/Admin/Team/AddTeam";
import EditTeam from "./pages/Admin/Team/EditTeam";
import AddGallery from "./pages/Admin/Gallery/AddGallery";
import AdminViewGallery from "./pages/Admin/Gallery/AdminViewGallery";
import ServiceList from "./pages/Admin/Services/ServiceList";
import AddService from "./pages/Admin/Services/AddService";
import EditService from "./pages/Admin/Services/EditService";
import AllServices from "./pages/AllServices";
import AdminBlog from "./pages/Admin/Blog/AdminBlog";
import BlogDetails from "./pages/Admin/Blog/BlogDetails";
import AllProperty from "./components/AllProperty";
import EditGallery from "./pages/Admin/Gallery/EditGallery";


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
          {}
          <Route path="/property" element={<AllProperty />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
          <Route path="agent-profile" element={<AgentprofilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/news/allnews" element={<AllNews />} />
          <Route path="/allservice" element={<AllServices />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route
            path="/admin"
            element={
            <RequireAdmin>
                <Outlet />
              </RequireAdmin>
            }>

            <Route path="allteam" element={<ViewTeamMember />} />
            <Route index element={<AdminHome />} />
            <Route path="addblog" element={<BlogUpload />} />
            <Route path="viewblogs" element={<AdminBlog />} />
            <Route path="addproperty" element={<AddPropertyPage />} />
            <Route path="property/:id" element={<AddPropertyPage />} />
            <Route path="property/:id/edit" element={<EditProperty />} />
            <Route path="addnews" element={<AdminNews />} />
            <Route path="viewproperty" element={<AdminViewProperty />} />
            <Route path="addteam" element={<AddTeam />} />
            <Route path="team/:id/edit" element={<EditTeam />} />
            <Route path="addgallery" element={<AddGallery />} />
            <Route path="gallery/:id/edit" element={<EditGallery />} />
            <Route path="viewgallery" element={<AdminViewGallery />} />
            <Route path="services" element={<ServiceList />} />
            <Route path="addservices" element={<AddService />} />
            <Route path="editservices/:id" element={<EditService />} />
          </Route>
          <Route path="/not-authorized" element={<NotAuthorizedPage />} />
          <Route path="/*" element={<NotfoundPage />} />
        </Routes>
        <Footer />
      </PostProvider>
    </AuthProvider>);


};

export default App;
