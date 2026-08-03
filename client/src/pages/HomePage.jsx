import React from "react";
// import { Link } from "react-router-dom";
import GalleryPage from "./GalleryPage";
import TeamPage from "./TeamPage";
import Newsletter from "./Newsletter";
import Latestnews from "./Latestnews";
import Search from "./Search";
import Property from "../components/Property";
import Home from "../components/Home";
import HomeServiceCard from "../components/HomeServiceCard";
import YoutubeVideo from "../components/YoutubeVideo";
// import TeamMember from "./TeamMember";
// import About from "../components/About";
// import WhyChooseUs from "../components/WhyChooseUs";
// import ContactUs from "../components/ContactUs";

const HomePage = () => {
  return (
    <>
      <Home />
      {/* <p className="text-center bg-red-500 text-light font-semibold animate">
       <span className=""> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, molestiae.</span> 
        </p> */}
      {/* <Search /> */}
      <Latestnews />

      {/* <About /> */}
      {/* <WhyChooseUs /> */}
      {/* <ContactUs /> */}
      <HomeServiceCard />
      <Property />
      {/* <GalleryPage /> */}
      <YoutubeVideo />
      <TeamPage />
      <Newsletter />
      {/* <TeamMember /> */}
      {/* <Latestnews /> */}
    </>
  );
};

export default HomePage;
