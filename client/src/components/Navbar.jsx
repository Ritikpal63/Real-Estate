import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const handlePostProperty = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/admin");
    } else {
      sessionStorage.setItem(
        "redirectAfterLogin",
        "/admin"
      );

      navigate("/admin");
    }

    closeMenu();
  };

  const navLinks = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "About Us",
    path: "/about"
  },
  {
    name: "Services",
    path: "/allservice"
  },
  {
    name: "Office Space",
    path: "/property"
  },
  {
    name: "Jobs",
    path: "/jobs"
  },
  {
    name: "News",
    path: "/news/allnews"
  },
  {
    name: "Partners",
    path: "/partners"
  },
  {
    name: "Contact Us",
    path: "/contact"
  }];


  const getNavClass = ({ isActive }) => {
    return `relative flex h-full items-center whitespace-nowrap px-1 text-[13px] font-semibold transition-all duration-300 ${
    isActive ?
    "text-[#078cff]" :
    "text-white hover:text-[#078cff]"}`;

  };

  return (
    <nav className="relative z-50 w-full bg-[#020d25] text-white shadow-sm">
      <div className="mx-auto w-[90vw]">
        <div className="flex h-[74px] items-center justify-between">

          <div className="flex shrink-0 items-center">
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center">

              {



              }
            </Link>
          </div>

          <div className="hidden h-full flex-1 items-center justify-center lg:flex">
            <div className="flex h-full items-center gap-7">
              {navLinks.map((item) =>
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={getNavClass}>

                  {({ isActive }) =>
                <>
                      <span>{item.name}</span>

                      {isActive &&
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#078cff]" />
                  }
                    </>
                }
                </NavLink>
              )}
            </div>
          </div>

          <div className="hidden shrink-0 items-center lg:flex">
            <button
              type="button"
              onClick={handlePostProperty}
              className="text-[13px] font-bold text-[#078cff] transition-all duration-300 hover:text-white">

              Post Property
            </button>
          </div>

          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() =>
              setMobileMenuOpen((prev) => !prev)
              }
              className="flex h-10 w-10 items-center justify-center rounded-md text-white transition hover:bg-white/10 hover:text-[#078cff]"
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}>

              {mobileMenuOpen ?
              <X size={25} /> :

              <Menu size={25} />
              }
            </button>
          </div>

        </div>
      </div>

      {mobileMenuOpen &&
      <div className="absolute left-0 top-full w-full border-t border-white/10 bg-[#020d25] shadow-xl lg:hidden">
          <div className="mx-auto w-[90vw] py-4">
            <div className="flex flex-col">

              {navLinks.map((item) =>
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              onClick={closeMenu}
              className={({ isActive }) =>
              `border-b border-white/5 px-2 py-3 text-[14px] font-medium transition ${
              isActive ?
              "text-[#078cff]" :
              "text-slate-200 hover:bg-white/5 hover:text-[#078cff]"}`

              }>

                  {item.name}
                </NavLink>
            )}

              <button
              type="button"
              onClick={handlePostProperty}
              className="mt-4 flex h-[44px] items-center justify-center rounded-md bg-[#078cff] px-5 text-[13px] font-bold text-white transition hover:bg-[#0074df]">

                Post Property
              </button>

            </div>
          </div>
        </div>
      }
    </nav>);

};

export default Navbar;
