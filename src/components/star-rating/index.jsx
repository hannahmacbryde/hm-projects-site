import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import InfoIcon from '../infoIcon/InfoIcon';

function StarRatingSet({ noOfStars = 5, label, rating, onRatingChange }) {
    const [hover, setHover] = useState(0);

    function handleClick(getCurrentIndex) {
        onRatingChange(getCurrentIndex);
    }

    function handleMouseEnter(getCurrentIndex) {
        setHover(getCurrentIndex);
    }

    function handleMouseLeave() {
        setHover(0);
    }

    return (
        <div className='star-item flex'>
            <p className='font-dosis text-center mr-5 font-semibold text-base mt-2'>{label}</p>
            {
                [...Array(noOfStars)].map((_, index) => {
                    index += 1;
                    return (
                        <FaStar 
                            key={index}
                            className={index <= (hover || rating) ? 'text-yellow-400' : 'text-black'}
                            onClick={() => handleClick(index)}
                            onMouseMove={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave()}
                            size={40}
                        />
                    );
                })
            }
        </div>
    );
}

export default function StarRating({ noOfStars = 5 }) {
    const [ratings, setRatings] = useState({
        projectRating: 0,
        designRating: 0,
        functionalityRating: 0,
        overallRating: 0,
    });

    const totalRating = Object.values(ratings).reduce((acc, curr) => acc + curr, 0);

    function handleRatingChange(category, value) {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [category]: value,
        }));
    }

    return (
        <div className='star-section flex h-[100vh] w-[100vw] justify-start items-center flex-col bg-gray-300 gap-2.5'>
            <InfoIcon pageName="starRating" />

            <h2 className='font-dosis underline text-6xl font-semibold mt-[90px] mb-[5px]'>Star Rating</h2>
            <div className="star-rating gap-8 flex flex-col items-center text-center px-5">
                <StarRatingSet
                    noOfStars={noOfStars}
                    label="Projects Website Rating:"
                    rating={ratings.projectRating}
                    onRatingChange={(value) => handleRatingChange('projectRating', value)}
                />
                <StarRatingSet
                    noOfStars={noOfStars}
                    label="Web Design Rating:"
                    rating={ratings.designRating}
                    onRatingChange={(value) => handleRatingChange('designRating', value)}
                />
                <StarRatingSet
                    noOfStars={noOfStars}
                    label="Functionality Rating:"
                    rating={ratings.functionalityRating}
                    onRatingChange={(value) => handleRatingChange('functionalityRating', value)}
                />
                <StarRatingSet
                    noOfStars={noOfStars}
                    label="Overall Rating (Both Websites):"
                    rating={ratings.overallRating}
                    onRatingChange={(value) => handleRatingChange('overallRating', value)}
                />
            </div>
            <h3 className='font-dosis text-lg mt-3 font-semibold'>Total Star Rating: {totalRating} / 20</h3>
        </div>
    );
}

