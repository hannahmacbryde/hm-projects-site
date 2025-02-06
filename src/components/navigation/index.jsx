import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import menuBtn from '../img/blackMenuIcon.png';
import closeBtn from '../img/blackCloseIcon.png';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    // If the clicked dropdown is already open, close it, otherwise open it
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="App bg-lightBeige z-[3] flex text-center flex-col justify-between border-b-2 border-black fixed w-full pb-0">
      <nav className="text-black font-dosis md:pl-2.5 md:py-2 py-4 pl-4 pr-4">
        <div className="flex justify-end items-center px-6 py-2 md:hidden">
          <img
            className="md:hidden block h-9 cursor-pointer"
            src={menuOpen ? closeBtn : menuBtn}
            alt="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>

        <ul
          className={`${
            menuOpen ? "flex z-10" : "hidden"
          } md:flex flex-col md:flex-row items-start md:gap-8 gap-3 rounded-md md:rounded-none md:px-6 md:py-4 md:p-0 z-10 justify-start md:pl-2.5`}>

          {/* Home link */}
          <li>
            <Link to="/" className="text-lg uppercase">
              Hometime
            </Link>
          </li>

          {/* React Dropdown */}
          <li className="relative w-full md:w-auto">
            <button
              className="text-lg uppercase flex items-center justify-between md:justify-start w-full"
              onClick={() => toggleDropdown('react')}>
              React Projects
              {openDropdown === 'react' ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </button>
            <ul
              className={`${
                openDropdown === 'react' ? 'block' : 'hidden'
              } md:absolute relative text-left md:text-center left-0 top-full md:bg-lightBeige md:shadow-lg mt-2 rounded-md transition-all duration-300 w-[210px]`}
            >
              <li>
                <Link to="/load-more-data" className="text-lg capitalize block px-4 py-2">
                  Product Listing Page
                </Link>
              </li>
              <li>
                <Link to="/random-color" className="text-lg capitalize block px-4 py-2">
                  Random Color
                </Link>
              </li>
              <li>
                <Link to="/star-rating" className="text-lg capitalize block px-4 py-2">
                  Star Rating
                </Link>
              </li>
              <li>
                <Link to="/image-slider" className="text-lg capitalize block px-4 py-2">
                  Image Slider
                </Link>
              </li>
              <li>
                <Link to="/accordion" className="text-lg capitalize block px-4 py-2">
                  Accordion
                </Link>
              </li>
            </ul>
          </li>

          {/* Git Dropdown */}
          <li className="relative w-full md:w-auto">
            <button
              className="text-lg uppercase flex items-center justify-between md:justify-start w-full"
              onClick={() => toggleDropdown('git')}>
              GitHub Repo Projects
              {openDropdown === 'git' ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </button>
            <ul
              className={`${
                openDropdown === 'git' ? 'block' : 'hidden'
              } md:absolute relative text-left md:text-center left-0 top-full md:bg-lightBeige md:shadow-lg mt-2 rounded-md transition-all duration-300 w-[210px]`}>
              <li>
                <a
                  href="https://github.com/hannahmacbryde/rock-paper-scissors"
                  className="text-lg capitalize block px-4 py-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Rock Paper Scissors
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/hannahmacbryde/etch-a-sketch"
                  className="text-lg capitalize block px-4 py-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Etch-A-Sketch
                </a>
              </li>
            </ul>
          </li>

        </ul>
      </nav>
    </div>
  );
}