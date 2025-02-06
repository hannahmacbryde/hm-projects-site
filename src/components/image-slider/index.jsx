import { useEffect, useState, useCallback } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import InfoIcon from '../infoIcon/InfoIcon';

export default function ImageSlider({ url, limit = 5, page = 1 }) {
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchImages = useCallback(async (getUrl) => {
        try {
            setLoading(true);

            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();

            if (data) {
                setImages(data);
                setLoading(false);
            }
        } catch (e) {
            setErrorMsg(e.message);
            setLoading(false);
        }
    }, [page, limit]);

    function handlePrevious() {
        setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
    }

    function handleNext() {
        setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
    }

    useEffect(() => {
        if (url !== "") {
            fetchImages(url);
        }
    }, [url, fetchImages]);

    if (loading) {
        return <div>Loading data! Please wait...</div>;
    }

    if (errorMsg !== null) {
        return <div>Error occurred! {errorMsg}</div>;
    }

    return (
        <div className="img-cont">

            <InfoIcon pageName="imgSlider" />

            <div className="container image-slide-container top-[75px] relative max-w-full w-full flex justify-center items-center h-fit">
                <BsArrowLeftCircleFill onClick={handlePrevious} className="absolute w-8 h-8 text-white filter drop-shadow-[0px_0px_5px_#555] left-4 hover:text-[indianred] hover:cursor-pointer" />
                {images && images.length
                    ? images.map((imageItem, index) => (
                        <img
                            key={imageItem.id}
                            alt={imageItem.download_url}
                            src={imageItem.download_url}
                            className={currentSlide === index ? "h-full w-full rounded-lg shadow-[0px_0px_7px_#666]" : "h-full w-full rounded-lg shadow-[0px_0px_7px_#666] hidden"}
                        />
                    ))
                    : null}
                <BsArrowRightCircleFill onClick={handleNext} className="absolute w-8 h-8 text-white filter drop-shadow-[0px_0px_5px_#555] right-4 hover:text-[indianred] hover:cursor-pointer" />
                <span className="flex absolute bottom-4">
                    {images && images.length
                        ? images.map((_, index) => (
                            <button
                                key={index}
                                className={currentSlide === index ? "cursor-pointer bg-white h-[15px] w-[15px] rounded-full border-0 outline-none mx-[0.2rem]" : "cursor-pointer h-[15px] w-[15px] rounded-full border-0 outline-none mx-[0.2rem] bg-gray-500"}
                                onClick={() => setCurrentSlide(index)}
                            ></button>
                        ))
                        : null}
                </span>
            </div>
        </div>
    );
}
