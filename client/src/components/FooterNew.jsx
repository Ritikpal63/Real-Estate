import React from "react";
import { Link } from "react-router-dom";

const FooterNew = () => {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h4>
                <i className="fas fa-building" style={{ color: "#60a5fa" }}></i>{" "}
                NCR Space Connect
              </h4>
              <p style={{ marginTop: "6px" }}>
                Your Daily Real Estate Update Partner.
              </p>
              <p style={{ marginTop: "12px", fontSize: "0.9rem" }}>
                <i className="fas fa-map-marker-alt"></i> Delhi-NCR, India
              </p>
            </div>
            <div>
              <h4>Quick Links</h4>
              <Link to="/index">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/services">Services</Link>
              <Link to="office-/space">Office Space</Link>
              <Link to="/jobs">Jobs</Link>
              <Link to="/news">News</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div>
              <h4>Our Services</h4>
              <Link to="/services">Office Space Solutions</Link>
              <Link to="office-/space">Property Listings</Link>
              <Link to="/jobs">Real Estate Jobs</Link>
              <Link to="/news">Property News</Link>
              <Link to="/services">Owner & Tenant Support</Link>
              <Link to="/services">Business Networking</Link>
            </div>
            <div>
              <h4>Connect</h4>
              <Link to="#">
                <i className="fab fa-linkedin"></i> LinkedIn
              </Link>
              <Link to="#">
                <i className="fab fa-twitter"></i> Twitter
              </Link>
              <Link to="#">
                <i className="fab fa-youtube"></i> YouTube
              </Link>
              <Link to="#">
                <i className="fas fa-envelope"></i> info@ncrspaceconnect.in
              </Link>
            </div>
          </div>
          <div className="copy">
            <p>
              &copy; 2025 NCR Space Connect. All rights reserved. Built with{" "}
              <i className="fas fa-heart" style={{color:"#ef4444"}}></i> for the
              NCR community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterNew;
