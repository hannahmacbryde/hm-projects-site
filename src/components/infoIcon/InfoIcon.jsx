import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import pageData from '../../data/data';

const InfoIcon = ({ pageName }) => {
  const [isVisible, setIsVisible] = useState(false); // State to control modal visibility

  const handleClick = () => {
    setIsVisible(!isVisible); // Toggle visibility of the modal
  };

  // Get page content
  const pageContent = pageData[pageName];

  return (
    <div className='info-sec z-10 fixed md:right-8 left-8'>
      {/* Info Icon Button */}
      <button
        onClick={handleClick}
        className="text-black focus:outline-none hover:bg-white md:float-right top-[25px] relative"
      >
        <FaInfoCircle size={24} />
      </button>

      {/* Modal */}
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg md:w-[600px] w-[80%]">
            {typeof pageContent === 'object' && pageContent.techStack ? (
              // Render content for productList with a description and ul
              <>
                <p className="text-left text-lg">{pageContent.description}</p>
                <ul className="list-disc list-inside ">
                  {pageContent.techStack.map((tech, index) => (
                    <li className='text-lg' key={index}>{tech}</li>
                  ))}
                </ul>
                <p className="text-left text-lg">{pageContent.addDescription}</p>
              </>
            ) : (
              // Render default content for other pages
              <p className="text-center text-lg">{pageContent}</p>
            )}
            <button
              onClick={handleClick}
              className="mt-4 bg-black text-white py-2 px-4 rounded-full w-full hover:bg-gray focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoIcon;
