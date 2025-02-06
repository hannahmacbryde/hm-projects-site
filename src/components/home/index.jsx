import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import pdpMacImg from '../img/pdp-mac.png';
import rpsImg from '../img/rps-mac.png';

const HomeComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const projects = [
    {
      id: 1,
      title: 'Product Listing Page',
      description: 'I designed and developed a product listing page using React, Tailwind and REST API. This allowed me to build on my skill-set in a new light using elements such as useEffect, useState and REST API. This API endpoint is a free service found through google and I do not own the rights to this. If any issues are found, please let me know.',
      link: '/load-more-data',
      image: pdpMacImg,
    },
    {
      id: 2,
      title: 'Rock Paper Scissors Game',
      description: 'I designed and developed a rock paper scissors game using JavaScript, HTML5 and CSS3. This was a project that was originally introduced through The Odin Project which allowed me to develop my skill-set with JavaScript elements. This was the first project introduced throughout the program for me to focus on.',
      link: 'https://hannahmacbryde.github.io/rock-paper-scissors/',
      image: rpsImg,
    },
  ];

  return (
    <div id="hp-sec">
      <div className='z-10 fixed md:right-8 left-8'>
        <h3 className='text-2xl font-laisha font-semibold md:float-right top-[25px] relative'>Hannah Macbryde</h3>
      </div>
      <div className="home-wrapper bg-lightBeige text-center flex pt-16 gap-5 justify-center items-center flex-col h-[100vh] md:h-[in]">
        <h1 className="main-title text-black text-left font-laisha font-normal md:text-[12em] text-[5em]">Projects.</h1>

        <div className="slider-wrapper w-full max-w-3xl mt-[-50px]">
          <Slider {...settings}>
            {projects.map((project) => (
              <div key={project.id} className="featured-project p-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-contain rounded-lg"
                />
                <h3 className="text-2xl font-laisha font-semibold mt-4">{project.title}</h3>
                <p className="text-gray-700 mt-2 md:w-4/5 m-auto font-dosis">{project.description}</p>
                <Link
                  to={project.link}
                  className="mt-4 inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition font-dosis"
                >
                  View Project
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;