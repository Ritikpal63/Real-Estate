import React from "react";
// import { Link } from "react-router-dom";
import Portfolio from "../components/Gallery";
import TeamPage from "./TeamPage";
import Newsletter from "./Newsletter";
import Latestnews from "./Latestnews";
import Search from "./Search";
import Property from "../components/Property";
import Home from "../components/Home";
// import Services from "../components/Services";
// import About from "../components/About";
// import WhyChooseUs from "../components/WhyChooseUs";
// import ContactUs from "../components/ContactUs";

const HomePage = () => {
  return (
    <>
      <Home />
      <Search />
      {/* <About /> */}
      {/* <Services /> */}
      {/* <WhyChooseUs /> */}
      {/* <ContactUs /> */}
      <Property />
      <Portfolio />
      <TeamPage />
      <Newsletter />
      <Latestnews />
    </>
  );
};

export default HomePage;
