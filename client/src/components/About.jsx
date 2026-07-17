import React from 'react'
import Section from './Section'
import Team from './Team'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <>
	{/* <section className="about">
  <div className="container">
    <h2 className="section-title">About Us</h2>
    <p className="section-sub">NCR Space Connect is dedicated to simplifying commercial real estate by bringing together office space listings, real estate professionals, business owners, developers, investors, and tenants on one trusted platform.</p>
    <div className="about-grid">
      <div className="about-card">
        <h3><i className="fas fa-eye" style={{color:"#2563eb", marginRight:"10px"}}></i>Our Vision</h3>
        <p>To become the most trusted commercial real estate platform in Delhi-NCR, empowering businesses with verified information, quality workspaces, and valuable business connections.</p>
      </div>
      <div className="about-card">
        <h3><i className="fas fa-bullseye" style={{color:"#2563eb", marginRight:"10px"}}></i>Our Mission</h3>
        <ul>
          <li><i className="fas fa-check-circle"></i> Connect businesses with suitable office spaces.</li>
          <li><i className="fas fa-check-circle"></i> Support commercial property owners.</li>
          <li><i className="fas fa-check-circle"></i> Promote real estate employment.</li>
          <li><i className="fas fa-check-circle"></i> Deliver reliable property news and insights.</li>
          <li><i className="fas fa-check-circle"></i> Build a strong professional real estate community.</li>
        </ul>
      </div>
    </div>
  </div>
</section> */}
    {/* About Us Section */}
<section id="about" className="about-us section-padding py-16 md:py-20 lg:py-24 bg-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Title */}
    <div className="section-title text-center wow zoomIn mb-12 md:mb-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">About Us</h2>
      <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
    </div>

    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
      {/* Left Content */}
      <div className="w-full lg:w-1/2">
        <div className="about-us-content">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            About Our Agency
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi perferendis magnam ea
            necessitatibus, officiis voluptas odit! Aperiam omnis, cupiditate laudantium velit nostrum,
            exercitationem accusamus, possimus soluta illo. Lorem ipsum dolor sit. Cupiditate laudantium
            velit nostrum.
          </p>
          
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <i className="fa fa-check text-green-500 mt-1"></i>
              <span className="text-gray-700">Excepturi perferendis magnam ea necessitatibus</span>
            </li>
            <li className="flex items-start gap-3">
              <i className="fa fa-check text-green-500 mt-1"></i>
              <span className="text-gray-700">Aperiam omnis, cupiditate laudantium</span>
            </li>
            <li className="flex items-start gap-3">
              <i className="fa fa-check text-green-500 mt-1"></i>
              <span className="text-gray-700">Exercitationem accusamus, possimus soluta.</span>
            </li>
            <li className="flex items-start gap-3">
              <i className="fa fa-check text-green-500 mt-1"></i>
              <span className="text-gray-700">Lorem ipsum dolor sit amet ea necessitatibus</span>
            </li>
          </ul>

          <Link 
            to="/about" 
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Read More
          </Link>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-1/2">
        <div className="about_img rounded-lg overflow-hidden shadow-xl">
          <img 
            src="/assets/img/2.jpg" 
            className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500" 
            alt="About Our Agency" 
          />
        </div>
      </div>
    </div>
  </div>
</section>

{/* Video Tour Section */}
<section 
  data-stellar-background-ratio="0.3" 
  className="about_video py-20 md:py-28 lg:py-32 relative overflow-hidden"
  style={{
    backgroundImage: "url(/assets/img/bg/video-bg.jpg)", 
    backgroundSize: "cover", 
    backgroundPosition: "center",
    backgroundAttachment: "fixed"
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60 z-10"></div>
  
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
    <div className="text-center">
      <div className="our_video">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 drop-shadow-lg">
          Take a Video Tour
        </h1>
        <Link 
          className="video-play inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-2xl border-2 border-white/50"
          href="https://vimeo.com/414300920"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-play text-2xl md:text-3xl ml-1"></i>
        </Link>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default About