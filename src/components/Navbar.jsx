import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // for mobile menu icons

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 flex justify-between items-center h-20 transition-all ${
        isScrolled
          ? "bg-white shadow-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      {/* Left: Logo */}
      <div className="ml-4 md:ml-8 lg:ml-32 flex items-center space-x-2 ">
        <NavLink to="/">
          <img
            src="assets/logo1.png"
            alt="Logo"
            className="h-16 w-16 md:h-20 md:w-20 mt-4 "
          />
        </NavLink>
      </div>

      {/* Desktop Navigation */}
      <div
        className={`mr-4 md:mr-8 lg:mr-16 hidden md:flex items-center space-x-8 bg-white px-4 md:px-6 py-2 md:py-3 ${
          isScrolled ? "" : "shadow-sm rounded-full border border-gray-200 "
        }`}
      >
        <ul className="hidden md:flex space-x-4 lg:space-x-8 text-gray-600 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-colors text-sm lg:text-base ${
                  isActive
                    ? "text-green-600 font-semibold"
                    : "text-gray-600 hover:text-green-600"
                }`
              }
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `transition-colors text-sm lg:text-base ${
                  isActive
                    ? "text-green-600 font-semibold"
                    : "text-gray-600 hover:text-green-600"
                }`
              }
              onClick={closeMenu}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/programs"
              className={({ isActive }) =>
                `transition-colors text-sm lg:text-base ${
                  isActive
                    ? "text-green-600 font-semibold"
                    : "text-gray-600 hover:text-green-600"
                }`
              }
              onClick={closeMenu}
            >
              Programs ▾
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `transition-colors text-sm lg:text-base ${
                  isActive
                    ? "text-green-600 font-semibold"
                    : "text-gray-600 hover:text-green-600"
                }`
              }
              onClick={closeMenu}
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `transition-colors text-sm lg:text-base ${
                  isActive
                    ? "text-green-600 font-semibold"
                    : "text-gray-600 hover:text-green-600"
                }`
              }
              onClick={closeMenu}
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `transition-colors text-sm lg:text-base ${
                  isActive
                    ? "text-green-600 font-semibold"
                    : "text-gray-600 hover:text-green-600"
                }`
              }
              onClick={closeMenu}
            >
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `transition-colors text-sm lg:text-base ${
                  isActive
                    ? "text-green-600 font-semibold"
                    : "text-gray-600 hover:text-green-600"
                }`
              }
              onClick={closeMenu}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>

        {/* Logged in view */}
        <div className="hidden md:flex space-x-2 lg:space-x-3">
          <NavLink
            to="/profile"
            className=""
          >
            <img src="./assets/profileImage.png" className="w-10 h-10 rounded-full" alt="" />
          </NavLink>
        </div>

        {/* Logged out View */}
        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-2 lg:space-x-3">
          <NavLink
            to="/register"
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-md font-medium text-sm lg:text-base"
          >
            Register
          </NavLink>
          <NavLink
            to="/signin"
            className="border border-green-500 text-green-600 hover:bg-green-100 px-3 py-2 lg:px-4 lg:py-2 rounded-md font-medium text-sm lg:text-base"
          >
            Sign in
          </NavLink>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center mr-4">
        <button onClick={toggleMenu} className="text-gray-600">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-200 rounded-b-2xl shadow-md md:hidden z-50">
          <ul className="flex flex-col items-center space-y-4 py-4 text-gray-600 font-medium">
            <li>
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-base ${
                    isActive
                      ? "text-green-600 font-semibold"
                      : "text-gray-600 hover:text-green-600"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-base ${
                    isActive
                      ? "text-green-600 font-semibold"
                      : "text-gray-600 hover:text-green-600"
                  }`
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/programs"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-base ${
                    isActive
                      ? "text-green-600 font-semibold"
                      : "text-gray-600 hover:text-green-600"
                  }`
                }
              >
                Programs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-base ${
                    isActive
                      ? "text-green-600 font-semibold"
                      : "text-gray-600 hover:text-green-600"
                  }`
                }
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-base ${
                    isActive
                      ? "text-green-600 font-semibold"
                      : "text-gray-600 hover:text-green-600"
                  }`
                }
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-base ${
                    isActive
                      ? "text-green-600 font-semibold"
                      : "text-gray-600 hover:text-green-600"
                  }`
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>

          {/* Logged in View */}
          <div className="flex flex-col items-center space-y-2 pb-4">
            <NavLink
              to="/profile"
              onClick={closeMenu}
              className="px-6 py-2 rounded-md font-medium w-4/5 flex items-center justify-center gap-5"
            >
              <img src="./assets/profileImage.png" className="w-10 h-10 rounded-full" alt="" />
              <span className="text-sm font-medium">UserName</span>
            </NavLink>
          </div>

          {/* Logged out View */}
          <div className="flex flex-col items-center space-y-2 pb-4">
            <NavLink
              to="/register"
              onClick={closeMenu}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium w-4/5 text-center"
            >
              Register
            </NavLink>
            <NavLink
              to="/signin"
              onClick={closeMenu}
              className="border border-green-500 text-green-600 hover:bg-green-100 px-6 py-2 rounded-md font-medium w-4/5 text-center"
            >
              Sign in
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
