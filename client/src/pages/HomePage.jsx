import React from "react";
import TeamPage from "./TeamPage";
import Newsletter from "./Newsletter";
import Latestnews from "./Latestnews";
import Property from "../components/Property";
import Home from "../components/Home";
import HomeServiceCard from "../components/HomeServiceCard";
import YoutubeVideo from "../components/YoutubeVideo";


const HomePage = () => {
  return (
    <>
      <Home />
      <Latestnews />
      <HomeServiceCard />
      <Property />
      <YoutubeVideo />
      <TeamPage />
      <Newsletter />
    </>
  );
};

export default HomePage;
