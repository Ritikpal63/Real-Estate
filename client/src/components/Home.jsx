import React, { useState } from "react";
import { Link } from "react-router-dom";

const BackgroundCarousel = () => {
  const images = [
    "/assets/img/bg/NCR02.jpg",
    "/assets/img/bg/NCR05.jpg",
    "/assets/img/bg/NCR03.jpg",
    "/assets/img/bg/NCR04.jpg"
  ];
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
  {images.map((src, i) => (
    <div
      key={i}
      className={`absolute inset-0 bg-center bg-cover transition-opacity duration-700 ease-in-out ${
        i === index ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundImage: `url(${src})` }}
      aria-hidden={i !== index}
    />
  ))}

  <button
    onClick={prev}
    aria-label="Previous background"
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </button>

  <button
    onClick={next}
    aria-label="Next background"
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </button>

  {/* Optional: Dots indicator */}
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
    {images.map((_, i) => (
      <button
        key={i}
        onClick={() => setIndex(i)}
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          i === index 
            ? "bg-white w-6" 
            : "bg-white/40 hover:bg-white/60"
        }`}
        aria-label={`Go to slide ${i + 1}`}
      />
    ))}
  </div>
</div>
  );
};

const Home = () => {
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
          Find the Perfect Office Space. Build the Right Business Connections
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white/90 mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
          NCR Space Connect is a modern commercial real estate platform
          that connects businesses, property owners, brokers,
          investors, startups and professionals across Delhi-NCR
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <Link
            to="/about"
            className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg md:text-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl wow bounceIn"
            data-wow-delay=".6s"
          >
            About Us
          </Link>
          <Link
            to="/gallery"
            className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg md:text-xl font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl wow bounceIn"
            data-wow-delay=".8s"
          >
            Our Listings
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
};

export default Home;