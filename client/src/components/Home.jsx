import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";

const BackgroundCarousel = () => {
  const images = [
    "/assets/img/bg/NCR02.jpg",
    "/assets/img/bg/NCR05.jpg",
    "/assets/img/bg/NCR03.jpg",
    "/assets/img/bg/NCR04.jpg",
  ];


  const slides = [...images, images[0]];
  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handleTransitionEnd = () => {
    if (index === images.length) {
      setTransition(false);
      setIndex(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransition(true);
        });
      });
    }
  };

  const prev = () => {
    if (index === 0) {
      setTransition(false);
      setIndex(images.length);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransition(true);
          setIndex(images.length - 1);
        });
      });
    } else {
      setIndex((prev) => prev - 1);
    }
  };
   const next = () => {setIndex((prev) => prev + 1);};

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div
          onTransitionEnd={handleTransitionEnd}
          className="flex h-full"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${index * (100 / slides.length)}%)`,
            transition: transition ? "transform 700ms ease-in-out" : "none",
          }}
        >
          {slides.map((src, i) => (
            <div
              key={i}
              className="h-full bg-center bg-cover flex-shrink-0"
              style={{
                width: `${100 / slides.length}%`,
                backgroundImage: `url(${src})`,
              }}
            />
          ))}
        </div>
      </div>

      <button
        onClick={prev}
        aria-label="Previous background"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Next background"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Optional: Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [homeNews, setHomeNews] = useState([]);
  const getNews = async () => {
    try {
      const response = await axiosInstance.get("/news/allnews");

      if (response.data.success) {
        setHomeNews(response.data.data);
      } else {
        setError(response.data.message || "Failed to fetch news");
      }
    } catch (error) {
      console.error("News Error:", error);

      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("No Response:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  useEffect(() => {
    getNews();
  }, []);
  return (
    <>
      <section
        id="home"
        className="home_bg relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <BackgroundCarousel />

        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-16">
          <div className="max-w-5xl mx-auto text-center">
            <div className="hero-text">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                Find the Perfect Office Space. Build the Right Business
                Connections
              </h2>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white/90 mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
                NCR Space Connect is a modern commercial real estate platform
                that connects businesses, property owners, brokers, investors,
                startups and professionals across Delhi-NCR
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                <Link
                  to="/about"
                  className="text-light font-semibold text-xl bg-primary px-5 py-3  rounded-lg bounceIn wow hover:shadow-2xl hover:scale-105"
                  data-wow-delay=".6s"
                >
                  About Us
                </Link>
                <Link
                  to="/property"
                  className="px-5 sm:px-8 py-3 sm:py-4 text-base sm:text-lg md:text-xl font-semibold text-light bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl wow bounceIn"
                  data-wow-delay=".8s"
                >
                  Our Listings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <marquee
        behavior="scroll"
        direction="left"
        className="bg-gray-500 text-yellow-400 py-2 px-4 text-lg font-semibold mt-2"
      >
        {homeNews.slice(0, 3).map((newsItem) => (
          <span key={newsItem.id} className="mr-10">
            🔴 ~ {newsItem.title}
          </span>
        ))}
      </marquee>
    </>
  );
};

export default Home;
