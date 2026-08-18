import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";

const BackgroundCarousel = () => {
  const images = [
    "/assets/img/bg/NCR02.jpg",
    "/assets/img/bg/NCR05.jpg",
    "/assets/img/bg/NCR03.jpg",
    "/assets/img/bg/NCR04.jpg",
  ];

  // Duplicate first image for seamless infinite loop
  const slides = [...images, images[0]];

  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);

  /*
   * ============================
   * AUTO SLIDE
   * ============================
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  /*
   * ============================
   * INFINITE LOOP
   * ============================
   *
   * When we reach the duplicate
   * first image, instantly move
   * back to original first image.
   */
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

  /*
   * ============================
   * PREVIOUS
   * ============================
   */
  const handlePrev = () => {
    if (index === 0) {
      // Temporarily disable animation
      setTransition(false);

      // Move to duplicate last position
      setIndex(images.length);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransition(true);

          // Move to actual last image
          setIndex(images.length - 1);
        });
      });
    } else {
      setIndex((prev) => prev - 1);
    }
  };

  /*
   * ============================
   * NEXT
   * ============================
   */
  const handleNext = () => {
    setIndex((prev) => prev + 1);
  };

  /*
   * ============================
   * DOT CLICK
   * ============================
   */
  const handleDotClick = (slideIndex) => {
    setTransition(true);
    setIndex(slideIndex);
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Carousel */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          onTransitionEnd={handleTransitionEnd}
          className="flex h-full"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translate3d(-${index * (100 / slides.length)}%, 0, 0)`,
            transition: transition ? "transform 700ms ease-in-out" : "none",
            willChange: "transform",
          }}
        >
          {slides.map((src, i) => (
            <div
              key={i}
              className="
                h-full
                flex-shrink-0
                bg-center
                bg-cover
                bg-no-repeat
              "
              style={{
                width: `${100 / slides.length}%`,
                backgroundImage: `url("${src}")`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      {/* ============================
          PREVIOUS BUTTON
      ============================ */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous background"
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          z-20
          bg-black/30
          hover:bg-black/50
          backdrop-blur-sm
          text-white
          p-3
          rounded-full
          transition-all
          duration-300
          hover:scale-110
          focus:outline-none
          focus:ring-2
          focus:ring-white/50
        "
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

      {/* ============================
          NEXT BUTTON
      ============================ */}
      <button
        type="button"
        onClick={handleNext}
        aria-label="Next background"
        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          z-20
          bg-black/30
          hover:bg-black/50
          backdrop-blur-sm
          text-white
          p-3
          rounded-full
          transition-all
          duration-300
          hover:scale-110
          focus:outline-none
          focus:ring-2
          focus:ring-white/50
        "
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

      {/* ============================
          DOT INDICATORS
      ============================ */}
      <div
        className="
          absolute
          bottom-6
          left-1/2
          -translate-x-1/2
          z-20
          flex
          items-center
          gap-2
        "
      >
        {images.map((_, i) => {
          const activeIndex = index % images.length;

          return (
            <button
              key={i}
              type="button"
              onClick={() => handleDotClick(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`
                h-2
                rounded-full
                transition-all
                duration-300
                ${
                  i === activeIndex
                    ? "bg-white w-6"
                    : "bg-white/40 w-2 hover:bg-white/70"
                }
              `}
            />
          );
        })}
      </div>
    </div>
  );
};

/*
 * ==================================================
 * HOME COMPONENT
 * ==================================================
 */

const Home = () => {
  const [homeNews, setHomeNews] = useState([]);
  const [error, setError] = useState("");

  /*
   * ============================
   * GET NEWS
   * ============================
   */
  const getNews = async () => {
    try {
      const response = await axiosInstance.get("/news/allnews");

      if (response.data.success) {
        setHomeNews(response.data.data || []);
      } else {
        setError(response.data.message || "Failed to fetch news");
      }
    } catch (error) {
      console.error("News Error:", error);

      if (error.response) {
        console.error("Server Error:", error.response.data);

        setError(
          error.response.data?.message || "Server error while fetching news",
        );
      } else if (error.request) {
        console.error("No Response:", error.request);

        setError("Unable to connect to server");
      } else {
        console.error("Error:", error.message);

        setError(error.message);
      }
    }
  };

  /*
   * ============================
   * LOAD NEWS
   * ============================
   */
  useEffect(() => {
    getNews();
  }, []);

  return (
    <>
      {/* ==================================================
          HERO SECTION
      ================================================== */}

      <section
        id="home"
        className="
          relative
          banner
          flex
          items-center
          justify-center
          overflow-hidden
        "
      >
        {/* Background Carousel */}
        <BackgroundCarousel />

        {/* <div
          className="
            container
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            relative
            z-10
            py-12
            md:py-16
          "
        >
          <div className="max-w-5xl mx-auto text-center">
            <div className="hero-text">
              <h2
                className="
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  lg:text-6xl
                  font-bold
                  text-white
                  mb-6
                  leading-tight
                  drop-shadow-lg
                "
              >
                Find the Perfect Office Space. Build the Right Business
                Connections
              </h2>

              <p
                className="
                  text-base
                  sm:text-lg
                  md:text-xl
                  lg:text-2xl
                  font-semibold
                  text-white/90
                  mb-8
                  md:mb-10
                  max-w-4xl
                  mx-auto
                  leading-relaxed
                  drop-shadow-md
                "
              >
                NCR Space Connect is a modern commercial real estate platform
                that connects businesses, property owners, brokers, investors,
                startups and professionals across Delhi-NCR
              </p>

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  items-center
                  justify-center
                  gap-4
                  md:gap-6
                "
              >
                <Link
                  to="/about"
                  className="
                    font-semibold
                    text-xl
                    text-white
                    bg-primary
                    px-5
                    py-3
                    rounded-lg
                    transition-all
                    duration-300
                    hover:shadow-2xl
                    hover:scale-105
                  "
                >
                  About Us
                </Link>

                <Link
                  to="/property"
                  className="
                    px-5
                    sm:px-8
                    py-3
                    sm:py-4
                    text-base
                    sm:text-lg
                    md:text-xl
                    font-semibold
                    text-white
                    bg-gradient-to-r
                    from-green-600
                    to-green-700
                    hover:from-green-700
                    hover:to-green-800
                    rounded-lg
                    transition-all
                    duration-300
                    transform
                    hover:scale-105
                    shadow-lg
                    hover:shadow-2xl
                  "
                >
                  Our Listings
                </Link>
              </div>
            </div>
          </div>
        </div> */}
      </section>

      {/* ==================================================
          NEWS MARQUEE
      ================================================== */}

      {homeNews.length > 0 && (
        <div
          className="
            bg-gray-500
            text-yellow-400
            py-2
            px-4
            text-lg
            font-semibold
            mt-2
            overflow-hidden
          "
        >
          <marquee behavior="scroll" direction="left">
            {homeNews.slice(0, 3).map((newsItem) => (
              <span key={newsItem.id} className="mr-10">
                🔴 ~ {newsItem.title}
              </span>
            ))}
          </marquee>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="text-center text-red-500 text-sm py-2">{error}</div>
      )}
    </>
  );
};

export default Home;
