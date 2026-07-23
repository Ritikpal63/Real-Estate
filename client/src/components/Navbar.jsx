import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[#374256] text-white shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <img
                src="/assets/img/NCRLOGOGolden01.png"
                alt="NCR Space Connect"
                className="w-auto logo"
                style={{height:"90px"}}
                
              />
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/"
              className="text-white hover:text-green-400 transition-colors duration-300 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-green-400 transition-colors duration-300 text-sm font-medium"
            >
              About
            </Link>

            <div className="relative group inline-block">
              <button className="text-white hover:text-green-400 transition-colors duration-300 text-sm font-medium focus:outline-none flex items-center gap-1">
                Property
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute left-0 w-48 bg-white text-gray-800 rounded-lg shadow-xl py-2 z-50 hidden group-hover:block">
                <Link
                  to="/property"
                  className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  Properties
                </Link>
                <Link
                  to="/property-details"
                  className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  Property Detail
                </Link>
              </div>
            </div>

            <Link
              to="/gallery"
              className="text-white hover:text-green-400 transition-colors duration-300 text-sm font-medium"
            >
              Gallery
            </Link>

            <div className="relative group inline-block">
              <button className="text-white hover:text-green-400 transition-colors duration-300 text-sm font-medium focus:outline-none flex items-center gap-1">
                Pages
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute left-0 w-48 bg-white text-gray-800 rounded-lg shadow-xl py-2 z-50 hidden group-hover:block">
                <Link
                  to="/agent-profile"
                  className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  Agent Profile
                </Link>
                {/* <Link
                  to="/register"
                  className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  Register
                </Link> */}
                <Link
                  to="/faq"
                  className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  FAQs
                </Link>
                <Link
                  to="/notfound"
                  className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  404 Page
                </Link>
              </div>
            </div>

            {/* Blog Dropdown - Hover */}
            <div className="relative group inline-block">
              <button className="text-white hover:text-green-400 transition-colors duration-300 text-sm font-medium focus:outline-none flex items-center gap-1">
                Blog
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute left-0 w-48 bg-white text-gray-800 rounded-lg shadow-xl py-2 z-50 hidden group-hover:block">
                <Link
                  to="/blog"
                  className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  Blog Main
                </Link>
                <Link
                  to="/blogpost"
                  className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  Blog Post
                </Link>
              </div>
            </div>

            <Link
              to="/contact"
              className="text-white hover:text-green-400 transition-colors duration-300 text-sm font-medium"
            >
              Contact
            </Link>
            <Link
              to="/admin"
              className="text-white hover:text-green-400 transition-colors duration-300 text-sm font-medium"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-green-400 transition-colors focus:outline-none p-2"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#2a3344] px-4 pt-2 pb-4 border-t border-white/10">
          <div className="space-y-2">
            <Link
              to="/"
              className="block py-2 text-white hover:text-green-400 transition-colors"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block py-2 text-white hover:text-green-400 transition-colors"
              onClick={closeMenu}
            >
              About
            </Link>

            {/* Mobile Property */}
            <div className="pt-2">
              <details className="group">
                <summary className="flex items-center justify-between w-full py-2 text-white hover:text-green-400 transition-colors cursor-pointer list-none">
                  <span>Property</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="pl-4 space-y-1 mt-1">
                  <Link
                    to="/property"
                    className="block py-1 text-gray-300 hover:text-green-400 transition-colors"
                    onClick={closeMenu}
                  >
                    Properties
                  </Link>
                  <Link
                    to="/property-details"
                    className="block py-1 text-gray-300 hover:text-green-400 transition-colors"
                    onClick={closeMenu}
                  >
                    Property Detail
                  </Link>
                </div>
              </details>
            </div>

            <Link
              to="/gallery"
              className="block py-2 text-white hover:text-green-400 transition-colors"
              onClick={closeMenu}
            >
              Gallery
            </Link>

            {/* Mobile Pages */}
            <div className="pt-2">
              <details className="group">
                <summary className="flex items-center justify-between w-full py-2 text-white hover:text-green-400 transition-colors cursor-pointer list-none">
                  <span>Pages</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="pl-4 space-y-1 mt-1">
                  <Link
                    to="/agent-profile"
                    className="block py-1 text-gray-300 hover:text-green-400 transition-colors"
                    onClick={closeMenu}
                  >
                    Agent Profile
                  </Link>
                  <Link
                    to="/register"
                    className="block py-1 text-gray-300 hover:text-green-400 transition-colors"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                  <Link
                    to="/faq"
                    className="block py-1 text-gray-300 hover:text-green-400 transition-colors"
                    onClick={closeMenu}
                  >
                    FAQs
                  </Link>
                  <Link
                    to="/notfound"
                    className="block py-1 text-gray-300 hover:text-green-400 transition-colors"
                    onClick={closeMenu}
                  >
                    404 Page
                  </Link>
                </div>
              </details>
            </div>

            {/* Mobile Blog */}
            <div className="pt-2">
              <details className="group">
                <summary className="flex items-center justify-between w-full py-2 text-white hover:text-green-400 transition-colors cursor-pointer list-none">
                  <span>Blog</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="pl-4 space-y-1 mt-1">
                  <Link
                    to="/blog"
                    className="block py-1 text-gray-300 hover:text-green-400 transition-colors"
                    onClick={closeMenu}
                  >
                    Blog Main
                  </Link>
                  <Link
                    to="/blogpost"
                    className="block py-1 text-gray-300 hover:text-green-400 transition-colors"
                    onClick={closeMenu}
                  >
                    Blog Post
                  </Link>
                </div>
              </details>
            </div>

            <Link
              to="/contact"
              className="block py-2 text-white hover:text-green-400 transition-colors"
              onClick={closeMenu}
            >
              Contact
            </Link>
            <Link
              to="/admin"
              className="block py-2 text-white hover:text-green-400 transition-colors"
              onClick={closeMenu}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
