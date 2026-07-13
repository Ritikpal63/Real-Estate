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
    <section id="about" className="about-us section-padding">
		<div className="container">
			<div className="section-title text-center wow zoomIn">
				<h2>About us</h2>
				<div></div>
			</div>
			<div className="row">
				<div className="col-lg-6 col-sm-12 col-xs-12">
					<div className="about-us-content">
						<h2>About Our Agency</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi perferendis magnam ea
							necessitatibus, officiis voluptas odit! Aperiam omnis, cupiditate laudantium velit nostrum,
							exercitationem accusamus, possimus soluta illo.Lorem ipsum dolor sit. Cupiditate laudantium
							velit nostrum.</p>
						<ul>
							<li><i className="fa fa-check"></i>Excepturi perferendis magnam ea necessitatibus</li>
							<li><i className="fa fa-check"></i>Aperiam omnis, cupiditate laudantium</li>
							<li><i className="fa fa-check"></i>Exercitationem accusamus, possimus soluta.</li>
							<li><i className="fa fa-check"></i>Lorem ipsum dolor sit amet ea necessitatibus</li>
						</ul>
						<Link href="#">Read More</Link>
					</div>
				</div>
				<div className="col-lg-6 col-sm-12 col-xs-12">
					<div className="about_img">
						<img src="/assets/img/2.jpg" className="img-fluid" alt="" />
					</div>
				</div>
			</div>
		</div>
	</section>
	

	
	<section data-stellar-background-ratio="0.3" className="about_video"
		style={{backgroundImage: "url(/assets/img/bg/video-bg.jpg)", backgroundSize:"cover", backgroundPosition: "center"}}>
		<div className="container">
			<div className="row">
				<div className="col-lg-12 col-sm-12 col-xs-12 text-center">
					<div className="our_video">
						<h1>Take a video tour</h1>
						<Link className="video-play" href="https://vimeo.com/414300920"><i className="fa fa-play"></i></Link>
					</div>
				</div>
			</div>
		</div>
	</section>
    </>
  )
}

export default About