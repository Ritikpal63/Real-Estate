import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section
        id="home"
        className="home_bg"
        style={{
          backgroundImage: "url(assets/img/bg/home-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "870px",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 col-sm-12 col-xs-12 text-center">
              <div className="hero-text">
                <h2>Find the Perfect Office Space. Build the Right Business Connections</h2>
                <p className="fw-bold fs-1 font-bold">
                  NCR Space Connect is a modern commercial real estate platform that connects buusinesses, property owners, brokers, investors, startyps and professionals across Delhi-NCR
                </p>
                <div className="home_btn">
                  <Link
                    to="/about"
                    className="px-5 py-3 text-4xl app-btn wow bounceIn page-scroll home_btn_color_one"
                    data-wow-delay=".6s"
                  >
                    About us
                  </Link>
                  <Link
                    to="/gallery"
                    className="px-5 py-3 text-5xl app-btn wow bounceIn page-scroll home_btn_color_two"
                    data-wow-delay=".8s"
                  >
                    our Listing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
