import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Sun, Moon } from "lucide-react";
// import { ThemeContext } from "../contextApi/ThemeContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const { theme, toggleTheme } = useContext(ThemeContext);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[#374256] text-white shadow-lg border-b border-white/10 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 navbar">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <img
                src="/assets/img/NCRLOGOGolden01.png"
                alt="NCR Space Connect"
                className="w-auto logo"
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

            <Link
              to="/property"
              className="text-white hover:text-green-400 transition-colors duration-300 text-sm font-medium"
            >
              Properties
            </Link>
            <Link
              to="/gallery"
              className="text-white hover:text-green-400 transition-colors duration-300 text-sm font-medium"
            >
              Gallery
            </Link>
            <Link
              to="/allservice"
              className="text-white hover:text-green-400 transition-colors duration-300 text-sm font-medium"
            >
              Services
            </Link>            
            <Link
              to="/blog"
              className="text-white hover:text-green-400 transition-colors duration-300 text-sm font-medium"
            >
              Blogs
            </Link>
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
        <div className="lg:hidden bg-[#2a3344] px-4 pt-2 border-t border-white/10">
          <div className="space-y-2 flex flex-col">
            <Link
              to="/"
              className="text-white hover:text-green-400 transition-colors duration-300 text-sm font-medium"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-green-400 transition-colors duration-300 text-sm font-medium"
              onClick={closeMenu}
            >
              About
            </Link>

            <Link
              to="/property"
              className="text-white hover:text-green-400 transition-colors duration-300 text-sm font-medium"
              onClick={closeMenu}
            >
              Properties
            </Link>
            <Link
              to="/gallery"
              className="text-white hover:text-green-400 transition-colors duration-300 text-sm font-medium"
              onClick={closeMenu}
            >
              Gallery
            </Link>
            <Link
              to="/allservice"
              className="text-white hover:text-green-400 transition-colors duration-300 text-sm font-medium"
              onClick={closeMenu}
            >
              Services
            </Link>            
            <Link
              to="/blog"
              className="text-white hover:text-green-400 transition-colors duration-300 text-sm font-medium"
              onClick={closeMenu}
            >
              Blogs
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-green-400 transition-colors duration-300 text-sm font-medium"
              onClick={closeMenu}
            >
              Contact
            </Link>
            <Link
              to="/admin"
              className="text-white hover:text-green-400 transition-colors duration-300 text-sm font-medium"
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
