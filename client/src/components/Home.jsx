import React, { useState } from "react";
import { Link } from "react-router-dom";

const BackgroundCarousel = () => {
  const images = [
    "/assets/img/bg/slide1.jpg",
    "/assets/img/bg/slide2.jpg",
    "/assets/img/bg/slide3.jpg",
  ];
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {images.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-center bg-cover transition-opacity duration-500 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}

      <button
        onClick={prev}
        aria-label="Previous background"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 text-white p-3 rounded text-lg"
      >
        ‹
      </button>

      <button
        onClick={next}
        aria-label="Next background"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 text-white p-3 rounded"
      >
        ›
      </button>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <section id="home" className="home_bg relative" style={{ minHeight: '60vh' }}>
        <BackgroundCarousel />

        <div className="container relative" style={{ zIndex: 2 }}>
          <div className="row">
            <div className="col-lg-10 offset-lg-1 col-sm-12 col-xs-12 text-center">
              <div className="hero-text">
                <h2>
                  Find the Perfect Office Space. Build the Right Business
                  Connections
                </h2>
                <p className="fw-bold fs-1 font-bold">
                  NCR Space Connect is a modern commercial real estate platform
                  that connects buusinesses, property owners, brokers,
                  investors, startyps and professionals across Delhi-NCR
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
